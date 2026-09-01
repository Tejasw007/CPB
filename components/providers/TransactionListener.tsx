"use client";

import React, { useEffect, useState } from "react";
import { useBank } from "./BankContext";
import { PartyPopper, Send, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

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
          
          // Hide animation after 5 seconds
          setTimeout(() => setAnimation(null), 5000);
        }
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
          className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none p-4 bg-slate-900/40 backdrop-blur-sm"
        >
           <motion.div 
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white shadow-[0_30px_60px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-10 border border-slate-100 flex flex-col items-center overflow-hidden relative max-w-sm w-full"
           >
              {/* Decorative background circle */}
              <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${animation.type === "RECEIVED" ? "bg-emerald-500" : "bg-blue-500"}`} />
              <div className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20 ${animation.type === "RECEIVED" ? "bg-emerald-500" : "bg-blue-500"}`} />

              {/* Icon Container */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: animation.type === "RECEIVED" ? [0, -10, 10, 0] : 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-xl relative z-10 ${
                  animation.type === "RECEIVED" ? "bg-emerald-500 shadow-emerald-500/30" : "bg-blue-500 shadow-blue-500/30"
                }`}
              >
                {animation.type === "RECEIVED" ? (
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
                className={`text-3xl font-black tracking-tight relative z-10 ${animation.type === "RECEIVED" ? "text-emerald-700" : "text-blue-700"}`}
              >
                 {animation.type === "RECEIVED" ? "Money Received!" : "Transfer Sent!"}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, type: "spring", bounce: 0.5 }}
                className={`text-5xl font-extrabold mt-3 tracking-tighter relative z-10 ${animation.type === "RECEIVED" ? "text-emerald-600" : "text-blue-600"}`}
              >
                 ₹{animation.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl relative z-10 w-full text-center"
              >
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                   {animation.type === "RECEIVED" ? "From" : "To"}
                </p>
                <p className="text-base font-bold text-slate-900 truncate">
                   {animation.name}
                </p>
              </motion.div>
           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
