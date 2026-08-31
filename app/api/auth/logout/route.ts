import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { appendBlockchainEvent } from "@/lib/blockchain";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, userId } = body;

    if (!sessionId) {
      return NextResponse.json({ success: true }); // Graceful exit if no session provided
    }

    const session = await prisma.sessionDevice.findUnique({
      where: { id: sessionId },
    });

    if (session) {
      const logoutAt = new Date();
      await prisma.sessionDevice.update({
        where: { id: sessionId },
        data: { logoutAt },
      });

      const durationMs = logoutAt.getTime() - session.loginAt.getTime();
      const durationMinutes = Math.round(durationMs / 60000);

      await appendBlockchainEvent("LOGOUT", {
        userId: session.userId,
        sessionId: session.id,
        durationMinutes,
        ip: session.ipAddress,
        device: session.deviceInfo,
        action: "User logged out of the platform"
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Logout failed." }, { status: 500 });
  }
}
