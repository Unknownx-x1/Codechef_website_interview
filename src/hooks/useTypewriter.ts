"use client";

import { useEffect, useState } from "react";

export function useTypewriter(words: string[], speed = 42, pause = 1400, loop = true) {
  const [wordIndex, setWordIndex] = useState(0);
  const [cursor, setCursor] = useState(0);
  const value = words[wordIndex] ?? "";

  useEffect(() => {
    if (speed <= 0) {
      setCursor(value.length);
      return undefined;
    }

    if (cursor < value.length) {
      const timeout = window.setTimeout(() => setCursor((current) => current + 1), speed);
      return () => window.clearTimeout(timeout);
    }

    if (!loop) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setCursor(0);
      setWordIndex((current) => (current + 1) % words.length);
    }, pause);
    return () => window.clearTimeout(timeout);
  }, [cursor, loop, pause, speed, value.length, words.length]);

  return value.slice(0, cursor);
}
