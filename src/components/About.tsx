import { profile, education } from "@/lib/data";
import { SectionHeader, HudPanel } from "./Hud";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <SectionHeader index="00" sub="OPERATOR" title="About" />
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="space-y-5">
            {profile.about.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-text sm:text-lg">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <HudPanel className="p-6">
            <div className="mb-4 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-cyan">
              {"// Education"}
            </div>
            <div className="space-y-5">
              {education.map((e) => (
                <div key={e.org} className="border-l border-[var(--panel-border)] pl-4">
                  <div className="font-display text-base font-bold text-text-bright">
                    {e.org}
                  </div>
                  <div className="mt-0.5 text-sm text-text">{e.detail}</div>
                  <div className="mt-1 flex justify-between font-mono text-[0.68rem] text-text-dim">
                    <span>{e.location}</span>
                    <span className="text-cyan/80">{e.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </HudPanel>
        </Reveal>
      </div>
    </section>
  );
}
