"use client";

import React, { useState } from "react";
import { useBank } from "@/components/providers/BankContext";
import { formatDate } from "@/lib/utils";
import {
  LifeBuoy,
  MessageSquare,
  PlusCircle,
  Send,
  HelpCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from "lucide-react";

export function SupportView() {
  const { currentUser, tickets } = useBank();
  const [selectedTicketId, setSelectedTicketId] = useState(tickets[0]?.id || "");
  const [replyMessage, setReplyMessage] = useState("");
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newCategory, setNewCategory] = useState("TRANSACTION");
  const [newPriority, setNewPriority] = useState("MEDIUM");
  const [newDescription, setNewDescription] = useState("");

  const activeTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    if (activeTicket) {
      activeTicket.messages.push({
        id: `msg-${Date.now()}`,
        senderId: currentUser.id,
        senderRole: currentUser.role,
        senderName: currentUser.name,
        message: replyMessage,
        createdAt: new Date().toISOString(),
      });
    }
    setReplyMessage("");
  };

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket = {
      id: `ticket-${Date.now()}`,
      ticketNumber: `CPB-TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      subject: newSubject,
      category: newCategory as any,
      status: "OPEN" as any,
      priority: newPriority as any,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg-${Date.now()}`,
          senderId: currentUser.id,
          senderRole: currentUser.role,
          senderName: currentUser.name,
          message: newDescription,
          createdAt: new Date().toISOString(),
        },
      ],
    };
    tickets.unshift(newTicket);
    setSelectedTicketId(newTicket.id);
    setShowNewTicketModal(false);
    setNewSubject("");
    setNewDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold">
              Customer Desk
            </span>
            <span className="text-xs text-slate-500 font-mono">• 24x7 Priority Support</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Support & Secure Messaging</h1>
          <p className="text-xs text-slate-500 mt-1">
            Direct communication channel with your assigned CPB branch relationship managers.
          </p>
        </div>

        <button
          onClick={() => setShowNewTicketModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/10 transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Raise Support Ticket
        </button>
      </div>

      {/* Main 2-Column Messaging Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1-Col: Tickets List */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-sm font-bold text-slate-900">Your Inquiries</span>
            <span className="text-[10px] font-mono text-slate-500">{tickets.length} Tickets</span>
          </div>

          <div className="space-y-2.5 max-h-[500px] overflow-y-auto">
            {tickets.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No support tickets opened.</p>
            ) : (
              tickets.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    selectedTicketId === t.id
                      ? "bg-blue-50 border-blue-400 shadow-sm"
                      : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-blue-700 font-bold">{t.ticketNumber}</span>
                    <span className={`text-[9px] font-mono uppercase px-2 py-0.2 rounded-full border font-bold ${
                      t.status === "RESOLVED"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {t.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-900 line-clamp-1">{t.subject}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{formatDate(t.createdAt)}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 2-Cols: Active Conversation Thread */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between min-h-[500px]">
          {activeTicket ? (
            <>
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-blue-600 font-bold">{activeTicket.ticketNumber}</span>
                      <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium border border-slate-200">
                        {activeTicket.category}
                      </span>
                    </div>
                    <h2 className="text-sm font-bold text-slate-900 mt-1">{activeTicket.subject}</h2>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-bold">
                    PRIORITY: {activeTicket.priority}
                  </span>
                </div>

                {/* Message Stream */}
                <div className="py-4 space-y-3.5 max-h-80 overflow-y-auto">
                  {activeTicket.messages?.map((msg) => {
                    const isUser = msg.senderRole === "CUSTOMER";
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                      >
                        <div className="flex items-center gap-1.5 mb-1 text-[10px] text-slate-500 font-mono">
                          <span>{msg.senderName}</span>
                          <span>• {formatDate(msg.createdAt)}</span>
                        </div>
                        <div
                          className={`p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed ${
                            isUser
                              ? "bg-blue-600 text-white rounded-tr-none shadow-sm"
                              : "bg-slate-100 text-slate-900 border border-slate-200 rounded-tl-none"
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Reply Form */}
              <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type your response to bank staff..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="flex-1 py-2.5 px-4 bank-input rounded-xl text-xs text-slate-900"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs">
              <MessageSquare className="w-10 h-10 text-slate-300 mb-2" />
              Select a ticket on the left to view conversation thread.
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-900">Open Support Ticket</span>
              <button onClick={() => setShowNewTicketModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="Brief summary of inquiry"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bank-input text-slate-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bank-input text-slate-900"
                  >
                    <option value="TRANSACTION">Transaction Dispute</option>
                    <option value="CARD">Card Controls</option>
                    <option value="LOAN">Loan Inquiry</option>
                    <option value="ACCOUNT">Account Maintenance</option>
                    <option value="GENERAL">General Support</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl bank-input text-slate-900"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Detailed Message</label>
                <textarea
                  rows={4}
                  placeholder="Provide full transaction refs or specific questions..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full py-2 px-3 rounded-xl bank-input text-slate-900"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
