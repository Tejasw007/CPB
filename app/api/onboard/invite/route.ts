import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      branchCode,
      accountType,
      initialDeposit,
      staffId,
      staffName,
    } = body;

    if (!customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: "Customer Name, Email, and Phone are required." },
        { status: 400 }
      );
    }

    // Generate secure random token
    const token = crypto.randomBytes(16).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const invitation = await prisma.onboardingInvitation.create({
      data: {
        token,
        customerName,
        customerEmail,
        customerPhone,
        branchCode: branchCode || "CPB001",
        accountType: accountType || "SAVINGS",
        initialDeposit: initialDeposit || 5000.0,
        createdByStaffId: staffId || null,
        createdByStaffName: staffName || "Staff Officer",
        expiresAt,
      },
    });

    const origin = request.nextUrl.origin || "http://localhost:3001";
    const onboardingUrl = `${origin}/onboard/${token}`;

    await logAuditEvent({
      actorId: staffId,
      actorName: staffName || "Staff Officer",
      actorRole: "STAFF",
      action: "GENERATE_ONBOARDING_INVITATION",
      targetType: "ONBOARDING_INVITATION",
      targetId: invitation.id,
      metadata: { customerName, customerEmail, token },
      severity: "INFO",
    });

    return NextResponse.json({
      success: true,
      invitation,
      onboardingUrl,
    });
  } catch (error: any) {
    console.error("Onboarding invite error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate onboarding invite." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const invitations = await prisma.onboardingInvitation.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(invitations);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
