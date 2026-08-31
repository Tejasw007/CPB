"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBank } from "@/components/providers/BankContext";
import { DEMO_PERSONAS } from "@/lib/auth/session";
import {
  ShieldCheck,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  KeyRound,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useBank();

  const [email, setEmail] = useState("admin@cpb.bank");
  const [password, setPassword] = useState("Admin@2026");
  const [twoFactorCode, setTwoFactorCode] = useState("892104");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPersona = DEMO_PERSONAS.find((p) => p.email === email) || DEMO_PERSONAS.find((p) => p.role === "ADMIN");
    if (adminPersona) {
      setCurrentUser(adminPersona);
      router.push("/admin");
    } else {
      setErrorMessage("Unauthorized admin credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-600 text-white font-mono font-bold text-xl shadow-lg shadow-purple-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Executive Admin Portal</h1>
          <p className="text-xs text-slate-500 font-medium">CISO Governance & AML Risk Radar Console</p>
        </div>

        {/* Form */}
        <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Executive / CISO Email</label>
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
            <label className="block font-semibold text-slate-700 mb-1">Master Password</label>
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

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Hardware 2FA / TOTP Token</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-3 text-purple-600" />
              <input
                type="text"
                maxLength={6}
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bank-input text-slate-900 font-mono font-bold tracking-widest"
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
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md shadow-purple-500/10 transition-all flex items-center justify-center gap-2"
          >
            Authorize Admin Session <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Credentials helper */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-mono space-y-1">
          <p className="font-sans font-bold text-slate-800">Admin Credentials:</p>
          <p>Email: <span className="text-purple-700 font-bold">admin@cpb.bank</span></p>
          <p>Password: <span className="text-purple-700 font-bold">Admin@2026</span></p>
          <p>2FA Token: <span className="text-purple-700 font-bold">892104</span></p>
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
