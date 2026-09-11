"use client";

import React, { useState, useEffect } from "react";
import { formatINR } from "@/lib/utils";
import { Repeat, ShieldAlert, CheckCircle2, AlertCircle } from "lucide-react";

export function AdminMassCharges() {
  const [internalAccounts, setInternalAccounts] = useState<any[]>([]);
  const [customerAccounts, setCustomerAccounts] = useState<any[]>([]);
  const [allAccounts, setAllAccounts] = useState<any[]>([]);
  const [selectedAccountIds, setSelectedAccountIds] = useState<string[]>([]);
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
          setSelectedAccountIds([internal[0].id]);
        } else if (data.accounts?.length > 0) {
          setSelectedAccountIds([data.accounts[0].id]);
        }
      }
    }
    loadAccounts();
  }, []);

  const selectedAccounts = allAccounts.filter((a) => selectedAccountIds.includes(a.id));
  const nonBankSelected = selectedAccounts.filter((a) => !a.isInternal);
  const internalSelected = selectedAccounts.filter((a) => a.isInternal);
  const isNonBankDestination = nonBankSelected.length > 0;

  const toggleAccount = (id: string) => {
    setSelectedAccountIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least 1 selected
        return prev.filter((accId) => accId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectBankOnly = () => {
    if (internalAccounts.length > 0) {
      setSelectedAccountIds(internalAccounts.map((a) => a.id));
    }
  };

  const selectAllCustomers = () => {
    if (customerAccounts.length > 0) {
      setSelectedAccountIds(customerAccounts.map((a) => a.id));
    }
  };

  const handleExecute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAccountIds.length === 0) {
      alert("Please select at least one destination account.");
      return;
    }

    setIsProcessing(true);
    setResult(null);

    try {
      const res = await fetch("/api/admin/service-charges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          percentage,
          targetAccountIds: selectedAccountIds,
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
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-xs font-mono uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold">
            Executive Controls
          </span>
          {isNonBankDestination ? (
            <span className="text-xs font-mono uppercase text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full border border-red-200 font-extrabold animate-pulse">
              🚨 Salami Siphon Flagged ({nonBankSelected.length} Non-Bank / {selectedAccountIds.length} Total Targets)
            </span>
          ) : (
            <span className="text-xs font-mono uppercase text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
              ✓ Authorized Internal Revenue Routing
            </span>
          )}
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Mass Service Charges & Multi-Account Siphon Controls</h1>
        <p className="text-xs text-slate-500 mt-1">
          Select single or multiple accounts using checkboxes to receive deducted funds. Any selection containing customer accounts (even 3 customer + 1 bank, or 4 customer accounts) will be flagged as an Insider Salami Attack and broadcast a high-priority DANGER signal to the SOC.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
        <form onSubmit={handleExecute} className="space-y-6">
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

          {/* Multi-Account Checkbox Selection Section */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-900">
                  Destination Accounts (Check 1, 2, 3 or More Accounts)
                </label>
                <p className="text-[11px] text-slate-500">
                  Total collected funds will be split equally across all selected accounts.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={selectBankOnly}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-700 transition-colors"
                >
                  Bank Revenue Only
                </button>
                <button
                  type="button"
                  onClick={selectAllCustomers}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-[11px] font-semibold text-rose-700 border border-rose-200 transition-colors"
                >
                  Select All Customers (Siphon)
                </button>
              </div>
            </div>

            {/* Account Selection Box */}
            <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50/50 space-y-4 max-h-72 overflow-y-auto">
              {/* Internal Bank Accounts */}
              {internalAccounts.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-500 block px-1">
                    🏛️ Authorized Internal Bank Revenue Accounts
                  </span>
                  <div className="space-y-1.5">
                    {internalAccounts.map((acc) => {
                      const isChecked = selectedAccountIds.includes(acc.id);
                      return (
                        <label
                          key={acc.id}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                            isChecked
                              ? "bg-emerald-50/70 border-emerald-300 shadow-sm"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAccount(acc.id)}
                              className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-slate-900">{acc.user.name}</span>
                                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                                  OFFICIAL REVENUE
                                </span>
                              </div>
                              <span className="text-[11px] font-mono text-slate-500">{acc.accountNumber}</span>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-900">
                            Available: {formatINR(Number(acc.balance))}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Customer Accounts (Flagged Siphon) */}
              {customerAccounts.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-rose-600 block">
                      👤 Customer Accounts (⚠️ If Any Selected: Flaggable Insider Siphon)
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {customerAccounts.length} Available
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {customerAccounts.map((acc) => {
                      const isChecked = selectedAccountIds.includes(acc.id);
                      return (
                        <label
                          key={acc.id}
                          className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                            isChecked
                              ? "bg-rose-50 border-rose-300 shadow-sm"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAccount(acc.id)}
                              className="w-4 h-4 rounded text-rose-600 accent-rose-600 cursor-pointer"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-slate-900">{acc.user.name}</span>
                                <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded font-medium">
                                  {acc.tier}
                                </span>
                                {isChecked && (
                                  <span className="text-[10px] font-mono bg-rose-200 text-rose-900 px-1.5 py-0.2 rounded font-bold">
                                    SIPHON RECIPIENT
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] font-mono text-slate-500">{acc.accountNumber}</span>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-slate-900">
                            Available: {formatINR(Number(acc.balance))}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Selection Status Bar */}
            <div className={`p-3.5 rounded-xl border text-xs font-mono flex items-center justify-between ${
              isNonBankDestination
                ? "bg-red-50 border-red-200 text-red-900"
                : "bg-slate-50 border-slate-200 text-slate-700"
            }`}>
              <div>
                <span className="font-bold">
                  Selected: {selectedAccountIds.length} Destination Account(s)
                </span>
                <span className="ml-2 text-[11px] text-slate-500 font-sans">
                  ({internalSelected.length} Bank Revenue, {nonBankSelected.length} Customer Accounts)
                </span>
              </div>
              <span className="font-bold">
                Split: {(100 / selectedAccountIds.length).toFixed(1)}% each
              </span>
            </div>
          </div>

          {/* Warning Banner when ANY Non-Bank account is in the selected list */}
          {isNonBankDestination && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-1.5 animate-in fade-in">
              <div className="flex items-center gap-2 font-bold text-red-700">
                <ShieldAlert className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>🚨 SOC DANGER ALARM: {nonBankSelected.length} Non-Bank Account(s) Selected</span>
              </div>
              <p className="text-[11px] text-red-600 leading-relaxed">
                Even if an official bank revenue account is selected alongside, routing customer funds into <strong>{nonBankSelected.length} customer account(s)</strong> is categorized as an <strong>Insider Salami Slicing Attack</strong>.
              </p>
              <ul className="list-disc list-inside text-[11px] text-red-700 space-y-0.5 ml-1">
                <li>All customer deduction debits will be flagged as suspicious in the audit vault.</li>
                <li>The target non-bank accounts ({nonBankSelected.map(a => a.accountNumber).join(", ")}) will be tagged with DANGER risk.</li>
                <li>A high-priority <strong>DANGER</strong> telemetry signal will be broadcast to the Security Operations Center (SOC).</li>
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
              <><ShieldAlert className="w-4 h-4" /> Execute Salami Siphon ({selectedAccountIds.length} Accounts - SOC Flagged)</>
            ) : (
              <><ShieldAlert className="w-4 h-4" /> Execute Mass Service Charge ({selectedAccountIds.length} Bank Account)</>
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
                  <p>Split across {result.data.destinationCount} destination account(s) ({result.data.nonBankCount || 0} non-bank).</p>
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
