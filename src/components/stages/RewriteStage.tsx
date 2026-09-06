"use client";

import type { StageProps } from "../ProjectStage";

/** Résumé lines, before and after. The rewrite is the product. */
const LINES: { before: string; after: string; at: number }[] = [
  { before: "Worked on the backend team", after: "Shipped 14 services handling 2M req/day", at: 0.14 },
  { before: "Responsible for testing", after: "Cut regression suite from 40 to 6 minutes", at: 0.3 },
  { before: "Helped with the migration", after: "Led on-prem to cloud migration for 30 teams", at: 0.46 },
  { before: "Good communication skills", after: "Wrote the RFC adopted across four orgs", at: 0.62 },
];

/** The document rewrites itself as you read it. */
export default function RewriteStage({ progress, align }: StageProps) {
  return (
    <div className="h-full w-full bg-[#0b0c0c]">
      <div
        className={`absolute inset-y-0 left-0 right-0 flex flex-col justify-center gap-3.5 px-5 sm:gap-5 lg:w-[46%] lg:px-10 ${
          align === "right" ? "lg:left-0 lg:right-auto" : "lg:left-auto lg:right-0"
        }`}
      >
        {LINES.map((line) => {
          const done = progress > line.at;
          return (
            <div key={line.before} className="border-l-2 pl-4 transition-colors duration-500"
              style={{ borderColor: done ? "rgba(133,201,158,0.5)" : "rgba(38,38,36,1)" }}
            >
              <div
                className="text-[0.82rem] leading-snug text-fg-faint line-through transition-opacity duration-500"
                style={{ opacity: done ? 0.32 : 0.85 }}
              >
                {line.before}
              </div>
              <div
                className="mt-1.5 text-[0.92rem] leading-snug text-fg-strong transition-all duration-500"
                style={{
                  opacity: done ? 1 : 0,
                  transform: `translateY(${done ? 0 : 6}px)`,
                }}
              >
                {line.after}
              </div>
            </div>
          );
        })}
        <div className="mt-2 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-fg-faint">
          {progress > 0.62 ? "4 lines rewritten · quantified" : "scanning for weak claims…"}
        </div>
      </div>
    </div>
  );
}
