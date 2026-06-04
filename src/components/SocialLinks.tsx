"use client";

import Link from "next/link";

export function SocialLinks() {
  return (
    <header className="fixed left-6 right-6 top-6 z-50 flex pointer-events-none items-center justify-between text-[var(--foreground)]">
      <div className="pointer-events-auto font-display text-xl font-bold tracking-widest select-none">
        CC_VITC
      </div>
      <div className="pointer-events-auto flex items-center gap-6">
        <Link href="https://x.com/codechef_vitc" target="_blank" className="text-[var(--foreground)] transition-all duration-300 hover:-translate-y-1 hover:text-acid" aria-label="X (Twitter)">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
          </svg>
        </Link>
        <Link href="https://www.instagram.com/codechef.vitc/" target="_blank" className="text-[var(--foreground)] transition-all duration-300 hover:-translate-y-1 hover:text-acid" aria-label="Instagram">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </Link>
        <Link href="https://www.linkedin.com/company/codechef-vit-chennai-chapter/" target="_blank" className="text-[var(--foreground)] transition-all duration-300 hover:-translate-y-1 hover:text-acid" aria-label="LinkedIn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>
        </Link>
      </div>
    </header>
  );
}
