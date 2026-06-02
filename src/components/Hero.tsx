"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { HeroStats } from "@/components/HeroStats";

export function Hero() {
  const chapterLine = "Official CodeChef Chapter at VIT Chennai";
  const shouldReduceMotion = useReducedMotion();
  const typed = useTypewriter([chapterLine], shouldReduceMotion ? 0 : 24, 1400, false);
  const displayedChapterLine = shouldReduceMotion ? chapterLine : typed;
  const subtitleComplete = typed.length === chapterLine.length;
  const showDetails = shouldReduceMotion || subtitleComplete;

  return (
    <section className="section-shell grid min-h-[calc(100vh-64px)] items-center gap-8 py-10 md:grid-cols-[minmax(0,0.6fr)_minmax(320px,0.4fr)] md:py-12">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 font-mono text-xs uppercase text-[var(--muted)]"
        >
          EST. 2019 | VITC
        </motion.p>
        <div className="font-display text-[clamp(4.25rem,11vw,10rem)] font-black uppercase">
          {["Solve.", "Compete.", "Repeat."].map((word, index) => (
            <motion.div
              key={word}
              className="headline-word"
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.12, duration: 0.45 }}
            >
              {word}
              {word === "Repeat." ? <span className="ml-2 inline-block animate-cursor text-acid">_</span> : null}
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
          <Link href="/events" className="border border-acid bg-acid px-5 py-3 font-bold text-black hover:-translate-y-1">
            View upcoming events
          </Link>
          <Link href="#club" className="border border-[var(--border)] px-5 py-3 hover:-translate-y-1 hover:border-[var(--foreground)]">
            Read the docs -&gt;
          </Link>
        </div>
      </div>
      <HeroStats />
    </section>
  );
}

