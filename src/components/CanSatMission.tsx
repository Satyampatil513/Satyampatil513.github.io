import Image from "next/image";
import { cansatMission } from "@/lib/data";
import { Section } from "./Section";
import Reveal from "./Reveal";
import { ArrowUpRightIcon } from "./Icons";

export default function CanSatMission() {
  return (
    <Section id="cansat" className="max-w-6xl">
      <Reveal>
        <div className="card grid overflow-hidden rounded-3xl lg:grid-cols-[minmax(0,11fr)_minmax(0,9fr)]">
          <div className="relative border-b border-line lg:border-b-0 lg:border-r">
            <Image
              src={cansatMission.image}
              alt={cansatMission.imageCaption}
              width={1490}
              height={852}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 640px"
            />
            <div
              className="absolute inset-x-0 bottom-0 px-5 py-3 text-xs text-fg-mute"
              style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.72))" }}
            >
              {cansatMission.imageCaption}
            </div>
          </div>

          <div className="flex flex-col p-7 sm:p-10">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fg-faint">
              {cansatMission.subtitle}
            </div>
            <h3 className="mt-2 font-display text-4xl font-medium text-fg-strong">
              {cansatMission.title}
            </h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-fg">
              {cansatMission.description}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
              {cansatMission.specs.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-medium text-fg-strong">
                    {s.value}
                  </div>
                  <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-fg-faint">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              href={cansatMission.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent mt-8 text-sm"
            >
              Ground Control System repo
              <ArrowUpRightIcon className="mb-0.5 ml-0.5 inline h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
