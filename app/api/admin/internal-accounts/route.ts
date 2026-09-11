import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // 1. Fetch internal system accounts (e.g. Bank Revenue)
    const internalAccounts = await prisma.account.findMany({
      where: {
        OR: [
          { user: { email: "revenue@cpb.bank" } },
          { user: { role: "ADMIN" } },
        ],
      },
      include: {
        user: {
          select: { name: true, email: true, role: true },
        },
      },
      orderBy: { accountNumber: "asc" },
    });

    // 2. Fetch all active customer accounts present in the bank
    const customerAccounts = await prisma.account.findMany({
      where: {
        status: "ACTIVE",
        user: {
          role: "CUSTOMER",
        },
      },
      include: {
        user: {
          select: { name: true, email: true, role: true },
        },
      },
      orderBy: { accountNumber: "asc" },
      take: 50,
    });

    const formattedInternal = internalAccounts.map((acc) => ({
      ...acc,
      isInternal: true,
      category: "INTERNAL" as const,
    }));

    const formattedCustomer = customerAccounts.map((acc) => ({
      ...acc,
      isInternal: false,
      category: "CUSTOMER" as const,
    }));

    return NextResponse.json({
      success: true,
      accounts: [...formattedInternal, ...formattedCustomer],
      internalAccounts: formattedInternal,
      customerAccounts: formattedCustomer,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
