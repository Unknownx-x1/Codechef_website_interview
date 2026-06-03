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

  const [featured, ...rest] = filtered;

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
                className={selected ? "border border-acid bg-acid px-3 py-2 text-black" : "border border-[var(--border)] px-3 py-2 hover:border-[var(--foreground)]"}
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
          <motion.div layout className="flex flex-col gap-4">
            {featured && (
              <motion.div
                layout
                key={featured.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <EventTile event={featured} featured />
              </motion.div>
            )}
            {rest.map((event) => (
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
