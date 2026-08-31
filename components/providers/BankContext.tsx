"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { BankUser, BankAccount, BankTransaction, BankBeneficiary, BankCard, BankLoan, BankFixedDeposit, BankTicket } from "@/lib/types";
import { DEMO_PERSONAS, getDefaultUser } from "@/lib/auth/session";

interface BankContextType {
  currentUser: BankUser;
  setCurrentUser: (user: BankUser, sessionId?: string) => void;
  currentSessionId: string | null;
  accounts: BankAccount[];
  selectedAccount: BankAccount | null;
  setSelectedAccount: (acc: BankAccount) => void;
  transactions: BankTransaction[];
  beneficiaries: BankBeneficiary[];
  cards: BankCard[];
  loans: BankLoan[];
  fixedDeposits: BankFixedDeposit[];
  tickets: BankTicket[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
  executeTransfer: (params: {
    sourceAccountId: string;
    destinationAccountNumber: string;
    amount: number;
    description: string;
    transferMode?: "INTRA_BANK" | "NEFT" | "RTGS" | "IMPS";
    destinationBankName?: string;
    destinationIfsc?: string;
    destinationAccountName?: string;
  }) => Promise<{ success: boolean; message: string; referenceId?: string }>;
  addBeneficiary: (data: {
    name: string;
    accountNumber: string;
    bankName: string;
    ifsc: string;
    nickname?: string;
  }) => Promise<{ success: boolean; message: string }>;
  toggleCardStatus: (cardId: string) => Promise<void>;
  updateCardLimits: (cardId: string, atmLimit: number, onlineLimit: number, intlEnabled: boolean) => Promise<void>;
  applyLoan: (data: {
    type: "PERSONAL" | "HOME" | "AUTO" | "EDUCATION";
    principal: number;
    tenureMonths: number;
    purpose: string;
  }) => Promise<{ success: boolean; message: string }>;
  bookFixedDeposit: (principal: number, tenureMonths: number) => Promise<{ success: boolean; message: string }>;
  notifications: Array<{ id: string; title: string; message: string; type: string; time: string; read: boolean }>;
  markNotificationRead: (id: string) => void;
}

const BankContext = createContext<BankContextType | undefined>(undefined);

export function BankProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<BankUser>(getDefaultUser());
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [transactions, setTransactions] = useState<BankTransaction[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<BankBeneficiary[]>([]);
  const [cards, setCards] = useState<BankCard[]>([]);
  const [loans, setLoans] = useState<BankLoan[]>([]);
  const [fixedDeposits, setFixedDeposits] = useState<BankFixedDeposit[]>([]);
  const [tickets, setTickets] = useState<BankTicket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Salary Credited",
      message: "₹1,85,000.00 received from TechCorp Global Solutions Pvt Ltd.",
      type: "TRANSACTION",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "notif-2",
      title: "Security Alert: Login from Mumbai",
      message: "New active session initialized from Chrome on macOS (Worli, Mumbai).",
      type: "SECURITY",
      time: "5 hours ago",
      read: false,
    },
    {
      id: "notif-3",
      title: "Fixed Deposit Rate Boost",
      message: "Special 1-year FD rates increased to 7.25% p.a. for Gold & Platinum tiers.",
      type: "SYSTEM",
      time: "1 day ago",
      read: true,
    },
  ]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/data?userId=${encodeURIComponent(currentUser.email)}`);
      if (res.ok) {
        const data = await res.json();
        setAccounts(data.accounts || []);
        if (data.accounts?.length > 0) {
          setSelectedAccount((prev) => {
            const found = data.accounts.find((a: BankAccount) => a.id === prev?.id);
            return found || data.accounts[0];
          });
        }
        setTransactions(data.transactions || []);
        setBeneficiaries(data.beneficiaries || []);
        setCards(data.cards || []);
        setLoans(data.loans || []);
        setFixedDeposits(data.fixedDeposits || []);
        setTickets(data.tickets || []);
      }
    } catch (e) {
      console.error("Error loading bank data:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const executeTransfer = async (params: {
    sourceAccountId: string;
    destinationAccountNumber: string;
    amount: number;
    description: string;
    transferMode?: "INTRA_BANK" | "NEFT" | "RTGS" | "IMPS";
    destinationBankName?: string;
    destinationIfsc?: string;
    destinationAccountName?: string;
  }) => {
    try {
      const res = await fetch("/api/transfers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...params,
          actorId: currentUser.id,
          actorName: currentUser.name,
          actorRole: currentUser.role,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        return { success: false, message: result.error || "Transfer failed." };
      }
      await loadData();
      return { success: true, message: "Transfer completed successfully!", referenceId: result.referenceId };
    } catch (err: any) {
      return { success: false, message: err.message || "Network error occurred." };
    }
  };

  const addBeneficiary = async (data: {
    name: string;
    accountNumber: string;
    bankName: string;
    ifsc: string;
    nickname?: string;
  }) => {
    try {
      const res = await fetch("/api/beneficiaries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          userEmail: currentUser.email,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        return { success: false, message: result.error || "Failed to add beneficiary." };
      }
      await loadData();
      return { success: true, message: "Beneficiary added with 30-min security cooling period." };
    } catch (e: any) {
      return { success: false, message: e.message || "Failed to add beneficiary." };
    }
  };

  const toggleCardStatus = async (cardId: string) => {
    try {
      const res = await fetch(`/api/cards/${cardId}/toggle`, { method: "POST" });
      if (res.ok) {
        await loadData();
      }
    } catch (e) {
      console.error("Error toggling card status:", e);
    }
  };

  const updateCardLimits = async (cardId: string, atmLimit: number, onlineLimit: number, intlEnabled: boolean) => {
    try {
      await fetch(`/api/cards/${cardId}/limits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ atmLimit, onlineLimit, intlEnabled }),
      });
      await loadData();
    } catch (e) {
      console.error("Error updating limits:", e);
    }
  };

  const applyLoan = async (data: {
    type: "PERSONAL" | "HOME" | "AUTO" | "EDUCATION";
    principal: number;
    tenureMonths: number;
    purpose: string;
  }) => {
    try {
      const res = await fetch("/api/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, userEmail: currentUser.email }),
      });
      const result = await res.json();
      if (!res.ok) {
        return { success: false, message: result.error || "Loan application failed." };
      }
      await loadData();
      return { success: true, message: "Loan application submitted for underwriting review." };
    } catch (e: any) {
      return { success: false, message: e.message || "Loan application error." };
    }
  };

  const bookFixedDeposit = async (principal: number, tenureMonths: number) => {
    try {
      if (!selectedAccount) throw new Error("Please select an active savings account.");
      const res = await fetch("/api/fixed-deposits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: selectedAccount.id,
          userEmail: currentUser.email,
          principal,
          tenureMonths,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        return { success: false, message: result.error || "FD booking failed." };
      }
      await loadData();
      return { success: true, message: "Fixed Deposit booked successfully!" };
    } catch (e: any) {
      return { success: false, message: e.message || "FD booking error." };
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <BankContext.Provider
      value={{
        currentUser,
        setCurrentUser: (user, sessionId) => {
          setCurrentUser(user);
          if (sessionId) setCurrentSessionId(sessionId);
        },
        currentSessionId,
        accounts,
        selectedAccount,
        setSelectedAccount,
        transactions,
        beneficiaries,
        cards,
        loans,
        fixedDeposits,
        tickets,
        isLoading,
        refreshData: loadData,
        executeTransfer,
        addBeneficiary,
        toggleCardStatus,
        updateCardLimits,
        applyLoan,
        bookFixedDeposit,
        notifications,
        markNotificationRead,
      }}
    >
      {children}
    </BankContext.Provider>
  );
}

export function useBank() {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error("useBank must be used within a BankProvider");
  }
  return context;
}
