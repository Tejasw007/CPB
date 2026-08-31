import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  // Get the most recent transaction to establish a baseline
  const initialLastTx = await prisma.transaction.findFirst({
    where: { account: { userId } },
    orderBy: { createdAt: 'desc' }
  });
  
  let lastCheckedTime = initialLastTx ? initialLastTx.createdAt : new Date(Date.now() - 60000);

  const stream = new ReadableStream({
    async start(controller) {
      // Send an initial connected message to keep the stream alive
      controller.enqueue(`data: ${JSON.stringify({ type: "CONNECTED" })}\n\n`);

      const interval = setInterval(async () => {
        try {
          // Poll for new transactions since last check
          const newTxns = await prisma.transaction.findMany({
            where: {
              account: { userId },
              createdAt: { gt: lastCheckedTime },
            },
            orderBy: { createdAt: 'asc' }
          });

          if (newTxns.length > 0) {
            lastCheckedTime = newTxns[newTxns.length - 1].createdAt;
            controller.enqueue(`data: ${JSON.stringify({ type: "NEW_TRANSACTIONS", txns: newTxns })}\n\n`);
          } else {
            // Send heartbeat to prevent timeout
            controller.enqueue(`:\n\n`);
          }
        } catch (error) {
          console.error("SSE Polling error:", error);
        }
      }, 2000);

      // Clean up when client disconnects
      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}
