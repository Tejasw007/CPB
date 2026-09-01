import React, { useEffect, useRef, useState } from "react";
import { ScanFace, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface FaceScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onError?: (msg: string) => void;
}

export function FaceScanModal({ isOpen, onClose, onSuccess, onError }: FaceScanModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [scanState, setScanState] = useState<"IDLE" | "INITIALIZING" | "SCANNING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMsg, setErrorMsg] = useState("");

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setScanState("INITIALIZING");
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } } 
      });
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      // Wait a moment for camera to adjust exposure, then begin scanning
      setTimeout(() => {
        setScanState("SCANNING");
        
        // Simulate biometric face scanning (2.5 seconds)
        setTimeout(() => {
          setScanState("SUCCESS");
          stopCamera();
          
          setTimeout(() => {
            onSuccess();
          }, 1000);
        }, 2500);
        
      }, 1000);
      
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setErrorMsg("Camera access denied or unavailable.");
      setScanState("ERROR");
      if (onError) onError(err.message || "Camera access failed");
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-sm bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border border-slate-700 relative"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-slate-900/80 to-transparent">
          <div className="flex items-center gap-2">
            <ScanFace className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-sm tracking-wide">Face Recognition</h3>
          </div>
          <button 
            onClick={handleClose}
            className="text-slate-300 hover:text-white transition-colors bg-slate-800/50 rounded-full p-1"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Video Feed / Content */}
        <div className="relative aspect-[3/4] bg-slate-800 flex flex-col items-center justify-center overflow-hidden">
          
          {scanState !== "SUCCESS" && scanState !== "ERROR" && (
            <video 
              ref={videoRef}
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover -scale-x-100 opacity-90"
            />
          )}

          {/* Overlays */}
          {scanState === "INITIALIZING" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm z-10">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-white font-mono text-xs font-semibold">Accessing Camera...</p>
            </div>
          )}

          {scanState === "SCANNING" && (
            <>
              {/* Corner Reticle */}
              <div className="absolute inset-x-8 inset-y-24 z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500/80 rounded-tl-xl transition-all duration-300"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500/80 rounded-tr-xl transition-all duration-300"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500/80 rounded-bl-xl transition-all duration-300"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500/80 rounded-br-xl transition-all duration-300"></div>
                
                {/* Laser Sweep */}
                <motion.div 
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,1)] w-full opacity-60"
                />
              </div>
            </>
          )}

          {scanState === "SUCCESS" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 border border-emerald-500/30"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </motion.div>
              <p className="font-bold text-white text-lg tracking-tight">Identity Verified</p>
              <p className="text-emerald-400 font-mono text-xs mt-1">Biometric match successful</p>
            </div>
          )}

          {scanState === "ERROR" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-4 border border-red-500/30"
              >
                <AlertCircle className="w-12 h-12 text-red-400" />
              </motion.div>
              <p className="font-bold text-white text-lg tracking-tight">Access Denied</p>
              <p className="text-red-400 font-mono text-xs mt-1 px-8 text-center">{errorMsg}</p>
              <button onClick={startCamera} className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors">
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-center border-t border-slate-800">
          <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            End-to-End Encrypted
          </p>
        </div>
      </motion.div>
    </div>
  );
}
