"use client";

import { useMemo, useState } from "react";
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
      const matchesQuery = `${event.title} ${event.summary} ${event.venue}`.toLowerCase().includes(query.toLowerCase());
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
        <label className="flex items-center gap-2 border border-[var(--border)] px-3 py-2 font-mono text-xs">
          <span className="text-[var(--muted)]">&gt;</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="grep events"
            className="w-full bg-transparent outline-none placeholder:text-[var(--muted)]"
            aria-label="Search events"
          />
        </label>
      </div>
      {featured ? (
        <div className="editorial-grid gap-4">
          <div className="col-span-12">
            <EventTile event={featured} featured />
          </div>
          {rest.map((event, index) => (
            <div key={event.id} className={index % 3 === 0 ? "col-span-12 md:col-span-7" : "col-span-12 md:col-span-5"}>
              <EventTile event={event} />
            </div>
          ))}
        </div>
      ) : (
        <p className="border border-[var(--border)] p-6 font-mono text-sm text-[var(--muted)]">No matching events found.</p>
      )}
    </div>
  );
}
