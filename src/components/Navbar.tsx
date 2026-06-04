"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const navItems = [
  { href: "/", id: "01", label: "HOME" },
  { href: "/events", id: "02", label: "EVENTS" },
  { href: "/club", id: "03", label: "CLUB" },
  { href: "/register", id: "04", label: "REGISTER" },
  { href: "/contact", id: "05", label: "CONTACT" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [exeState, setExeState] = useState<"idle" | "compiling" | "running" | "completed">("idle");
  const [outputLines, setOutputLines] = useState<string[]>([]);
  const [isCollapsedSection, setIsCollapsedSection] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setIsCollapsedSection(true);
      return;
    }

    const handleScroll = () => {
      setIsCollapsedSection(window.scrollY > 150);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (!isCollapsedSection) {
      setIsExpanded(false);
    }
  }, [isCollapsedSection]);

  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isExpanded]);

  const runSequence = async () => {
    setExeState("compiling");
    setOutputLines(["> g++ nav.cpp -O3 -o nav"]);
    await new Promise((r) => setTimeout(r, 400));
    setOutputLines((prev) => [...prev, "> Compiling..."]);
    await new Promise((r) => setTimeout(r, 600));
    setOutputLines((prev) => [...prev, "> \u2713 Build successful."]);
    
    await new Promise((r) => setTimeout(r, 400));
    setExeState("running");
    setOutputLines((prev) => [...prev, "> ./nav"]);
    
    await new Promise((r) => setTimeout(r, 300));
    setOutputLines((prev) => [...prev, "Loading HOME..."]);
    await new Promise((r) => setTimeout(r, 150));
    setOutputLines((prev) => [...prev, "Loading EVENTS..."]);
    await new Promise((r) => setTimeout(r, 150));
    setOutputLines((prev) => [...prev, "Loading CLUB..."]);
    await new Promise((r) => setTimeout(r, 150));
    setOutputLines((prev) => [...prev, "Loading REGISTER..."]);
    await new Promise((r) => setTimeout(r, 150));
    setOutputLines((prev) => [...prev, "Loading CONTACT..."]);
    
    await new Promise((r) => setTimeout(r, 400));
    setExeState("completed");
  };

  const showPanel = !isCollapsedSection || isExpanded;

  return (
    <nav
      ref={containerRef}
      className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-end gap-3 font-mono md:right-12 lg:right-24 pointer-events-none"
    >
      {isCollapsedSection && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="pointer-events-auto flex items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-[var(--foreground)] hover:border-acid hover:text-acid transition-all duration-300 shadow-xl"
        >
          {isExpanded ? (
            <>
              <span className="text-acid">[ x ]</span> CLOSE
            </>
          ) : (
            <>
              <span className="text-acid">&gt;_</span> NAV
            </>
          )}
        </button>
      )}

      <AnimatePresence mode="wait">
        {showPanel && (
          exeState !== "completed" ? (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              transition={{ duration: 0.3 }}
              className="terminal-panel pointer-events-auto flex w-[280px] md:w-[380px] flex-col border border-[var(--border)] bg-[var(--surface)] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-[#111111] px-3 py-2 text-[10px] text-[var(--muted)]">
                <span>nav.cpp</span>
                <span className="text-acid animate-pulse">C++20</span>
              </div>
              
              <div className="p-4 text-xs md:text-sm leading-relaxed overflow-x-auto bg-[#0a0a0a]">
                <pre className="font-mono">
                  <span className="text-[#ff7b72]">#include</span> <span className="text-[#a5d6ff]">&lt;vector&gt;</span>
                  <br />
                  <span className="text-[#ff7b72]">#include</span> <span className="text-[#a5d6ff]">&lt;string&gt;</span>
                  <br /><br />
                  <span className="text-[#ff7b72]">std::vector</span>&lt;<span className="text-[#ff7b72]">std::string</span>&gt; <span className="text-[#d2a8ff]">navigate</span>() {'{'}
                  <br />
                  {"    "}<span className="text-[#ff7b72]">return</span> {'{'}
                  <br />
                  {"        "}<span className="text-[#a5d6ff]">&quot;Home&quot;</span>,
                  <br />
                  {"        "}<span className="text-[#a5d6ff]">&quot;Events&quot;</span>,
                  <br />
                  {"        "}<span className="text-[#a5d6ff]">&quot;Club&quot;</span>,
                  <br />
                  {"        "}<span className="text-[#a5d6ff]">&quot;Register&quot;</span>,
                  <br />
                  {"        "}<span className="text-[#a5d6ff]">&quot;Contact&quot;</span>
                  <br />
                  {"    "};
                  <br />
                  {'}'}
                </pre>
              </div>
              
              <div className="border-t border-[var(--border)] bg-[#111111] p-3">
                {exeState === "idle" ? (
                  <button
                    onClick={runSequence}
                    className="w-full border border-acid bg-acid/10 px-4 py-2 font-bold uppercase text-acid transition-colors hover:bg-acid hover:text-black"
                  >
                    &gt; Compile & Run
                  </button>
                ) : (
                  <div className="h-[90px] overflow-y-auto text-[10px] font-mono text-[var(--muted)] flex flex-col gap-1">
                    {outputLines.map((line, idx) => (
                      <div key={idx} className={line.includes("\u2713") ? "text-acid" : ""}>{line}</div>
                    ))}
                    <span className="animate-cursor text-[var(--foreground)]">_</span>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="navigation"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-start gap-1 mix-blend-difference text-white w-[280px] md:w-[320px]"
            >
              <div className="mb-4 text-xs font-bold tracking-widest text-[var(--muted)] md:mb-6">
                {"// SYSTEM_NAV"}
              </div>
              
              <div className="mb-2 flex w-full justify-start gap-8 border-b border-[var(--muted)] pb-2 text-xs md:text-sm font-bold tracking-widest text-[var(--muted)]">
                <span className="w-8">ID</span>
                <span>MODULE</span>
              </div>
              
              <div className="flex w-full flex-col">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`pointer-events-auto group relative flex w-full items-center gap-8 py-2 text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-tighter transition-all duration-300 hover:text-acid hover:translate-x-2 ${
                        isActive ? "text-white" : "text-white/40"
                      }`}
                    >
                      <span className={`w-8 text-sm md:text-lg font-mono font-normal transition-opacity ${isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100"}`}>
                        {item.id}
                      </span>
                      <span className="relative">
                        {item.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-indicator"
                            className="absolute -left-6 top-1/2 h-[60%] w-1 -translate-y-1/2 bg-acid"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
              
              <div className="mt-6 pointer-events-auto md:mt-10">
                <button
                  onClick={() => toggleTheme()}
                  className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 hover:text-acid transition-colors"
                >
                  [ THEME: {theme} ]
                </button>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </nav>
  );
}
