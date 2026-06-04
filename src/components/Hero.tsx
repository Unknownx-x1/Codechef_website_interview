"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

export function Hero() {
  const chapterLine = "Official CodeChef Chapter at VIT Chennai";
  const shouldReduceMotion = useReducedMotion();
  const typed = useTypewriter([chapterLine], shouldReduceMotion ? 0 : 24, 1400, false);
  const displayedChapterLine = shouldReduceMotion ? chapterLine : typed;
  const subtitleComplete = typed.length === chapterLine.length;
  const showDetails = shouldReduceMotion || subtitleComplete;

  return (
    <section className="w-full px-6 md:px-16 lg:px-24 flex min-h-[calc(100vh-64px)] flex-col justify-start items-start gap-8 pt-24 md:pt-32 pb-12 text-left">
      <div className="w-full max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 font-mono text-xs uppercase text-[var(--muted)]"
        >
          EST. 2019 | VITC
        </motion.p>
        <div className="font-display text-[clamp(4rem,9vw,8rem)] font-black uppercase leading-[0.9] tracking-tight">
          {["CODECHEF", "CLUB", "VITC."].map((word, index) => (
            <motion.div
              key={word}
              className={`headline-word ${word === "CLUB" ? "text-acid" : ""}`}
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12, duration: 0.45 }}
            >
              {word}
              {word === "VITC." ? <span className="ml-2 inline-block animate-cursor text-acid">_</span> : null}
            </motion.div>
          ))}
        </div>
        <div className="mt-7 min-h-20 border-l border-acid pl-4" aria-live="polite">
          <p className="font-display text-xl font-black leading-tight text-[var(--foreground)] md:text-2xl">
            {displayedChapterLine}
            {!showDetails ? <span className="animate-cursor text-acid">|</span> : null}
          </p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={showDetails ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.28 }}
            className="mt-3 font-mono text-xs uppercase tracking-normal text-acid md:text-sm"
          >
            Weekly contests • DSA workshops • Editorials • ICPC preparation
          </motion.p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase">
          <Link href="/events" className="border border-acid bg-acid px-5 py-3 font-bold text-[var(--background)] hover:-translate-y-1">
            View upcoming events
          </Link>
          <Link href="#club" className="border border-[var(--border)] px-5 py-3 hover:-translate-y-1 hover:border-[var(--foreground)]">
            Read the docs -&gt;
          </Link>
        </div>
      </div>
    </section>
  );
}

