import Image from "next/image";
import { projects } from "@/lib/data";
import { Section, SectionHeading } from "./Section";
import Reveal from "./Reveal";
import { ArrowUpRightIcon } from "./Icons";
import WorkflowDiagram from "./WorkflowDiagram";

export default function Projects() {
  return (
    <Section id="projects" className="max-w-6xl">
      <SectionHeading title="Projects" sub="Things I've built, that shaped my craft." />

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((p, i) => {
          const wide = Boolean(p.workflow || (p.image && p.imageLayout === "full"));
          return (
            <Reveal key={p.name} delay={(i % 2) * 70} className={wide ? "lg:col-span-2" : ""}>
              <article className="card flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-300 hover:border-line-strong">
                {p.image && p.imageSize && p.imageLayout === "full" && (
                  <div className="w-full border-b border-line bg-black/20">
                    <Image
                      src={p.image}
                      alt={`${p.name} preview`}
                      width={p.imageSize.w}
                      height={p.imageSize.h}
                      sizes="(max-width: 1152px) 100vw, 1100px"
                      className="h-auto w-full"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-7 p-7 sm:p-8 lg:flex-row">
                  {p.video && (
                    <div className="mx-auto aspect-[9/16] w-48 flex-none overflow-hidden rounded-xl border border-line bg-black lg:mx-0">
                      <video
                        src={p.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fg-faint">
                          {p.tag}
                        </div>
                        <h3 className="mt-1.5 font-display text-[1.7rem] font-medium leading-tight text-fg-strong">
                          {p.name}
                        </h3>
                      </div>
                      <div className="flex flex-none items-center gap-3 pt-1 text-sm">
                        {p.pdfHref && (
                          <a
                            href={p.pdfHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-accent whitespace-nowrap"
                          >
                            {p.pdfLabel ?? "PDF"}
                            <ArrowUpRightIcon className="mb-0.5 ml-0.5 inline h-3.5 w-3.5" />
                          </a>
                        )}
                        {p.href && (
                          <a
                            href={p.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-accent whitespace-nowrap"
                          >
                            {p.hrefLabel ?? "GitHub"}
                            <ArrowUpRightIcon className="mb-0.5 ml-0.5 inline h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="mt-3 text-[0.98rem] font-medium leading-relaxed text-fg">
                      {p.blurb}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-fg-mute">{p.detail}</p>

                    {p.image && p.imageSize && p.imageLayout === "inline" && (
                      <div className="mt-5 overflow-hidden rounded-xl border border-line bg-black/30">
                        <Image
                          src={p.image}
                          alt={`${p.name} preview`}
                          width={p.imageSize.w}
                          height={p.imageSize.h}
                          sizes="(max-width: 1152px) 100vw, 700px"
                          className="h-auto w-full"
                        />
                      </div>
                    )}

                    {p.workflow && <WorkflowDiagram {...p.workflow} />}

                    <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line px-2.5 py-0.5 text-xs text-fg-mute"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
