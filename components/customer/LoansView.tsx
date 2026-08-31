"use client";

import React, { useState } from "react";
import { useBank } from "@/components/providers/BankContext";
import { formatINR, formatDate } from "@/lib/utils";
import {
  Banknote,
  Calculator,
  PlusCircle,
  Car,
  GraduationCap,
  Home,
} from "lucide-react";

export function LoansView() {
  const { loans, applyLoan } = useBank();

  const [loanType, setLoanType] = useState<"PERSONAL" | "HOME" | "AUTO" | "EDUCATION">("PERSONAL");
  const [principal, setPrincipal] = useState<number>(300000);
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [purpose, setPurpose] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const rates: Record<string, number> = {
    PERSONAL: 11.5,
    HOME: 8.4,
    AUTO: 9.25,
    EDUCATION: 8.75,
  };

  const currentRate = rates[loanType];
  const monthlyRate = currentRate / (12 * 100);
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  const totalRepayment = emi * tenureMonths;
  const totalInterest = totalRepayment - principal;

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplying(true);
    const res = await applyLoan({
      type: loanType,
      principal,
      tenureMonths,
      purpose,
    });
    setIsApplying(false);
    if (res.success) {
      setShowApplyModal(false);
      setPurpose("");
      alert(res.message);
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold">
              Retail Credit
            </span>
            <span className="text-xs text-slate-500 font-mono">• Instant In-Principle Sanctions</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Loans & Credit Solutions</h1>
          <p className="text-xs text-slate-500 mt-1">
            Competitive interest rates with digital underwriting and paperless disbursal.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/10 transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Apply for Loan
        </button>
      </div>

      {/* Main Grid: Active Loans List + Interactive Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2-Cols: Active Loans Tracker */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-bold text-slate-900 tracking-tight">Your Loan Portfolio</h2>
          {loans.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-slate-500 text-xs">
              No active loans found. Apply using the calculator on the right.
            </div>
          ) : (
            loans.map((loan) => (
              <div key={loan.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      {loan.type === "HOME" && <Home className="w-5 h-5" />}
                      {loan.type === "AUTO" && <Car className="w-5 h-5" />}
                      {loan.type === "EDUCATION" && <GraduationCap className="w-5 h-5" />}
                      {loan.type === "PERSONAL" && <Banknote className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 uppercase">{loan.type} Loan</h3>
                      <p className="text-[11px] text-slate-500 font-mono">Ref #{loan.id.slice(-6).toUpperCase()}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border font-bold ${
                    loan.status === "DISBURSED"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : loan.status === "PENDING"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}>
                    {loan.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px]">Sanctioned</span>
                    <p className="text-slate-900 font-bold mt-0.5">{formatINR(loan.principal)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px]">Interest Rate</span>
                    <p className="text-emerald-700 font-bold mt-0.5">{loan.interestRate}% p.a.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px]">Monthly EMI</span>
                    <p className="text-blue-600 font-bold mt-0.5">{formatINR(loan.emiAmount)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-400 text-[10px]">Tenure</span>
                    <p className="text-slate-900 font-bold mt-0.5">{loan.tenureMonths} Mos</p>
                  </div>
                </div>

                {loan.purpose && (
                  <p className="text-xs text-slate-600 font-sans">
                    <span className="font-semibold text-slate-800">Purpose:</span> {loan.purpose}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Right 1-Col: Live EMI Calculator */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Calculator className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">EMI Calculator</h3>
          </div>

          {/* Loan Category Selector */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { type: "PERSONAL", label: "Personal", rate: "11.5%" },
              { type: "HOME", label: "Home", rate: "8.4%" },
              { type: "AUTO", label: "Auto EV", rate: "9.25%" },
              { type: "EDUCATION", label: "Education", rate: "8.75%" },
            ].map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => setLoanType(item.type as any)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  loanType === item.type
                    ? "bg-blue-50 border-blue-500 text-blue-700 font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                <p className="text-xs font-semibold">{item.label}</p>
                <p className="text-[10px] text-emerald-700 font-mono font-bold">{item.rate}</p>
              </button>
            ))}
          </div>

          {/* Principal Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 font-medium">Loan Amount</span>
              <span className="font-mono text-emerald-700 font-bold">{formatINR(principal)}</span>
            </div>
            <input
              type="range"
              min={50000}
              max={10000000}
              step={50000}
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Tenure Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-700 font-medium">Tenure</span>
              <span className="font-mono text-blue-600 font-bold">{tenureMonths} Months ({Math.floor(tenureMonths / 12)} Yrs)</span>
            </div>
            <input
              type="range"
              min={12}
              max={240}
              step={12}
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* EMI Result Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 font-mono text-xs">
            <div className="flex justify-between text-slate-700 font-sans font-semibold">
              <span>Estimated EMI</span>
              <span className="text-base font-bold text-emerald-700 font-mono">{formatINR(emi)} / mo</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[11px]">
              <span>Total Interest</span>
              <span>{formatINR(totalInterest)}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-[11px]">
              <span>Total Repayment</span>
              <span>{formatINR(totalRepayment)}</span>
            </div>
          </div>

          <button
            onClick={() => setShowApplyModal(true)}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all"
          >
            Proceed with Sanction Request
          </button>
        </div>
      </div>

      {/* Apply Loan Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900">Instant Loan Application</span>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">✕</button>
            </div>

            <form onSubmit={handleApply} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Loan Category</label>
                <select
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value as any)}
                  className="w-full py-2 px-3 rounded-xl bank-input text-slate-900"
                >
                  <option value="PERSONAL">Personal Loan (11.5% APY)</option>
                  <option value="HOME">Home Loan (8.4% APY)</option>
                  <option value="AUTO">Auto EV Loan (9.25% APY)</option>
                  <option value="EDUCATION">Education Loan (8.75% APY)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Principal Amount (INR)</label>
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full py-2 px-3 rounded-xl bank-input text-slate-900 font-mono font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tenure (Months)</label>
                <input
                  type="number"
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full py-2 px-3 rounded-xl bank-input text-slate-900 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Purpose / End-Use</label>
                <input
                  type="text"
                  placeholder="e.g. Home Renovation, EV Vehicle Purchase"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bank-input text-slate-900"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isApplying}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all disabled:opacity-50"
              >
                {isApplying ? "Submitting Application..." : "Submit Loan Application"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
