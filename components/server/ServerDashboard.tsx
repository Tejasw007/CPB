"use client";

import React, { useState, useEffect } from "react";
import { useBank } from "@/components/providers/BankContext";
import {
  Terminal,
  Activity,
  RotateCcw,
  ShieldCheck,
  AlertOctagon,
  CheckCircle2,
  Play,
  Lock,
} from "lucide-react";

export function ServerDashboard() {
  const { currentUser } = useBank();

  // SQL Query Console State
  const [sqlQuery, setSqlQuery] = useState("SELECT id, accountNumber, type, balance, status FROM Account LIMIT 5;");
  const [queryResult, setQueryResult] = useState<any[] | null>(null);
  const [queryError, setQueryError] = useState("");
  const [isExecutingQuery, setIsExecutingQuery] = useState(false);

  // Rollback Modal State
  const [showRollbackModal, setShowRollbackModal] = useState(false);
  const [rollbackReason, setRollbackReason] = useState("");
  const [rollbackSuccess, setRollbackSuccess] = useState(false);

  // Live Services & Logs from Database
  const [services, setServices] = useState([
    { name: "Next.js Web Client", status: "HEALTHY", uptime: "99.99%", latency: "14ms" },
    { name: "Core API Gateway", status: "HEALTHY", uptime: "99.95%", latency: "22ms" },
    { name: "TiDB Cloud Cluster (MySQL)", status: "HEALTHY", uptime: "99.99%", latency: "8ms", pool: "Active" },
    { name: "Firebase Authentication", status: "HEALTHY", uptime: "100.0%", latency: "35ms" },
    { name: "Razorpay Webhook Engine", status: "HEALTHY", uptime: "99.91%", latency: "40ms" },
  ]);

  const [logs, setLogs] = useState<any[]>([]);

  const loadServerHealth = async () => {
    try {
      const res = await fetch("/api/server/health");
      if (res.ok) {
        const data = await res.json();
        setServices(data.services || []);
        setLogs(data.logs || []);
      }
    } catch (e) {
      console.error("Error loading server health:", e);
    }
  };

  useEffect(() => {
    loadServerHealth();
  }, []);

  const envVars = [
    { key: "DATABASE_URL", val: "mysql://U8XmddPrYax4YJR.root:••••••••@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/cpb_bank" },
    { key: "NEXT_PUBLIC_FIREBASE_API_KEY", val: "AIzaSyB0••••••••••••••••••••••••GLwVYr6zBo" },
    { key: "NEXT_PUBLIC_FIREBASE_PROJECT_ID", val: "lovechat-558e7" },
    { key: "NEXTAUTH_SECRET", val: "••••••••••••••••••••••••••••••••" },
  ];

  const handleExecuteSql = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsExecutingQuery(true);
    setQueryError("");
    setQueryResult(null);

    try {
      const res = await fetch("/api/server", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "execute_query",
          sqlQuery,
          infraAdminId: currentUser.id,
          infraAdminName: currentUser.name,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setQueryResult(data.rows);
      } else {
        setQueryError(data.error || "Query execution failed");
      }
    } catch (err: any) {
      setQueryError(err.message || "Network error");
    } finally {
      setIsExecutingQuery(false);
    }
  };

  const handleConfirmRollback = async () => {
    if (!rollbackReason.trim()) {
      alert("Please specify rollback reason");
      return;
    }
    const res = await fetch("/api/server", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "rollback",
        targetVersion: "v2.13.8",
        reason: rollbackReason,
        infraAdminId: currentUser.id,
        infraAdminName: currentUser.name,
      }),
    });
    if (res.ok) {
      setShowRollbackModal(false);
      setRollbackSuccess(true);
      await loadServerHealth();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold">
              DevOps Command Center
            </span>
            <span className="text-xs text-slate-500 font-mono">• Production (AWS ap-south-1)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Infrastructure & SRE Portal</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Lead SRE: <span className="text-slate-900 font-semibold">{currentUser.name}</span> • Version:{" "}
            <span className="text-emerald-700 font-mono font-bold">v2.14.0 (SHA #8f92a1c)</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRollbackModal(true)}
            className="px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> 1-Click Rollback
          </button>
        </div>
      </div>

      {rollbackSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2 animate-in fade-in font-semibold">
          <CheckCircle2 className="w-4 h-4" /> Rollback to v2.13.8 completed and logged in immutable audit records.
        </div>
      )}

      {/* Service Health Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {services.map((svc) => (
          <div key={svc.name} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono text-emerald-700 font-bold">{svc.uptime}</span>
            </div>
            <p className="text-xs font-bold text-slate-900 line-clamp-1">{svc.name}</p>
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>Latency</span>
              <span className="text-blue-600 font-bold">{svc.latency}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Read-Only SQL Query Console */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-900">Safe Read-Only SQL Console</h2>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> WRITE/DDL BLOCKED
          </span>
        </div>

        <form onSubmit={handleExecuteSql} className="space-y-3">
          <textarea
            rows={3}
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
            className="w-full p-3.5 bg-slate-900 font-mono text-xs text-emerald-400 border border-slate-700 rounded-2xl focus:border-blue-600 focus:outline-none"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Permitted: <code className="text-slate-900 font-bold">SELECT, SHOW, DESCRIBE</code>
            </span>
            <button
              type="submit"
              disabled={isExecutingQuery}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5" /> Execute Query
            </button>
          </div>
        </form>

        {queryError && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono">
            {queryError}
          </div>
        )}

        {queryResult && (
          <div className="p-4 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 overflow-x-auto max-h-64 font-mono text-[11px]">
            <pre>{JSON.stringify(queryResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Centralized Logs from Database & Sanitized Environment Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Log Stream */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">Centralized Audit & Ledger Logs</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-bold">LIVE DATABASE</span>
          </div>

          <div className="space-y-2 font-mono text-[11px] max-h-72 overflow-y-auto">
            {logs.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-6">Connecting to live database stream...</p>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">{log.time} • <span className="text-blue-600 font-bold">{log.service}</span></span>
                    <span className={`px-1.5 py-0.2 rounded font-bold ${
                      log.level === "WARN" ? "bg-amber-50 text-amber-700 border border-amber-200" : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    }`}>
                      {log.level}
                    </span>
                  </div>
                  <p className="text-slate-800 font-sans text-xs">{log.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sanitized Environment Variables */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-600" />
              <h2 className="text-sm font-bold text-slate-900">Sanitized Environment Config</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-bold">SECRETS MASKED</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {envVars.map((env) => (
              <div key={env.key} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[11px] text-purple-700 font-bold block mb-1">{env.key}</span>
                <span className="text-[10px] text-slate-500 truncate block">{env.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rollback Confirmation Modal */}
      {showRollbackModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 border border-red-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
              <AlertOctagon className="w-5 h-5" /> Confirm Production Rollback
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              You are about to roll back the production release from <span className="font-mono text-slate-900 font-bold">v2.14.0</span> to{" "}
              <span className="font-mono text-emerald-700 font-bold">v2.13.8</span>.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Rollback</label>
              <input
                type="text"
                placeholder="e.g. Gateway latency spike mitigation"
                value={rollbackReason}
                onChange={(e) => setRollbackReason(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bank-input text-xs text-slate-900"
                required
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowRollbackModal(false)}
                className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRollback}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md"
              >
                Confirm Rollback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
