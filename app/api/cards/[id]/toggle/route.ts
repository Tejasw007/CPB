import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { CardStatus } from "@prisma/client";
import { appendBlockchainEvent } from "@/lib/blockchain";

export const dynamic = "force-dynamic";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cardId = params.id;
    const card = await prisma.card.findUnique({ where: { id: cardId } });

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    const newStatus = card.status === CardStatus.ACTIVE ? CardStatus.BLOCKED : CardStatus.ACTIVE;

    const updated = await prisma.card.update({
      where: { id: cardId },
      data: { status: newStatus },
    });

    await appendBlockchainEvent("CARD_STATUS_TOGGLE", {
      cardId,
      newStatus,
      userId: updated.userId,
      timestamp: new Date()
    });

    return NextResponse.json({ success: true, status: updated.status });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Card update error" }, { status: 500 });
  }
}
