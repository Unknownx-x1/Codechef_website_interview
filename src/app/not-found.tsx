"use client";

import Link from "next/link";
import { PageTransition } from "@/components/PageTransition";

export default function NotFound() {
  return (
    <PageTransition>
      <main className="section-shell flex min-h-[70vh] flex-col items-center justify-center py-16 text-center font-mono">
        <div className="relative w-full max-w-lg border border-warning bg-[var(--surface)] p-6 md:p-8 shadow-[0_0_30px_rgba(255,71,71,0.08)]">
          {/* Header warning bar */}
          <div className="absolute -top-3 left-4 bg-[var(--background)] px-2 text-warning text-xs font-bold uppercase tracking-wider">
            SYSTEM_ERROR // 404
          </div>

          <div className="mb-6 text-warning text-5xl">
            ⚠️
          </div>

          <p className="text-warning text-xs uppercase tracking-[0.2em] font-bold">
            &gt; DESTINATION_UNREACHABLE
          </p>

          <h1 className="mt-4 font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-[var(--foreground)]">
            PAGE NOT FOUND
          </h1>

          <p className="mt-4 text-xs md:text-sm text-[var(--muted)] leading-relaxed font-sans max-w-sm mx-auto">
            The requested route or record does not exist in the VITC OS database. The packet may have been dropped or the destination path was modified.
          </p>

          <div className="mt-8 border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="border border-acid bg-acid/10 hover:bg-acid text-acid hover:text-[var(--background)] font-bold px-6 py-3 text-xs uppercase tracking-widest transition-all duration-300"
            >
              &gt; RETURN HOME_
            </Link>
          </div>
        </div>
      </main>
    </PageTransition>
  );
}
