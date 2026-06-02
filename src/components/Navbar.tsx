"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const navItems = [
  { href: "/", label: "home" },
  { href: "/#metrics", label: "metrics" },
  { href: "/#leaderboard", label: "ranklist" },
  { href: "/events", label: "events" },
  { href: "/#club", label: "club" },
  { href: "/#timeline", label: "timeline" },
  { href: "/#contact", label: "contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("/");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const sections = ["metrics", "leaderboard", "events", "club", "timeline", "contact", "register"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActive(`/#${visible.target.id}`);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.08, 0.2, 0.45] },
    );

    sections.forEach((id) => {
      const node = document.getElementById(id);
      if (node) {
        observer.observe(node);
      }
    });

    const handleTop = () => {
      if (window.scrollY < 120) {
        setActive("/");
      }
    };

    window.addEventListener("scroll", handleTop, { passive: true });
    handleTop();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleTop);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-none">
      <nav className="section-shell flex min-h-16 items-center justify-between gap-4 font-mono text-sm">
        <Link href="/" className="link-underline text-base font-bold" aria-label="CodeChef VIT Chennai home">
          CC_VITC
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={active === item.href ? "link-underline text-acid" : "link-underline text-[var(--muted)] hover:text-[var(--foreground)]"}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="border border-[var(--border)] px-3 py-2 text-xs uppercase text-[var(--muted)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? "LIGHT" : "DARK"}
          </button>
          <Link
            href="/#register"
            className="border border-acid bg-acid px-4 py-2 text-xs font-bold uppercase text-black hover:-translate-y-0.5"
          >
            Register<span className="animate-cursor">_</span>
          </Link>
        </div>
        <button
          type="button"
          className="border border-[var(--border)] px-3 py-2 font-mono text-xs md:hidden"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute left-0 right-0 top-16 border-b border-[var(--border)] bg-[var(--background)] md:hidden"
          >
            <div className="section-shell grid gap-1 py-4 font-mono">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border border-[var(--border)] px-4 py-4 text-lg"
                >
                  {item.label}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-1 pt-2">
                <button type="button" onClick={toggleTheme} className="border border-[var(--border)] px-4 py-4 text-left uppercase">
                  {theme === "dark" ? "LIGHT" : "DARK"}
                </button>
                <Link href="/#register" onClick={() => setOpen(false)} className="border border-acid bg-acid px-4 py-4 text-black">
                  REGISTER_
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
