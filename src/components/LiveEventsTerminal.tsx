import type { ClubEvent } from "@/types";
import { categoryStyles, cx, formatEventDate } from "@/lib/utils";
import { Countdown } from "@/components/Countdown";

export function LiveEventsTerminal({ events }: { events: ClubEvent[] }) {
  return (
    <aside className="terminal-panel p-4 md:p-5" aria-label="Live upcoming events terminal">
      <div className="relative z-10">
        <div className="mb-5 flex items-center justify-between border-b border-[var(--border)] pb-3 font-mono text-xs uppercase">
          <span>live/events</span>
          <span className="text-acid">online</span>
        </div>
        <div className="grid gap-4">
          {events.slice(0, 4).map((event) => (
            <div key={event.id} className="border-b border-[var(--border)] pb-4 last:border-b-0 last:pb-0">
              <div className="mb-2 flex items-center justify-between gap-3 font-mono text-[11px] uppercase">
                <span className={cx("border px-2 py-1", categoryStyles[event.category])}>{event.category}</span>
                <span className="text-[var(--muted)]">{formatEventDate(event.date)}</span>
              </div>
              <h3 className="font-display text-xl font-black">{event.title}</h3>
              <div className="mt-2 flex justify-between gap-3 font-mono text-xs text-[var(--muted)]">
                <span>{event.venue}</span>
                <Countdown target={event.date} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
