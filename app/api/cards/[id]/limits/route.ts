import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cardId = params.id;
    const body = await request.json();
    const { atmLimit, onlineLimit, intlEnabled } = body;

    const updated = await prisma.card.update({
      where: { id: cardId },
      data: {
        atmLimit: atmLimit !== undefined ? new Prisma.Decimal(atmLimit) : undefined,
        onlineLimit: onlineLimit !== undefined ? new Prisma.Decimal(onlineLimit) : undefined,
        intlEnabled: intlEnabled !== undefined ? Boolean(intlEnabled) : undefined,
      },
    });

    return NextResponse.json({ success: true, card: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Limits update error" }, { status: 500 });
  }
}
