"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBank } from "@/components/providers/BankContext";
import {
  ShieldCheck,
  Bell,
  Search,
  ChevronDown,
  Building2,
  Terminal,
  Sparkles,
  LogOut,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface NavbarProps {
  portalType: "customer" | "staff" | "admin" | "server";
}

export function Navbar({ portalType }: NavbarProps) {
  const router = useRouter();
  const { currentUser, notifications, markNotificationRead } = useBank();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getPortalInfo = () => {
    switch (portalType) {
      case "customer":
        return {
          badge: "PERSONAL BANKING",
          badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
          subtitle: "Retail & Wealth Management Portal",
          loginPath: "/customer/login",
        };
      case "staff":
        return {
          badge: "BRANCH OPERATIONS",
          badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
          subtitle: "Staff Operational Desk • Mumbai Nariman Point HQ",
          loginPath: "/staff/login",
        };
      case "admin":
        return {
          badge: "EXECUTIVE GOVERNANCE",
          badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
          subtitle: "Central Administration & CISO Risk Radar",
          loginPath: "/admin/login",
        };
      case "server":
        return {
          badge: "SRE & CLOUD INFRA",
          badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
          subtitle: "DevOps & Infrastructure Command Center",
          loginPath: "/server/login",
        };
    }
  };

  const portalInfo = getPortalInfo();

  const handleSignOut = () => {
    router.push(portalInfo.loginPath);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm">
      {/* Brand & Dedicated Portal Identity */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <span className="font-extrabold font-mono text-lg tracking-tighter">CPB</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                CODE PAGLU BANK
              </span>
              <span className={`text-[10px] font-mono uppercase px-2 py-0.2 rounded-full border font-bold ${portalInfo.badgeColor}`}>
                {portalInfo.badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">{portalInfo.subtitle}</p>
          </div>
        </Link>
      </div>

      {/* Center Search Bar for Customer/Staff */}
      {(portalType === "customer" || portalType === "staff") && (
        <div className="hidden lg:flex items-center relative max-w-xs w-full">
          <Search className="w-4 h-4 absolute left-3 text-slate-400" />
          <input
            type="text"
            placeholder={portalType === "customer" ? "Search transactions, accounts, IFSC..." : "Search customer PAN, Aadhaar, account..."}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-sans"
          />
        </div>
      )}

      {/* Right Controls: Notifications & User Profile */}
      <div className="flex items-center gap-3.5">
        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-all"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white p-4 z-50 border border-slate-200 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="font-semibold text-sm text-slate-900">Notifications</span>
                <span className="text-[11px] text-emerald-600 font-mono font-bold">{unreadCount} New</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markNotificationRead(notif.id)}
                    className={`py-2.5 px-1 cursor-pointer transition-colors hover:bg-slate-50 rounded-lg ${
                      !notif.read ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-xs font-semibold text-slate-900">{notif.title}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{notif.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{notif.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Sign Out Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all text-left shadow-sm"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-blue-200 bg-slate-100 flex-shrink-0">
              {currentUser.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-xs text-blue-600">
                  {currentUser.name[0]}
                </div>
              )}
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-slate-900 leading-none">{currentUser.name}</p>
              </div>
              <p className="text-[10px] text-slate-500 leading-none mt-1 font-mono">{currentUser.email}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 z-50 border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 duration-150 space-y-1">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{currentUser.email}</p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-semibold text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
