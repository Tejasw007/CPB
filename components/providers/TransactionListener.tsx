"use client";

import React, { useEffect, useState } from "react";
import { useBank } from "@/components/providers/BankContext";
import { CheckCircle2, ArrowDownRight, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";

export function TransactionListener() {
  const { currentAccount } = useBank();
  const [activeAlert, setActiveAlert] = useState<{ amount: number; type: "CREDIT" | "DEBIT"; name: string } | null>(null);

  useEffect(() => {
    if (!currentAccount) return;

    let eventSource: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout;

    const connectSSE = () => {
      // Connect to the SSE endpoint
      eventSource = new EventSource(`/api/sse?accountId=${currentAccount.id}`);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          if (data.type === "new_transactions" && data.transactions.length > 0) {
            // Trigger animation for the most recent transaction
            const latestTx = data.transactions[data.transactions.length - 1];
            
            // Fire Confetti if it's a CREDIT (Money Received)
            if (latestTx.type === "CREDIT") {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10B981', '#34D399', '#059669']
              });
            }

            // Show Overlay Alert
            setActiveAlert({
              amount: latestTx.amount,
              type: latestTx.type,
              name: latestTx.counterpartyName || "Unknown"
            });

            // Hide alert after 5 seconds
            setTimeout(() => {
              setActiveAlert(null);
            }, 5000);
          }
        } catch (e) {
          console.error("Failed to parse SSE message", e);
        }
      };

      eventSource.onerror = () => {
        eventSource?.close();
        // Reconnect after 3 seconds
        reconnectTimeout = setTimeout(connectSSE, 3000);
      };
    };

    connectSSE();

    return () => {
      if (eventSource) eventSource.close();
      clearTimeout(reconnectTimeout);
    };
  }, [currentAccount]);

  if (!activeAlert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
      <div className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-2xl rounded-3xl p-8 max-w-sm w-full animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col items-center justify-center text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner ${
          activeAlert.type === "CREDIT" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
        }`}>
          {activeAlert.type === "CREDIT" ? (
            <ArrowDownRight className="w-10 h-10 animate-bounce" />
          ) : (
            <ArrowUpRight className="w-10 h-10 animate-bounce" />
          )}
        </div>
        
        <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
          ₹{Number(activeAlert.amount).toLocaleString('en-IN')}
        </h2>
        
        <p className="text-slate-600 font-medium text-sm">
          {activeAlert.type === "CREDIT" ? (
            <>Successfully received from <span className="font-bold text-slate-900">{activeAlert.name}</span> via UPI</>
          ) : (
            <>Successfully sent to <span className="font-bold text-slate-900">{activeAlert.name}</span> via UPI</>
          )}
        </p>
        
        <div className="mt-6 flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full text-xs font-bold">
          <CheckCircle2 className="w-4 h-4" /> 
          Transaction Completed
        </div>
      </div>
    </div>
  );
}
