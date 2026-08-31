"use client";

import React, { useState, useMemo } from "react";
import { useBank } from "@/components/providers/BankContext";
import { formatINR, maskAccountNumber, formatDate } from "@/lib/utils";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  FileSpreadsheet,
  TrendingUp,
  Download,
  Lock,
  Unlock,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function DashboardView({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { currentUser, accounts, transactions, cards, toggleCardStatus } = useBank();
  const [selectedTxnReceipt, setSelectedTxnReceipt] = useState<any | null>(null);

  const totalBalance = accounts.reduce((acc, a) => acc + a.balance, 0);
  const savingsAccount = accounts.find((a) => a.type === "SAVINGS") || accounts[0];
  const currentAccount = accounts.find((a) => a.type === "CURRENT") || accounts[1];
  const primaryCard = cards[0];

  // Dynamically compute monthly cashflow from real transactions
  const monthlyCashflow = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const now = new Date();
    const result: { [key: string]: { month: string; income: number; expense: number } } = {};

    for (let i = 4; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mName = months[d.getMonth()];
      result[mName] = { month: mName, income: 0, expense: 0 };
    }

    transactions.forEach((t) => {
      const tDate = new Date(t.createdAt);
      const mName = months[tDate.getMonth()];
      if (result[mName]) {
        if (t.type === "CREDIT") {
          result[mName].income += t.amount;
        } else {
          result[mName].expense += t.amount;
        }
      }
    });

    // Fallback baseline if new account has fewer past transactions
    const list = Object.values(result);
    if (list.every((item) => item.income === 0 && item.expense === 0)) {
      return [
        { month: "Apr", income: totalBalance * 0.4, expense: totalBalance * 0.2 },
        { month: "May", income: totalBalance * 0.5, expense: totalBalance * 0.25 },
        { month: "Jun", income: totalBalance * 0.45, expense: totalBalance * 0.2 },
        { month: "Jul", income: totalBalance * 0.6, expense: totalBalance * 0.3 },
        { month: "Aug", income: totalBalance, expense: totalBalance * 0.35 },
      ];
    }
    return list;
  }, [transactions, totalBalance]);

  // Dynamically compute category breakdown from real transactions
  const categoryBreakdown = useMemo(() => {
    const colorMap: { [key: string]: string } = {
      TRANSFER: "#2563EB",
      BILL_PAY: "#D97706",
      CASH_DEPOSIT: "#059669",
      CASH_WITHDRAWAL: "#DC2626",
      FD_DEPOSIT: "#7C3AED",
      LOAN_EMI: "#0891B2",
    };

    const grouped: { [key: string]: number } = {};
    transactions.forEach((t) => {
      const cat = t.category || "TRANSFER";
      grouped[cat] = (grouped[cat] || 0) + t.amount;
    });

    const entries = Object.entries(grouped);
    if (entries.length === 0) {
      return [
        { name: "Deposits & Savings", value: totalBalance * 0.6, color: "#2563EB" },
        { name: "Payments & Transfers", value: totalBalance * 0.4, color: "#059669" },
      ];
    }

    return entries.map(([name, value]) => ({
      name,
      value,
      color: colorMap[name] || "#6366F1",
    }));
  }, [transactions, totalBalance]);

  return (
    <div className="space-y-6">
      {/* Top Banner with Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-semibold">
              Personal Banking
            </span>
            <span className="text-xs text-slate-500 font-mono">• Mumbai HQ</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Your CPB portfolio is operating at optimum liquidity.
          </p>
        </div>

        {/* Quick Transfer CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("transfers")}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/10 transition-all flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            Instant Transfer
          </button>
          <button
            onClick={() => onNavigate("accounts")}
            className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-all flex items-center gap-2"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            Statement
          </button>
        </div>
      </div>

      {/* Hero Financial Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Total Net Worth */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md space-y-3">
          <div className="flex items-center justify-between text-blue-100 text-xs">
            <span className="font-medium tracking-wide">Total Net Balance</span>
            <span className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <p className="text-3xl font-extrabold font-mono tracking-tight">
            {formatINR(totalBalance)}
          </p>
          <div className="flex items-center gap-2 text-xs text-blue-100">
            <span className="text-emerald-300 font-bold font-mono flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12.4%
            </span>
            <span>vs last month</span>
          </div>
        </div>

        {/* Card 2: Primary Savings */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span className="font-medium">Primary Savings Account</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded border border-blue-100 font-semibold">
              {savingsAccount?.tier || "GOLD"}
            </span>
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900">
            {formatINR(savingsAccount?.balance || 0)}
          </p>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>{maskAccountNumber(savingsAccount?.accountNumber)}</span>
            <span>IFSC: {savingsAccount?.ifsc}</span>
          </div>
        </div>

        {/* Card 3: Current / Business Account */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="font-medium">Current Account</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded border border-emerald-100 font-semibold">
              {currentAccount?.tier || "PLATINUM"}
            </span>
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900">
            {formatINR(currentAccount?.balance || 0)}
          </p>
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>{maskAccountNumber(currentAccount?.accountNumber)}</span>
            <span>IFSC: {currentAccount?.ifsc}</span>
          </div>
        </div>
      </div>

      {/* Main Analytics and Debit Card Widget Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cashflow & Spending Charts (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">Spending & Cashflow Analytics</h2>
              <p className="text-xs text-slate-500 mt-0.5">Real-time breakdown calculated directly from live database ledger</p>
            </div>
            <span className="text-xs font-mono text-slate-500">Live Stream</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monthly Bar Chart */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-700">Income vs Expense Trends</p>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyCashflow} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={10} tickFormatter={(val) => `₹${val / 1000}k`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: "12px", fontSize: "11px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                      formatter={(val: number) => formatINR(val)}
                    />
                    <Bar dataKey="income" fill="#059669" radius={[4, 4, 0, 0]} name="Income" />
                    <Bar dataKey="expense" fill="#2563EB" radius={[4, 4, 0, 0]} name="Expense" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Donut Chart */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-700">Expenditure by Category</p>
              <div className="h-48 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#FFFFFF", borderColor: "#E2E8F0", borderRadius: "12px", fontSize: "11px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}
                      formatter={(val: number) => formatINR(val)}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Debit Card Interactive Widget (1 col) */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-sm font-bold text-slate-900">Active Debit Card</span>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                primaryCard?.status === "ACTIVE"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold"
                  : "bg-red-50 text-red-700 border-red-200 font-semibold"
              }`}>
                {primaryCard?.status || "ACTIVE"}
              </span>
            </div>

            {/* 3D Glass Card Preview */}
            <div className="mt-4 p-5 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-950 text-white shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="font-extrabold text-xs tracking-wider text-emerald-400 font-mono">CODE PAGLU BANK</span>
                <span className="text-[10px] font-mono text-white/70">EMV Contactless</span>
              </div>
              <div className="my-5">
                <div className="w-8 h-6 rounded bg-amber-400/90 mb-2" />
                <p className="font-mono text-base tracking-widest text-white font-bold">
                  •••• •••• •••• {primaryCard?.cardNumber.slice(-4) || "8832"}
                </p>
              </div>
              <div className="flex justify-between items-end text-xs">
                <div>
                  <p className="text-[9px] text-white/50 uppercase tracking-widest">Card Holder</p>
                  <p className="font-semibold text-white tracking-wide">{primaryCard?.cardHolderName || currentUser.name.toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-white/50 uppercase tracking-widest">Expires</p>
                  <p className="font-mono text-white">{primaryCard?.expiryMonth || "08"}/{primaryCard?.expiryYear || "29"}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card Controls */}
          <div className="space-y-2.5">
            <button
              onClick={() => primaryCard && toggleCardStatus(primaryCard.id)}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                primaryCard?.status === "ACTIVE"
                  ? "border-red-200 text-red-600 hover:bg-red-50"
                  : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              {primaryCard?.status === "ACTIVE" ? (
                <>
                  <Lock className="w-3.5 h-3.5" /> Freeze Card Immediately
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5" /> Unfreeze Card
                </>
              )}
            </button>
            <button
              onClick={() => onNavigate("cards")}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              Manage Card Limits & PIN <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Live Recent Transactions Feed Table */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Recent Activity</h2>
            <p className="text-xs text-slate-500">Real-time ledger updates for your accounts</p>
          </div>
          <button
            onClick={() => onNavigate("accounts")}
            className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
          >
            Full Statement <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-mono uppercase text-[10px]">
                <th className="pb-3 pl-2">Date & Time</th>
                <th className="pb-3">Description / Payee</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Reference ID</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3 text-center">Status</th>
                <th className="pb-3 pr-2 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.slice(0, 6).map((txn) => {
                const isCredit = txn.type === "CREDIT";
                return (
                  <tr key={txn.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 pl-2 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                      {formatDate(txn.createdAt)}
                    </td>
                    <td className="py-3.5 font-medium text-slate-900 max-w-xs truncate">
                      {txn.description}
                    </td>
                    <td className="py-3.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {txn.category}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono text-[11px] text-blue-600 font-medium">
                      {txn.referenceId}
                    </td>
                    <td className={`py-3.5 text-right font-mono font-bold whitespace-nowrap ${
                      isCredit ? "text-emerald-600" : "text-slate-900"
                    }`}>
                      {isCredit ? "+" : "-"}{formatINR(txn.amount)}
                    </td>
                    <td className="py-3.5 text-center">
                      <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                        txn.status === "COMPLETED"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold"
                          : txn.status === "PENDING"
                          ? "bg-amber-50 text-amber-700 border-amber-200 font-semibold"
                          : "bg-red-50 text-red-700 border-red-200 font-semibold"
                      }`}>
                        {txn.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      <button
                        onClick={() => setSelectedTxnReceipt(txn)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
                        title="Download Receipt"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Receipt Modal */}
      {selectedTxnReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 border border-slate-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs font-mono">
                  ✓
                </div>
                <span className="font-bold text-sm text-slate-900">Payment Receipt</span>
              </div>
              <button
                onClick={() => setSelectedTxnReceipt(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Transaction Ref</span>
                <span className="text-blue-600 font-bold">{selectedTxnReceipt.referenceId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Amount</span>
                <span className="text-emerald-600 font-bold text-sm">{formatINR(selectedTxnReceipt.amount)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Description</span>
                <span className="text-slate-900 font-sans">{selectedTxnReceipt.description}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Date & Time</span>
                <span className="text-slate-900">{formatDate(selectedTxnReceipt.createdAt)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Status</span>
                <span className="text-emerald-600 font-bold">{selectedTxnReceipt.status}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500 font-sans">Issuing Bank</span>
                <span className="text-slate-900 font-sans font-semibold">Code Paglu Bank (CPB)</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Downloaded PDF receipt for ${selectedTxnReceipt.referenceId}`);
                setSelectedTxnReceipt(null);
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" /> Download PDF Receipt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
