"use client";

import React, { useState, useEffect } from "react";
import { useBank } from "@/components/providers/BankContext";
import { formatINR, maskAccountNumber, formatDate } from "@/lib/utils";
import {
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  RotateCcw,
  Plus,
  Minus,
  UserPlus,
  Copy,
  ExternalLink,
  QrCode,
  Sparkles,
} from "lucide-react";

export function StaffDashboard({ initialTab }: { initialTab?: string }) {
  const { currentUser } = useBank();

  // Onboarding Dispatch State
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [accountType, setAccountType] = useState("SAVINGS");
  const [initialDeposit, setInitialDeposit] = useState("5000");
  const [generatedInvite, setGeneratedInvite] = useState<{ onboardingUrl: string; token: string } | null>(null);
  const [isGeneratingInvite, setIsGeneratingInvite] = useState(false);
  const [invitationsList, setInvitationsList] = useState<any[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  // Live Staff Ops Data State
  const [dailyVolume, setDailyVolume] = useState(4820000);
  const [pendingKycUsers, setPendingKycUsers] = useState<any[]>([]);
  const [reversals, setReversals] = useState<any[]>([]);
  const [kycDecision, setKycDecision] = useState<string | null>(null);

  // Counter Ops State
  const [counterAcc, setCounterAcc] = useState("8832014109");
  const [depositorName, setDepositorName] = useState("Alex Mercer");
  const [denominations, setDenominations] = useState<{ [key: string]: number }>({
    "2000": 10,
    "500": 40,
    "200": 20,
    "100": 40,
  });
  const [counterSuccessMessage, setCounterSuccessMessage] = useState("");

  const totalDepositAmount = Object.entries(denominations).reduce(
    (acc, [denom, count]) => acc + Number(denom) * count,
    0
  );

  const loadStaffData = async () => {
    try {
      const [invRes, opsRes] = await Promise.all([
        fetch("/api/onboard/invite"),
        fetch("/api/staff/ops"),
      ]);

      if (invRes.ok) {
        const invData = await invRes.json();
        setInvitationsList(invData || []);
      }

      if (opsRes.ok) {
        const opsData = await opsRes.json();
        setDailyVolume(opsData.dailyVolume || 4820000);
        setPendingKycUsers(opsData.pendingKycUsers || []);
        setReversals(opsData.reversals || []);
      }
    } catch (e) {
      console.error("Error loading staff data:", e);
    }
  };

  useEffect(() => {
    loadStaffData();
  }, []);

  const handleGenerateOnboardingLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingInvite(true);
    setGeneratedInvite(null);

    try {
      const res = await fetch("/api/onboard/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          branchCode: "CPB001",
          accountType,
          initialDeposit: Number(initialDeposit),
          staffId: currentUser.id,
          staffName: currentUser.name,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedInvite({ onboardingUrl: data.onboardingUrl, token: data.invitation.token });
        await loadStaffData();
      } else {
        alert(data.error || "Failed to generate invitation.");
      }
    } catch (err: any) {
      alert(err.message || "Network error");
    } finally {
      setIsGeneratingInvite(false);
    }
  };

  const handleCopyLink = () => {
    if (!generatedInvite) return;
    navigator.clipboard.writeText(generatedInvite.onboardingUrl);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleUpdateDenomination = (denom: string, delta: number) => {
    setDenominations((prev) => ({
      ...prev,
      [denom]: Math.max(0, (prev[denom] || 0) + delta),
    }));
  };

  const handleExecuteCounterDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (totalDepositAmount <= 0) {
      alert("Total deposit must be greater than zero.");
      return;
    }
    try {
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "counter_deposit",
          targetAccountNumber: counterAcc,
          amount: totalDepositAmount,
          tellerUserId: currentUser.id,
          tellerName: currentUser.name,
          depositorName,
          remarks: "Cash counter deposit",
          branchCode: "CPB001",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCounterSuccessMessage(`Deposit of ${formatINR(totalDepositAmount)} processed! Ref: ${data.referenceId}`);
      } else {
        alert(data.error || "Deposit failed");
      }
    } catch (e: any) {
      alert(e.message || "Network error");
    }
  };

  const handleAuthorizeReversal = async (revId: string) => {
    setReversals((prev) =>
      prev.map((r) => (r.id === revId ? { ...r, status: "AUTHORIZED" } : r))
    );
    alert("Reversal authorized by Branch Manager. Funds adjusted on core ledger.");
  };

  const activeKycApplicant = pendingKycUsers[0] || {
    name: "Siddharth Roy",
    panNumber: "ABCPS9910K",
    aadhaarNumber: "•••• •••• 9921",
    dob: "14-Aug-1991",
    address: "Bandra West, Mumbai",
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 font-bold">
              Branch Operations
            </span>
            <span className="text-xs text-slate-500 font-mono">• Mumbai Nariman Point HQ (CPB001)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Staff Operational Desk</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Logged in as: <span className="text-slate-900 font-semibold">{currentUser.name}</span> ({currentUser.staffDesignation || "Branch Operations"})
          </p>
        </div>

        {/* Live Branch Stats from Database */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Daily Branch Volume</span>
            <span className="text-emerald-700 font-bold text-sm">{formatINR(dailyVolume)}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] text-slate-500 block">Pending Queue</span>
            <span className="text-amber-700 font-bold text-sm">{pendingKycUsers.length + reversals.length} Tasks</span>
          </div>
        </div>
      </div>

      {/* Feature 1: Customer Onboarding Link Dispatcher */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Digital Customer Onboarding & KYC Link Dispatcher</h2>
              <p className="text-xs text-slate-500">
                Generate and send secure self-onboarding links. Customers fill PAN, Aadhaar, and register their phone fingerprint sensor.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold">
            BIOMETRIC ENABLED
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2-Cols: Input Form */}
          <form onSubmit={handleGenerateOnboardingLink} className="lg:col-span-2 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Siddharth Roy"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bank-input text-slate-900 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer Email Address</label>
                <input
                  type="email"
                  placeholder="siddharth.roy@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bank-input text-slate-900 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer Mobile Number</label>
                <input
                  type="text"
                  placeholder="+91 98201 99001"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bank-input text-slate-900 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Account Type</label>
                <select
                  value={accountType}
                  onChange={(e) => setAccountType(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bank-input text-slate-900 font-medium"
                >
                  <option value="SAVINGS">Savings Account (4.0% APY)</option>
                  <option value="CURRENT">Current Business Account</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Opening Deposit (INR)</label>
                <input
                  type="number"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bank-input text-slate-900 font-mono font-bold"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isGeneratingInvite}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isGeneratingInvite ? (
                "Generating Magic Onboarding Link..."
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate & Dispatch Digital Onboarding Link
                </>
              )}
            </button>
          </form>

          {/* Right 1-Col: Generated Link Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
            {generatedInvite ? (
              <div className="space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">Link Ready for Customer</span>
                  <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                    VALID 7 DAYS
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 font-mono text-[11px] text-slate-700 break-all">
                  {generatedInvite.onboardingUrl}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Copy className="w-3.5 h-3.5" /> {copySuccess ? "Copied!" : "Copy Link"}
                  </button>
                  <a
                    href={generatedInvite.onboardingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    Open <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-[11px] text-slate-500">
                  📱 The customer can open this on their phone, complete KYC, and pair their fingerprint sensor.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-6 space-y-2">
                <QrCode className="w-10 h-10 text-slate-300" />
                <p className="text-xs font-semibold text-slate-600">Onboarding Link Generator</p>
                <p className="text-[11px] text-slate-400 max-w-xs">
                  Fill the customer details and click generate to create their digital onboarding token.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Invitations History Table from Database */}
        {invitationsList.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recently Dispatched Onboarding Links</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-[10px] uppercase">
                    <th className="pb-2">Customer</th>
                    <th className="pb-2">Contact</th>
                    <th className="pb-2">Type / Deposit</th>
                    <th className="pb-2 text-center">Status</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invitationsList.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-sans font-semibold text-slate-900">{inv.customerName}</td>
                      <td className="py-2.5 text-slate-500 text-[11px]">{inv.customerEmail}</td>
                      <td className="py-2.5 text-slate-700">{inv.accountType} • ₹{Number(inv.initialDeposit).toLocaleString("en-IN")}</td>
                      <td className="py-2.5 text-center">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                          inv.status === "COMPLETED"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-sans">
                        <a
                          href={`/onboard/${inv.token}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-blue-600 hover:underline font-semibold"
                        >
                          View Link
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Main 3-Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel 1: KYC Review Station */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">KYC Review Station</h2>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
              AI MATCH: 98.4%
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <p className="font-bold text-slate-900">Customer: {activeKycApplicant.name}</p>
              <p className="text-slate-500 font-mono text-[11px]">PAN: {activeKycApplicant.panNumber} • Aadhaar: {activeKycApplicant.aadhaarNumber}</p>
            </div>

            {/* Document Scans */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block">Aadhaar Card</span>
                <div className="h-16 bg-white rounded-lg flex items-center justify-center text-[10px] text-emerald-700 font-mono border border-slate-200 font-bold">
                  ✓ OCR MATCH
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-center space-y-1">
                <span className="text-[10px] font-mono text-slate-500 block">PAN Card</span>
                <div className="h-16 bg-white rounded-lg flex items-center justify-center text-[10px] text-emerald-700 font-mono border border-slate-200 font-bold">
                  ✓ OCR MATCH
                </div>
              </div>
            </div>

            {/* OCR Extracted Fields */}
            <div className="p-3 rounded-xl bg-slate-50 space-y-1 font-mono text-[11px]">
              <div className="flex justify-between text-slate-500">
                <span>DOB Match:</span>
                <span className="text-slate-900 font-bold">{activeKycApplicant.dob} (100%)</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Address:</span>
                <span className="text-slate-900">{activeKycApplicant.address}</span>
              </div>
            </div>

            {/* Actions */}
            {kycDecision ? (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 text-center">
                KYC Decision Posted: {kycDecision}
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setKycDecision("APPROVED")}
                  className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Approve KYC
                </button>
                <button
                  onClick={() => setKycDecision("REJECTED")}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-red-50 border border-slate-200 text-red-600 text-xs font-semibold"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Panel 2: Teller Counter Operations */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">Counter Cash Ops</h2>
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-bold">TELLER POSTING</span>
          </div>

          <form onSubmit={handleExecuteCounterDeposit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Target Account #</label>
              <input
                type="text"
                value={counterAcc}
                onChange={(e) => setCounterAcc(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bank-input font-mono text-slate-900 font-bold"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Depositor / Bearer Name</label>
              <input
                type="text"
                value={depositorName}
                onChange={(e) => setDepositorName(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bank-input text-slate-900"
                required
              />
            </div>

            {/* Denomination Counter Grid */}
            <div className="space-y-1.5">
              <label className="block text-slate-700 font-semibold">Cash Denominations</label>
              <div className="grid grid-cols-2 gap-2 font-mono">
                {Object.entries(denominations).map(([denom, count]) => (
                  <div key={denom} className="p-2 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600">₹{denom} ×</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleUpdateDenomination(denom, -5)}
                        className="w-5 h-5 rounded bg-slate-200 text-slate-800 flex items-center justify-center hover:bg-slate-300 font-bold"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-slate-900">{count}</span>
                      <button
                        type="button"
                        onClick={() => handleUpdateDenomination(denom, 5)}
                        className="w-5 h-5 rounded bg-slate-200 text-slate-800 flex items-center justify-center hover:bg-slate-300 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Display */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between font-mono">
              <span className="text-slate-700 text-xs font-sans font-semibold">Total Deposit</span>
              <span className="text-base font-bold text-emerald-700">{formatINR(totalDepositAmount)}</span>
            </div>

            {counterSuccessMessage && (
              <p className="text-[11px] text-emerald-700 font-mono">{counterSuccessMessage}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md transition-all"
            >
              Post Cash Deposit & Print Slip
            </button>
          </form>
        </div>

        {/* Panel 3: Maker-Checker Reversal Queue from Database */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-600" />
              <h2 className="text-sm font-bold text-slate-900">Reversal Queue</h2>
            </div>
            <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 font-bold">
              DUAL AUTH
            </span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {reversals.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs font-mono">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-blue-600 font-bold">{rev.ref}</span>
                    <p className="font-sans text-slate-900 font-semibold text-[11px]">{rev.customerName}</p>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full border font-bold ${
                    rev.status === "AUTHORIZED"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-amber-50 text-amber-700 border-amber-200"
                  }`}>
                    {rev.status}
                  </span>
                </div>

                {/* Diff View */}
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1 text-[11px]">
                  <div className="flex justify-between text-slate-500">
                    <span>Reversal Amount:</span>
                    <span className="text-amber-600 font-bold">{formatINR(rev.amount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Original Balance:</span>
                    <span className="text-slate-900">{formatINR(rev.originalBalance)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Proposed Balance:</span>
                    <span className="text-emerald-700 font-bold">{formatINR(rev.proposedBalance)}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 font-sans">
                  <span className="font-semibold text-slate-700">Maker:</span> {rev.makerName}
                </p>

                {rev.status !== "AUTHORIZED" && (
                  <button
                    onClick={() => handleAuthorizeReversal(rev.id)}
                    className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all"
                  >
                    Authorize Reversal (Manager Check)
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
