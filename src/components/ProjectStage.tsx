"use client";

import { useRef } from "react";
import type { Project, StageKind } from "@/lib/data";
import { ArrowUpRightIcon } from "./Icons";
import { useNearViewport, useSectionProgress } from "./useSectionProgress";
import AtlasStage from "./stages/AtlasStage";
import BrowserStage from "./stages/BrowserStage";
import ChainStage from "./stages/ChainStage";
import ClustersStage from "./stages/ClustersStage";
import DescentStage from "./stages/DescentStage";
import MotionStage from "./stages/MotionStage";
import RewriteStage from "./stages/RewriteStage";
import TerminalStage from "./stages/TerminalStage";

/** `align` is where the copy sits, so a stage can place its own content
 * opposite it rather than underneath. */
export type StageProps = { progress: number; active: boolean; align: "left" | "right" | "center" };

/** Last resort if a project names a stage that does not exist. */
function PlainStage() {
  return <div className="h-full w-full bg-card" />;
}

/** Resolved here rather than passed in: a server component cannot hand a
 * function or a component type across to a client one, so the section takes
 * plain data and looks the stage up itself. */
const STAGES: Record<StageKind, (props: StageProps) => React.ReactNode> = {
  atlas: AtlasStage,
  terminal: TerminalStage,
  clusters: ClustersStage,
  descent: DescentStage,
  motion: MotionStage,
  browser: BrowserStage,
  chain: ChainStage,
  rewrite: RewriteStage,
};

/** Shared frame for an immersive project section.
 *
 * The stage is the environment: it owns the whole background. The copy sits
 * over it in a readable column with a scrim behind, so every project can be as
 * loud as it likes without the text ever becoming the thing that suffers.
 */
export default function ProjectStage({
  project,
  height = "tall",
  align = "left",
}: {
  project: Project;
  /** Contained sections give the loud ones room to breathe. */
  height?: "tall" | "short";
  align?: "left" | "right" | "center";
}) {
  const ref = useRef<HTMLElement>(null);
  const progress = useSectionProgress(ref);
  const active = useNearViewport(ref);
  const Stage = STAGES[project.stage] ?? PlainStage;

  const column =
    align === "center"
      ? "w-full items-start text-left lg:mx-auto lg:max-w-2xl lg:items-center lg:text-center"
      : align === "right"
        ? "w-full items-start lg:ml-auto lg:max-w-xl"
        : "w-full items-start lg:mr-auto lg:max-w-xl";

  return (
    <section
      ref={ref}
      id={project.slug}
      aria-label={project.name}
      className={`relative isolate flex w-full flex-col overflow-hidden lg:block ${
        height === "tall" ? "lg:min-h-[92svh]" : "lg:min-h-[64svh]"
      }`}
    >
      {/* The environment.
        * One instance, placed differently: a band above the copy on narrow
        * screens, the whole background on wide ones. Overlaying it on a phone
        * would put every stage directly under the text it has to compete with. */}
      <div className="relative h-[42svh] w-full shrink-0 overflow-hidden lg:absolute lg:inset-0 lg:h-auto lg:-z-10">
        <Stage progress={progress} active={active} align={align} />
        {/* Fades the band into the copy below it. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg to-transparent lg:hidden"
        />
      </div>

      {/* Keeps the copy legible over the stage. Only needed where they overlap. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 hidden lg:block ${
          align === "right"
            ? "bg-gradient-to-l from-bg via-bg/75 to-transparent"
            : align === "center"
              ? "bg-bg/70"
              : "bg-gradient-to-r from-bg via-bg/75 to-transparent"
        }`}
      />

      <div className="mx-auto flex w-full max-w-6xl items-center px-5 pb-20 pt-10 sm:px-8 lg:min-h-[inherit] lg:py-24">
        <div className={`flex flex-col ${column}`}>
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent">
            {project.tag}
          </div>
          <h3 className="mt-2 font-display text-[1.75rem] font-medium leading-tight text-fg-strong sm:text-[2.1rem] lg:text-[2.6rem]">
            {project.name}
          </h3>
          <p className="mt-3 text-[0.98rem] font-medium leading-relaxed text-fg sm:mt-4 sm:text-[1.05rem]">{project.blurb}</p>
          <p className="mt-2.5 text-[0.88rem] leading-relaxed text-fg-mute sm:text-[0.94rem]">{project.detail}</p>

          {project.metrics && project.metrics.length > 0 && (
            <dl className="mt-6 flex flex-wrap gap-x-7 gap-y-4 sm:mt-7 sm:gap-x-9">
              {project.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-faint">
                    {m.label}
                  </dt>
                  <dd className="mt-1 font-display text-xl font-medium text-fg-strong sm:text-2xl">{m.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-6 flex flex-wrap gap-1.5 sm:mt-7">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-bg/60 px-2.5 py-0.5 text-xs text-fg-mute backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>

          {(project.href || project.pdfHref) && (
            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm sm:mt-7">
              {project.href && (
                <a href={project.href} target="_blank" rel="noopener noreferrer" className="link-accent">
                  {project.hrefLabel ?? "GitHub"}
                  <ArrowUpRightIcon className="mb-0.5 ml-0.5 inline h-3.5 w-3.5" />
                </a>
              )}
              {project.pdfHref && (
                <a href={project.pdfHref} target="_blank" rel="noopener noreferrer" className="link-accent">
                  {project.pdfLabel ?? "PDF"}
                  <ArrowUpRightIcon className="mb-0.5 ml-0.5 inline h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
