"use client";

import { useState } from "react";
import type { StageProps } from "../ProjectStage";

/** The live product, actually running.
 *
 * Framed and inert on purpose: `pointer-events: none` means it cannot steal
 * scroll or take anyone off the page, and rendering at desktop width then
 * scaling keeps the real layout rather than a squashed mobile one. If the
 * embed fails the frame simply stays empty rather than showing a broken box.
 * The visit link below the copy is the reliable route in either case. */
export default function BrowserStage({ active, align, url = "https://www.rankit.in", label = "rankit.in" }: StageProps & { url?: string; label?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="h-full w-full bg-[#0c0d0d]">
      <div
        className={`absolute inset-y-0 left-0 right-0 flex items-center px-4 lg:w-[46%] lg:px-0 ${
          align === "right" ? "lg:left-0 lg:right-auto lg:pl-10" : "lg:left-auto lg:right-0 lg:pr-10"
        }`}
      >
        <div className="w-full overflow-hidden rounded-xl border border-line-strong bg-[#15161a] shadow-2xl">
          {/* Chrome, so the light product reads as a site rather than a clash. */}
          <div className="flex items-center gap-2 border-b border-line px-3 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a3d42]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a3d42]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a3d42]" />
            <div className="ml-2 flex-1 rounded-md bg-bg/70 px-3 py-1 font-mono text-[0.6rem] text-fg-faint">
              {label}
            </div>
            <span className="font-mono text-[0.55rem] uppercase tracking-[0.16em] text-accent">live</span>
          </div>

          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#f7f8fa]">
            {active && !failed && (
              <iframe
                src={url}
                title="Live product preview"
                loading="lazy"
                onError={() => setFailed(true)}
                tabIndex={-1}
                aria-hidden="true"
                scrolling="no"
                className="pointer-events-none absolute left-0 top-0 origin-top-left border-0 [--embed-scale:0.3] sm:[--embed-scale:0.45] lg:[--embed-scale:0.49]"
                style={{ width: "1440px", height: "900px", transform: "scale(var(--embed-scale))" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
