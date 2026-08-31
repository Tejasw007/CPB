import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { TicketCategory, TicketPriority, TicketStatus } from "@prisma/client";
import { appendBlockchainEvent } from "@/lib/blockchain";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, ticketId, subject, category, priority, message, senderId, senderName, senderRole } = body;

    if (action === "create_ticket") {
      const ticketNumber = `CPB-TCK-${Math.floor(1000 + Math.random() * 9000)}`;

      const newTicket = await prisma.supportTicket.create({
        data: {
          ticketNumber,
          userId,
          subject,
          category: category as TicketCategory || TicketCategory.GENERAL,
          priority: priority as TicketPriority || TicketPriority.MEDIUM,
          status: TicketStatus.OPEN,
          messages: {
            create: {
              senderId,
              senderRole: senderRole || "CUSTOMER",
              senderName: senderName || "Customer",
              message,
            },
          },
        },
        include: {
          messages: true,
        },
      });

      await appendBlockchainEvent("SUPPORT_TICKET_CREATED", {
        ticketNumber,
        userId,
        subject,
        category: category || "GENERAL",
        priority: priority || "MEDIUM",
        timestamp: new Date()
      });

      return NextResponse.json({ success: true, ticket: newTicket });
    } else if (action === "add_message") {
      const newMsg = await prisma.ticketMessage.create({
        data: {
          ticketId,
          senderId,
          senderRole: senderRole || "CUSTOMER",
          senderName: senderName || "Customer",
          message,
        },
      });

      return NextResponse.json({ success: true, message: newMsg });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Ticket API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
