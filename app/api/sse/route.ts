import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const accountId = req.nextUrl.searchParams.get("accountId");
  
  if (!accountId) {
    return NextResponse.json({ error: "Missing accountId" }, { status: 400 });
  }

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  
  let lastTxId = req.nextUrl.searchParams.get("lastTxId") || null;
  let isClosed = false;

  req.signal.addEventListener("abort", () => {
    isClosed = true;
  });

  const encoder = new TextEncoder();
  const sendEvent = async (data: any) => {
    if (!isClosed) {
      await writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
    }
  };

  // Initially send a ping to establish connection
  await sendEvent({ type: "ping" });

  const interval = setInterval(async () => {
    if (isClosed) {
      clearInterval(interval);
      return;
    }

    try {
      // Find new transactions for this account since lastTxId
      // Because we don't know the lastTxId timestamp easily if null, 
      // we just look for transactions created in the last 3 seconds if lastTxId is null.
      const queryParams: any = {
        where: { accountId },
        orderBy: { createdAt: 'asc' },
      };

      if (lastTxId) {
        queryParams.where.id = { gt: lastTxId };
      } else {
        // Fallback: only fetch transactions from the last 3 seconds
        const threeSecondsAgo = new Date(Date.now() - 3000);
        queryParams.where.createdAt = { gt: threeSecondsAgo };
      }

      const newTxns = await prisma.transaction.findMany(queryParams);

      if (newTxns.length > 0) {
        lastTxId = newTxns[newTxns.length - 1].id;
        await sendEvent({ type: "new_transactions", transactions: newTxns });
      } else {
        // Heartbeat to keep connection alive
        await sendEvent({ type: "heartbeat" });
      }
    } catch (e) {
      console.error("SSE Polling Error", e);
    }
  }, 2000); // Poll every 2 seconds

  // Clean up interval if connection closes
  req.signal.addEventListener("abort", () => {
    clearInterval(interval);
  });

  return new NextResponse(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
