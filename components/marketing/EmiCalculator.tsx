"use client";

import React, { useState, useEffect } from "react";
import { Calculator } from "lucide-react";

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(36);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    // EMI Formula: P x R x (1+R)^N / [(1+R)^N-1]
    const p = principal;
    const r = rate / 12 / 100;
    const n = tenure;
    
    if (r === 0) {
      setEmi(p / n);
      setTotalInterest(0);
      setTotalPayment(p);
      return;
    }

    const emiAmount = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiAmount * n;
    const interest = totalPay - p;

    setEmi(emiAmount);
    setTotalPayment(totalPay);
    setTotalInterest(interest);
  }, [principal, rate, tenure]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-8 relative">
        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">EMI Calculator</h3>
          <p className="text-xs text-slate-500">Plan your next big purchase instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative">
        <div className="space-y-6">
          {/* Principal Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold text-slate-700">Loan Amount</label>
              <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900">
                {formatCurrency(principal)}
              </div>
            </div>
            <input
              type="range"
              min="50000"
              max="5000000"
              step="50000"
              value={principal}
              onChange={(e) => setPrincipal(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹50K</span>
              <span>₹50L</span>
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold text-slate-700">Interest Rate (p.a.)</label>
              <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900">
                {rate.toFixed(1)}%
              </div>
            </div>
            <input
              type="range"
              min="6"
              max="24"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>6%</span>
              <span>24%</span>
            </div>
          </div>

          {/* Tenure Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <label className="text-sm font-semibold text-slate-700">Tenure (Months)</label>
              <div className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900">
                {tenure} Mo
              </div>
            </div>
            <input
              type="range"
              min="12"
              max="120"
              step="6"
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1 Yr</span>
              <span>10 Yrs</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Your Monthly EMI</p>
          <p className="text-4xl md:text-5xl font-black text-blue-600 tracking-tight mb-8">
            {formatCurrency(emi)}<span className="text-lg text-slate-400 font-normal">/mo</span>
          </p>

          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">Principal Amount</span>
              <span className="font-semibold text-slate-900">{formatCurrency(principal)}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <span className="text-sm text-slate-600">Total Interest</span>
              <span className="font-semibold text-slate-900">{formatCurrency(totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-slate-800">Total Amount Payable</span>
              <span className="font-bold text-slate-900">{formatCurrency(totalPayment)}</span>
            </div>
          </div>

          <button className="w-full mt-8 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-md">
            Apply for Loan Now
          </button>
        </div>
      </div>
    </div>
  );
}
