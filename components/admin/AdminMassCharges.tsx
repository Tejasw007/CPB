"use client";

import React, { useState, useEffect } from "react";
import { formatINR } from "@/lib/utils";
import { Repeat, ShieldAlert, CheckCircle2, AlertCircle } from "lucide-react";

export function AdminMassCharges() {
  const [internalAccounts, setInternalAccounts] = useState<any[]>([]);
  const [targetAccount, setTargetAccount] = useState("");
  const [percentage, setPercentage] = useState("0.05");
  const [notificationMsg, setNotificationMsg] = useState("A system service charge of ₹{{amount}} has been deducted from your account.");
  const [targetTier, setTargetTier] = useState("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    async function loadAccounts() {
      const res = await fetch("/api/admin/internal-accounts");
      if (res.ok) {
        const data = await res.json();
        setInternalAccounts(data.accounts);
        if (data.accounts.length > 0) {
          setTargetAccount(data.accounts[0].id);
        }
      }
    }
    loadAccounts();
  }, []);

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/service-charges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          percentage,
          targetAccountId: targetAccount,
          notificationMessage: notificationMsg,
          targetTier,
        }),
      });
      const data = await res.json();
      setResult({ success: res.ok, data });
    } catch (err: any) {
      setResult({ success: false, data: { error: err.message } });
    }
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-white border border-red-200 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold">
            Executive Controls
          </span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Mass Service Charges</h1>
        <p className="text-xs text-slate-500 mt-1">
          Execute a mass service charge deduction across customer accounts. The specified percentage will be deducted from active balances and aggregated into the selected internal revenue account.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <form onSubmit={handleExecute} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Deduction Percentage (%)</label>
              <input
                type="number"
                step="0.001"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-900 font-mono"
                required
              />
              <span className="text-[10px] text-slate-500 mt-1 block">e.g. 0.05 for 0.05% of account balance</span>
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Account Tier</label>
              <select
                value={targetTier}
                onChange={(e) => setTargetTier(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-900"
              >
                <option value="ALL">All Active Customer Accounts</option>
                <option value="SILVER">Silver Tier Only</option>
                <option value="GOLD">Gold Tier Only</option>
                <option value="PLATINUM">Platinum Tier Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Destination Revenue Account</label>
            <select
              value={targetAccount}
              onChange={(e) => setTargetAccount(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-900 font-mono"
              required
            >
              {internalAccounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.user.name} - {acc.accountNumber} (Available: {formatINR(Number(acc.balance))})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Notification Message</label>
            <textarea
              value={notificationMsg}
              onChange={(e) => setNotificationMsg(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-900 text-xs h-20"
              required
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Use {"{{amount}}"} as a placeholder for the deducted amount.</span>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isProcessing ? "Executing Service Charges..." : <><ShieldAlert className="w-4 h-4" /> Execute Mass Service Charge</>}
          </button>
        </form>

        {result && (
          <div className={`mt-5 p-4 rounded-2xl border text-xs font-medium flex items-start gap-2.5 ${
            result.success ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"
          }`}>
            {result.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            )}
            <div>
              <p className="font-bold">{result.success ? "Success" : "Failed"}</p>
              <p>{result.data.message || result.data.error}</p>
              {result.success && (
                <p className="font-mono text-[11px] mt-1 text-emerald-600">
                  Total Collected: {formatINR(result.data.totalCollected)} from {result.data.affectedCount} accounts.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
