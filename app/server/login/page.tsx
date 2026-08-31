"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBank } from "@/components/providers/BankContext";
import { DEMO_PERSONAS } from "@/lib/auth/session";
import {
  Terminal,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Key,
} from "lucide-react";

export default function ServerLoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useBank();

  const [email, setEmail] = useState("devops@cpb.bank");
  const [apiKey, setApiKey] = useState("cpb_sre_sec_99182a4c");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSreLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const srePersona = DEMO_PERSONAS.find((p) => p.email === email) || DEMO_PERSONAS.find((p) => p.role === "INFRA_ADMIN");
    if (srePersona) {
      setCurrentUser(srePersona);
      router.push("/server");
    } else {
      setErrorMessage("SRE Key rejected or session expired.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 text-emerald-400 font-mono font-bold text-xl shadow-lg">
            <Terminal className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">DevOps & SRE Console</h1>
          <p className="text-xs text-slate-500 font-medium">Core Infrastructure & Telemetry Gateway</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSreLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Lead SRE Official Email</label>
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
            <label className="block font-semibold text-slate-700 mb-1">Infra Cluster API Access Key</label>
            <div className="relative">
              <Key className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
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
            className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            Connect to Infra Command Center <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Credentials helper */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-mono space-y-1">
          <p className="font-sans font-bold text-slate-800">DevOps / SRE Credentials:</p>
          <p>Email: <span className="text-slate-900 font-bold">devops@cpb.bank</span></p>
          <p>API Key: <span className="text-slate-900 font-bold">cpb_sre_sec_99182a4c</span></p>
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
