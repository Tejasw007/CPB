import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { LoanType, LoanStatus, Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userEmail, type, principal, tenureMonths, purpose } = body;

    if (!userEmail || !principal || !tenureMonths) {
      return NextResponse.json({ error: "Missing required loan fields." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Standard interest rates based on type
    const rates: Record<string, number> = {
      PERSONAL: 11.5,
      HOME: 8.4,
      AUTO: 9.25,
      EDUCATION: 8.75,
    };

    const interestRate = rates[type] || 10.5;
    const monthlyRate = interestRate / (12 * 100);
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);

    const loan = await prisma.loan.create({
      data: {
        userId: user.id,
        type: type as LoanType,
        principal: new Prisma.Decimal(principal),
        interestRate,
        tenureMonths,
        emiAmount: new Prisma.Decimal(emi.toFixed(2)),
        status: LoanStatus.PENDING,
        creditScore: 780,
        purpose: purpose || "General Purpose",
      },
    });

    return NextResponse.json({ success: true, loan });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Loan application error" }, { status: 500 });
  }
}
