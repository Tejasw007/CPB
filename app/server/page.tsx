"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { ServerDashboard } from "@/components/server/ServerDashboard";

export default function ServerPortalPage() {
  const [activeTab, setActiveTab] = useState<string>("server-health");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar portalType="server" />

      <div className="flex flex-1">
        <Sidebar activePortal="server" activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          <ServerDashboard />
        </main>
      </div>
    </div>
  );
}
