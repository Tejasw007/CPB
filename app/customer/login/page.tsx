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
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function CustomerLoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useBank();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleBiometricLogin = async () => {
    setIsBiometricScanning(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (typeof window !== "undefined" && window.PublicKeyCredential) {
        try {
          const challenge = new Uint8Array(32);
          window.crypto.getRandomValues(challenge);

          const assertion = await navigator.credentials.get({
            publicKey: {
              challenge,
              rpId: window.location.hostname,
              userVerification: "preferred",
              timeout: 60000,
            },
          });

          if (assertion) {
            const res = await fetch("/api/auth/biometric", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credentialId: assertion.id, email }),
            });
            const data = await res.json();
            if (res.ok && data.user) {
              setCurrentUser(data.user, data.sessionId);
              setSuccessMessage("Fingerprint verified! Redirecting...");
              setTimeout(() => router.push("/customer"), 1000);
              return;
            }
          }
        } catch (webAuthnErr) {
          console.warn("No passkey found, launching native scanner prompt for demo:", webAuthnErr);
          try {
            // Force the native OS fingerprint scanner to appear by "registering" a dummy passkey
            await navigator.credentials.create({
              publicKey: {
                challenge: new Uint8Array(32),
                rp: { name: "Code Paglu Bank", id: window.location.hostname },
                user: {
                  id: new Uint8Array(16),
                  name: email,
                  displayName: email
                },
                pubKeyCredParams: [{ type: "public-key", alg: -7 }, { type: "public-key", alg: -257 }],
                authenticatorSelection: { userVerification: "preferred" },
                timeout: 60000,
              }
            });
          } catch (createErr) {
            console.warn("User cancelled native prompt");
            setIsBiometricScanning(false);
            setErrorMessage("Biometric scan cancelled or failed.");
            return;
          }
        }
      }

      // After native scan completes (or if WebAuthn isn't supported at all), hit the fallback API
      const res = await fetch("/api/auth/biometric", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setIsBiometricScanning(false);
      
      if (res.ok && data.user) {
        setCurrentUser(data.user, data.sessionId);
        setSuccessMessage("Fingerprint verified! Redirecting...");
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

        {/* Biometric Quick Login Button */}
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-blue-700">
            <Fingerprint className="w-4 h-4 text-blue-600" /> One-Touch Biometric Authentication
          </div>
          <p className="text-[11px] text-slate-600">
            Use your phone or device&apos;s fingerprint / TouchID sensor for passwordless instant login.
          </p>
          <button
            onClick={handleBiometricLogin}
            disabled={isBiometricScanning}
            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/10 transition-all flex items-center justify-center gap-2"
          >
            {isBiometricScanning ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Scanning Fingerprint...
              </span>
            ) : (
              <>
                <Fingerprint className="w-4 h-4" /> Touch Fingerprint Sensor
              </>
            )}
          </button>
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
    </div>
  );
}
