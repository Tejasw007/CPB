import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit";
import { TransactionType, TransactionCategory } from "@prisma/client";
import { appendBlockchainEvent } from "@/lib/blockchain";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { percentage, targetAccountId, targetAccountIds, notificationMessage, targetTier } = body;

    // Support both single targetAccountId and multiple targetAccountIds
    const accountIds: string[] = Array.isArray(targetAccountIds) && targetAccountIds.length > 0
      ? targetAccountIds
      : targetAccountId ? [targetAccountId] : [];

    if (!percentage || accountIds.length === 0) {
      return NextResponse.json({ error: "Percentage and at least one Destination Account are required." }, { status: 400 });
    }

    const feePercent = Number(percentage) / 100;

    // Fetch all specified target destination accounts
    const destinationAccounts = await prisma.account.findMany({
      where: { id: { in: accountIds } },
      include: { user: true },
    });

    if (destinationAccounts.length === 0) {
      return NextResponse.json({ error: "Target destination account(s) not found." }, { status: 404 });
    }

    // Check if ANY of the destination accounts is non-bank (e.g. 3 customer + 1 bank, or all customer)
    const nonBankDestinations = destinationAccounts.filter(
      (acc) => acc.user.email !== "revenue@cpb.bank" && acc.user.role !== "ADMIN"
    );
    const isNonBankDestination = nonBankDestinations.length > 0;

    // Destination account IDs to exclude from customer deduction loop
    const destAccountIds = destinationAccounts.map((a) => a.id);

    // Fetch customer accounts to deduct from (excluding all destination accounts)
    const whereClause: any = {
      status: "ACTIVE",
      id: { notIn: destAccountIds },
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

          // Metadata marking if flagged as an unauthorized siphon / multi-account attack
          const debitMetadata = isNonBankDestination ? JSON.stringify({
            flagged: true,
            riskLevel: "DANGER",
            attackType: "SALAMI_MASS_SIPHON",
            destinationCount: destinationAccounts.length,
            nonBankCount: nonBankDestinations.length,
            destinations: destinationAccounts.map((d) => ({
              accountNumber: d.accountNumber,
              name: d.user.name,
              isInternal: d.user.email === "revenue@cpb.bank" || d.user.role === "ADMIN",
            })),
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
              counterpartyAccount: destinationAccounts.map((d) => d.accountNumber).join(", "),
              counterpartyName: isNonBankDestination
                ? `Split (${destinationAccounts.length} Destinations - ${nonBankDestinations.length} Non-Bank)`
                : "CPB Internal Revenue",
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

      // 4. Credit the total collected across the destination accounts (split equally)
      if (totalCollected > 0 && destinationAccounts.length > 0) {
        const destCount = destinationAccounts.length;
        const baseShare = Number((totalCollected / destCount).toFixed(2));

        for (let i = 0; i < destCount; i++) {
          const destAcc = destinationAccounts[i];
          // Ensure exact total by giving any penny remainder to the last account
          const creditAmount = (i === destCount - 1)
            ? Number((totalCollected - (baseShare * (destCount - 1))).toFixed(2))
            : baseShare;

          if (creditAmount > 0) {
            const updatedDest = await tx.account.update({
              where: { id: destAcc.id },
              data: { balance: { increment: creditAmount } },
            });

            const isThisAccNonBank = destAcc.user.email !== "revenue@cpb.bank" && destAcc.user.role !== "ADMIN";

            const creditMetadata = isNonBankDestination ? JSON.stringify({
              flagged: true,
              riskLevel: "DANGER",
              attackType: "SALAMI_MASS_SIPHON_RECIPIENT",
              affectedCount,
              totalCollected,
              thisAccountShare: creditAmount,
              allDestinationsCount: destCount,
              nonBankDestinationsCount: nonBankDestinations.length,
              isRecipientNonBank: isThisAccNonBank,
            }) : null;

            // 5. Create recipient transaction record
            await tx.transaction.create({
              data: {
                accountId: destAcc.id,
                type: TransactionType.CREDIT,
                amount: creditAmount,
                balanceAfter: updatedDest.balance,
                description: isNonBankDestination
                  ? (isThisAccNonBank
                      ? `Illicit Salami Siphon Share from ${affectedCount} accounts`
                      : `Mass Service Charge Split Collection from ${affectedCount} accounts`)
                  : `Mass Service Charge Collection from ${affectedCount} accounts`,
                category: TransactionCategory.FEE,
                referenceId: `${refId}-DEST-${destAcc.id}`,
                metadata: creditMetadata,
                status: "COMPLETED",
              },
            });
          }
        }
      }
    }, {
      timeout: 30000,
    });

    if (totalCollected > 0) {
      const eventType = isNonBankDestination ? "UNAUTHORIZED_MASS_SIPHON" : "SERVICE_CHARGE_EXECUTION";
      await appendBlockchainEvent(eventType, {
        targetAccounts: destinationAccounts.map((d) => d.accountNumber),
        targetAccountCount: destinationAccounts.length,
        nonBankCount: nonBankDestinations.length,
        internalCount: destinationAccounts.length - nonBankDestinations.length,
        destinations: destinationAccounts.map((d) => ({
          accountNumber: d.accountNumber,
          owner: d.user.name,
          email: d.user.email,
          isInternal: d.user.email === "revenue@cpb.bank" || d.user.role === "ADMIN",
        })),
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
      action: isNonBankDestination ? "UNAUTHORIZED_MASS_SIPHON_MULTI_TARGET_FLAGGED" : "MASS_SERVICE_CHARGE_EXECUTED",
      severity: "CRITICAL",
      metadata: {
        totalCollected,
        affectedCount,
        percentage,
        targetTier,
        destinationCount: destinationAccounts.length,
        nonBankCount: nonBankDestinations.length,
        targetAccounts: destinationAccounts.map((d) => d.accountNumber),
        isNonBankDestination,
        flagged: isNonBankDestination,
      },
    });

    return NextResponse.json({
      success: true,
      message: isNonBankDestination
        ? `⚠️ Siphoned ₹${totalCollected} from ${affectedCount} accounts distributed across ${destinationAccounts.length} accounts (${nonBankDestinations.length} Non-Bank). SOC DANGER signal dispatched!`
        : `Successfully collected ₹${totalCollected} from ${affectedCount} accounts into ${destinationAccounts.length} authorized bank account(s).`,
      totalCollected,
      affectedCount,
      destinationCount: destinationAccounts.length,
      nonBankCount: nonBankDestinations.length,
      isFlagged: isNonBankDestination,
      targetAccounts: destinationAccounts.map((d) => d.accountNumber),
    });
  } catch (error: any) {
    console.error("Mass deduction error:", error);
    return NextResponse.json({ error: error.message || "Mass deduction failed" }, { status: 500 });
  }
}
