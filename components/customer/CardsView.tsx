"use client";

import React, { useState } from "react";
import { useBank } from "@/components/providers/BankContext";
import { formatINR, maskCardNumber } from "@/lib/utils";
import {
  CreditCard,
  Lock,
  Unlock,
  Globe,
  Radio,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

export function CardsView() {
  const { cards, toggleCardStatus, updateCardLimits } = useBank();
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id || "");
  const [showCvv, setShowCvv] = useState(false);

  const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  const [atmLimit, setAtmLimit] = useState(selectedCard?.atmLimit || 50000);
  const [onlineLimit, setOnlineLimit] = useState(selectedCard?.onlineLimit || 150000);
  const [intlEnabled, setIntlEnabled] = useState(selectedCard?.intlEnabled || false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveLimits = async () => {
    if (!selectedCard) return;
    await updateCardLimits(selectedCard.id, atmLimit, onlineLimit, intlEnabled);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-bold">
            Card Controls
          </span>
          <span className="text-xs text-slate-500 font-mono">• EMV Chip & NFC Security</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Card Management & Security</h1>
        <p className="text-xs text-slate-500 mt-1">
          Instant lock, dynamic limit sliders, and international usage controls.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1-Col: Card Preview & Quick Lock */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900">Select Card</span>
            <span className="text-[10px] font-mono text-slate-500">{cards.length} Active Cards</span>
          </div>

          {/* Cards Switcher Tabs */}
          <div className="flex gap-2">
            {cards.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCardId(c.id);
                  setAtmLimit(c.atmLimit);
                  setOnlineLimit(c.onlineLimit);
                  setIntlEnabled(c.intlEnabled);
                }}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  selectedCard?.id === c.id
                    ? "bg-blue-50 border-blue-500 text-blue-700 font-bold"
                    : "bg-slate-50 border-slate-200 text-slate-600"
                }`}
              >
                {c.type} (•••• {c.cardNumber.slice(-4)})
              </button>
            ))}
          </div>

          {/* 3D Glassmorphism Card */}
          {selectedCard && (
            <div className={`p-6 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-300 text-white ${
              selectedCard.type === "CREDIT"
                ? "bg-gradient-to-tr from-slate-950 via-purple-950 to-slate-900 border-purple-900/40"
                : "bg-gradient-to-tr from-slate-900 via-indigo-950 to-blue-950 border-blue-900/40"
            }`}>
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-xs tracking-wider text-emerald-400 font-mono">CODE PAGLU BANK</span>
                <span className="text-[10px] font-mono text-white/70 uppercase tracking-widest">{selectedCard.type}</span>
              </div>

              <div className="my-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-7 rounded bg-amber-400/90 shadow" />
                  <Radio className="w-4 h-4 text-white/60 rotate-90" />
                </div>
                <p className="font-mono text-lg tracking-widest text-white font-bold">
                  •••• •••• •••• {selectedCard.cardNumber.slice(-4)}
                </p>
              </div>

              <div className="flex justify-between items-end text-xs">
                <div>
                  <p className="text-[9px] text-white/50 uppercase tracking-widest">Card Holder</p>
                  <p className="font-semibold text-white tracking-wide">{selectedCard.cardHolderName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-white/50 uppercase tracking-widest">Expires / CVV</p>
                  <p className="font-mono text-white">
                    {selectedCard.expiryMonth}/{selectedCard.expiryYear} •{" "}
                    {showCvv ? selectedCard.cvv : "•••"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Reveal CVV & Status Controls */}
          {selectedCard && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowCvv(!showCvv)}
                  className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition-all flex items-center justify-center gap-1.5"
                >
                  {showCvv ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-blue-600" />}
                  {showCvv ? "Hide CVV" : "Reveal CVV"}
                </button>
                <button
                  onClick={() => toggleCardStatus(selectedCard.id)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    selectedCard.status === "ACTIVE"
                      ? "border-red-200 text-red-600 hover:bg-red-50"
                      : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  {selectedCard.status === "ACTIVE" ? (
                    <>
                      <Lock className="w-3.5 h-3.5" /> Freeze Card
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3.5 h-3.5" /> Unfreeze
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right 2-Cols: Transaction Limit Sliders & Security Toggles */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Daily Transaction & Channel Limits</h2>
            <p className="text-xs text-slate-500">Configure spend thresholds across ATM, POS, and Online commerce</p>
          </div>

          {/* ATM Daily Limit Slider */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">Daily ATM Cash Withdrawal Limit</span>
              <span className="font-mono text-emerald-700 font-bold text-sm">{formatINR(atmLimit)}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={100000}
              step={5000}
              value={atmLimit}
              onChange={(e) => setAtmLimit(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹5,000</span>
              <span>₹1,00,000</span>
            </div>
          </div>

          {/* Online E-commerce Limit Slider */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-800">Daily Online / E-Commerce Limit</span>
              <span className="font-mono text-blue-600 font-bold text-sm">{formatINR(onlineLimit)}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={500000}
              step={10000}
              value={onlineLimit}
              onChange={(e) => setOnlineLimit(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>₹10,000</span>
              <span>₹5,00,000</span>
            </div>
          </div>

          {/* International & Contactless Security Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">International Usage</p>
                  <p className="text-[10px] text-slate-500">Allow overseas POS & E-com</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={intlEnabled}
                onChange={(e) => setIntlEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Radio className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-xs font-semibold text-slate-900">Contactless Tap & Pay</p>
                  <p className="text-[10px] text-slate-500">Up to ₹5,000 without PIN</p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                ENABLED
              </span>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" /> Card security limits updated successfully!
              </span>
            ) : <span />}
            <button
              onClick={handleSaveLimits}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/10 transition-all"
            >
              Save Card Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
