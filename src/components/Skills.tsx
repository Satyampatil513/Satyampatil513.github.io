import { skills, positions } from "@/lib/data";
import { SectionHeader } from "./Hud";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <SectionHeader index="05" sub="SYSTEMS" title="Skills" />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={i * 70}>
            <div className="h-full panel rounded-lg p-6">
              <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
                {s.group}
              </div>
              <div className="flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-md border border-[var(--panel-border)] bg-black/20 px-2.5 py-1 font-mono text-xs text-text transition-colors hover:border-cyan/40 hover:text-text-bright"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={100}>
        <div className="mt-6 panel rounded-lg p-6">
          <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Leadership & Positions
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            {positions.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-text-dim">
                <span className="mt-2 h-1 w-1 flex-none rounded-full bg-teal/70" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
