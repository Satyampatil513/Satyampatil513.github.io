"use client";

import { useEffect, useRef } from "react";
import type { StageProps } from "../ProjectStage";

/** How many spine-sized detections the shelf band resolves to. */
const DETECTIONS = 12;
const ROOM_POINTS = 150;
const SHELF_POINTS = 90;

type Pt = { x: number; y: number; tx: number; ty: number; group: "room" | "shelf"; r: number };

/** Fades in once the illustrated scan resolves, so the section ends on a real
 * result rather than the stand-in geometry that got you there. */
const REVEAL_AT = 0.85;

/** The scan performs the detection problem, not just a room.
 *
 * A raw point cloud settles into a floor-plan outline as you scroll, same as
 * the room-reconstruction half of the pipeline. But one edge of that outline
 * is a shelf, and the points along it stay noisy and dense on purpose: they
 * only resolve into individual boxes once the detector actually fires, one
 * spine at a time, because that step is the hard one, not the geometry.
 *
 * The illustration is a stand-in; the payoff isn't. Past REVEAL_AT, a real
 * isometric render from an actual processed capture fades in on the side the
 * copy isn't using — every box and price on it came out of the pipeline. */
export default function ScanStage({ progress, active, align }: StageProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pts = useRef<Pt[]>([]);
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
    let room = { x: 0, y: 0, w: 0, h: 0 };
    let shelf = { x: 0, y0: 0, y1: 0 };

    const seed = (w: number, h: number) => {
      room = { x: w * 0.22, y: h * 0.18, w: w * 0.56, h: h * 0.64 };
      shelf = { x: room.x, y0: room.y + room.h * 0.18, y1: room.y + room.h * 0.62 };
      const perim = 2 * (room.w + room.h);

      const roomPts: Pt[] = Array.from({ length: ROOM_POINTS }, (_, i) => {
        const d = (i / ROOM_POINTS) * perim;
        let tx: number, ty: number;
        if (d < room.w) [tx, ty] = [room.x + d, room.y];
        else if (d < room.w + room.h) [tx, ty] = [room.x + room.w, room.y + (d - room.w)];
        else if (d < 2 * room.w + room.h) [tx, ty] = [room.x + room.w - (d - room.w - room.h), room.y + room.h];
        else [tx, ty] = [room.x, room.y + room.h - (d - 2 * room.w - room.h)];
        return { x: Math.random() * w, y: Math.random() * h, tx, ty, group: "room", r: 1 };
      });

      const shelfPts: Pt[] = Array.from({ length: SHELF_POINTS }, () => {
        const ty = shelf.y0 + Math.random() * (shelf.y1 - shelf.y0);
        const tx = shelf.x + (Math.random() - 0.3) * 10;
        return { x: Math.random() * w, y: Math.random() * h, tx, ty, group: "shelf", r: 1.3 };
      });

      pts.current = [...roomPts, ...shelfPts];
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
      ctx.clearRect(0, 0, box.width, box.height);

      // Room resolves early; the shelf band takes the rest of the scroll.
      const settle = Math.min(1, Math.max(0, (live.current - 0.08) / 0.45));
      const roomPull = settle * settle * (3 - 2 * settle);
      const detect = Math.min(1, Math.max(0, (live.current - 0.5) / 0.32));

      for (const p of pts.current) {
        const pull = p.group === "room" ? roomPull : Math.min(1, roomPull * 1.15);
        p.x += (p.tx - p.x) * 0.07 * pull;
        p.y += (p.ty - p.y) * 0.07 * pull;
        const alpha = p.group === "room" ? 0.2 + roomPull * 0.55 : 0.15 + roomPull * 0.3 - detect * 0.18;
        ctx.fillStyle = `rgba(133,201,158,${Math.max(0.08, alpha)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Detections fire one at a time up the shelf band.
      const fired = Math.floor(detect * DETECTIONS);
      for (let i = 0; i < fired; i++) {
        const t = i / (DETECTIONS - 1);
        const y = shelf.y0 + t * (shelf.y1 - shelf.y0);
        const justFired = i === fired - 1 && detect < 1;
        const w = 18,
          h = (shelf.y1 - shelf.y0) / DETECTIONS - 4;
        ctx.strokeStyle = justFired ? "rgba(133,201,158,0.95)" : "rgba(133,201,158,0.6)";
        ctx.lineWidth = justFired ? 1.6 : 1;
        ctx.strokeRect(shelf.x - w / 2, y - h / 2, w, h);
      }

      // Room outline, once mostly settled.
      if (roomPull > 0.7) {
        ctx.strokeStyle = `rgba(133,201,158,${(roomPull - 0.7) * 1.2})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(room.x, room.y, room.w, room.h);
      }
    };

    if (active) frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  const detect = Math.min(1, Math.max(0, (progress - 0.5) / 0.32));
  const fired = Math.floor(detect * DETECTIONS);
  const reveal = Math.min(1, Math.max(0, (progress - REVEAL_AT) / (1 - REVEAL_AT)));
  const status =
    progress < 0.1
      ? "raw depth scan…"
      : progress < 0.5
        ? "resolving room geometry…"
        : detect < 1
          ? `localizing shelf objects… ${fired}/${DETECTIONS}`
          : reveal < 1
            ? "97 objects localized · ~₹63,000 estimated"
            : "real output, from an actual processed capture";

  return (
    <div className="h-full w-full overflow-hidden bg-[#0b0c0c]">
      <canvas ref={canvas} className="h-full w-full" aria-hidden="true" />

      {/* The real payoff: an actual isometric render of a processed capture,
        * every box and price read straight off the pipeline's own output.
        * Anchored to the bottom like the readout below, not centered in the
        * section: a tall section is centered in a lot more than one screen's
        * worth of scroll, and the fade-in only reaches full opacity once the
        * bottom edge is what's actually in view. Desktop only — the mobile
        * band is too short for this and the readout to both fit. */}
      <div
        className={`pointer-events-none absolute bottom-8 hidden lg:block lg:w-[30%] ${
          align === "right" ? "lg:left-8 lg:right-auto" : "lg:left-auto lg:right-8"
        }`}
        style={{ opacity: reveal, transform: `translateY(${(1 - reveal) * 14}px)` }}
      >
        <div className="w-full overflow-hidden rounded-xl border border-line-strong bg-[#0e0f0e] shadow-2xl">
          <div className="flex items-center justify-between border-b border-line px-3 py-2">
            <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-fg-faint">
              real detection output
            </span>
            <span className="font-mono text-[0.56rem] text-accent">97 objects</span>
          </div>
          {/* Fixed height, not aspect-square: at this column width a square
            * card can be taller than the scroll room left in the section, so
            * a bottom-anchored reveal would spend most of its opacity above
            * the fold. Crops the source render instead of resizing the card
            * to it. */}
          <div className="relative h-48 w-full overflow-hidden bg-black lg:h-56">
            {/* Plain img, not next/image: this stage only ever runs client-side and the
              * source is a fixed local asset, so the extra layer buys nothing. */}
            <img
              src="/images/roomscan-detections.png"
              alt="Real isometric render of a processed room capture: 97 detected objects, each boxed and priced"
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* Same side as the copy column, not the reveal panel: this is the process
        * readout, so it belongs with the reading, not competing for the payoff's
        * corner. */}
      <div
        className={`pointer-events-none absolute bottom-4 left-4 right-auto font-mono sm:bottom-8 ${
          align === "right" ? "lg:left-auto lg:right-8" : "lg:left-8 lg:right-auto"
        }`}
      >
        <div className="text-[0.55rem] uppercase tracking-[0.16em] text-fg-faint sm:text-[0.62rem]">
          {status}
        </div>
        <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-line sm:w-40">
          <div
            className="h-full bg-accent transition-[width] duration-150"
            style={{ width: `${Math.round(Math.max(fired / DETECTIONS, detect >= 1 ? 1 : 0) * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
