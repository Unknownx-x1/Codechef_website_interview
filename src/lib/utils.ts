import type { EventCategory } from "@/types";

export const categoryStyles: Record<EventCategory, string> = {
  Hackathon: "border-warning text-warning bg-warning/10",
  Workshop: "border-acid text-acid bg-acid/10",
  Contest: "border-sky-400 text-sky-300 bg-sky-400/10",
  Seminar: "border-ink-500 text-ink-500 bg-ink-500/10",
};

export function formatEventDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

export function formatEventDateLong(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}
