import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { FdStatus, Prisma, TransactionType, TransactionCategory } from "@prisma/client";
import { appendBlockchainEvent } from "@/lib/blockchain";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountId, userEmail, principal, tenureMonths } = body;

    if (!accountId || !userEmail || !principal || principal < 10000) {
      return NextResponse.json({ error: "Minimum FD amount is ₹10,000." }, { status: 400 });
    }

    return await prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({ where: { id: accountId } });
      if (!account) throw new Error("Account not found");

      const balanceNum = Number(account.balance);
      if (balanceNum < principal) {
        throw new Error("Insufficient account balance to book Fixed Deposit.");
      }

      // Rates: 12m -> 7.25%, 24m -> 7.50%, 36m+ -> 7.80%
      let rate = 7.25;
      if (tenureMonths >= 36) rate = 7.80;
      else if (tenureMonths >= 24) rate = 7.50;

      // Maturity projection: P * (1 + r/4)^(4*t) - quarterly compound
      const t = tenureMonths / 12;
      const maturityAmount = principal * Math.pow(1 + rate / 400, 4 * t);

      const startDate = new Date();
      const maturityDate = new Date();
      maturityDate.setMonth(maturityDate.getMonth() + tenureMonths);

      const newBalance = new Prisma.Decimal(balanceNum - principal);

      await tx.account.update({
        where: { id: accountId },
        data: { balance: newBalance },
      });

      const fd = await tx.fixedDeposit.create({
        data: {
          accountId,
          userId: account.userId,
          principal: new Prisma.Decimal(principal),
          rate,
          tenureMonths,
          maturityAmount: new Prisma.Decimal(maturityAmount.toFixed(2)),
          startDate,
          maturityDate,
          status: FdStatus.ACTIVE,
        },
      });

      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);

      await tx.transaction.create({
        data: {
          accountId,
          type: TransactionType.DEBIT,
          amount: new Prisma.Decimal(principal),
          balanceAfter: newBalance,
          description: `Fixed Deposit Created (${tenureMonths} Months @ ${rate}% p.a.)`,
          category: TransactionCategory.FD_DEPOSIT,
          referenceId: `CPB-FD-${dateStr}-${randomSuffix}`,
          counterpartyBank: "Code Paglu Bank Treasury",
        },
      });

      await appendBlockchainEvent("FD_BOOKING", {
        accountId,
        userEmail,
        principal,
        tenureMonths,
        rate,
        maturityAmount,
        timestamp: new Date()
      });

      return NextResponse.json({ success: true, fd, balanceAfter: Number(newBalance) });
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "FD booking failed" }, { status: 400 });
  }
}
