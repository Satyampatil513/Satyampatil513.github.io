"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** One binary digit per cell, in CSS pixels. Small enough that the digits read
 * as texture at a glance and as data up close. */
const CELL_W = 4;
const CELL_H = 5;

/** Tonal ramp, dark to bright. Shades carry the image; the digits carry the
 * character. Two tones alone flatten the face into noise. */
const SHADES = [
  "#18251f",
  "#24402f",
  "#356045",
  "#4a825d",
  "#63a077",
  "#85c99e",
  "#a9debf",
  "#cdf0dc",
];

type Props = {
  src: string;
  alt: string;
  leftLabel?: string;
  leftCopy?: string;
  rightLabel?: string;
  rightCopy?: string;
};

export default function SplitPortrait({
  src,
  alt,
  leftLabel = "// SYSTEMS",
  leftCopy = "Android internals, SELinux policy, syscalls and the layers underneath.",
  rightLabel = "// AI",
  rightCopy = "Agents, retrieval and automation built on top of them.",
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const image = useRef<HTMLImageElement | null>(null);
  const dragging = useRef(false);
  const [split, setSplit] = useState(50);
  const [ready, setReady] = useState(false);

  /** Redraw the machine-vision half as shaded binary.
   *
   * The digits are not decoration: each cell renders one bit of that cell's own
   * luminance byte, so the pattern is the picture's data. Shade comes from the
   * tone, sharpened a little by local gradient so edges stay crisp at this
   * density. */
  const paint = useCallback(() => {
    const el = canvas.current;
    const source = image.current;
    if (!el || !source?.complete || !source.naturalWidth) return;

    const box = el.getBoundingClientRect();
    if (!box.width || !box.height) return;

    const cols = Math.max(8, Math.floor(box.width / CELL_W));
    const rows = Math.max(8, Math.floor(box.height / CELL_H));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    el.width = Math.round(box.width * dpr);
    el.height = Math.round(box.height * dpr);

    const ctx = el.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Sample the photo down to one pixel per cell on a scratch canvas.
    const scratch = document.createElement("canvas");
    scratch.width = cols;
    scratch.height = rows;
    const sctx = scratch.getContext("2d", { willReadFrequently: true });
    if (!sctx) return;
    const scale = Math.max(cols / source.naturalWidth, rows / source.naturalHeight);
    const w = source.naturalWidth * scale;
    const h = source.naturalHeight * scale;
    sctx.drawImage(source, (cols - w) / 2, (rows - h) / 2, w, h);

    const px = sctx.getImageData(0, 0, cols, rows).data;
    const lum = new Float32Array(cols * rows);
    for (let i = 0, p = 0; p < px.length; p += 4, i++) {
      lum[i] = (px[p] * 0.299 + px[p + 1] * 0.587 + px[p + 2] * 0.114) / 255;
    }
    const at = (x: number, y: number) =>
      lum[Math.min(rows - 1, Math.max(0, y)) * cols + Math.min(cols - 1, Math.max(0, x))];

    ctx.fillStyle = "#101112";
    ctx.fillRect(0, 0, box.width, box.height);
    ctx.font = `${CELL_H}px ui-monospace, "SF Mono", Menlo, monospace`;
    ctx.textBaseline = "top";

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const tone = lum[y * cols + x];
        const edge = Math.abs(at(x + 1, y) - at(x - 1, y)) + Math.abs(at(x, y + 1) - at(x, y - 1));
        // Inverted: the sky is the brightest thing in this frame, so mapping
        // tone straight through buries the subject in the dark end of the ramp.
        // Reading it as a negative lights him and drops the sky back.
        const value = Math.min(1, Math.pow(1 - tone, 1.15) * 1.05 + edge * 0.5);

        const byte = Math.round(tone * 255);
        const bit = (byte >> (x % 8)) & 1;
        ctx.fillStyle = SHADES[Math.min(SHADES.length - 1, Math.round(value * (SHADES.length - 1)))];
        ctx.fillText(bit ? "1" : "0", x * CELL_W, y * CELL_H);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    image.current = img;
    let alive = true;
    const onLoad = () => { if (alive) paint(); };
    if (img.complete) onLoad();
    else img.addEventListener("load", onLoad);

    const el = canvas.current;
    const observer = el ? new ResizeObserver(() => paint()) : null;
    if (el && observer) observer.observe(el);

    return () => {
      alive = false;
      img.removeEventListener("load", onLoad);
      observer?.disconnect();
    };
  }, [src, paint]);

  const positionFrom = (clientX: number) => {
    const box = host.current?.getBoundingClientRect();
    if (!box) return;
    setSplit(Math.min(100, Math.max(0, ((clientX - box.left) / box.width) * 100)));
  };

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    host.current?.setPointerCapture(e.pointerId);
    positionFrom(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    positionFrom(e.clientX);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    host.current?.releasePointerCapture(e.pointerId);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 3;
    if (e.key === "ArrowLeft") { e.preventDefault(); setSplit((v) => Math.max(0, v - step)); }
    if (e.key === "ArrowRight") { e.preventDefault(); setSplit((v) => Math.min(100, v + step)); }
    if (e.key === "Home") { e.preventDefault(); setSplit(0); }
    if (e.key === "End") { e.preventDefault(); setSplit(100); }
  };

  return (
    <figure className="m-0">
      <div
        ref={host}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative aspect-[16/9] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl border border-line bg-bg"
      >
        {/* Right half: the photograph, unaltered. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />

        {/* Left half: the same frame, seen by a machine. */}
        <div
          className="absolute inset-0 bg-bg transition-opacity duration-500"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)`, opacity: ready ? 1 : 0 }}
        >
          <canvas
            ref={canvas}
            className="h-full w-full"
            aria-hidden="true"
          />
        </div>

        {/* Scrim: the dither is busiest exactly where the labels sit. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg/85 via-bg/45 to-transparent"
        />

        {/* Captions */}
        {/* Both captions have to fit side by side inside the frame; at phone
          * width two 15rem boxes plus the gap are wider than the viewport. */}
        <div className="pointer-events-none absolute inset-0 p-3 sm:p-5 lg:p-7">
          <div className="flex h-full items-start justify-between gap-2 sm:gap-5 lg:gap-8">
            <div
              className="min-w-0 max-w-[42%] rounded-md bg-bg/70 px-2 py-1.5 backdrop-blur-[2px] transition-opacity duration-300 sm:max-w-[15rem] sm:rounded-lg sm:px-3 sm:py-2"
              style={{ opacity: split > 16 ? 1 : 0 }}
            >
              <div className="font-mono text-[0.5rem] tracking-[0.12em] text-accent sm:text-[0.7rem] sm:tracking-[0.16em]">
                {leftLabel}
              </div>
              <p className="mt-1 text-[0.6rem] leading-snug text-accent/75 sm:mt-2 sm:text-[0.82rem]">
                {leftCopy}
              </p>
            </div>
            <div
              className="min-w-0 max-w-[42%] text-right transition-opacity duration-300 sm:max-w-[15rem]"
              style={{ opacity: split < 84 ? 1 : 0 }}
            >
              <div className="font-mono text-[0.5rem] tracking-[0.12em] text-fg-strong sm:text-[0.7rem] sm:tracking-[0.16em]">
                {rightLabel}
              </div>
              <p className="mt-1 text-[0.6rem] leading-snug text-fg-strong/80 [text-shadow:0_1px_10px_rgba(0,0,0,0.65)] sm:mt-2 sm:text-[0.82rem]">
                {rightCopy}
              </p>
            </div>
          </div>
        </div>

        {/* The seam, and the handle that moves it. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-fg-strong/70"
          style={{ left: `${split}%` }}
        />
        <button
          type="button"
          role="slider"
          aria-label="Drag to move between the systems view and the photograph"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split)}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-bg/85 text-fg-strong backdrop-blur transition-colors hover:border-accent focus-visible:border-accent focus-visible:outline-none"
          style={{ left: `${split}%` }}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M9.5 8.5 6 12l3.5 3.5M14.5 8.5 18 12l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <figcaption className="mt-3 text-center font-mono text-[0.68rem] tracking-[0.14em] text-fg-faint">
        DRAG THE HANDLE — I WORK WHERE THESE TWO MEET
      </figcaption>
    </figure>
  );
}
