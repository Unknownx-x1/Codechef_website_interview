"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ClubEvent } from "@/types";
import { EventTile } from "@/components/EventTile";

const filters = [
  { label: "ALL", value: "ALL" },
  { label: "HACK", value: "Hackathon" },
  { label: "WS", value: "Workshop" },
  { label: "CTF", value: "Contest" },
  { label: "TALK", value: "Seminar" },
];

export function EventFilters({ events }: { events: ClubEvent[] }) {
  const [active, setActive] = useState("ALL");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory = active === "ALL" || event.category === active;
      const searchTarget = `${event.title} ${event.summary} ${event.venue} ${event.track} ${event.topics.join(" ")}`.toLowerCase();
      const matchesQuery = searchTarget.includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [active, events, query]);

  const { upcoming, past } = useMemo(() => {
    const now = new Date();
    const up = filtered
      .filter((e) => new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const pt = filtered
      .filter((e) => new Date(e.date) < now)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return { upcoming: up, past: pt };
  }, [filtered]);

  const [featuredUpcoming, ...restUpcoming] = upcoming;

  return (
    <div>
      <div className="mb-6 grid gap-3 border-y border-[var(--border)] py-4 md:grid-cols-[1fr_320px] md:items-center">
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {filters.map((filter) => {
            const selected = active === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActive(filter.value)}
                className={selected ? "border border-acid bg-acid px-3 py-2 text-[var(--background)]" : "border border-[var(--border)] px-3 py-2 hover:border-[var(--foreground)]"}
                aria-pressed={selected}
              >
                [{filter.label}]
              </button>
            );
          })}
        </div>
        <label className="flex items-center gap-2 border border-[var(--border)] px-3 py-2 font-mono text-xs focus-within:border-acid transition-colors">
          <span className="text-acid">&gt;</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="grep events"
            className="w-full bg-transparent outline-none placeholder:text-[var(--muted)]"
            aria-label="Search events"
          />
        </label>
      </div>
      
      <AnimatePresence mode="popLayout">
        {filtered.length > 0 ? (
          <motion.div layout className="flex flex-col gap-10">
            {/* Active Events Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 border-b border-[var(--border)] pb-2 font-mono">
                <span className="text-acid animate-pulse">&gt;</span>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)]">
                  ACTIVE_EVENTS
                </h3>
                <span className="h-[1px] flex-1 bg-[var(--border)]"></span>
                <span className="text-[10px] text-[var(--muted)]">
                  ({upcoming.length} OPPORTUNITIES)
                </span>
              </div>
              
              {upcoming.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {featuredUpcoming && (
                    <motion.div
                      layout
                      key={featuredUpcoming.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <EventTile event={featuredUpcoming} featured />
                    </motion.div>
                  )}
                  {restUpcoming.map((event) => (
                    <motion.div
                      layout
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <EventTile event={event} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="border border-[var(--border)] p-5 font-mono text-xs text-[var(--muted)] uppercase">
                  NO ACTIVE OPPORTUNITIES CURRENTLY MATCH THE FILTER CRITERIA.
                </p>
              )}
            </div>

            {/* Archived Events Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 border-b border-[var(--border)] pb-2 font-mono">
                <span className="text-acid animate-pulse">&gt;</span>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)]">
                  ARCHIVED_EVENTS
                </h3>
                <span className="h-[1px] flex-1 bg-[var(--border)]"></span>
                <span className="text-[10px] text-[var(--muted)]">
                  ({past.length} RECORDS)
                </span>
              </div>
              
              {past.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {past.map((event) => (
                    <motion.div
                      layout
                      key={event.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <EventTile event={event} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="border border-[var(--border)] p-5 font-mono text-xs text-[var(--muted)] uppercase">
                  NO HISTORICAL RECORDS CURRENTLY MATCH THE FILTER CRITERIA.
                </p>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="border border-[var(--border)] p-6 font-mono text-sm text-[var(--muted)]"
          >
            No matching events found.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
