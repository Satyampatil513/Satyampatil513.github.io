import { experience } from "@/lib/data";
import { SectionHeader } from "./Hud";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <SectionHeader index="01" sub="MISSION LOG" title="Experience" />
      </Reveal>

      <div className="relative">
        {/* vertical trace */}
        <div
          className="absolute left-[7px] top-2 bottom-2 w-px sm:left-[9px]"
          style={{
            background:
              "linear-gradient(to bottom, var(--cyan), rgba(56,225,255,0.2) 50%, transparent)",
          }}
        />

        <div className="space-y-10">
          {experience.map((exp, i) => (
            <Reveal key={exp.org} delay={i * 80} className="relative pl-8 sm:pl-10">
              {/* node */}
              <span
                className={`absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full sm:h-[18px] sm:w-[18px] ${
                  exp.status === "active" ? "pulse-ring" : ""
                }`}
                style={{
                  background: "var(--bg)",
                  border: `1.5px solid ${exp.status === "active" ? "var(--cyan)" : "var(--panel-border)"}`,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: exp.status === "active" ? "var(--cyan)" : "var(--text-dim)",
                  }}
                />
              </span>

              <div className="panel rounded-lg p-5 transition-colors hover:border-cyan/30 sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-xl font-bold text-text-bright">
                    {exp.org}
                  </h3>
                  <span className="font-mono text-xs text-cyan">
                    {exp.start} — {exp.end}
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 font-mono text-xs text-text-dim">
                  <span className="text-teal">{exp.role}</span>
                  <span className="opacity-40">/</span>
                  <span>{exp.location}</span>
                </div>

                <ul className="mt-4 space-y-2.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2.5 text-sm leading-relaxed text-text">
                      <span className="mt-2 h-1 w-1 flex-none rounded-full bg-cyan/70" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-[var(--panel-border)] px-2 py-0.5 font-mono text-[0.65rem] text-text-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
