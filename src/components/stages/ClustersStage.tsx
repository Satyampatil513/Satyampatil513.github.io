"use client";

import { useEffect, useRef } from "react";
import type { StageProps } from "../ProjectStage";

const DOTS = 260;
/** What OPTICS actually found in the paper. */
const CLUSTERS = 13;
/** Pairs that survived Engle-Granger and the Hurst mean-reversion screen. */
const PAIRS = [
  { a: "KABRAEXTRU.BO", b: "ONWARDTEC.BO", p: "0.0071", hurst: "0.3651" },
  { a: "ADSL.BO", b: "KABRAEXTRU.BO", p: "0.0088", hurst: "0.4069" },
];

type Dot = { x: number; y: number; tx: number; ty: number; cluster: number; r: number };

/** The background performs the research.
 *
 * Every dot is a stock. Scattered at the top of the section, they migrate into
 * thirteen clusters as you scroll, and once settled a line snaps between the
 * pairs that survive cointegration. */
export default function ClustersStage({ progress, active, align }: StageProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const dots = useRef<Dot[]>([]);
  // The animation loop reads scroll position without restarting on every tick.
  const live = useRef(progress);
  useEffect(() => {
    live.current = progress;
  }, [progress]);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let seeded = false;

    const seed = (w: number, h: number) => {
      const centres = Array.from({ length: CLUSTERS }, (_, i) => {
        const angle = (i / CLUSTERS) * Math.PI * 2;
        const radius = Math.min(w, h) * (0.16 + (i % 3) * 0.11);
        return { x: w / 2 + Math.cos(angle) * radius, y: h / 2 + Math.sin(angle) * radius * 0.72 };
      });
      dots.current = Array.from({ length: DOTS }, (_, i) => {
        const cluster = i % CLUSTERS;
        const c = centres[cluster];
        const spread = 26 + (i % 5) * 5;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          tx: c.x + (Math.random() - 0.5) * spread,
          ty: c.y + (Math.random() - 0.5) * spread,
          cluster,
          r: 1.1 + Math.random() * 1.5,
        };
      });
      seeded = true;
    };

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const box = el.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (el.width !== Math.round(box.width * dpr) || el.height !== Math.round(box.height * dpr)) {
        el.width = Math.round(box.width * dpr);
        el.height = Math.round(box.height * dpr);
        seeded = false;
      }
      if (!seeded) seed(box.width, box.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Ease the migration across the middle of the section.
      const t = Math.min(1, Math.max(0, (live.current - 0.15) / 0.5));
      const pull = t * t * (3 - 2 * t);

      ctx.clearRect(0, 0, box.width, box.height);

      // Cointegrated pairs, drawn only once the clusters have formed.
      if (pull > 0.75) {
        ctx.strokeStyle = `rgba(133,201,158,${(pull - 0.75) * 1.4})`;
        ctx.lineWidth = 0.6;
        for (let i = 0; i + 1 < dots.current.length; i += 19) {
          const a = dots.current[i];
          const b = dots.current[i + 1];
          if (a.cluster !== b.cluster) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const d of dots.current) {
        d.x += (d.tx - d.x) * 0.06 * pull;
        d.y += (d.ty - d.y) * 0.06 * pull;
        const settled = 0.25 + pull * 0.55;
        ctx.fillStyle = `rgba(133,201,158,${settled})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    if (active) frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  return (
    <div className="h-full w-full bg-[#0c0d0d]">
      <canvas ref={canvas} className="h-full w-full" aria-hidden="true" />

      {/* The output, once the clusters have formed: the pairs that actually
        * survived Engle-Granger and the Hurst screen. */}
      <div
        className={`pointer-events-none absolute bottom-4 left-4 right-auto font-mono sm:bottom-8 ${
          align === "right" ? "lg:left-8 lg:right-auto" : "lg:left-auto lg:right-8"
        }`}
      >
        <div className="text-[0.55rem] uppercase tracking-[0.16em] text-fg-faint sm:text-[0.62rem]">
          {progress > 0.62 ? `${CLUSTERS} clusters · cointegrated pairs` : "clustering 260 securities…"}
        </div>
        <div className="mt-3 space-y-2">
          {PAIRS.map((pair, i) => {
            const on = progress > 0.66 + i * 0.07;
            return (
              <div
                key={pair.a + pair.b}
                className="transition-all duration-500"
                style={{ opacity: on ? 1 : 0, transform: `translateY(${on ? 0 : 6}px)` }}
              >
                <div className="text-[0.62rem] text-accent sm:text-[0.7rem]">
                  {pair.a} <span className="text-fg-faint">↔</span> {pair.b}
                </div>
                <div className="text-[0.55rem] text-fg-faint sm:text-[0.58rem]">
                  p {pair.p} · hurst {pair.hurst}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
