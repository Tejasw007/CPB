"use client";

import React, { useEffect, useState } from "react";
import { useBank } from "./BankContext";
import { PartyPopper, Send, ArrowUpRight, ArrowDownLeft, ShieldAlert, Receipt, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export function TransactionListener() {
  const { currentUser, refreshData } = useBank();
  const [animation, setAnimation] = useState<{
    type: "SENT" | "RECEIVED" | "BANK_CHARGES";
    amount: number;
    name: string;
    description?: string;
  } | null>(null);

  useEffect(() => {
    if (!currentUser || !currentUser.id || currentUser.id.startsWith("admin") || currentUser.id.startsWith("staff") || currentUser.id.startsWith("server")) return;
    
    // Connect to Server-Sent Events (SSE) endpoint
    const es = new EventSource(`/api/sse?userId=${currentUser.id}`);
    
    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "NEW_TRANSACTIONS" && data.txns && data.txns.length > 0) {
          // Find the first relevant transfer or fee transaction
          const tx = data.txns.find((t: any) => 
            t.category === "TRANSFER" || 
            t.category === "FEE" || 
            (t.description && t.description.toLowerCase().includes("charge"))
          );

          if (tx) {
            // Refresh context data so balances update instantly
            refreshData();
            
            if (tx.category === "FEE" || (tx.description && tx.description.toLowerCase().includes("charge"))) {
              setAnimation({
                type: "BANK_CHARGES",
                amount: Number(tx.amount),
                name: tx.counterpartyName || "Code Paglu Bank",
                description: tx.description || "Bank Service Charges",
              });
            } else if (tx.type === "CREDIT") {
              setAnimation({ type: "RECEIVED", amount: Number(tx.amount), name: tx.counterpartyName || "Unknown" });
              
              // Fire Confetti!
              const duration = 3000;
              const end = Date.now() + duration;
              const frame = () => {
                confetti({
                  particleCount: 5,
                  angle: 60,
                  spread: 55,
                  origin: { x: 0 },
                  colors: ['#10B981', '#34D399', '#059669']
                });
                confetti({
                  particleCount: 5,
                  angle: 120,
                  spread: 55,
                  origin: { x: 1 },
                  colors: ['#10B981', '#34D399', '#059669']
                });
                if (Date.now() < end) requestAnimationFrame(frame);
              };
              frame();

            } else {
              setAnimation({ type: "SENT", amount: Number(tx.amount), name: tx.counterpartyName || "Unknown" });
            }
            
            // Hide animation after 6 seconds
            setTimeout(() => setAnimation(null), 6000);
          }
        }
      } catch (err) {
        console.error("SSE parsing error:", err);
      }
    };

    return () => es.close();
  }, [currentUser]);

  return (
    <AnimatePresence>
      {animation && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm pointer-events-auto"
        >
           <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white shadow-[0_30px_60px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-8 border border-slate-100 flex flex-col items-center overflow-hidden relative max-w-sm w-full"
           >
              {/* Close Button */}
              <button 
                onClick={() => setAnimation(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors z-20"
                aria-label="Dismiss alert"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Decorative background circle */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${
                animation.type === "BANK_CHARGES" 
                  ? "bg-rose-500" 
                  : animation.type === "RECEIVED" 
                  ? "bg-emerald-500" 
                  : "bg-blue-500"
              }`} />
              <div className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${
                animation.type === "BANK_CHARGES" 
                  ? "bg-amber-500" 
                  : animation.type === "RECEIVED" 
                  ? "bg-emerald-500" 
                  : "bg-blue-500"
              }`} />

              {/* Icon Container */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ 
                  scale: 1, 
                  rotate: animation.type === "RECEIVED" ? [0, -10, 10, 0] : animation.type === "BANK_CHARGES" ? [0, -5, 5, 0] : 0 
                }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`w-24 h-24 rounded-full flex items-center justify-center mb-5 shadow-xl relative z-10 ${
                  animation.type === "BANK_CHARGES"
                    ? "bg-gradient-to-br from-rose-500 to-red-600 shadow-rose-500/30"
                    : animation.type === "RECEIVED" 
                    ? "bg-emerald-500 shadow-emerald-500/30" 
                    : "bg-blue-500 shadow-blue-500/30"
                }`}
              >
                {animation.type === "BANK_CHARGES" ? (
                  <Receipt className="w-12 h-12 text-white drop-shadow-md" strokeWidth={2.5} />
                ) : animation.type === "RECEIVED" ? (
                  <ArrowDownLeft className="w-12 h-12 text-white drop-shadow-md" strokeWidth={3} />
                ) : (
                  <motion.div
                    animate={{ x: [0, 10, 20, 30, 40], y: [0, -10, -20, -30, -40], opacity: [1, 1, 0, 0, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  >
                    <ArrowUpRight className="w-12 h-12 text-white drop-shadow-md" strokeWidth={3} />
                  </motion.div>
                )}
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`text-2xl font-black tracking-tight text-center relative z-10 ${
                  animation.type === "BANK_CHARGES"
                    ? "text-rose-700"
                    : animation.type === "RECEIVED" 
                    ? "text-emerald-700" 
                    : "text-blue-700"
                }`}
              >
                 {animation.type === "BANK_CHARGES" 
                   ? "Bank Charges Deducted" 
                   : animation.type === "RECEIVED" 
                   ? "Money Received!" 
                   : "Transfer Sent!"}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
                className={`text-4xl font-black mt-2 tracking-tighter relative z-10 ${
                  animation.type === "BANK_CHARGES"
                    ? "text-rose-600"
                    : animation.type === "RECEIVED" 
                    ? "text-emerald-600" 
                    : "text-blue-600"
                }`}
              >
                 {animation.type === "BANK_CHARGES" ? "- " : ""}₹{animation.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl relative z-10 w-full text-center space-y-1"
              >
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                   {animation.type === "BANK_CHARGES" ? "Reason / Description" : animation.type === "RECEIVED" ? "From" : "To"}
                </p>
                <p className="text-sm font-bold text-slate-800 truncate">
                   {animation.type === "BANK_CHARGES" ? (animation.description || "System Service Charge") : animation.name}
                </p>
                {animation.type === "BANK_CHARGES" && (
                  <p className="text-[10px] text-slate-500 font-mono">
                    Debited directly under Bank Maintenance Charges
                  </p>
                )}
              </motion.div>

              <button
                onClick={() => setAnimation(null)}
                className="mt-5 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
              >
                Acknowledge & Close
              </button>
           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
