"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { StaffDashboard } from "@/components/staff/StaffDashboard";

export default function StaffPortalPage() {
  const [activeTab, setActiveTab] = useState<string>("staff-ops");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar portalType="staff" />

      <div className="flex flex-1">
        <Sidebar activePortal="staff" activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          <StaffDashboard initialTab={activeTab} />
        </main>
      </div>
    </div>
  );
}
