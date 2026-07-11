import { achievements } from "@/lib/data";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function Achievements() {
  return (
    <Section id="recognition">
      <SectionHeading title="Recognition" sub="Competitions that pushed the work further." />

      <div>
        {achievements.map((a, i) => (
          <Reveal
            key={a.title}
            delay={i * 50}
            className="grid gap-1.5 border-t border-line py-6 sm:grid-cols-[160px_1fr] sm:gap-8"
          >
            <div className="pt-1 font-mono text-xs uppercase tracking-[0.12em] text-accent">
              {a.rank}
            </div>
            <div>
              <h3 className="font-display text-xl font-medium text-fg-strong">
                {a.title}
              </h3>
              <p className="mt-0.5 text-sm text-fg-mute">{a.org}</p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-line" />
      </div>
    </Section>
  );
}
