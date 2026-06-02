import Link from "next/link";
import type { ClubEvent } from "@/types";
import { categoryStyles, cx, formatEventDate } from "@/lib/utils";
import { Countdown } from "@/components/Countdown";

export function EventTile({ event, featured = false }: { event: ClubEvent; featured?: boolean }) {
  return (
    <Link
      href={`/events/${event.id}`}
      className={cx(
        "group block border border-[var(--border)] bg-[var(--surface)] p-5 hover:-translate-y-1 hover:border-[var(--foreground)]",
        featured && "grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:p-8",
      )}
    >
      <div>
        <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-xs uppercase">
          <span className={cx("border px-2 py-1", categoryStyles[event.category])}>{event.category}</span>
          <span className="text-[var(--muted)]">{event.difficulty}</span>
        </div>
        <h3 className={cx("font-display font-black leading-none", featured ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl")}>
          {event.title}
        </h3>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">{event.summary}</p>
      </div>
      <div className="mt-6 grid gap-3 border-t border-[var(--border)] pt-5 font-mono text-xs uppercase md:mt-0 md:border-l md:border-t-0 md:pl-6 md:pt-0">
        <div className="flex justify-between gap-4">
          <span className="text-[var(--muted)]">date</span>
          <span>{formatEventDate(event.date)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--muted)]">venue</span>
          <span>{event.venue}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--muted)]">seats</span>
          <span>
            {event.seatsFilled}/{event.seatsTotal}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-[var(--muted)]">starts in</span>
          <Countdown target={event.date} />
        </div>
        <div className="mt-4 h-1 bg-[var(--border)]">
          <div className="h-full bg-[var(--accent)]" style={{ width: `${(event.seatsFilled / event.seatsTotal) * 100}%` }} />
        </div>
      </div>
    </Link>
  );
}
