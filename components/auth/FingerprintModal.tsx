import React, { useEffect, useState } from "react";
import { Fingerprint, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface FingerprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError?: (msg: string) => void;
}

export function FingerprintModal({ isOpen, onClose, onSuccess, onError }: FingerprintModalProps) {
  const [scanState, setScanState] = useState<"IDLE" | "SCANNING" | "SUCCESS" | "ERROR">("IDLE");

  useEffect(() => {
    if (isOpen) {
      setScanState("IDLE");
    }
  }, [isOpen]);

  const startScan = () => {
    setScanState("SCANNING");
    
    // Simulate biometric scan delay (2 seconds)
    setTimeout(() => {
      setScanState("SUCCESS");
      
      // Allow user to see the success state briefly before executing callback
      setTimeout(() => {
        onSuccess();
      }, 1000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-sm">Biometric Authentication</h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center justify-center space-y-6">
          
          <div className="relative">
            {/* Pulse rings when scanning */}
            {scanState === "SCANNING" && (
              <>
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20 scale-150"></div>
                <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20 scale-125 animation-delay-150"></div>
              </>
            )}

            {/* Main Icon */}
            <button
              onClick={scanState === "IDLE" ? startScan : undefined}
              disabled={scanState !== "IDLE"}
              className={`
                relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300
                ${scanState === "IDLE" ? "bg-slate-50 text-blue-600 hover:bg-blue-50 hover:scale-105 cursor-pointer shadow-sm border border-slate-200" : ""}
                ${scanState === "SCANNING" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/40 scale-105" : ""}
                ${scanState === "SUCCESS" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 scale-110" : ""}
                ${scanState === "ERROR" ? "bg-red-500 text-white shadow-lg shadow-red-500/40 scale-105" : ""}
              `}
            >
              {scanState === "SUCCESS" ? (
                <CheckCircle2 className="w-10 h-10 animate-in zoom-in duration-300" />
              ) : scanState === "ERROR" ? (
                <AlertCircle className="w-10 h-10 animate-in zoom-in duration-300" />
              ) : (
                <Fingerprint className={`w-10 h-10 ${scanState === "SCANNING" ? "animate-pulse" : ""}`} />
              )}
            </button>
          </div>

          <div className="text-center space-y-1 h-12">
            {scanState === "IDLE" && (
              <>
                <p className="font-bold text-slate-800 text-sm">Touch the sensor</p>
                <p className="text-xs text-slate-500">Tap the fingerprint icon to authenticate.</p>
              </>
            )}
            {scanState === "SCANNING" && (
              <>
                <p className="font-bold text-blue-600 text-sm animate-pulse">Scanning fingerprint...</p>
                <p className="text-xs text-slate-500">Please hold your finger steady.</p>
              </>
            )}
            {scanState === "SUCCESS" && (
              <>
                <p className="font-bold text-emerald-600 text-sm">Identity Verified</p>
                <p className="text-xs text-slate-500">Logging you in securely...</p>
              </>
            )}
            {scanState === "ERROR" && (
              <>
                <p className="font-bold text-red-600 text-sm">Authentication Failed</p>
                <p className="text-xs text-slate-500">Fingerprint not recognized.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
