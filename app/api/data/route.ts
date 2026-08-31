import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userEmail = searchParams.get("userId") || "rajesh.sharma@example.com";

    // 1. Fetch user by email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: {
        accounts: {
          include: {
            cards: true,
            fixedDeposits: true,
          },
        },
        beneficiaries: true,
        loans: true,
        tickets: {
          include: {
            messages: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 2. Fetch all transactions across user's accounts
    const accountIds = user.accounts.map((a) => a.id);
    const transactions = await prisma.transaction.findMany({
      where: { accountId: { in: accountIds } },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: { account: true },
    });

    const formattedTxns = transactions.map((t) => ({
      id: t.id,
      accountId: t.accountId,
      accountNumber: t.account.accountNumber,
      type: t.type,
      amount: Number(t.amount),
      balanceAfter: Number(t.balanceAfter),
      description: t.description,
      category: t.category,
      referenceId: t.referenceId,
      counterpartyAccount: t.counterpartyAccount || undefined,
      counterpartyName: t.counterpartyName || undefined,
      counterpartyBank: t.counterpartyBank || undefined,
      transferMode: t.transferMode || undefined,
      status: t.status,
      createdAt: t.createdAt.toISOString(),
    }));

    const formattedAccounts = user.accounts.map((a) => ({
      id: a.id,
      userId: a.userId,
      accountNumber: a.accountNumber,
      branchCode: a.branchCode,
      ifsc: a.ifsc,
      type: a.type,
      balance: Number(a.balance),
      currency: a.currency,
      status: a.status,
      tier: a.tier,
      openedAt: a.openedAt.toISOString(),
    }));

    const formattedCards = user.accounts.flatMap((a) =>
      a.cards.map((c) => ({
        id: c.id,
        userId: c.userId,
        accountId: c.accountId,
        cardNumber: c.cardNumber,
        cardHolderName: c.cardHolderName,
        type: c.type,
        expiryMonth: c.expiryMonth,
        expiryYear: c.expiryYear,
        cvv: c.cvv,
        status: c.status,
        atmLimit: Number(c.atmLimit),
        onlineLimit: Number(c.onlineLimit),
        intlEnabled: c.intlEnabled,
        contactlessEnabled: c.contactlessEnabled,
      }))
    );

    const formattedBeneficiaries = user.beneficiaries.map((b) => ({
      id: b.id,
      userId: b.userId,
      name: b.name,
      accountNumber: b.accountNumber,
      bankName: b.bankName,
      ifsc: b.ifsc,
      nickname: b.nickname || undefined,
      verified: b.verified,
      coolingPeriodEndsAt: b.coolingPeriodEndsAt?.toISOString(),
      dailyLimit: Number(b.dailyLimit),
      createdAt: b.createdAt.toISOString(),
    }));

    const formattedLoans = user.loans.map((l) => ({
      id: l.id,
      userId: l.userId,
      type: l.type,
      principal: Number(l.principal),
      interestRate: l.interestRate,
      tenureMonths: l.tenureMonths,
      emiAmount: Number(l.emiAmount),
      status: l.status,
      creditScore: l.creditScore,
      purpose: l.purpose || undefined,
      disbursedAt: l.disbursedAt?.toISOString(),
      notes: l.notes || undefined,
      createdAt: l.createdAt.toISOString(),
    }));

    const formattedFDs = user.accounts.flatMap((a) =>
      a.fixedDeposits.map((fd) => ({
        id: fd.id,
        accountId: fd.accountId,
        userId: fd.userId,
        principal: Number(fd.principal),
        rate: fd.rate,
        tenureMonths: fd.tenureMonths,
        maturityAmount: Number(fd.maturityAmount),
        startDate: fd.startDate.toISOString(),
        maturityDate: fd.maturityDate.toISOString(),
        status: fd.status,
      }))
    );

    const formattedTickets = user.tickets.map((t) => ({
      id: t.id,
      ticketNumber: t.ticketNumber,
      userId: t.userId,
      userName: user.name,
      subject: t.subject,
      category: t.category,
      status: t.status,
      priority: t.priority,
      assignedStaffId: t.assignedStaffId || undefined,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
      messages: t.messages.map((m) => ({
        id: m.id,
        senderId: m.senderId,
        senderRole: m.senderRole,
        senderName: m.senderName,
        message: m.message,
        createdAt: m.createdAt.toISOString(),
      })),
    }));

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        kycStatus: user.kycStatus,
        status: user.status,
        avatarUrl: user.avatarUrl,
        panNumber: user.panNumber,
        aadhaarNumber: user.aadhaarNumber,
        address: user.address,
        twoFactorEnabled: user.twoFactorEnabled,
      },
      accounts: formattedAccounts,
      transactions: formattedTxns,
      beneficiaries: formattedBeneficiaries,
      cards: formattedCards,
      loans: formattedLoans,
      fixedDeposits: formattedFDs,
      tickets: formattedTickets,
    });
  } catch (error: any) {
    console.error("API /api/data error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch bank data" }, { status: 500 });
  }
}
