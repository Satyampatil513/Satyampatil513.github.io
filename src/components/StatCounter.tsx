"use client";

import { useEffect, useRef, useState } from "react";

export default function StatCounter({
  value,
  unit,
  label,
}: {
  value: string;
  unit?: string;
  label: string;
}) {
  const numeric = parseInt(value, 10);
  const isNumber = !Number.isNaN(numeric);
  const [display, setDisplay] = useState(isNumber ? "0" : value);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    if (!isNumber) return;
    const el = ref.current;
    if (!el) return;

    // matchMedia is browser-only; deferring to an effect avoids an SSR/client markup mismatch.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplay(String(numeric));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !done.current) {
            done.current = true;
            const duration = 1400;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(String(Math.round(numeric * eased)));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isNumber, numeric]);

  const isPrefix = unit === "TOP" || unit === "×1st";

  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-4xl font-bold text-text-bright sm:text-5xl">
        {isPrefix && (
          <span className="mr-1 align-middle text-sm font-semibold tracking-widest text-cyan">
            {unit === "TOP" ? "#" : ""}
          </span>
        )}
        <span className="text-glow-cyan">{display}</span>
        {!isPrefix && unit && (
          <span className="ml-0.5 text-2xl text-cyan">{unit}</span>
        )}
        {unit === "×1st" && (
          <span className="ml-1 text-lg text-amber">× 1st</span>
        )}
        {unit === "TOP" && (
          <span className="ml-1 text-xs font-semibold tracking-widest text-cyan">
            GLOBAL
          </span>
        )}
      </div>
      <div className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-text-dim">
        {label}
      </div>
    </div>
  );
}
