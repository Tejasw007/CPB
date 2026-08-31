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

    // Fetch the internal revenue account
    const revenueAccount = await prisma.account.findUnique({
      where: { id: targetAccountId },
    });

    if (!revenueAccount) {
      return NextResponse.json({ error: "Target revenue account not found." }, { status: 404 });
    }

    // Fetch all customer accounts to deduct from
    const whereClause: any = {
      status: "ACTIVE",
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
    // In a real app, doing this for millions of users requires batching. For this demo, we can just map over it.
    await prisma.$transaction(async (tx) => {
      for (const account of customerAccounts) {
        const deductionAmount = Number((Number(account.balance) * feePercent).toFixed(2));
        
        if (deductionAmount > 0) {
          // 1. Deduct from customer
          const updatedCustomerAcc = await tx.account.update({
            where: { id: account.id },
            data: { balance: { decrement: deductionAmount } },
          });

          // 2. Create customer transaction record
          await tx.transaction.create({
            data: {
              accountId: account.id,
              type: TransactionType.DEBIT,
              amount: deductionAmount,
              balanceAfter: updatedCustomerAcc.balance,
              description: "System Service Charge Deduction",
              category: TransactionCategory.FEE,
              referenceId: `${refId}-${account.id.substring(0,5)}`,
              status: "COMPLETED",
            },
          });

          // 3. Create notification for customer
          if (notificationMessage) {
            await tx.notification.create({
              data: {
                userId: account.userId,
                title: "Service Charge Deducted",
                message: notificationMessage.replace("{{amount}}", deductionAmount.toString()),
                type: "SYSTEM_ALERT",
              },
            });
          }

          totalCollected += deductionAmount;
          affectedCount++;
        }
      }

      // 4. Credit the total collected to the revenue account
      if (totalCollected > 0) {
        const updatedRev = await tx.account.update({
          where: { id: revenueAccount.id },
          data: { balance: { increment: totalCollected } },
        });

        // 5. Create revenue transaction record
        await tx.transaction.create({
          data: {
            accountId: revenueAccount.id,
            type: TransactionType.CREDIT,
            amount: totalCollected,
            balanceAfter: updatedRev.balance,
            description: `Mass Service Charge Collection from ${affectedCount} accounts`,
            category: TransactionCategory.FEE,
            referenceId: `${refId}-REV`,
            status: "COMPLETED",
          },
        });

        await appendBlockchainEvent("SERVICE_CHARGE_EXECUTION", {
          targetAccount: targetAccountId,
          percentage: percentage,
          totalAccountsAffected: affectedCount,
          totalDeducted: totalCollected,
          referenceId: refId,
          timestamp: new Date()
        });
      }
    }, {
      timeout: 30000,
    });

    await logAuditEvent({
      actorRole: "ADMIN",
      action: "MASS_SERVICE_CHARGE_EXECUTED",
      severity: "CRITICAL",
      metadata: { totalCollected, affectedCount, percentage, targetTier },
    });

    return NextResponse.json({
      success: true,
      message: `Successfully collected ₹${totalCollected} from ${affectedCount} accounts.`,
      totalCollected,
      affectedCount,
    });
  } catch (error: any) {
    console.error("Mass deduction error:", error);
    return NextResponse.json({ error: error.message || "Mass deduction failed" }, { status: 500 });
  }
}
