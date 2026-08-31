import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit";
import { appendBlockchainEvent } from "@/lib/blockchain";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { credentialId, email } = body;

    let user;

    if (credentialId) {
      const bioCred = await prisma.biometricCredential.findUnique({
        where: { credentialId },
        include: { user: true },
      });
      if (bioCred) {
        user = bioCred.user;
      }
    } else if (email) {
      // Demo fallback: if no credentialId is provided (simulated scanner), log into the provided email directly
      user = await prisma.user.findUnique({
        where: { email },
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: "Biometric sensor match not found on record. Please log in with password." },
        { status: 404 }
      );
    }

    await logAuditEvent({
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role,
      action: "BIOMETRIC_FINGERPRINT_LOGIN_SUCCESS",
      targetType: "AUTH_SESSION",
      severity: "INFO",
    });

    const session = await prisma.sessionDevice.create({
      data: {
        userId: user.id,
        deviceInfo: request.headers.get("user-agent") || "Unknown Device",
        ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
        loginAt: new Date(),
      }
    });

    await appendBlockchainEvent("LOGIN", {
      userId: user.id,
      email: user.email,
      sessionId: session.id,
      method: "BIOMETRIC",
      ip: session.ipAddress,
      device: session.deviceInfo,
      action: "User logged into the platform via Fingerprint"
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl,
        kycStatus: user.kycStatus,
        status: user.status,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Biometric login failed." }, { status: 500 });
  }
}
