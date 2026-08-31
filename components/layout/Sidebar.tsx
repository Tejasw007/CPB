"use client";

import React from "react";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  CreditCard,
  Banknote,
  LifeBuoy,
  Users,
  CheckSquare,
  Repeat,
  Sliders,
  ShieldAlert,
  FileText,
  Activity,
  Terminal,
  RotateCcw,
  AlertOctagon,
  UserPlus,
} from "lucide-react";

interface SidebarProps {
  activePortal: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activePortal, activeTab, setActiveTab }: SidebarProps) {
  const customerNav = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "accounts", label: "Accounts & FDs", icon: Wallet },
    { id: "transfers", label: "Transfers & Pay", icon: ArrowLeftRight },
    { id: "cards", label: "Cards & Security", icon: CreditCard },
    { id: "loans", label: "Loans & Credit", icon: Banknote },
    { id: "support", label: "Support & Help", icon: LifeBuoy },
  ];

  const staffNav = [
    { id: "staff-ops", label: "Operations Desk", icon: LayoutDashboard },
    { id: "staff-onboard", label: "Customer Onboarding Link", icon: UserPlus },
    { id: "staff-kyc", label: "KYC Queue", icon: CheckSquare },
    { id: "staff-counter", label: "Counter Cash Ops", icon: Wallet },
    { id: "staff-loans", label: "Loan Underwriting", icon: Banknote },
    { id: "staff-reversals", label: "Reversal Queue", icon: Repeat },
  ];

  const adminNav = [
    { id: "admin-overview", label: "Executive Radar", icon: LayoutDashboard },
    { id: "admin-salami", label: "Service Charges", icon: Repeat },
    { id: "admin-params", label: "Financial Controls", icon: Sliders },
    { id: "admin-aml", label: "AML Risk Alert", icon: ShieldAlert },
    { id: "admin-roles", label: "Role Matrix", icon: Users },
    { id: "admin-audit", label: "Audit Vault", icon: FileText },
  ];

  const serverNav = [
    { id: "server-health", label: "Service Status", icon: Activity },
    { id: "server-deployments", label: "Deploy & Rollback", icon: RotateCcw },
    { id: "server-logs", label: "Live Log Stream", icon: FileText },
    { id: "server-sql", label: "Read-Only SQL", icon: Terminal },
    { id: "server-incidents", label: "Incident Log", icon: AlertOctagon },
  ];

  let currentNav = customerNav;
  if (activePortal === "staff") currentNav = staffNav;
  else if (activePortal === "admin") currentNav = adminNav;
  else if (activePortal === "server") currentNav = serverNav;

  return (
    <aside className="w-64 border-r border-slate-200 bg-white p-4 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-65px)]">
      <div className="space-y-6">
        <div className="px-3">
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            {activePortal === "customer" && "Customer Banking"}
            {activePortal === "staff" && "Branch Operations"}
            {activePortal === "admin" && "Executive Governance"}
            {activePortal === "server" && "DevOps & Infrastructure"}
          </p>
        </div>

        <nav className="space-y-1">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-blue-50 text-blue-600 border border-blue-200 shadow-sm"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer info badge */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">Core Network</span>
          <span className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            100% UP
          </span>
        </div>
        <p className="text-[10px] text-slate-400 font-mono">TiDB Cloud MySQL (cpb_bank)</p>
      </div>
    </aside>
  );
}
