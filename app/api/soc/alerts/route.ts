import { NextRequest, NextResponse } from "next/server";
import { appendBlockchainEvent } from "@/lib/blockchain";

export const dynamic = "force-dynamic";

const SOC_INTERNAL_KEY = "cpb_internal_waf_webhook_9921";

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("x-waf-key");
    if (authHeader !== SOC_INTERNAL_KEY) {
      return NextResponse.json({ error: "Unauthorized WAF access." }, { status: 401 });
    }

    const body = await request.json();
    const { ip, payload, url, attackType, userAgent } = body;

    // Append a SECURITY_ALERT to the blockchain ledger
    await appendBlockchainEvent("SECURITY_ALERT", {
      ip,
      targetUrl: url,
      attackType,
      suspiciousPayload: payload,
      userAgent,
      action: "WAF Intercepted Malicious Request",
      timestamp: new Date()
    });

    return NextResponse.json({ success: true, message: "Security alert logged to blockchain." });
  } catch (error: any) {
    console.error("WAF logging error:", error);
    return NextResponse.json({ error: "Failed to log WAF alert." }, { status: 500 });
  }
}
