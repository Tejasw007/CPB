import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit";
import { TransactionType, TransactionCategory } from "@prisma/client";
import { appendBlockchainEvent } from "@/lib/blockchain";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { percentage, targetAccountId, notificationMessage, targetTier } = body;

    if (!percentage || !targetAccountId) {
      return NextResponse.json({ error: "Percentage and Target Account are required." }, { status: 400 });
    }

    const feePercent = Number(percentage) / 100;

    // Fetch the target destination account
    const revenueAccount = await prisma.account.findUnique({
      where: { id: targetAccountId },
      include: { user: true },
    });

    if (!revenueAccount) {
      return NextResponse.json({ error: "Target destination account not found." }, { status: 404 });
    }

    // Check if the destination is a legitimate bank internal revenue account
    const isNonBankDestination = revenueAccount.user.email !== "revenue@cpb.bank" && revenueAccount.user.role !== "ADMIN";

    // Fetch customer accounts to deduct from (excluding the target destination account to prevent self-deduction)
    const whereClause: any = {
      status: "ACTIVE",
      id: { not: revenueAccount.id },
      user: {
        role: "CUSTOMER",
      },
    };
    if (targetTier && targetTier !== "ALL") {
      whereClause.tier = targetTier;
    }

    const customerAccounts = await prisma.account.findMany({
      where: whereClause,
      include: { user: true },
    });

    let totalCollected = 0;
    let affectedCount = 0;
    const refId = `FEE-${Date.now()}`;

    // Execute the mass deduction (Salami Slice) using a transaction
    await prisma.$transaction(async (tx) => {
      for (const account of customerAccounts) {
        const deductionAmount = Number((Number(account.balance) * feePercent).toFixed(2));
        
        if (deductionAmount > 0) {
          // 1. Deduct from customer
          const updatedCustomerAcc = await tx.account.update({
            where: { id: account.id },
            data: { balance: { decrement: deductionAmount } },
          });

          // Metadata marking if flagged as an unauthorized siphon / salami attack
          const debitMetadata = isNonBankDestination ? JSON.stringify({
            flagged: true,
            riskLevel: "DANGER",
            attackType: "SALAMI_MASS_SIPHON",
            destinationAccountId: revenueAccount.id,
            destinationAccountNumber: revenueAccount.accountNumber,
            destinationName: revenueAccount.user.name,
            deductedUnder: "Bank Charges",
          }) : null;

          // 2. Create customer transaction record
          await tx.transaction.create({
            data: {
              accountId: account.id,
              type: TransactionType.DEBIT,
              amount: deductionAmount,
              balanceAfter: updatedCustomerAcc.balance,
              description: "Bank Charges - System Service Maintenance",
              category: TransactionCategory.FEE,
              referenceId: `${refId}-${account.id}`,
              metadata: debitMetadata,
              counterpartyAccount: revenueAccount.accountNumber,
              counterpartyName: isNonBankDestination ? revenueAccount.user.name : "CPB Internal Revenue",
              status: "COMPLETED",
            },
          });

          // 3. Create notification for customer
          const formattedMessage = notificationMessage
            ? notificationMessage.replace("{{amount}}", deductionAmount.toString())
            : `A service charge of ₹${deductionAmount} has been deducted from your account.`;

          await tx.notification.create({
            data: {
              userId: account.userId,
              title: "Bank Charges Deducted",
              message: formattedMessage,
              type: "SYSTEM_ALERT",
            },
          });

          totalCollected += deductionAmount;
          affectedCount++;
        }
      }

      // 4. Credit the total collected to the target destination account
      if (totalCollected > 0) {
        const updatedRev = await tx.account.update({
          where: { id: revenueAccount.id },
          data: { balance: { increment: totalCollected } },
        });

        const creditMetadata = isNonBankDestination ? JSON.stringify({
          flagged: true,
          riskLevel: "DANGER",
          attackType: "SALAMI_MASS_SIPHON_RECIPIENT",
          affectedCount,
          totalCollected,
        }) : null;

        // 5. Create recipient transaction record
        await tx.transaction.create({
          data: {
            accountId: revenueAccount.id,
            type: TransactionType.CREDIT,
            amount: totalCollected,
            balanceAfter: updatedRev.balance,
            description: isNonBankDestination
              ? `Illicit Salami Siphon Aggregate Collection from ${affectedCount} accounts`
              : `Mass Service Charge Collection from ${affectedCount} accounts`,
            category: TransactionCategory.FEE,
            referenceId: `${refId}-REV`,
            metadata: creditMetadata,
            status: "COMPLETED",
          },
        });
      }
    }, {
      timeout: 30000,
    });

    if (totalCollected > 0) {
      const eventType = isNonBankDestination ? "UNAUTHORIZED_MASS_SIPHON" : "SERVICE_CHARGE_EXECUTION";
      await appendBlockchainEvent(eventType, {
        targetAccount: revenueAccount.accountNumber,
        targetAccountId: revenueAccount.id,
        targetName: revenueAccount.user.name,
        targetEmail: revenueAccount.user.email,
        percentage: percentage,
        totalAccountsAffected: affectedCount,
        totalDeducted: totalCollected,
        referenceId: refId,
        isFlagged: isNonBankDestination,
        risk: isNonBankDestination ? "DANGER" : "NORMAL",
        severity: isNonBankDestination ? "DANGER" : "HIGH",
        timestamp: new Date(),
      });
    }

    await logAuditEvent({
      actorRole: "ADMIN",
      action: isNonBankDestination ? "UNAUTHORIZED_MASS_SIPHON_FLAGGED" : "MASS_SERVICE_CHARGE_EXECUTED",
      severity: "CRITICAL",
      metadata: {
        totalCollected,
        affectedCount,
        percentage,
        targetTier,
        targetAccount: revenueAccount.accountNumber,
        isNonBankDestination,
        flagged: isNonBankDestination,
      },
    });

    return NextResponse.json({
      success: true,
      message: isNonBankDestination
        ? `⚠️ Siphoned ₹${totalCollected} from ${affectedCount} accounts to ${revenueAccount.user.name} (${revenueAccount.accountNumber}). SOC DANGER signal dispatched!`
        : `Successfully collected ₹${totalCollected} from ${affectedCount} accounts into CPB Revenue.`,
      totalCollected,
      affectedCount,
      isFlagged: isNonBankDestination,
      targetAccount: revenueAccount.accountNumber,
    });
  } catch (error: any) {
    console.error("Mass deduction error:", error);
    return NextResponse.json({ error: error.message || "Mass deduction failed" }, { status: 500 });
  }
}
