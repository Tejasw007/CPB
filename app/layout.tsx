import type { Metadata } from "next";
import "./globals.css";
import { BankProvider } from "@/components/providers/BankContext";
import { TransactionListener } from "@/components/providers/TransactionListener";

export const metadata: Metadata = {
  title: "Code Paglu Bank (CPB) — Core Banking Platform",
  description: "Production-grade core banking ecosystem with distinct Customer, Staff, Admin, and Server/DevOps portals.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="bg-[#F8FAFC] text-[#0F172A] antialiased selection:bg-blue-600 selection:text-white min-h-screen">
        <BankProvider>
          {children}
          <TransactionListener />
        </BankProvider>
      </body>
    </html>
  );
}
