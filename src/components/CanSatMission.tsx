import Image from "next/image";
import { cansatMission } from "@/lib/data";
import { SectionHeader, HudPanel } from "./Hud";
import Reveal from "./Reveal";
import { ExternalIcon, ArrowIcon } from "./Icons";

export default function CanSatMission() {
  return (
    <section className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <SectionHeader index="04" sub="FLIGHT HERITAGE" title="CanSat Mission" />
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        <Reveal>
          <HudPanel className="overflow-hidden p-2">
            <div className="relative overflow-hidden rounded-md">
              <Image
                src={cansatMission.image}
                alt={cansatMission.imageCaption}
                width={1490}
                height={852}
                className="w-full rounded-md"
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            </div>
            <div className="flex items-center justify-between px-2 pb-1 pt-2.5 font-mono text-[0.65rem] text-text-dim">
              <span>{cansatMission.imageCaption}</span>
              <span className="text-teal">CDR-2023</span>
            </div>
          </HudPanel>
        </Reveal>

        <Reveal delay={100} className="flex flex-col">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-cyan">
            {cansatMission.subtitle}
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold text-text-bright">
            {cansatMission.title}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-text sm:text-base">
            {cansatMission.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {cansatMission.specs.map((s) => (
              <div
                key={s.label}
                className="panel rounded-md px-3.5 py-3"
              >
                <div className="font-mono text-lg font-bold text-glow-cyan text-text-bright">
                  {s.value}
                </div>
                <div className="mt-0.5 font-mono text-[0.62rem] uppercase tracking-[0.15em] text-text-dim">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <a
            href={cansatMission.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex w-fit items-center gap-2 rounded-md border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-2.5 font-mono text-sm text-text-bright transition-colors hover:border-cyan/40"
          >
            Ground Control System repo
            <ExternalIcon className="h-3.5 w-3.5 text-text-dim transition-colors group-hover:text-cyan" />
            <ArrowIcon className="h-3.5 w-3.5 -ml-1 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
