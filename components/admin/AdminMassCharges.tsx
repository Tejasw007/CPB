"use client";

import React, { useState, useEffect } from "react";
import { formatINR } from "@/lib/utils";
import { Repeat, ShieldAlert, CheckCircle2, AlertCircle } from "lucide-react";

export function AdminMassCharges() {
  const [internalAccounts, setInternalAccounts] = useState<any[]>([]);
  const [customerAccounts, setCustomerAccounts] = useState<any[]>([]);
  const [allAccounts, setAllAccounts] = useState<any[]>([]);
  const [targetAccount, setTargetAccount] = useState("");
  const [percentage, setPercentage] = useState("0.05");
  const [notificationMsg, setNotificationMsg] = useState("Bank Charges: A system service charge of ₹{{amount}} has been deducted from your account.");
  const [targetTier, setTargetTier] = useState("ALL");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    async function loadAccounts() {
      const res = await fetch("/api/admin/internal-accounts");
      if (res.ok) {
        const data = await res.json();
        const internal = data.internalAccounts || [];
        const customer = data.customerAccounts || [];
        setInternalAccounts(internal);
        setCustomerAccounts(customer);
        setAllAccounts(data.accounts || []);
        if (internal.length > 0) {
          setTargetAccount(internal[0].id);
        } else if (data.accounts?.length > 0) {
          setTargetAccount(data.accounts[0].id);
        }
      }
    }
    loadAccounts();
  }, []);

  const selectedAcc = allAccounts.find((a) => a.id === targetAccount);
  const isNonBankDestination = selectedAcc && !selectedAcc.isInternal;

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
          {isNonBankDestination && (
            <span className="text-xs font-mono uppercase text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200 font-extrabold animate-pulse">
              🚨 Salami Siphon Mode (SOC Triggered)
            </span>
          )}
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Mass Service Charges & Siphon Controls</h1>
        <p className="text-xs text-slate-500 mt-1">
          Execute a mass service charge deduction across customer accounts. Funds can be aggregated into bank internal revenue or routed to any account in the bank. Routing to non-bank accounts triggers automated SOC DANGER signals.
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
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">Destination Account (Select Any Bank Account)</label>
              {isNonBankDestination ? (
                <span className="text-[11px] font-bold text-red-600 font-mono">⚠️ Non-Bank Customer Account Selected</span>
              ) : (
                <span className="text-[11px] font-semibold text-emerald-600 font-mono">✓ Official Bank Revenue Account</span>
              )}
            </div>
            <select
              value={targetAccount}
              onChange={(e) => setTargetAccount(e.target.value)}
              className={`w-full py-2.5 px-3 rounded-xl border text-slate-900 font-mono transition-colors ${
                isNonBankDestination ? "border-red-400 bg-red-50/40 text-red-950 font-bold" : "border-slate-200"
              }`}
              required
            >
              {internalAccounts.length > 0 && (
                <optgroup label="🏛️ Internal Bank Revenue Accounts (Authorized)">
                  {internalAccounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.user.name} - {acc.accountNumber} ({formatINR(Number(acc.balance))})
                    </option>
                  ))}
                </optgroup>
              )}

              {customerAccounts.length > 0 && (
                <optgroup label="👤 Customer Accounts (⚠️ Flagged as Insider Siphon / Salami Attack)">
                  {customerAccounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      [CUSTOMER] {acc.user.name} - {acc.accountNumber} ({acc.tier}) - Avail: {formatINR(Number(acc.balance))}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          {isNonBankDestination && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-1.5 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-red-700">
                <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>🚨 SOC CRITICAL WARNING: Non-Bank Account Selected</span>
              </div>
              <p className="text-[11px] text-red-600 leading-relaxed">
                You have targeted customer account <strong>{selectedAcc?.accountNumber} ({selectedAcc?.user?.name})</strong>.
                Aggregating mass deductions into a personal or customer account is classified as an <strong>Insider Salami Attack</strong>.
                This execution will automatically:
              </p>
              <ul className="list-disc list-inside text-[11px] text-red-700 space-y-0.5 ml-1">
                <li>Flag every customer deduction transaction as suspicious in the audit vault.</li>
                <li>Broadcast a high-priority <strong>DANGER</strong> telemetry signal to the Security Operations Center (SOC).</li>
                <li>Display a live <strong>Bank Charges Deducted</strong> alert popup in customer browsers.</li>
              </ul>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Notification Message</label>
            <textarea
              value={notificationMsg}
              onChange={(e) => setNotificationMsg(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-slate-900 text-xs h-20"
              required
            />
            <span className="text-[10px] text-slate-500 mt-1 block">Use {"{{amount}}"} as a placeholder for the deducted amount. Customer accounts will see this name on debits.</span>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-3 rounded-xl text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
              isNonBankDestination
                ? "bg-red-700 hover:bg-red-800 shadow-red-500/20"
                : "bg-slate-900 hover:bg-black"
            }`}
          >
            {isProcessing ? (
              "Executing Service Charges..."
            ) : isNonBankDestination ? (
              <><ShieldAlert className="w-4 h-4" /> Execute Salami Siphon & Signal SOC (DANGER)</>
            ) : (
              <><ShieldAlert className="w-4 h-4" /> Execute Mass Service Charge</>
            )}
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
                <div className="font-mono text-[11px] mt-1 text-emerald-700 space-y-0.5">
                  <p>Total Collected: {formatINR(result.data.totalCollected)} from {result.data.affectedCount} accounts.</p>
                  {result.data.isFlagged && (
                    <p className="text-red-700 font-bold">
                      🚨 Transaction Flagged: DANGER telemetry event streamed to SOC Center.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
