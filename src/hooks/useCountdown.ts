"use client";

import { useEffect, useState } from "react";

export function getCountdown(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  return { days, hours, minutes };
}

export function useCountdown(target: string) {
  const [time, setTime] = useState(() => getCountdown(target));

  useEffect(() => {
    const interval = window.setInterval(() => setTime(getCountdown(target)), 60_000);
    return () => window.clearInterval(interval);
  }, [target]);

  return time;
}
