"use client";

import React, { useState } from "react";
import { useBank } from "@/components/providers/BankContext";
import { formatINR } from "@/lib/utils";
import {
  Send,
  Building,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Zap,
  PlusCircle,
  CreditCard,
  Lock,
  ScanLine,
} from "lucide-react";
import { UpiTransferWidget } from "./UpiTransferWidget";

export function TransfersView() {
  const { accounts, beneficiaries, executeTransfer, addBeneficiary } = useBank();

  const [activeSubTab, setActiveSubTab] = useState<"INTRA" | "INTER" | "BILL_PAY" | "UPI">("INTRA");

  // Form Fields
  const [sourceAccountId, setSourceAccountId] = useState(accounts[0]?.id || "");
  const [targetAccountNum, setTargetAccountNum] = useState("");
  const [targetIfsc, setTargetIfsc] = useState("CPBN0001042");
  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [transferMode, setTransferMode] = useState<"IMPS" | "NEFT" | "RTGS">("IMPS");
  const [remarks, setRemarks] = useState("");

  // 2FA PIN Modal
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [transferResult, setTransferResult] = useState<{ success: boolean; message: string; refId?: string } | null>(null);

  // Add Beneficiary Modal
  const [showAddBeneModal, setShowAddBeneModal] = useState(false);
  const [newBeneName, setNewBeneName] = useState("");
  const [newBeneAcc, setNewBeneAcc] = useState("");
  const [newBeneIfsc, setNewBeneIfsc] = useState("CPBN0001042");
  const [newBeneBank, setNewBeneBank] = useState("Code Paglu Bank");

  const sourceAccount = accounts.find((a) => a.id === sourceAccountId) || accounts[0];

  const handleSelectQuickAmount = (val: number) => {
    setAmount(String(val));
  };

  const handleSelectBeneficiary = (b: typeof beneficiaries[0]) => {
    setTargetAccountNum(b.accountNumber);
    setBeneficiaryName(b.name);
    setTargetIfsc(b.ifsc);
  };

  const handleInitiateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    if (Number(amount) > (sourceAccount?.balance || 0)) {
      alert("Insufficient funds in selected account.");
      return;
    }
    setShowPinModal(true);
  };

  const handleConfirmPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length !== 4) {
      alert("Please enter your 4-digit Transaction PIN.");
      return;
    }

    setIsProcessing(true);
    const res = await executeTransfer({
      sourceAccountId: sourceAccount.id,
      destinationAccountNumber: targetAccountNum,
      amount: Number(amount),
      transferMode: activeSubTab === "INTRA" ? "INTRA_BANK" : transferMode,
      destinationAccountName: beneficiaryName || "CPB Payee",
      description: remarks || `${activeSubTab} Payment`,
      destinationIfsc: targetIfsc,
    });

    setIsProcessing(false);
    setShowPinModal(false);
    setPin("");
    setTransferResult(res);

    if (res.success) {
      setAmount("");
      setRemarks("");
    }
  };

  const handleCreateBeneficiary = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addBeneficiary({
      name: newBeneName,
      accountNumber: newBeneAcc,
      ifsc: newBeneIfsc,
      bankName: newBeneBank,
    });
    if (res.success) {
      setShowAddBeneModal(false);
      setNewBeneName("");
      setNewBeneAcc("");
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 font-bold">
            Double-Entry Ledger Engine
          </span>
          <span className="text-xs text-slate-500 font-mono">• Instant 24x7 Settlement</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Transfers & Payments Hub</h1>
        <p className="text-xs text-slate-500 mt-1">
          Atomic fund movement with zero slippage, automatic cooling periods, and 2FA verification.
        </p>
      </div>

      {/* Main 2-Column Interface: Transfer Form on Left, Beneficiaries on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transfer Form (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          {/* Sub-Tabs: Intra vs Inter vs Bill Pay */}
          <div className="flex gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => {
                setActiveSubTab("INTRA");
                setTargetIfsc("CPBN0001042");
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                activeSubTab === "INTRA"
                  ? "bg-white text-blue-600 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Intra-Bank (CPB to CPB)
            </button>
            <button
              onClick={() => {
                setActiveSubTab("INTER");
                setTargetIfsc("");
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                activeSubTab === "INTER"
                  ? "bg-white text-blue-600 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              Inter-Bank (NEFT/RTGS/IMPS)
            </button>
            <button
              onClick={() => setActiveSubTab("BILL_PAY")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                activeSubTab === "BILL_PAY"
                  ? "bg-white text-blue-600 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              Bill Pay
            </button>
            <button
              onClick={() => setActiveSubTab("UPI")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                activeSubTab === "UPI"
                  ? "bg-white text-blue-600 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ScanLine className="w-3.5 h-3.5" />
              UPI QR
            </button>
          </div>

          {activeSubTab === "UPI" ? (
            <UpiTransferWidget sourceAccountId={sourceAccount?.id} sourceBalance={Number(sourceAccount?.balance || 0)} />
          ) : (
            <form onSubmit={handleInitiateTransfer} className="space-y-4 text-xs">
            {/* Source Account Selector */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Debit From Account</label>
              <select
                value={sourceAccountId}
                onChange={(e) => setSourceAccountId(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-xl bank-input text-slate-900 font-medium"
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.type} (•••• {acc.accountNumber.slice(-4)}) — Available Balance: {formatINR(acc.balance)}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Account & Beneficiary Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Payee Account Number</label>
                <input
                  type="text"
                  placeholder="e.g. 8832014109"
                  value={targetAccountNum}
                  onChange={(e) => setTargetAccountNum(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bank-input font-mono text-slate-900 font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1.5">Beneficiary / Payee Name</label>
                <input
                  type="text"
                  placeholder="e.g. Ananya Patel"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  className="w-full py-2.5 px-3.5 rounded-xl bank-input text-slate-900 font-medium"
                  required
                />
              </div>
            </div>

            {/* IFSC Code for Inter-bank */}
            {activeSubTab === "INTER" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">Bank IFSC Code</label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC0001234"
                    value={targetIfsc}
                    onChange={(e) => setTargetIfsc(e.target.value.toUpperCase())}
                    className="w-full py-2.5 px-3.5 rounded-xl bank-input font-mono uppercase text-slate-900 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">Transfer Mode</label>
                  <select
                    value={transferMode}
                    onChange={(e) => setTransferMode(e.target.value as any)}
                    className="w-full py-2.5 px-3.5 rounded-xl bank-input text-slate-900 font-medium"
                  >
                    <option value="IMPS">IMPS (Instant, up to ₹5,00,000)</option>
                    <option value="NEFT">NEFT (Batch Settlement)</option>
                    <option value="RTGS">RTGS (Instant, above ₹2,00,000)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Amount and Quick Amount Chips */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Transfer Amount (INR)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-mono text-sm">₹</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bank-input font-mono font-bold text-base text-slate-900"
                  required
                />
              </div>

              {/* Quick Amount Chips */}
              <div className="flex gap-2 mt-2">
                {[1000, 5000, 10000, 25000, 50000].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => handleSelectQuickAmount(val)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] transition-all font-medium"
                  >
                    +{formatINR(val)}
                  </button>
                ))}
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-slate-700 font-semibold mb-1.5">Payment Note / Remarks</label>
              <input
                type="text"
                placeholder="e.g. Monthly Rent, Invoice settlement"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="w-full py-2.5 px-3.5 rounded-xl bank-input text-slate-900"
              />
            </div>

            {/* Transfer Result Banner */}
            {transferResult && (
              <div className={`p-4 rounded-2xl border text-xs flex items-start gap-2.5 animate-in fade-in ${
                transferResult.success
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200 font-medium"
                  : "bg-red-50 text-red-800 border-red-200 font-medium"
              }`}>
                {transferResult.success ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold">{transferResult.message}</p>
                  {transferResult.refId && (
                    <p className="font-mono text-[11px] text-slate-500 mt-0.5">Reference ID: {transferResult.refId}</p>
                  )}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Proceed to PIN Verification
            </button>
          </form>
          )}
        </div>

        {/* Beneficiaries Sidebar (1 col) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900">Saved Beneficiaries</span>
              <button
                onClick={() => setShowAddBeneModal(true)}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
              >
                <PlusCircle className="w-3.5 h-3.5" /> Add New
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {beneficiaries.map((b) => (
                <div
                  key={b.id}
                  onClick={() => handleSelectBeneficiary(b)}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/70 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-xs text-slate-900 group-hover:text-blue-600 transition-colors">
                      {b.name}
                    </p>
                    {b.coolingPeriodEndsAt && new Date(b.coolingPeriodEndsAt) > new Date() ? (
                      <span className="text-[9px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 flex items-center gap-1 font-bold">
                        <Clock className="w-2.5 h-2.5" /> COOLING
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-slate-500">
                    •••• {b.accountNumber.slice(-4)} • {b.bankName}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">Limit: {formatINR(b.dailyLimit)}/day</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              RBI Security Policy
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              New beneficiaries require a 30-minute cooling period before transfers above ₹50,000 can be processed.
            </p>
          </div>
        </div>
      </div>

      {/* 2FA PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 border border-slate-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900">Authorize Transfer</span>
              <button
                onClick={() => setShowPinModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 text-center font-mono text-xs space-y-1">
              <p className="text-slate-500 font-sans">Transfer Amount</p>
              <p className="text-xl font-bold text-slate-900">{formatINR(Number(amount))}</p>
              <p className="text-[11px] text-slate-500 font-sans">To: {beneficiaryName} ({targetAccountNum})</p>
            </div>

            <form onSubmit={handleConfirmPin} className="space-y-4">
              <div>
                <label className="block text-center text-xs font-semibold text-slate-700 mb-2">
                  Enter 4-Digit Transaction PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full py-3 text-center tracking-widest text-2xl font-mono bank-input rounded-2xl text-slate-900 font-bold"
                  placeholder="••••"
                  autoFocus
                  required
                />
                <span className="text-[10px] text-slate-400 text-center block mt-1">Default Demo PIN: 1234</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/10 transition-all disabled:opacity-50"
              >
                {isProcessing ? "Processing Ledger Debit..." : "Confirm & Send Money"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Beneficiary Modal */}
      {showAddBeneModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900">Add New Payee Beneficiary</span>
              <button
                onClick={() => setShowAddBeneModal(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBeneficiary} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Beneficiary Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={newBeneName}
                  onChange={(e) => setNewBeneName(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bank-input text-slate-900 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Account Number</label>
                <input
                  type="text"
                  placeholder="e.g. 8832019912"
                  value={newBeneAcc}
                  onChange={(e) => setNewBeneAcc(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bank-input font-mono text-slate-900 font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">IFSC Code</label>
                  <input
                    type="text"
                    placeholder="CPBN0001042"
                    value={newBeneIfsc}
                    onChange={(e) => setNewBeneIfsc(e.target.value.toUpperCase())}
                    className="w-full py-2.5 px-3 rounded-xl bank-input font-mono uppercase text-slate-900 font-bold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Bank Name</label>
                  <input
                    type="text"
                    placeholder="Code Paglu Bank"
                    value={newBeneBank}
                    onChange={(e) => setNewBeneBank(e.target.value)}
                    className="w-full py-2.5 px-3 rounded-xl bank-input text-slate-900"
                    required
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
                ⚠️ 30-minute security cooling period applies before full limit activation.
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all"
              >
                Register Beneficiary
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
