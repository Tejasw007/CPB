import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit";
import bcrypt from "bcryptjs";
import { Role, UserStatus, KycStatus, AccountTier, CardType, CardStatus, TransactionType, TransactionCategory } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;
    const invite = await prisma.onboardingInvitation.findUnique({
      where: { token },
    });

    if (!invite) {
      return NextResponse.json({ error: "Invalid or expired onboarding link." }, { status: 404 });
    }

    if (invite.status === "COMPLETED") {
      return NextResponse.json({ error: "This onboarding link has already been completed." }, { status: 400 });
    }

    if (new Date(invite.expiresAt) < new Date()) {
      return NextResponse.json({ error: "This onboarding link has expired. Please contact bank staff." }, { status: 410 });
    }

    return NextResponse.json({ invite });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params;
    const body = await request.json();
    const {
      panNumber,
      aadhaarNumber,
      dob,
      address,
      password,
      biometricCredentialId,
      biometricPublicKey,
      biometricDeviceName,
    } = body;

    const invite = await prisma.onboardingInvitation.findUnique({
      where: { token },
    });

    if (!invite || invite.status === "COMPLETED") {
      return NextResponse.json({ error: "Invalid or already completed onboarding link." }, { status: 400 });
    }

    // Hash user password / PIN
    const passwordHash = await bcrypt.hash(password || "Password@123", 10);

    return await prisma.$transaction(async (tx) => {
      // 1. Create or update User
      let user = await tx.user.findUnique({ where: { email: invite.customerEmail } });

      if (user) {
        user = await tx.user.update({
          where: { id: user.id },
          data: {
            name: invite.customerName,
            phone: invite.customerPhone,
            password: passwordHash,
            panNumber,
            aadhaarNumber: `•••• •••• ${aadhaarNumber.slice(-4)}`,
            dob: dob ? new Date(dob) : new Date("1995-01-01"),
            address: address || "Mumbai, India",
            kycStatus: KycStatus.VERIFIED,
            status: UserStatus.ACTIVE,
            twoFactorEnabled: true,
          },
        });
      } else {
        user = await tx.user.create({
          data: {
            name: invite.customerName,
            email: invite.customerEmail,
            phone: invite.customerPhone,
            password: passwordHash,
            role: Role.CUSTOMER,
            panNumber,
            aadhaarNumber: `•••• •••• ${aadhaarNumber.slice(-4)}`,
            dob: dob ? new Date(dob) : new Date("1995-01-01"),
            address: address || "Mumbai, India",
            kycStatus: KycStatus.VERIFIED,
            status: UserStatus.ACTIVE,
            avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
            twoFactorEnabled: true,
          },
        });
      }

      // 2. Generate Account Number (e.g. 8832 + 6 random digits)
      const randomAccDigits = Math.floor(100000 + Math.random() * 900000);
      const accountNumber = `8832${randomAccDigits}`;

      const initialBal = Number(invite.initialDeposit) || 5000;

      const account = await tx.account.create({
        data: {
          userId: user.id,
          accountNumber,
          branchCode: invite.branchCode || "CPB001",
          ifsc: "CPBN0001042",
          type: invite.accountType,
          balance: initialBal,
          tier: AccountTier.SILVER,
          status: "ACTIVE",
        },
      });

      // 3. Generate Debit Card
      const randomCardDigits = Math.floor(1000 + Math.random() * 9000);
      const cardNumber = `453288410941${randomCardDigits}`;

      const card = await tx.card.create({
        data: {
          userId: user.id,
          accountId: account.id,
          cardNumber,
          cardHolderName: user.name.toUpperCase(),
          type: CardType.DEBIT,
          expiryMonth: 12,
          expiryYear: 2029,
          cvv: String(Math.floor(100 + Math.random() * 900)),
          status: CardStatus.ACTIVE,
          atmLimit: 50000.0,
          onlineLimit: 100000.0,
          intlEnabled: false,
          contactlessEnabled: true,
        },
      });

      // 4. Register Biometric Credential if provided
      if (biometricCredentialId) {
        await tx.biometricCredential.create({
          data: {
            userId: user.id,
            credentialId: biometricCredentialId,
            publicKey: biometricPublicKey || "webauthn-public-key-token",
            deviceName: biometricDeviceName || "Customer Mobile Phone Sensor",
          },
        });
      }

      // 5. Initial Deposit Transaction Record
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      await tx.transaction.create({
        data: {
          accountId: account.id,
          type: TransactionType.CREDIT,
          amount: initialBal,
          balanceAfter: initialBal,
          description: "Initial Account Opening Deposit",
          category: TransactionCategory.CASH_DEPOSIT,
          referenceId: `CPB-INIT-${dateStr}-${randomSuffix}`,
          counterpartyBank: "Code Paglu Bank Branch",
        },
      });

      // 6. Mark Invitation Completed
      await tx.onboardingInvitation.update({
        where: { id: invite.id },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
          panNumber,
          aadhaarNumber,
          address,
          biometricRegistered: Boolean(biometricCredentialId),
          biometricCredentialId,
          registeredUserId: user.id,
        },
      });

      // 7. Audit log
      await logAuditEvent({
        actorId: user.id,
        actorName: user.name,
        actorRole: "CUSTOMER",
        action: "CUSTOMER_SELF_ONBOARDING_COMPLETE",
        targetType: "USER",
        targetId: user.id,
        metadata: {
          accountNumber,
          initialDeposit: initialBal,
          biometricRegistered: Boolean(biometricCredentialId),
        },
        severity: "INFO",
      });

      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        account: {
          accountNumber: account.accountNumber,
          type: account.type,
          balance: Number(account.balance),
          ifsc: account.ifsc,
        },
        card: {
          cardNumber: card.cardNumber,
          cvv: card.cvv,
          expiry: `${card.expiryMonth}/${card.expiryYear}`,
        },
        biometricRegistered: Boolean(biometricCredentialId),
      });
    });
  } catch (error: any) {
    console.error("Complete onboarding error:", error);
    return NextResponse.json({ error: error.message || "Onboarding submission failed." }, { status: 500 });
  }
}
