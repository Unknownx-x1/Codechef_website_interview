"use client";

import { useEffect } from "react";

export function CursorField() {
  useEffect(() => {
    let frame = 0;

    const handleMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
        document.documentElement.style.setProperty("--grid-x", `${event.clientX * 0.018}px`);
        document.documentElement.style.setProperty("--grid-y", `${event.clientY * 0.018}px`);
      });
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return <div className="cursor-field" aria-hidden="true" />;
}
