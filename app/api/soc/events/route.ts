import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const SOC_API_KEY = "cpb_live_sk_sih2026_soc_detect_all";

export async function GET(request: NextRequest) {
  try {
    // 1. Verify Authorization
    const authHeader = request.headers.get("authorization") || request.headers.get("x-api-key");
    if (authHeader !== `Bearer ${SOC_API_KEY}` && authHeader !== SOC_API_KEY) {
      return NextResponse.json({ error: "Unauthorized access. Invalid API Key." }, { status: 401 });
    }

    // 2. Support fetching only new events using a 'since' timestamp
    const { searchParams } = new URL(request.url);
    const since = searchParams.get("since");

    let whereClause = {};
    if (since) {
      whereClause = {
        timestamp: {
          gt: new Date(since)
        }
      };
    }

    // 3. Fetch Blockchain Events
    const events = await prisma.blockchainEvent.findMany({
      where: whereClause,
      orderBy: { timestamp: "desc" },
      take: 100 // Limit to latest 100 events per request
    });

    // 4. Format them for the SOC
    const formattedEvents = events.map(event => ({
      event_id: event.currentHash,
      soc_id: "SOC-BANK-01",
      timestamp: event.timestamp.toISOString(),
      event_type: "BLOCKCHAIN_EVENT",
      source: "CoreBankingLedger",
      severity: ["CARD_STATUS_TOGGLE", "SERVICE_CHARGE_EXECUTION"].includes(event.eventType) ? "HIGH" : "INFO",
      description: `Blockchain ledger entry: ${event.eventType}`,
      metadata: {
        action: event.eventType,
        block_hash: event.currentHash,
        previous_hash: event.previousHash,
        payload: event.payload
      }
    }));

    return NextResponse.json({ success: true, count: formattedEvents.length, events: formattedEvents });
  } catch (error: any) {
    console.error("SOC Stream API error:", error);
    return NextResponse.json({ error: "Failed to fetch SOC stream" }, { status: 500 });
  }
}
