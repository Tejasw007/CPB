import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type === "logs") {
      const logs = await prisma.auditLog.findMany({
        take: 30,
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(logs);
    }

    if (type === "incidents") {
      const incidents = await prisma.incident.findMany({
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(incidents);
    }

    if (type === "deployments") {
      const deployments = await prisma.deployment.findMany({
        orderBy: { deployedAt: "desc" },
      });
      return NextResponse.json(deployments);
    }

    // Default DevOps health stats
    return NextResponse.json({
      environment: "PRODUCTION (AWS ap-south-1 Mumbai)",
      version: "v2.14.0",
      commitHash: "8f92a1c",
      globalUptime: 99.98,
      services: [
        { name: "Next.js Web Client", status: "HEALTHY", uptime: 99.99, latency: "16ms" },
        { name: "Core API Gateway", status: "HEALTHY", uptime: 99.95, latency: "24ms" },
        { name: "TiDB Cloud Cluster (MySQL)", status: "HEALTHY", uptime: 99.99, latency: "8ms", pool: "42/100 connections" },
        { name: "Firebase Authentication", status: "HEALTHY", uptime: 100.0, latency: "38ms" },
        { name: "Razorpay Webhook Engine", status: "HEALTHY", uptime: 99.91, latency: "42ms" },
      ],
      envVariablesSanitized: [
        { key: "DATABASE_URL", maskedValue: "mysql://U8XmddPrYax4YJR.root:••••••••@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/cpb_bank" },
        { key: "NEXT_PUBLIC_FIREBASE_API_KEY", maskedValue: "AIzaSyB0••••••••••••••••••••••••GLwVYr6zBo" },
        { key: "NEXT_PUBLIC_FIREBASE_PROJECT_ID", maskedValue: "lovechat-558e7" },
        { key: "NEXTAUTH_SECRET", maskedValue: "••••••••••••••••••••••••••••••••" },
      ],
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // 1. Safe Read-Only SQL Query Console
    if (action === "execute_query") {
      const { sqlQuery, infraAdminId, infraAdminName } = body;
      if (!sqlQuery || typeof sqlQuery !== "string") {
        return NextResponse.json({ error: "Query cannot be empty" }, { status: 400 });
      }

      const trimmed = sqlQuery.trim();
      const forbiddenKeywords = ["insert", "update", "delete", "drop", "alter", "truncate", "create", "grant", "revoke", "replace", "rename"];
      const lower = trimmed.toLowerCase();

      for (const kw of forbiddenKeywords) {
        // Regex word boundary match
        const regex = new RegExp(`\\b${kw}\\b`, "i");
        if (regex.test(lower)) {
          return NextResponse.json(
            { error: `SECURITY VIOLATION: Write/DDL statement '${kw.toUpperCase()}' is strictly blocked in read-only query console.` },
            { status: 403 }
          );
        }
      }

      if (!lower.startsWith("select") && !lower.startsWith("show") && !lower.startsWith("describe") && !lower.startsWith("explain")) {
        return NextResponse.json({ error: "Only SELECT, SHOW, DESCRIBE, and EXPLAIN queries are permitted." }, { status: 400 });
      }

      const rawResult = await prisma.$queryRawUnsafe(trimmed);

      await logAuditEvent({
        actorId: infraAdminId,
        actorName: infraAdminName || "Infra Admin",
        actorRole: "INFRA_ADMIN",
        action: "READONLY_SQL_EXECUTE",
        targetType: "DATABASE",
        metadata: { query: trimmed },
        severity: "INFO",
      });

      return NextResponse.json({ success: true, rows: rawResult });
    }

    // 2. Rollback Deployment Simulation
    if (action === "rollback") {
      const { targetVersion, reason, infraAdminId, infraAdminName } = body;

      const newDeployment = await prisma.deployment.create({
        data: {
          version: targetVersion || "v2.13.8",
          commitHash: "5b10c9e",
          environment: "PRODUCTION",
          deployedBy: infraAdminName || "Karan Verma",
          status: "SUCCESS",
          rollbackNotes: `Automated Rollback to ${targetVersion} — Reason: ${reason}`,
        },
      });

      await logAuditEvent({
        actorId: infraAdminId,
        actorName: infraAdminName,
        actorRole: "INFRA_ADMIN",
        action: "DEPLOYMENT_ROLLBACK",
        targetType: "SYSTEM_DEPLOYMENT",
        targetId: newDeployment.id,
        metadata: { targetVersion, reason },
        severity: "CRITICAL",
      });

      return NextResponse.json({ success: true, deployment: newDeployment });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Query failed" }, { status: 500 });
  }
}
