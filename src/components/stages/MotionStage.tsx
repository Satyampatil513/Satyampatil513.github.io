"use client";

import type { StageProps } from "../ProjectStage";

/** Easing curves, drawn with the easing they describe. */
const TRACKS = [
  { label: "easeInOutCubic", ease: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2) },
  { label: "easeOutQuint", ease: (t: number) => 1 - (1 - t) ** 5 },
  { label: "easeInOutSine", ease: (t: number) => -(Math.cos(Math.PI * t) - 1) / 2 },
  { label: "linear", ease: (t: number) => t },
];

/** A motion library, demonstrating itself.
 *
 * The vertical render loops behind, and the tween tracks beside it move on the
 * curves they are named after — the section is a timeline being scrubbed. */
export default function MotionStage({ progress, active, align }: StageProps) {
  const t = Math.min(1, Math.max(0, (progress - 0.15) / 0.6));

  return (
    <div className="h-full w-full overflow-hidden bg-[#0b0b0c]">
      {active && (
        <video
          src="/videos/khoj-demo.mp4"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          className={`absolute left-4 right-auto top-1/2 h-[70%] -translate-y-1/2 rounded-xl object-cover opacity-80 sm:h-[74%] ${
            align === "right" ? "lg:left-[5%] lg:right-auto" : "lg:left-auto lg:right-[5%]"
          }`}
        />
      )}

      <div
        className={`absolute inset-y-0 left-auto right-4 flex w-[44%] flex-col justify-center gap-4 sm:gap-7 lg:w-[19%] lg:px-0 ${
          align === "right" ? "lg:left-[24%] lg:right-auto" : "lg:left-auto lg:right-[24%]"
        }`}
      >
        {TRACKS.map((track) => (
          <div key={track.label}>
            <div className="mb-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-fg-faint">
              {track.label}
            </div>
            <div className="relative h-px w-full bg-line-strong">
              <span
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent"
                style={{ left: `${track.ease(t) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
