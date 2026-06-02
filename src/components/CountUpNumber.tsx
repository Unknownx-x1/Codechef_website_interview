"use client";

import { useCountUp } from "@/hooks/useCountUp";

export function CountUpNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { count, ref } = useCountUp(value);

  return (
    <span ref={ref}>
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
