import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Internal accounts are owned by the system user
    const accounts = await prisma.account.findMany({
      where: {
        user: {
          email: "revenue@cpb.bank",
        },
      },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    return NextResponse.json({ success: true, accounts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
