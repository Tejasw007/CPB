"use client";

import React, { useState } from "react";
import { useBank } from "@/components/providers/BankContext";
import { formatINR, maskAccountNumber, formatDate } from "@/lib/utils";
import {
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  FileSpreadsheet,
  Download,
  Calendar,
  Building,
  PlusCircle,
  PiggyBank,
  CheckCircle2,
} from "lucide-react";

export function AccountsView() {
  const { accounts, fixedDeposits, bookFixedDeposit, transactions } = useBank();

  // Statement Filters
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id || "");
  const [startDate, setStartDate] = useState("2026-08-01");
  const [endDate, setEndDate] = useState("2026-08-31");

  // FD Booking Modal
  const [showFdModal, setShowFdModal] = useState(false);
  const [fdPrincipal, setFdPrincipal] = useState<number>(50000);
  const [fdTenureMonths, setFdTenureMonths] = useState<number>(12);
  const [isBookingFd, setIsBookingFd] = useState(false);

  const selectedAccount = accounts.find((a) => a.id === selectedAccountId) || accounts[0];
  const accountTransactions = transactions.filter((t) => t.accountId === selectedAccount?.id);

  const fdRates: Record<number, number> = {
    6: 6.75,
    12: 7.25,
    24: 7.5,
    36: 7.8,
  };

  const currentRate = fdRates[fdTenureMonths] || 7.25;
  const maturityAmount = fdPrincipal * Math.pow(1 + (currentRate / 100) / 4, (fdTenureMonths / 12) * 4);

  const handleBookFd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fdPrincipal > selectedAccount.balance) {
      alert("Insufficient funds in selected account to book Fixed Deposit.");
      return;
    }

    setIsBookingFd(true);
    const res = await bookFixedDeposit(fdPrincipal, fdTenureMonths);
    setIsBookingFd(false);

    if (res.success) {
      setShowFdModal(false);
      alert(res.message);
    }
  };

  const handleExportCsv = () => {
    const csvHeader = "Transaction ID,Date,Description,Category,Type,Amount (INR),Balance After (INR)\n";
    const csvRows = (accountTransactions || [])
      .map(
        (t) =>
          `"${t.referenceId}","${t.createdAt}","${t.description}","${t.category}","${t.type}",${t.amount},${t.balanceAfter}`
      )
      .join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `CPB_Statement_${selectedAccount.accountNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 font-bold">
              Account Portfolio
            </span>
            <span className="text-xs text-slate-500 font-mono">• Certified e-Statements</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Accounts & Term Deposits</h1>
          <p className="text-xs text-slate-500 mt-1">
            Comprehensive account management, high-yield fixed deposits, and certified statement downloads.
          </p>
        </div>

        <button
          onClick={() => setShowFdModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/10 transition-all flex items-center gap-2"
        >
          <PiggyBank className="w-4 h-4" /> Book Fixed Deposit
        </button>
      </div>

      {/* Accounts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            onClick={() => setSelectedAccountId(acc.id)}
            className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-4 ${
              selectedAccountId === acc.id
                ? "bg-white border-blue-500 shadow-md ring-1 ring-blue-500"
                : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">{acc.type} Account</h2>
              </div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                {acc.tier} TIER
              </span>
            </div>

            <div>
              <p className="text-xs text-slate-500 font-medium">Available Balance</p>
              <p className="text-3xl font-extrabold font-mono text-slate-900 mt-0.5">{formatINR(acc.balance)}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-slate-100">
              <div>
                <span className="text-slate-400 text-[10px]">Account #</span>
                <p className="text-slate-700 font-bold">{maskAccountNumber(acc.accountNumber)}</p>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px]">IFSC Code</span>
                <p className="text-slate-700 font-bold">{acc.ifsc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Term Deposits (FDs) Section */}
      {fixedDeposits.length > 0 && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Active Fixed Deposits</h2>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold">
              UP TO 7.80% APY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fixedDeposits.map((fd) => (
              <div key={fd.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
                <div className="flex justify-between items-start">
                  <span className="font-sans font-bold text-slate-900">Term Deposit #{fd.id.slice(-4)}</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded font-bold">
                    {fd.rate}% APY
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Principal:</span>
                  <span className="font-bold text-slate-900">{formatINR(fd.principal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Maturity Value:</span>
                  <span className="font-bold text-emerald-700">{formatINR(fd.maturityAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-200">
                  <span>Tenure: {fd.tenureMonths} Mo</span>
                  <span>Matures: {formatDate(fd.maturityDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certified Statement Generator & CSV Exporter */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Certified Account Statement</h2>
            <p className="text-xs text-slate-500">
              Generating for {selectedAccount?.type} Account ({maskAccountNumber(selectedAccount?.accountNumber)})
            </p>
          </div>

          <button
            onClick={handleExportCsv}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all flex items-center gap-2 self-start sm:self-auto shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" /> Export CSV Statement
          </button>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-mono text-[10px] uppercase">
                <th className="pb-3 pl-2">Date</th>
                <th className="pb-3">Reference ID</th>
                <th className="pb-3">Narration / Description</th>
                <th className="pb-3">Category</th>
                <th className="pb-3 text-right">Amount</th>
                <th className="pb-3 text-right pr-2">Closing Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(accountTransactions || []).map((txn) => {
                const isCredit = txn.type === "CREDIT";
                return (
                  <tr key={txn.id} className="hover:bg-slate-50/70">
                    <td className="py-3 pl-2 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                      {formatDate(txn.createdAt)}
                    </td>
                    <td className="py-3 font-mono text-[11px] text-blue-600 font-bold">{txn.referenceId}</td>
                    <td className="py-3 font-medium text-slate-900">{txn.description}</td>
                    <td className="py-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {txn.category}
                      </span>
                    </td>
                    <td className={`py-3 text-right font-mono font-bold whitespace-nowrap ${
                      isCredit ? "text-emerald-700" : "text-slate-900"
                    }`}>
                      {isCredit ? "+" : "-"}{formatINR(txn.amount)}
                    </td>
                    <td className="py-3 text-right pr-2 font-mono text-slate-700 font-medium">
                      {formatINR(txn.balanceAfter)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book FD Modal */}
      {showFdModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900">Book High-Yield Fixed Deposit</span>
              <button onClick={() => setShowFdModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">✕</button>
            </div>

            <form onSubmit={handleBookFd} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Deposit Principal (INR)</label>
                <input
                  type="number"
                  min={10000}
                  step={5000}
                  value={fdPrincipal}
                  onChange={(e) => setFdPrincipal(Number(e.target.value))}
                  className="w-full py-2.5 px-3 rounded-xl bank-input font-mono font-bold text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tenure Period</label>
                <div className="grid grid-cols-4 gap-2 font-mono">
                  {[
                    { months: 6, label: "6 Mo", rate: "6.75%" },
                    { months: 12, label: "1 Yr", rate: "7.25%" },
                    { months: 24, label: "2 Yr", rate: "7.50%" },
                    { months: 36, label: "3 Yr", rate: "7.80%" },
                  ].map((t) => (
                    <button
                      key={t.months}
                      type="button"
                      onClick={() => setFdTenureMonths(t.months)}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        fdTenureMonths === t.months
                          ? "bg-blue-50 border-blue-500 text-blue-700 font-bold"
                          : "bg-slate-50 border-slate-200 text-slate-600"
                      }`}
                    >
                      <p className="font-sans font-semibold">{t.label}</p>
                      <p className="text-[10px] text-emerald-700 font-bold">{t.rate}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Interest Rate:</span>
                  <span className="text-emerald-700 font-bold">{currentRate}% p.a.</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Maturity Value:</span>
                  <span className="text-slate-900 font-bold text-sm">{formatINR(maturityAmount)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isBookingFd}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all disabled:opacity-50"
              >
                {isBookingFd ? "Booking Term Deposit..." : "Confirm & Book Fixed Deposit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
