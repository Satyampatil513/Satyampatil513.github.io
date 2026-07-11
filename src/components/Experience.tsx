import Image from "next/image";
import { experience, education } from "@/lib/data";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <Section id="work">
      <SectionHeading title="Work" sub="Where I've been building." />

      <div>
        {experience.map((exp, i) => (
          <Reveal
            key={exp.org}
            delay={i * 60}
            className="grid gap-3 border-t border-line py-9 sm:grid-cols-[160px_1fr] sm:gap-8"
          >
            <div className="pt-1 font-mono text-xs text-fg-faint">
              {exp.start} — {exp.end}
              {exp.status === "active" && (
                <span className="mt-2 hidden items-center gap-1.5 text-accent sm:flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Present
                </span>
              )}
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-2xl font-medium text-fg-strong">
                  {exp.org}
                </h3>
                <div className="mt-1 text-sm text-fg-mute">
                  {exp.role} · {exp.location}
                </div>

                <ul className="mt-4 space-y-2.5">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="text-[0.95rem] leading-relaxed text-fg">
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line bg-card px-2.5 py-0.5 text-xs text-fg-mute"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {exp.image && (
                <div className="relative h-44 w-full flex-none overflow-hidden rounded-xl border border-line sm:h-32 sm:w-44">
                  <Image
                    src={exp.image}
                    alt={`${exp.org} — ${exp.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 176px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </Reveal>
        ))}

        {/* education, same quiet rhythm */}
        {education.map((e, i) => (
          <Reveal
            key={e.org}
            delay={i * 60}
            className="grid gap-3 border-t border-line py-9 sm:grid-cols-[160px_1fr] sm:gap-8"
          >
            <div className="pt-1 font-mono text-xs text-fg-faint">{e.period}</div>
            <div>
              <h3 className="font-display text-2xl font-medium text-fg-strong">
                {e.org}
              </h3>
              <div className="mt-1 text-sm text-fg-mute">
                {e.detail} · {e.location}
              </div>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-line" />
      </div>
    </Section>
  );
}
