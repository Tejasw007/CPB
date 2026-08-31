"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Building2,
  ShieldCheck,
  Terminal,
  ArrowRight,
  Fingerprint,
  CheckCircle2,
  Smartphone,
  Cpu,
  LogIn,
} from "lucide-react";

export default function HomePage() {
  const portals = [
    {
      title: "Customer Banking Portal",
      loginHref: "/customer/login",
      icon: Sparkles,
      color: "from-blue-600 to-indigo-600",
      accent: "text-blue-700 bg-blue-50 border-blue-100",
      badge: "Personal & Retail Banking",
      description:
        "Dedicated portal for retail banking customers: manage savings & current accounts, execute atomic double-entry ledger transfers, customize card limits, and log in with phone fingerprint biometrics.",
      features: [
        "Live Net Worth & Accounts Analytics",
        "Instant Double-Entry Ledger Transfers",
        "3D Debit & Credit Card Controls",
        "One-Touch Phone Fingerprint Login",
      ],
      loginLabel: "Sign In to Customer Portal",
      btnColor: "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10",
    },
    {
      title: "Staff Operations Portal",
      loginHref: "/staff/login",
      icon: Building2,
      color: "from-emerald-600 to-teal-700",
      accent: "text-emerald-700 bg-emerald-50 border-emerald-100",
      badge: "Branch Staff Desk",
      description:
        "Dedicated portal for branch tellers, loan officers, and branch managers: generate & dispatch digital onboarding links, verify customer KYC with OCR, and run counter cash ops.",
      features: [
        "Customer Onboarding Link Dispatcher",
        "KYC Verification Station with OCR",
        "Teller Cash Counter Denomination Grid",
        "Dual Auth Maker-Checker Reversal Queue",
      ],
      loginLabel: "Staff Desk Login",
      btnColor: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/10",
    },
    {
      title: "Executive Admin & Risk Portal",
      loginHref: "/admin/login",
      icon: ShieldCheck,
      color: "from-purple-600 to-indigo-800",
      accent: "text-purple-700 bg-purple-50 border-purple-100",
      badge: "Executive & CISO",
      description:
        "Dedicated portal for executive management, compliance officers, and CISOs: monitor bank-wide KPIs, track AML suspicious transactions, adjust live savings/FD rates, and manage RBAC.",
      features: [
        "Bank-wide Financial KPIs & DEFCON Protocol",
        "AML & Suspicious Activity Alert Radar",
        "Dynamic Interest Rates Spread Editor",
        "Role-Permission Governance Matrix",
      ],
      loginLabel: "Admin CISO Login",
      btnColor: "bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/10",
    },
    {
      title: "DevOps & Infrastructure Console",
      loginHref: "/server/login",
      icon: Terminal,
      color: "from-slate-800 to-slate-950",
      accent: "text-slate-700 bg-slate-100 border-slate-200",
      badge: "SRE & Cloud Infra",
      description:
        "Dedicated portal for Lead SREs and DevOps engineers: monitor TiDB Cloud cluster latency, review live log streams, run guarded read-only SQL queries, and trigger production rollbacks.",
      features: [
        "Multi-Service Latency & TiDB Pool Health",
        "Safe Read-Only SQL Console (Write Blocked)",
        "1-Click Production Release Rollback Station",
        "Sanitized Secrets & Environment Inspector",
      ],
      loginLabel: "DevOps Console Login",
      btnColor: "bg-slate-900 hover:bg-slate-800 text-white shadow-md",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col justify-between">
      {/* Top Header */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-lg shadow-md shadow-blue-500/20">
            CPB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                CODE PAGLU BANK
              </span>
              <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.2 rounded-full font-bold">
                CORE SYSTEM
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Enterprise Banking & FinTech Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            TiDB Cloud MySQL Online
          </div>
          <Link
            href="/customer/login"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/10 transition-all flex items-center gap-1.5"
          >
            <Fingerprint className="w-3.5 h-3.5" /> Customer Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-10 space-y-10 flex-1">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Cpu className="w-3.5 h-3.5" /> 4 Independent Banking Portals
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Dedicated Core Portals for Every Banking Role
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Select your designated portal below to sign in. Each portal operates as an independent, secure application with its own dedicated authentication and workflows.
          </p>
        </div>

        {/* 4 Dedicated Portal Entry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <div
                key={portal.title}
                className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${portal.color} text-white flex items-center justify-center shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {portal.title}
                        </h2>
                        <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border font-bold ${portal.accent}`}>
                          {portal.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{portal.description}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-[11px] font-bold text-slate-700 uppercase font-mono">Dedicated Capabilities:</p>
                    <ul className="space-y-1.5">
                      {portal.features.map((feat, i) => (
                        <li key={i} className="text-xs text-slate-600 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={portal.loginHref}
                    className={`w-full py-3.5 px-4 rounded-2xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${portal.btnColor}`}
                  >
                    <LogIn className="w-4 h-4" /> {portal.loginLabel} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Highlight: Mobile Biometric Onboarding */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
              <Smartphone className="w-4 h-4" /> Seamless Digital Onboarding Flow
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Instant Account Opening with Phone Fingerprint KYC
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Branch staff generate customer onboarding links from the dedicated Staff Portal. Customers open the link on their smartphone, verify PAN/Aadhaar, and register their device&apos;s built-in fingerprint sensor for instant account opening.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/staff/login"
              className="py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md text-center transition-all"
            >
              Staff Portal Login
            </Link>
            <Link
              href="/customer/login"
              className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold text-center transition-all flex items-center justify-center gap-2"
            >
              <Fingerprint className="w-4 h-4 text-emerald-400" /> Customer Biometric Login
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500 font-mono">
        <p>© 2026 Code Paglu Bank (CPB) • Core Banking Platform • All Rights Reserved</p>
      </footer>
    </div>
  );
}
