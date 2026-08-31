"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<string>("admin-overview");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar portalType="admin" />

      <div className="flex flex-1">
        <Sidebar activePortal="admin" activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto">
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
}
