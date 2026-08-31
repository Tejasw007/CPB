"use client";

import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { formatINR } from "@/lib/utils";
import { QrCode, ScanLine, Send, Download, CheckCircle2, AlertCircle } from "lucide-react";

export function UpiTransferWidget({ sourceAccountId, sourceBalance }: { sourceAccountId: string; sourceBalance: number }) {
  const [myUpiId, setMyUpiId] = useState("");
  const [targetUpiId, setTargetUpiId] = useState("");
  const [resolvedName, setResolvedName] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  
  const [showScanner, setShowScanner] = useState(false);
  const [showMyQr, setShowMyQr] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (sourceAccountId) {
      fetch(`/api/transfers/upi?accountId=${sourceAccountId}`)
        .then(res => res.json())
        .then(data => { if (data.success) setMyUpiId(data.upiId); });
    }
  }, [sourceAccountId]);

  useEffect(() => {
    if (showScanner) {
      const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: { width: 250, height: 250 } }, false);
      scanner.render((text) => {
        scanner.clear();
        setShowScanner(false);
        // Assuming the QR contains the upi intent or just the UPI ID
        if (text.startsWith("upi://pay")) {
          const params = new URLSearchParams(text.split("?")[1]);
          setTargetUpiId(params.get("pa") || "");
          if (params.get("am")) setAmount(params.get("am") || "");
          resolveUpiId(params.get("pa") || "");
        } else {
          setTargetUpiId(text);
          resolveUpiId(text);
        }
      }, (err) => {});
      
      return () => { scanner.clear().catch(console.error); };
    }
  }, [showScanner]);

  const resolveUpiId = async (id: string) => {
    if (!id || !id.includes("@")) {
      setResolvedName("");
      return;
    }
    const res = await fetch("/api/transfers/upi", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "RESOLVE", targetUpiId: id })
    });
    const data = await res.json();
    if (data.success) {
      setResolvedName(data.name);
    } else {
      setResolvedName("❌ Invalid UPI ID");
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetUpiId || !amount || Number(amount) <= 0) return;
    if (Number(amount) > sourceBalance) return alert("Insufficient funds");

    setIsProcessing(true);
    const res = await fetch("/api/transfers/upi", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "SEND",
        sourceAccountId,
        targetUpiId,
        amount,
        description: remarks
      })
    });
    const data = await res.json();
    setResult({ success: res.ok, data });
    setIsProcessing(false);
    if (res.ok) {
      setAmount("");
      setRemarks("");
      setTargetUpiId("");
      setResolvedName("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => { setShowScanner(true); setShowMyQr(false); setResult(null); }}
          className="py-4 rounded-2xl border-2 border-blue-600 bg-blue-50 text-blue-700 font-bold flex flex-col items-center justify-center gap-2 hover:bg-blue-100 transition-all"
        >
          <ScanLine className="w-8 h-8" />
          Scan & Pay
        </button>
        <button
          type="button"
          onClick={() => { setShowMyQr(true); setShowScanner(false); setResult(null); }}
          className="py-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 font-bold flex flex-col items-center justify-center gap-2 hover:bg-slate-100 transition-all"
        >
          <QrCode className="w-8 h-8 text-slate-500" />
          Show My QR
        </button>
      </div>

      {showScanner && (
        <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-sm text-slate-800">Scan UPI QR Code</span>
            <button onClick={() => setShowScanner(false)} className="text-red-500 text-xs font-bold">Cancel</button>
          </div>
          <div id="reader" className="w-full max-w-sm mx-auto overflow-hidden rounded-xl border border-slate-300 bg-black"></div>
        </div>
      )}

      {showMyQr && (
        <div className="p-6 rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95">
          <h3 className="font-bold text-slate-900">Receive Payments</h3>
          <div className="p-4 bg-white rounded-xl shadow-lg border border-slate-100">
            <QRCodeSVG value={`upi://pay?pa=${myUpiId}&pn=CodePagluUser`} size={200} />
          </div>
          <p className="font-mono font-bold text-lg text-blue-700 tracking-tight">{myUpiId}</p>
          <p className="text-xs text-slate-500 text-center">Scan this code using any UPI app like GPay, PhonePe, or Paytm.</p>
        </div>
      )}

      {/* Manual Form */}
      <form onSubmit={handleSend} className="space-y-4 pt-4 border-t border-slate-100">
        <div>
          <label className="block text-slate-700 font-semibold mb-1.5 text-xs">Enter Receiver UPI ID</label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. mobilenumber@okbank"
              value={targetUpiId}
              onChange={(e) => {
                setTargetUpiId(e.target.value);
                if (e.target.value.length > 5) resolveUpiId(e.target.value);
              }}
              className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-slate-900 font-bold"
              required
            />
            {resolvedName && (
              <span className={`absolute right-3 top-3 text-[11px] font-bold ${resolvedName.includes("❌") ? "text-red-500" : "text-emerald-600"}`}>
                {resolvedName}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5 text-xs">Amount (INR)</label>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 text-slate-900 font-bold text-lg"
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 font-semibold mb-1.5 text-xs">Note</label>
            <input
              type="text"
              placeholder="What's this for?"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full py-2.5 px-3.5 rounded-xl border border-slate-200 text-slate-900 text-xs"
            />
          </div>
        </div>

        {result && (
          <div className={`p-4 rounded-xl border text-xs font-medium flex items-start gap-2.5 animate-in fade-in ${
            result.success ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-red-50 text-red-800 border-red-200"
          }`}>
            {result.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            <div>
              <p className="font-bold">{result.data.message || result.data.error}</p>
              {result.data.refId && <p className="font-mono text-[10px] text-slate-500 mt-0.5">Ref: {result.data.refId}</p>}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isProcessing || !resolvedName || resolvedName.includes("❌")}
          className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : <><Send className="w-4 h-4" /> Send securely via UPI</>}
        </button>
      </form>
    </div>
  );
}
