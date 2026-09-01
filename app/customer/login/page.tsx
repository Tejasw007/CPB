"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBank } from "@/components/providers/BankContext";
import {
  Fingerprint,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ScanFace,
} from "lucide-react";
import { FingerprintModal } from "@/components/auth/FingerprintModal";
import { FaceScanModal } from "@/components/auth/FaceScanModal";

export default function CustomerLoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useBank();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showFingerprintModal, setShowFingerprintModal] = useState(false);
  const [showFaceScanModal, setShowFaceScanModal] = useState(false);

  const handlePasswordLogin = async (e: React.FormEvent) => {
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
        router.push("/customer");
      } else {
        setErrorMessage(data.error || "Invalid credentials or account not found.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Login failed");
    }
  };

  const executeBiometricLogin = async () => {
    setShowFingerprintModal(false);
    setShowFaceScanModal(false);
    setIsBiometricScanning(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/auth/biometric", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setIsBiometricScanning(false);
      
      if (res.ok && data.user) {
        setCurrentUser(data.user, data.sessionId);
        setSuccessMessage("Authentication verified! Redirecting...");
        setTimeout(() => router.push("/customer"), 1000);
      } else {
        setErrorMessage(data.error || "Biometric sensor match not found.");
      }
    } catch (e: any) {
      setIsBiometricScanning(false);
      setErrorMessage(e.message || "Biometric authentication failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white font-mono font-bold text-xl shadow-lg shadow-blue-500/20">
            CPB
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Customer Banking Portal</h1>
          <p className="text-xs text-slate-500 font-medium">Secure sign in to your Code Paglu Bank account</p>
        </div>

        {/* Biometric Quick Login Buttons */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-blue-700">
            <Fingerprint className="w-4 h-4 text-blue-600" /> Biometric Authentication
          </div>
          <p className="text-[11px] text-slate-600">
            Use your device's biometrics for passwordless instant login.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowFingerprintModal(true)}
              disabled={isBiometricScanning}
              className="py-2.5 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-blue-700 font-semibold text-xs transition-all flex items-center justify-center gap-2"
            >
              <Fingerprint className="w-4 h-4" /> Fingerprint
            </button>
            <button
              onClick={() => setShowFaceScanModal(true)}
              disabled={isBiometricScanning}
              className="py-2.5 rounded-xl border border-blue-200 bg-white hover:bg-blue-50 text-blue-700 font-semibold text-xs transition-all flex items-center justify-center gap-2"
            >
              <ScanFace className="w-4 h-4" /> Face ID
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-[1px] bg-slate-200 flex-1" />
          <span className="text-[11px] text-slate-400 font-medium uppercase">Or with credentials</span>
          <div className="h-[1px] bg-slate-200 flex-1" />
        </div>

        {/* Password Form */}
        <form onSubmit={handlePasswordLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Registered Email Address</label>
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
            <label className="block font-semibold text-slate-700 mb-1">Password</label>
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

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 text-[11px] flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> {successMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            Sign In to Customer Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* (Demo credentials helper removed per user request) */}

        <div className="pt-2 text-center text-xs text-slate-500">
          <Link href="/" className="font-semibold text-blue-600 hover:underline">
            ← Return to Bank Portal Hub
          </Link>
        </div>
      </div>
      
      {/* Independent Fingerprint Modal */}
      <FingerprintModal 
        isOpen={showFingerprintModal} 
        onClose={() => setShowFingerprintModal(false)}
        onSuccess={executeBiometricLogin}
      />
      
      {/* Independent Face Recognition Modal */}
      <FaceScanModal 
        isOpen={showFaceScanModal} 
        onClose={() => setShowFaceScanModal(false)}
        onSuccess={executeBiometricLogin}
      />
    </div>
  );
}
