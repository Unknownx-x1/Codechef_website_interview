"use client";

import { motion } from "framer-motion";
import { CountUpNumber } from "@/components/CountUpNumber";

const heroStats = [
  { label: "contest rooms", value: 4, suffix: "" },
  { label: "active solvers", value: 847, suffix: "" },
  { label: "contests hosted", value: 64, suffix: "" },
  { label: "problems solved", value: 18420, suffix: "+" },
];

export function HeroStats() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.32, duration: 0.42 }}
      className="terminal-panel p-5"
      aria-label="Live chapter statistics"
    >
      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-3 font-mono text-xs uppercase">
          <span>live/contest-room</span>
          <span className="text-acid">ranklist on</span>
        </div>
        <div className="grid gap-3">
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + index * 0.08 }}
              className="group border border-[var(--border)] bg-[var(--background)]/60 p-4 hover:-translate-y-1 hover:border-acid"
            >
              <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase text-[var(--muted)]">
                <span>{stat.label}</span>
                <span className="opacity-0 group-hover:opacity-100">view delta</span>
              </div>
              <p className="font-mono text-3xl font-bold text-[var(--foreground)] md:text-4xl">
                <CountUpNumber value={stat.value} suffix={stat.suffix} />
              </p>
            </motion.div>
          ))}
        </div>
        <div className="mt-5 border-t border-[var(--border)] pt-4 font-mono text-xs text-[var(--muted)]">
          &gt; mentor queue: <span className="text-acid">editorials + ICPC prep</span>
        </div>
      </div>
    </motion.aside>
  );
}
