import { skills, positions } from "@/lib/data";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading title="Toolbox" sub="What I reach for, and where I've led." />

      <div>
        {skills.map((s, i) => (
          <Reveal
            key={s.group}
            delay={i * 50}
            className="grid gap-1.5 border-t border-line py-6 sm:grid-cols-[160px_1fr] sm:gap-8"
          >
            <div className="pt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fg-faint">
              {s.group}
            </div>
            <p className="text-[0.95rem] leading-relaxed text-fg">
              {s.items.join(" · ")}
            </p>
          </Reveal>
        ))}

        <Reveal
          delay={150}
          className="grid gap-1.5 border-t border-line py-6 sm:grid-cols-[160px_1fr] sm:gap-8"
        >
          <div className="pt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fg-faint">
            Positions
          </div>
          <ul className="space-y-2.5">
            {positions.map((p, i) => (
              <li key={i} className="text-[0.95rem] leading-relaxed text-fg-mute">
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="border-t border-line" />
      </div>
    </Section>
  );
}
