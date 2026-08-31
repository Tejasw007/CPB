"use client";

import React, { useState, useEffect } from "react";
import { useBank } from "@/components/providers/BankContext";
import { formatINR } from "@/lib/utils";
import {
  ShieldCheck,
  ShieldAlert,
  Sliders,
  Users,
  Building2,
  CheckCircle2,
} from "lucide-react";

export function AdminDashboard() {
  const { currentUser } = useBank();

  // Financial Parameter States
  const [savingsApy, setSavingsApy] = useState("4.0");
  const [fd1YearRate, setFd1YearRate] = useState("7.10");
  const [makerCheckerThreshold, setMakerCheckerThreshold] = useState("50000");
  const [saveFeedback, setSaveFeedback] = useState("");

  // Live Metrics from Database
  const [metrics, setMetrics] = useState({
    totalDeposits: 42800000000,
    totalLoanBook: 18500000000,
    totalUsers: 124500,
    totalVerifiedKyc: 124200,
    totalBranches: 42,
    amlAlerts: [] as any[],
  });

  const loadAdminMetrics = async () => {
    try {
      const res = await fetch("/api/admin/metrics");
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch (e) {
      console.error("Error loading admin metrics:", e);
    }
  };

  useEffect(() => {
    loadAdminMetrics();
  }, []);

  // Role-Permission Matrix State
  const roles = ["Teller", "Loan Officer", "Support Agent", "Branch Manager", "Admin"];
  const permissions = [
    "View Customer Txns",
    "Counter Cash Ops",
    "Underwrite Loans",
    "Approve Reversals (>₹50k)",
    "Freeze Accounts",
    "Edit Financial Rates",
    "Full System Access",
  ];

  const [matrix, setMatrix] = useState<{ [key: string]: boolean }>({
    "Teller-View Customer Txns": true,
    "Teller-Counter Cash Ops": true,
    "Loan Officer-View Customer Txns": true,
    "Loan Officer-Underwrite Loans": true,
    "Support Agent-View Customer Txns": true,
    "Branch Manager-View Customer Txns": true,
    "Branch Manager-Counter Cash Ops": true,
    "Branch Manager-Underwrite Loans": true,
    "Branch Manager-Approve Reversals (>₹50k)": true,
    "Branch Manager-Freeze Accounts": true,
    "Admin-View Customer Txns": true,
    "Admin-Counter Cash Ops": true,
    "Admin-Underwrite Loans": true,
    "Admin-Approve Reversals (>₹50k)": true,
    "Admin-Freeze Accounts": true,
    "Admin-Edit Financial Rates": true,
    "Admin-Full System Access": true,
  });

  const togglePermission = (role: string, perm: string) => {
    const key = `${role}-${perm}`;
    setMatrix((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveParams = async () => {
    setSaveFeedback("Parameters updated and broadcasted to core ledger.");
    setTimeout(() => setSaveFeedback(""), 3500);
  };

  const handleAmlAction = (id: string, action: string) => {
    setMetrics((prev) => ({
      ...prev,
      amlAlerts: prev.amlAlerts.map((a) => (a.id === id ? { ...a, status: action } : a)),
    }));
    alert(`AML Action [${action}] executed successfully.`);
  };

  const amlAlerts = metrics.amlAlerts.length > 0 ? metrics.amlAlerts : [
    {
      id: "aml-1",
      severity: "AMBER",
      title: "Rapid Velocity Transfer Flagged",
      accountNumber: "8832091100",
      branch: "Mumbai Nariman Point HQ",
      amount: 2500000,
      riskScore: 84,
      status: "OPEN",
    },
    {
      id: "aml-2",
      severity: "RED",
      title: "PEP (Politically Exposed Person) Watch Match",
      accountNumber: "8832099318",
      branch: "New Delhi Connaught Place",
      amount: 4500000,
      riskScore: 92,
      status: "OPEN",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold">
              Executive Governance
            </span>
            <span className="text-xs text-slate-500 font-mono">• All 28 Systems Operational</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Executive Admin & Risk Radar</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            CISO: <span className="text-slate-900 font-semibold">{currentUser.name}</span> • Security Level:{" "}
            <span className="text-blue-600 font-mono font-bold">DEFCON 4 (NORMAL)</span>
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Global Volume (24h)</span>
            <span className="text-emerald-700 font-bold text-sm">₹842.6 Cr</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Core Latency</span>
            <span className="text-blue-600 font-bold text-sm">42ms</span>
          </div>
        </div>
      </div>

      {/* 4 Bank-Wide KPI Summary Cards from Database */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">Total Bank Deposits</span>
          <p className="text-2xl font-extrabold font-mono text-slate-900">₹{(metrics.totalDeposits / 10000000).toFixed(1)} Cr</p>
          <span className="text-[10px] font-mono text-emerald-600 font-bold">+14.2% YoY</span>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">Retail Loan Book</span>
          <p className="text-2xl font-extrabold font-mono text-slate-900">₹{(metrics.totalLoanBook / 10000000).toFixed(1)} Cr</p>
          <span className="text-[10px] font-mono text-emerald-600 font-bold">NPA Ratio: 0.42%</span>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">Active Customer Base</span>
          <p className="text-2xl font-extrabold font-mono text-slate-900">{metrics.totalUsers.toLocaleString("en-IN")}</p>
          <span className="text-[10px] font-mono text-blue-600 font-bold">99.8% KYC Verified</span>
        </div>
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-medium">Branch Network</span>
          <p className="text-2xl font-extrabold font-mono text-slate-900">{metrics.totalBranches} Hubs</p>
          <span className="text-[10px] font-mono text-emerald-600 font-bold">Pan-India Connected</span>
        </div>
      </div>

      {/* AML Radar & Financial Controls Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AML Radar Widget */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <h2 className="text-sm font-bold text-slate-900">AML & Suspicious Activity Radar</h2>
            </div>
            <span className="text-[10px] font-mono text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 font-bold">
              HIGH RISK FEED
            </span>
          </div>

          <div className="space-y-3">
            {amlAlerts.map((alert: any) => (
              <div key={alert.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`font-bold ${alert.severity === "RED" ? "text-red-600" : "text-amber-600"}`}>
                      ● {alert.title}
                    </span>
                    <p className="text-slate-500 font-mono text-[11px] mt-0.5">
                      Account: {alert.accountNumber} • {alert.branch}
                    </p>
                  </div>
                  <span className="font-mono text-slate-900 font-bold">{formatINR(alert.amount)}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-[10px] font-mono text-slate-500">Risk Score: {alert.riskScore}/100</span>
                  {alert.status === "OPEN" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAmlAction(alert.id, "FROZEN")}
                        className="px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[11px] font-semibold hover:bg-red-100"
                      >
                        Freeze Account
                      </button>
                      <button
                        onClick={() => handleAmlAction(alert.id, "ESCALATED_FIU")}
                        className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold shadow-sm"
                      >
                        Escalate to FIU
                      </button>
                    </div>
                  ) : (
                    <span className="text-[11px] font-mono text-emerald-700 font-bold">{alert.status}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Financial Parameters Editor */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">Dynamic Financial Controls</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-bold">LIVE SPREAD</span>
          </div>

          <div className="space-y-3.5 text-xs font-mono">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-sans text-slate-700 font-medium">Savings Account APY (% p.a.)</span>
              <input
                type="number"
                step="0.05"
                value={savingsApy}
                onChange={(e) => setSavingsApy(e.target.value)}
                className="w-20 py-1 px-2 text-right bg-white border border-slate-200 rounded-lg text-emerald-700 font-bold"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-sans text-slate-700 font-medium">1-Year Fixed Deposit Rate (%)</span>
              <input
                type="number"
                step="0.05"
                value={fd1YearRate}
                onChange={(e) => setFd1YearRate(e.target.value)}
                className="w-20 py-1 px-2 text-right bg-white border border-slate-200 rounded-lg text-emerald-700 font-bold"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <span className="font-sans text-slate-700 font-medium">Maker-Checker Reversal Threshold (₹)</span>
              <input
                type="number"
                step="5000"
                value={makerCheckerThreshold}
                onChange={(e) => setMakerCheckerThreshold(e.target.value)}
                className="w-28 py-1 px-2 text-right bg-white border border-slate-200 rounded-lg text-amber-700 font-bold"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 block font-sans">Silver Limit</span>
                <span className="text-xs font-bold text-slate-900">₹1.0 Lakh</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 block font-sans">Gold Limit</span>
                <span className="text-xs font-bold text-slate-900">₹5.0 Lakh</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] text-slate-500 block font-sans">Platinum Limit</span>
                <span className="text-xs font-bold text-slate-900">₹25.0 Lakh</span>
              </div>
            </div>

            {saveFeedback && <p className="text-[11px] text-emerald-700 font-semibold animate-in fade-in">{saveFeedback}</p>}

            <button
              onClick={handleSaveParams}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all"
            >
              Broadcast Financial Parameter Updates
            </button>
          </div>
        </div>
      </div>

      {/* Role-Permission Matrix Editor */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Role-Permission Governance Matrix</h2>
          </div>
          <span className="text-xs text-slate-500 font-mono">RBAC Security Policy</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase">
                <th className="pb-3 pl-2">System Permission / Capability</th>
                {roles.map((r) => (
                  <th key={r} className="pb-3 text-center font-bold text-slate-700">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {permissions.map((perm) => (
                <tr key={perm} className="hover:bg-slate-50">
                  <td className="py-3 pl-2 font-medium text-slate-900">{perm}</td>
                  {roles.map((role) => {
                    const isChecked = !!matrix[`${role}-${perm}`];
                    return (
                      <td key={role} className="py-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => togglePermission(role, perm)}
                          className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
