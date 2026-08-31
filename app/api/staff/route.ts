import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ledger } from "@/lib/ledger";
import { KycStatus, LoanStatus, Prisma, TransactionType, TransactionCategory } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "stats") {
      const pendingKycCount = await prisma.user.count({ where: { kycStatus: KycStatus.PENDING } });
      const pendingLoanCount = await prisma.loan.count({ where: { status: LoanStatus.PENDING } });
      const openTicketCount = await prisma.supportTicket.count({ where: { status: "OPEN" } });
      const branchTxns = await prisma.transaction.aggregate({
        _sum: { amount: true },
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      });

      return NextResponse.json({
        pendingKycCount,
        pendingLoanCount,
        openTicketCount,
        dailyBranchVolume: Number(branchTxns._sum.amount || 4820000),
      });
    }

    if (action === "customers") {
      const customers = await prisma.user.findMany({
        where: { role: "CUSTOMER" },
        include: {
          accounts: true,
          loans: true,
        },
        take: 20,
      });
      return NextResponse.json(customers);
    }

    if (action === "loans") {
      const loans = await prisma.loan.findMany({
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(loans);
    }

    if (action === "recent-txns") {
      const txns = await prisma.transaction.findMany({
        take: 20,
        orderBy: { createdAt: "desc" },
        include: { account: { include: { user: true } } },
      });
      return NextResponse.json(txns);
    }

    return NextResponse.json({ message: "Staff portal API active" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // 1. Counter Deposit
    if (action === "counter_deposit") {
      const { targetAccountNumber, amount, tellerUserId, tellerName, depositorName, remarks, branchCode } = body;
      const res = await ledger.executeCounterDeposit({
        targetAccountNumber,
        amount: Number(amount),
        tellerUserId,
        tellerName,
        depositorName,
        remarks,
        branchCode: branchCode || "CPB001",
      });
      return NextResponse.json(res);
    }

    // 2. KYC Approval / Rejection
    if (action === "kyc_review") {
      const { userId, decision, remarks } = body;
      const newStatus = decision === "APPROVE" ? KycStatus.VERIFIED : KycStatus.REJECTED;
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { kycStatus: newStatus },
      });
      return NextResponse.json({ success: true, user: updatedUser });
    }

    // 3. Maker-Checker Transaction Reversal
    if (action === "reverse_transaction") {
      const { originalRefId, reason, initiatedByUserId, initiatedByName, approvedByUserId, approvedByName } = body;
      const res = await ledger.executeReversal({
        originalTransactionReferenceId: originalRefId,
        reason: reason || "Customer Dispute",
        initiatedByUserId,
        initiatedByName,
        approvedByUserId,
        approvedByName,
      });
      return NextResponse.json(res);
    }

    // 4. Loan Underwriting Decision & Disbursement
    if (action === "loan_decision") {
      const { loanId, decision, staffName } = body;
      const loan = await prisma.loan.findUnique({
        where: { id: loanId },
        include: { user: { include: { accounts: true } } },
      });

      if (!loan) throw new Error("Loan not found");

      if (decision === "APPROVE") {
        // Disburse loan into customer's primary account
        const primaryAccount = loan.user.accounts[0];
        if (!primaryAccount) throw new Error("Customer has no active accounts for disbursement.");

        return await prisma.$transaction(async (tx) => {
          const principalNum = Number(loan.principal);
          const currentBal = Number(primaryAccount.balance);
          const newBal = new Prisma.Decimal(currentBal + principalNum);

          await tx.account.update({
            where: { id: primaryAccount.id },
            data: { balance: newBal },
          });

          await tx.loan.update({
            where: { id: loanId },
            data: {
              status: LoanStatus.DISBURSED,
              disbursedAt: new Date(),
              notes: `Approved & Disbursed by ${staffName}`,
            },
          });

          const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
          const randomSuffix = Math.floor(1000 + Math.random() * 9000);

          await tx.transaction.create({
            data: {
              accountId: primaryAccount.id,
              type: TransactionType.CREDIT,
              amount: loan.principal,
              balanceAfter: newBal,
              description: `Loan Disbursed — Ref #${loan.id.slice(-6).toUpperCase()}`,
              category: TransactionCategory.LOAN_DISBURSEMENT,
              referenceId: `CPB-DISB-${dateStr}-${randomSuffix}`,
              counterpartyBank: "Code Paglu Bank Credit Desk",
            },
          });

          return NextResponse.json({ success: true, status: "DISBURSED", balanceAfter: Number(newBal) });
        });
      } else {
        await prisma.loan.update({
          where: { id: loanId },
          data: {
            status: LoanStatus.REJECTED,
            notes: `Rejected by ${staffName}`,
          },
        });
        return NextResponse.json({ success: true, status: "REJECTED" });
      }
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Staff operation failed" }, { status: 500 });
  }
}
