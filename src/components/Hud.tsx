import type { ReactNode } from "react";

/** Panel with HUD corner brackets. */
export function HudPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`group relative panel rounded-lg ${className}`}>
      <Corner className="left-0 top-0" />
      <Corner className="right-0 top-0 rotate-90" />
      <Corner className="bottom-0 right-0 rotate-180" />
      <Corner className="bottom-0 left-0 -rotate-90" />
      {children}
    </div>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute h-3.5 w-3.5 ${className}`}
      style={{
        borderTop: "1.5px solid var(--cyan)",
        borderLeft: "1.5px solid var(--cyan)",
        opacity: 0.55,
      }}
    />
  );
}

/** Telemetry-style section header: index + title + scanline rule. */
export function SectionHeader({
  index,
  title,
  sub,
}: {
  index: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 font-mono text-xs tracking-[0.35em] text-cyan">
        <span className="text-glow-cyan">{index}</span>
        <span className="h-px w-8 bg-cyan/60" />
        <span className="text-text-dim">{`// ${sub ?? "MODULE"}`}</span>
      </div>
      <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-text-bright sm:text-4xl">
        {title}
      </h2>
      <div
        className="mt-4 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--cyan), rgba(56,225,255,0.15) 30%, transparent)",
        }}
      />
    </div>
  );
}
