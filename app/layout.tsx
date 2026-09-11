import type { Metadata } from "next";
import "./globals.css";
import { BankProvider } from "@/components/providers/BankContext";
import { TransactionListener } from "@/components/providers/TransactionListener";

export const metadata: Metadata = {
  title: "Code Paglu Bank (CPB) — Core Banking Platform",
  description: "Production-grade core banking ecosystem with distinct Customer, Staff, Admin, and Server/DevOps portals.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CPB",
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-blue-600 selection:text-white min-h-screen">
        <BankProvider>
          {children}
          <TransactionListener />
        </BankProvider>
      </body>
    </html>
  );
}
