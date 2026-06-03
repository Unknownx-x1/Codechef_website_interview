"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PreEntry({ children }: { children: React.ReactNode }) {
  const [hasEntered, setHasEntered] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "authenticating" | "granted">("idle");

  useEffect(() => {
    setIsClient(true);
    if (sessionStorage.getItem("cc_vitc_entered") === "true") {
      setHasEntered(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "#anythingforclerb") {
      setStatus("authenticating");
      setTimeout(() => {
        setStatus("granted");
        sessionStorage.setItem("cc_vitc_entered", "true");
        setTimeout(() => {
          setHasEntered(true);
        }, 1800); // Wait for zoom and exit animation
      }, 1500);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  };

  if (!isClient) return null;

  const hints = Array(20).fill("PASSWORD: #anythingforclerb");

  return (
    <>
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            key="pre-entry"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] overflow-hidden font-mono"
          >
            {/* Ambient background light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,255,71,0.05)_0%,transparent_60%)] pointer-events-none" />
            
            {/* Marquee Hint */}
            <div className="absolute top-8 left-0 w-full overflow-hidden whitespace-nowrap opacity-30 pointer-events-none flex text-acid">
              <div className="flex animate-marquee gap-8">
                 {hints.map((hint, i) => (
                    <span key={i} className="text-sm font-bold tracking-widest">{hint}</span>
                 ))}
                 {hints.map((hint, i) => (
                    <span key={i+100} className="text-sm font-bold tracking-widest">{hint}</span>
                 ))}
              </div>
            </div>

            {/* Marquee Hint Bottom */}
            <div className="absolute bottom-8 left-0 w-full overflow-hidden whitespace-nowrap opacity-30 pointer-events-none flex text-acid">
              <div className="flex animate-marquee gap-8" style={{ animationDirection: "reverse" }}>
                 {hints.map((hint, i) => (
                    <span key={i} className="text-sm font-bold tracking-widest">{hint}</span>
                 ))}
                 {hints.map((hint, i) => (
                    <span key={i+100} className="text-sm font-bold tracking-widest">{hint}</span>
                 ))}
              </div>
            </div>

            {/* Monitor Container */}
            <motion.div
              animate={status === "granted" ? { scale: 12, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: status === "granted" ? 0.5 : 0 }}
              className="relative w-[90vw] max-w-3xl aspect-[16/10] sm:aspect-[16/9] bg-ink-950 rounded-2xl border-2 border-ink-800 shadow-[0_0_50px_rgba(232,255,71,0.05)] overflow-hidden flex flex-col items-center justify-center p-8"
              style={{
                 boxShadow: "inset 0 0 100px rgba(0,0,0,0.9), 0 0 60px rgba(232,255,71,0.1)"
              }}
            >
              {/* Screen glare/scanline */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px]" />
              
              {/* Glitch Effect on Grant */}
              <AnimatePresence>
                {status === "granted" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0, 0.8, 0] }}
                    transition={{ duration: 0.5, times: [0, 0.1, 0.2, 0.3, 1] }}
                    className="absolute inset-0 bg-acid mix-blend-overlay pointer-events-none z-10"
                  />
                )}
              </AnimatePresence>

              {/* Content */}
              <motion.div 
                animate={status === "granted" ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center w-full max-w-sm z-10 space-y-8"
              >
                {/* Logo/Avatar */}
                <div className="w-24 h-24 rounded-full border-2 border-acid flex items-center justify-center shadow-[0_0_20px_rgba(232,255,71,0.2)] bg-ink-900/50 backdrop-blur-sm overflow-hidden">
                   <img src="/mascot.png" alt="CodeChef Mascot" className="w-full h-full object-cover bg-white" />
                </div>

                <div className="text-center space-y-2">
                  <h1 className="text-acid text-2xl font-bold tracking-widest font-display">CC_VITC OS</h1>
                  <p className="text-ink-500 text-xs tracking-[0.2em]">AUTHORIZED PERSONNEL ONLY</p>
                </div>

                <form onSubmit={handleLogin} className="w-full space-y-5">
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={status === "authenticating" || status === "granted"}
                      placeholder="ENTER PASSWORD"
                      className={`w-full bg-ink-900/50 border backdrop-blur-sm ${status === "error" ? "border-warning text-warning" : "border-ink-800 text-acid focus:border-acid focus:shadow-[0_0_15px_rgba(232,255,71,0.2)]"} rounded-none px-4 py-3 outline-none transition-all placeholder:text-ink-500/50 font-mono tracking-widest text-center`}
                    />
                    {status === "error" && (
                      <p className="text-warning text-xs absolute -bottom-6 left-0 right-0 text-center uppercase tracking-widest">Access Denied</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={status !== "idle" && status !== "error"}
                    className="w-full border-2 border-acid bg-acid/10 hover:bg-acid text-acid hover:text-ink-950 font-bold py-3 rounded-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest shadow-[0_0_15px_rgba(232,255,71,0.1)] hover:shadow-[0_0_25px_rgba(232,255,71,0.4)]"
                  >
                    {status === "authenticating" ? "Authenticating..." : status === "granted" ? "Access Granted" : "Enter System"}
                  </button>
                </form>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Render children underneath so they are revealed */}
      <div className={!hasEntered ? "h-screen overflow-hidden pointer-events-none" : ""}>
        {children}
      </div>
    </>
  );
}
