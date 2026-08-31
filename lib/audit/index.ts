import { prisma } from "@/lib/db";

export interface LogAuditParams {
  actorId?: string;
  actorName?: string;
  actorRole?: string;
  action: string;
  targetType?: string;
  targetId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any> | string;
  severity?: "INFO" | "WARN" | "CRITICAL";
}

export async function logAuditEvent(params: LogAuditParams) {
  try {
    const metaString = typeof params.metadata === "object" 
      ? JSON.stringify(params.metadata) 
      : params.metadata;

    return await prisma.auditLog.create({
      data: {
        actorId: params.actorId || null,
        actorName: params.actorName || "SYSTEM",
        actorRole: params.actorRole || "SYSTEM",
        action: params.action,
        targetType: params.targetType || null,
        targetId: params.targetId || null,
        ipAddress: params.ipAddress || "127.0.0.1",
        userAgent: params.userAgent || "CPB-Core-App",
        metadata: metaString || null,
        severity: params.severity || "INFO",
      },
    });
  } catch (error) {
    console.error("Failed to write audit log:", error);
    return null;
  }
}
