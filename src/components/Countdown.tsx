"use client";

import { useCountdown } from "@/hooks/useCountdown";

export function Countdown({ target }: { target: string }) {
  const time = useCountdown(target);

  return (
    <span aria-label={`${time.days} days ${time.hours} hours ${time.minutes} minutes remaining`}>
      {time.days}d {time.hours}h {time.minutes}m
    </span>
  );
}
