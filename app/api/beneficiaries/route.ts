import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { appendBlockchainEvent } from "@/lib/blockchain";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, accountNumber, bankName, ifsc, nickname, userEmail } = body;

    if (!name || !accountNumber || !ifsc || !userEmail) {
      return NextResponse.json({ error: "Name, account number, IFSC, and user email are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Set 30-min security cooling period
    const coolingPeriodEndsAt = new Date(Date.now() + 30 * 60 * 1000);

    const beneficiary = await prisma.beneficiary.create({
      data: {
        userId: user.id,
        name,
        accountNumber,
        bankName: bankName || "Code Paglu Bank",
        ifsc,
        nickname: nickname || null,
        verified: true,
        coolingPeriodEndsAt,
        dailyLimit: 25000.0, // Reduced limit during first 24h
      },
    });

    await appendBlockchainEvent("BENEFICIARY_ADDED", {
      userId: user.id,
      userEmail,
      beneficiaryName: name,
      beneficiaryAccount: accountNumber,
      bankName: bankName || "Code Paglu Bank",
      timestamp: new Date()
    });

    return NextResponse.json({ success: true, beneficiary });
  } catch (error: any) {
    console.error("Add beneficiary error:", error);
    return NextResponse.json({ error: error.message || "Failed to add beneficiary" }, { status: 500 });
  }
}
