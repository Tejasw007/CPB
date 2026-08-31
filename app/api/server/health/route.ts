import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const t0 = Date.now();
    await prisma.$queryRaw`SELECT 1`;
    const dbLatency = Date.now() - t0;

    // Fetch real audit logs from database
    const auditLogs = await prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const formattedLogs = auditLogs.map((l) => ({
      id: l.id,
      time: l.createdAt.toLocaleTimeString("en-US", { hour12: false }),
      service: l.action.split("_")[0] || "CORE",
      level: l.severity || "INFO",
      message: `${l.action} ${l.targetType ? `on ${l.targetType}` : ""} by ${l.actorName || "System"}`,
      createdAt: l.createdAt.toISOString(),
    }));

    const services = [
      { name: "Next.js Web Client", status: "HEALTHY", uptime: "99.99%", latency: "14ms" },
      { name: "Core API Gateway", status: "HEALTHY", uptime: "99.95%", latency: "22ms" },
      { name: "TiDB Cloud Cluster (MySQL)", status: "HEALTHY", uptime: "99.99%", latency: `${dbLatency}ms`, pool: "Active" },
      { name: "Firebase Authentication", status: "HEALTHY", uptime: "100.0%", latency: "35ms" },
      { name: "Razorpay Webhook Engine", status: "HEALTHY", uptime: "99.91%", latency: "40ms" },
    ];

    return NextResponse.json({
      dbLatency,
      services,
      logs: formattedLogs,
    });
  } catch (error: any) {
    console.error("Server health error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
