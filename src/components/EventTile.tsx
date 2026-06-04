"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { ClubEvent } from "@/types";
import { categoryStyles, cx, formatEventDate } from "@/lib/utils";
import { Countdown } from "@/components/Countdown";

export function EventTile({ event, featured = false }: { event: ClubEvent; featured?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const isPast = new Date(event.date) < new Date();

  return (
    <motion.div
      layout
      onClick={() => setExpanded(!expanded)}
      className={cx(
        "group block cursor-pointer border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--foreground)] transition-colors duration-200",
        featured && "md:p-8",
        !expanded && !isPast && "hover:-translate-y-1 transition-transform"
      )}
    >
      <motion.div layout="position" className="w-full">
        {/* Top bar with tags */}
        <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs uppercase">
          <span className={cx("border px-2 py-1", categoryStyles[event.category])}>
            {event.category}
          </span>
          <span className="border border-[var(--border)] px-2 py-1 text-[var(--muted)]">
            {event.format}
          </span>
          <span className="text-acid">{event.track}</span>
        </div>

        {/* Title */}
        <h3 className={cx(
          "font-display font-black leading-none uppercase tracking-tight",
          featured ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
        )}>
          {event.title}
        </h3>

        {/* Date (Visible in Collapsed State) */}
        <div className="mt-3 font-mono text-xs uppercase text-[var(--muted)]">
          [ {formatEventDate(event.date)} ]
        </div>

        {/* Topics Tags (Visible in Collapsed State) */}
        <div className="mt-4 flex flex-wrap gap-2">
          {event.topics.map((topic) => (
            <span
              key={topic}
              className="border border-[var(--border)] bg-[var(--background)] px-2 py-1 font-mono text-[10px] uppercase text-[var(--muted)]"
            >
              {topic}
            </span>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 border-t border-[var(--border)] pt-5">
              {event.image && (
                <div className="relative mb-6 w-full overflow-hidden border border-[var(--border)] bg-black/10">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.01]"
                  />
                </div>
              )}
              {/* Description */}
              <p className="max-w-3xl text-sm leading-6 text-[var(--foreground)]">
                {event.description}
              </p>

              {/* Event Attributes (Venue, Mode, Duration, Starts-In) */}
              <div className="mt-6 grid grid-cols-2 gap-4 border-y border-[var(--border)] py-4 font-mono text-xs uppercase sm:grid-cols-4">
                <div>
                  <span className="block text-[var(--muted)] text-[10px]">venue</span>
                  <span className="mt-1 block font-bold text-[var(--foreground)]">{event.venue}</span>
                </div>
                <div>
                  <span className="block text-[var(--muted)] text-[10px]">mode</span>
                  <span className="mt-1 block font-bold text-acid">{event.mode}</span>
                </div>
                <div>
                  <span className="block text-[var(--muted)] text-[10px]">duration</span>
                  <span className="mt-1 block font-bold text-[var(--foreground)]">{event.duration}</span>
                </div>
                <div>
                  <span className="block text-[var(--muted)] text-[10px]">{isPast ? "status" : "starts in"}</span>
                  <span className={cx("mt-1 block font-bold uppercase", isPast ? "text-[var(--muted)]" : "text-[var(--foreground)]")}>
                    {isPast ? "COMPLETED" : <Countdown target={event.date} />}
                  </span>
                </div>
              </div>

              {/* Timeline / Agenda */}
              {event.timeline && event.timeline.length > 0 && (
                <div className="mt-6">
                  <p className="mb-4 font-mono text-xs uppercase text-acid">{"// AGENDA"}</p>
                  <div className="grid gap-3">
                    {event.timeline.map((item, i) => (
                      <div key={i} className="flex gap-4 border-l border-[var(--border)] pl-4">
                        <span className="font-mono text-xs uppercase text-[var(--muted)] w-12">{item.time}</span>
                        <span className="text-sm">{item.item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Link to Register / Action */}
              <div className="mt-8">
                {isPast ? (
                  <a
                    href={event.recapLink || event.archiveLink || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!(event.recapLink || event.archiveLink)) {
                        e.preventDefault();
                      }
                    }}
                    className={cx(
                      "inline-block border px-5 py-3 font-mono text-xs font-bold uppercase transition-colors",
                      (event.recapLink || event.archiveLink)
                        ? "border-acid bg-acid/10 text-acid hover:bg-acid hover:text-[var(--background)] cursor-pointer"
                        : "border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] cursor-not-allowed"
                    )}
                  >
                    &gt; View Recap
                  </a>
                ) : (
                  <Link
                    href={`/register?event=${event.id}`}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent collapsing the card
                    }}
                    className="inline-block border border-acid bg-acid/10 px-5 py-3 font-mono text-xs font-bold uppercase text-acid transition-colors hover:bg-acid hover:text-[var(--background)]"
                  >
                    &gt; Register / Join Queue
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
