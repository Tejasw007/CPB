import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view");

    if (view === "audit-logs") {
      const logs = await prisma.auditLog.findMany({
        take: 50,
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(logs);
    }

    if (view === "settings") {
      const settings = await prisma.systemSetting.findMany();
      return NextResponse.json(settings);
    }

    // Default admin overview
    const totalDeposits = await prisma.account.aggregate({ _sum: { balance: true } });
    const totalLoans = await prisma.loan.aggregate({ _sum: { principal: true }, where: { status: "DISBURSED" } });
    const totalUsers = await prisma.user.count({ where: { role: "CUSTOMER" } });
    const staffMembers = await prisma.staffMember.findMany({ include: { user: true, branch: true } });
    const branches = await prisma.branch.findMany({ include: { staff: true } });
    const settings = await prisma.systemSetting.findMany();

    return NextResponse.json({
      kpis: {
        totalDeposits: Number(totalDeposits._sum.balance || 0),
        totalLoans: Number(totalLoans._sum.principal || 0),
        totalUsers,
        totalBranches: branches.length,
        systemHealth: "ALL_28_SYSTEMS_OPERATIONAL",
        defconLevel: "DEFCON_4_NORMAL",
        globalDailyVolume: 842600000,
      },
      staffMembers,
      branches,
      settings,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "update_setting") {
      const { key, value, adminId, adminName } = body;
      const updated = await prisma.systemSetting.upsert({
        where: { key },
        update: { value: String(value), updatedBy: adminId },
        create: { key, value: String(value), category: "CONFIG", updatedBy: adminId },
      });

      await logAuditEvent({
        actorId: adminId,
        actorName: adminName || "Admin",
        actorRole: "ADMIN",
        action: "UPDATE_SYSTEM_PARAMETER",
        targetType: "SYSTEM_SETTING",
        targetId: key,
        metadata: { key, newValue: value },
        severity: "WARN",
      });

      return NextResponse.json({ success: true, setting: updated });
    }

    if (action === "toggle_account_status") {
      const { accountId, status, adminId, adminName } = body;
      const updated = await prisma.account.update({
        where: { id: accountId },
        data: { status },
      });

      await logAuditEvent({
        actorId: adminId,
        actorName: adminName,
        actorRole: "ADMIN",
        action: `ACCOUNT_${status}`,
        targetType: "ACCOUNT",
        targetId: accountId,
        severity: "WARN",
      });

      return NextResponse.json({ success: true, account: updated });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
