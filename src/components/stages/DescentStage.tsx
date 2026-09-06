"use client";

import type { StageProps } from "../ProjectStage";

const APOGEE = 725;

/** Scrolling is the descent.
 *
 * Altitude is bound to scroll position, so reading the section flies the
 * mission: released at apogee, two-stage parachute, payload away, touchdown. */
export default function DescentStage({ progress, align }: StageProps) {
  const fall = Math.min(1, Math.max(0, (progress - 0.1) / 0.72));
  const altitude = Math.round(APOGEE * (1 - fall));
  const tilt = Math.sin(fall * Math.PI * 3) * 3.2;

  const events: { at: number; label: string }[] = [
    { at: 0.0, label: "RELEASE · 725 m" },
    { at: 0.25, label: "DROGUE DEPLOYED" },
    { at: 0.5, label: "MAIN CHUTE · 5 m/s" },
    { at: 0.75, label: "PAYLOAD RELEASE" },
    { at: 0.96, label: "TOUCHDOWN · FLAG UP" },
  ];
  const reached = events.filter((e) => fall >= e.at);
  const current = reached[reached.length - 1];

  return (
    <div className="h-full w-full overflow-hidden bg-[#0a0b0c]">
      {/* Ground rising to meet the descent. */}
      <div
        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-accent-dim/20 to-transparent transition-[height] duration-200"
        style={{ height: `${8 + fall * 46}%` }}
        aria-hidden="true"
      />

      {/* Horizon, swinging under the canopy. */}
      <div
        className="absolute inset-x-[-12%] top-1/2 h-px bg-accent/25 transition-transform duration-200"
        style={{ transform: `translateY(${(fall - 0.5) * 160}px) rotate(${tilt}deg)` }}
        aria-hidden="true"
      />

      {/* Altitude ladder. */}
      <div
        className={`absolute inset-y-0 left-auto right-4 flex w-20 flex-col justify-between py-8 font-mono text-[0.52rem] text-fg-faint sm:w-24 sm:py-16 sm:text-[0.58rem] ${
          align === "right" ? "lg:left-8 lg:right-auto" : "lg:left-auto lg:right-8"
        }`}
        aria-hidden="true"
      >
        {[725, 580, 435, 290, 145, 0].map((m) => (
          <div key={m} className="flex items-center gap-2">
            <span className="h-px w-4 bg-line-strong" />
            <span className={altitude <= m + 72 && altitude >= m - 72 ? "text-accent" : ""}>{m} m</span>
          </div>
        ))}
      </div>

      {/* Live readout. */}
      <div
        className={`absolute bottom-5 left-4 right-auto font-mono sm:bottom-10 ${align === "right" ? "lg:left-8 lg:right-auto" : "lg:left-auto lg:right-8"}`}
      >
        <div className="text-[2rem] leading-none text-accent tabular-nums sm:text-[2.6rem]">
          {String(altitude).padStart(3, "0")}
          <span className="ml-1 text-sm text-fg-faint">m</span>
        </div>
        <div className="mt-2 text-[0.6rem] uppercase tracking-[0.18em] text-fg-mute">
          {current?.label ?? "ARMED"}
        </div>
        <div className="mt-1 text-[0.6rem] uppercase tracking-[0.18em] text-fg-faint">
          LINK 2 km · GCS 1 s
        </div>
      </div>
    </div>
  );
}
