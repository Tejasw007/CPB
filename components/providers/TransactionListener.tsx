"use client";

import React, { useEffect, useState } from "react";
import { useBank } from "./BankContext";
import { PartyPopper, Send } from "lucide-react";

export function TransactionListener() {
  const { currentUser, refreshData } = useBank();
  const [animation, setAnimation] = useState<{type: "SENT"|"RECEIVED", amount: number, name: string} | null>(null);

  useEffect(() => {
    if (!currentUser || !currentUser.id || currentUser.id.startsWith("admin") || currentUser.id.startsWith("staff")) return;
    
    // Connect to Server-Sent Events (SSE) endpoint
    const es = new EventSource(`/api/sse?userId=${currentUser.id}`);
    
    es.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "NEW_TRANSACTIONS" && data.txns && data.txns.length > 0) {
        // Find the first relevant transfer transaction
        const tx = data.txns.find((t: any) => t.category === "TRANSFER");
        if (tx) {
          // Refresh context data so balances update instantly
          refreshData();
          
          if (tx.type === "CREDIT") {
            setAnimation({ type: "RECEIVED", amount: Number(tx.amount), name: tx.counterpartyName || "Unknown" });
          } else {
            setAnimation({ type: "SENT", amount: Number(tx.amount), name: tx.counterpartyName || "Unknown" });
          }
          
          // Hide animation after 5 seconds
          setTimeout(() => setAnimation(null), 5000);
        }
      }
    };

    return () => es.close();
  }, [currentUser]);

  if (!animation) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4">
       <div className="bg-white/95 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2rem] p-10 border border-slate-100 flex flex-col items-center animate-in zoom-in slide-in-from-bottom-10 duration-500">
          {animation.type === "RECEIVED" ? (
            <PartyPopper className="w-20 h-20 text-emerald-500 animate-bounce mb-4 drop-shadow-md" />
          ) : (
            <Send className="w-20 h-20 text-blue-500 animate-bounce mb-4 drop-shadow-md" />
          )}
          
          <h2 className={`text-3xl font-black tracking-tight ${animation.type === "RECEIVED" ? "text-emerald-700" : "text-blue-700"}`}>
             {animation.type === "RECEIVED" ? "Money Received!" : "Money Sent!"}
          </h2>
          
          <p className={`text-5xl font-extrabold mt-4 tracking-tighter ${animation.type === "RECEIVED" ? "text-emerald-600" : "text-blue-600"}`}>
             ₹{animation.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </p>
          
          <div className="mt-6 px-6 py-2 bg-slate-100 rounded-full">
            <p className="text-sm font-semibold text-slate-600">
               {animation.type === "RECEIVED" ? "Received securely from " : "Sent securely to "} 
               <span className="font-bold text-slate-900">{animation.name}</span>
            </p>
          </div>
       </div>
    </div>
  );
}
