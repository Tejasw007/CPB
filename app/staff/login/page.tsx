"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBank } from "@/components/providers/BankContext";
import { DEMO_PERSONAS } from "@/lib/auth/session";
import {
  Building2,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Key,
} from "lucide-react";

export default function StaffLoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useBank();

  const [email, setEmail] = useState("staff@cpb.bank");
  const [employeeId, setEmployeeId] = useState("CPB-EMP-4012");
  const [password, setPassword] = useState("Staff@2026");
  const [errorMessage, setErrorMessage] = useState("");

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setCurrentUser(data.user, data.sessionId);
        router.push("/staff");
      } else {
        setErrorMessage(data.error || "Invalid Staff credentials.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600 text-white font-mono font-bold text-xl shadow-lg shadow-emerald-500/20">
            <Building2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Staff Operations Desk</h1>
          <p className="text-xs text-slate-500 font-medium">Branch Portal • Mumbai Nariman Point HQ (CPB001)</p>
        </div>

        {/* Staff Credentials Form */}
        <form onSubmit={handleStaffLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Staff Official Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bank-input text-slate-900 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Staff / Employee ID</label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bank-input text-slate-900 font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Authorization Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bank-input text-slate-900 font-mono"
                required
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 text-red-600 border border-red-100 text-[11px] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md shadow-emerald-500/10 transition-all flex items-center justify-center gap-2"
          >
            Authenticate & Open Staff Desk <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Credentials helper */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-mono space-y-1">
          <p className="font-sans font-bold text-slate-800">Staff Credentials:</p>
          <p>Email: <span className="text-emerald-700 font-bold">staff@cpb.bank</span></p>
          <p>Employee ID: <span className="text-emerald-700 font-bold">CPB-EMP-4012</span></p>
          <p>Password: <span className="text-emerald-700 font-bold">Staff@2026</span></p>
        </div>

        <div className="pt-2 text-center text-xs text-slate-500">
          <Link href="/" className="font-semibold text-blue-600 hover:underline">
            ← Return to Bank Portal Hub
          </Link>
        </div>
      </div>
    </div>
  );
}
