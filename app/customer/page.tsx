"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardView } from "@/components/customer/DashboardView";
import { AccountsView } from "@/components/customer/AccountsView";
import { TransfersView } from "@/components/customer/TransfersView";
import { CardsView } from "@/components/customer/CardsView";
import { LoansView } from "@/components/customer/LoansView";
import { SupportView } from "@/components/customer/SupportView";

export default function CustomerPortalPage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar portalType="customer" />

      <div className="flex flex-1">
        <Sidebar activePortal="customer" activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-4 pb-24 md:pb-4 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && <DashboardView onNavigate={setActiveTab} />}
          {activeTab === "accounts" && <AccountsView />}
          {activeTab === "transfers" && <TransfersView />}
          {activeTab === "cards" && <CardsView />}
          {activeTab === "loans" && <LoansView />}
          {activeTab === "support" && <SupportView />}
        </main>
      </div>
    </div>
  );
}
