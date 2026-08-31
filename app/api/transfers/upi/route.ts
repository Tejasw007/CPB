import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { TransactionType, TransactionCategory, TransferMode } from "@prisma/client";
import { appendBlockchainEvent } from "@/lib/blockchain";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");

    if (!accountId) {
      return NextResponse.json({ error: "Account ID is required" }, { status: 400 });
    }

    const account = await prisma.account.findUnique({
      where: { id: accountId },
      include: { user: true },
    });

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    // Auto-generate UPI ID if missing
    if (!account.upiId) {
      const sanitizedPhone = account.user.phone ? account.user.phone.replace(/[^0-9]/g, "") : Math.floor(Math.random()*9000000000+1000000000).toString();
      const newUpiId = `${sanitizedPhone}@cpb`;
      
      try {
        await prisma.account.update({
          where: { id: account.id },
          data: { upiId: newUpiId },
        });
        return NextResponse.json({ success: true, upiId: newUpiId });
      } catch (e) {
        // Fallback if unique constraint fails
        const randomUpi = `${sanitizedPhone}${Math.floor(Math.random()*1000)}@cpb`;
        await prisma.account.update({
          where: { id: account.id },
          data: { upiId: randomUpi },
        });
        return NextResponse.json({ success: true, upiId: randomUpi });
      }
    }

    return NextResponse.json({ success: true, upiId: account.upiId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, sourceAccountId, targetUpiId, amount, description } = body;
    const numAmount = Number(amount);

    if (action === "RESOLVE") {
      const targetAcc = await prisma.account.findUnique({
        where: { upiId: targetUpiId },
        include: { user: true },
      });
      if (!targetAcc) return NextResponse.json({ error: "UPI ID not found" }, { status: 404 });
      return NextResponse.json({ success: true, name: targetAcc.user.name });
    }

    if (action === "SEND") {
      if (!sourceAccountId || !targetUpiId || numAmount <= 0) {
        return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
      }

      const result = await prisma.$transaction(async (tx) => {
        const source = await tx.account.findUnique({ where: { id: sourceAccountId } });
        const target = await tx.account.findUnique({ where: { upiId: targetUpiId }, include: { user: true } });

        if (!source || !target) throw new Error("Invalid source or target");
        if (Number(source.balance) < numAmount) throw new Error("Insufficient funds");
        if (source.id === target.id) throw new Error("Cannot send money to the same account");

        const updatedSource = await tx.account.update({
          where: { id: source.id },
          data: { balance: { decrement: numAmount } },
        });

        const updatedTarget = await tx.account.update({
          where: { id: target.id },
          data: { balance: { increment: numAmount } },
        });

        const refId = `UPI-${Date.now()}`;

        // Source transaction
        await tx.transaction.create({
          data: {
            accountId: source.id,
            type: TransactionType.DEBIT,
            amount: numAmount,
            balanceAfter: updatedSource.balance,
            description: description || `UPI Transfer to ${target.user.name}`,
            category: TransactionCategory.TRANSFER,
            referenceId: `${refId}-DR`,
            transferMode: TransferMode.UPI,
            counterpartyAccount: target.accountNumber,
            counterpartyName: target.user.name,
            counterpartyBank: "Code Paglu Bank",
            status: "COMPLETED",
          },
        });

        // Target transaction
        await tx.transaction.create({
          data: {
            accountId: target.id,
            type: TransactionType.CREDIT,
            amount: numAmount,
            balanceAfter: updatedTarget.balance,
            description: description || "UPI Transfer Received",
            category: TransactionCategory.TRANSFER,
            referenceId: `${refId}-CR`,
            transferMode: TransferMode.UPI,
            counterpartyAccount: source.accountNumber,
            status: "COMPLETED",
          },
        });

        return { refId, sourceId: source.id, numAmount };
      });

      // --- 4. Append to Immutable Blockchain Ledger ---
      await appendBlockchainEvent("TRANSACTION", {
        type: "UPI_TRANSFER",
        referenceId: result.refId,
        sourceAccountId: result.sourceId,
        targetUpiId,
        amount: result.numAmount,
        currency: "INR",
        status: "COMPLETED",
        description,
        timestamp: new Date()
      });

      return NextResponse.json({ success: true, message: `Successfully sent ₹${result.numAmount} via UPI`, refId: result.refId });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("UPI error:", error);
    return NextResponse.json({ error: error.message || "UPI operation failed" }, { status: 500 });
  }
}
