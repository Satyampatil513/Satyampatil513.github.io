"use client";

import type { StageProps } from "../ProjectStage";

const BLOCKS = 6;
/** Fixed digests — the point is the linkage, not live hashing. */
const HASHES = ["4f1a9c", "b207de", "91cc03", "e4a7b1", "0d38fa", "7c62e9"];

/** The chain builds as you scroll: each block carries the previous digest. */
export default function ChainStage({ progress, align }: StageProps) {
  const built = Math.min(BLOCKS, Math.floor(Math.max(0, (progress - 0.14) / 0.6) * BLOCKS) + 1);

  return (
    <div className="h-full w-full bg-[#0b0c0d]">
      <div
        className={`absolute inset-y-0 left-0 right-0 flex flex-col justify-center gap-2 px-5 sm:gap-3 lg:w-[48%] lg:px-10 ${
          align === "right" ? "lg:left-0 lg:right-auto" : "lg:left-auto lg:right-0"
        }`}
      >
        {Array.from({ length: BLOCKS }, (_, i) => {
          const on = i < built;
          return (
            <div key={i} className="relative">
              {i > 0 && (
                <div
                  className="absolute -top-3 left-7 h-3 w-px transition-colors duration-500"
                  style={{ background: on ? "rgba(133,201,158,0.5)" : "rgba(52,52,47,0.6)" }}
                />
              )}
              <div
                className="flex items-center gap-4 rounded-lg border px-4 py-3 transition-all duration-500"
                style={{
                  borderColor: on ? "rgba(133,201,158,0.35)" : "rgba(38,38,36,1)",
                  background: on ? "rgba(133,201,158,0.05)" : "transparent",
                  opacity: on ? 1 : 0.32,
                  transform: `translateX(${on ? 0 : -10}px)`,
                }}
              >
                <span className="font-mono text-[0.6rem] text-fg-faint">#{i}</span>
                <div className="flex-1 font-mono text-[0.66rem] leading-relaxed">
                  <div className={on ? "text-accent" : "text-fg-faint"}>hash {HASHES[i]}…</div>
                  <div className="text-fg-faint">
                    prev {i === 0 ? "000000…" : `${HASHES[i - 1]}…`}
                  </div>
                </div>
                {on && (
                  <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-accent/70">
                    sealed
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
