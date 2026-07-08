import Image from "next/image";
import { projects } from "@/lib/data";
import { SectionHeader } from "./Hud";
import Reveal from "./Reveal";
import { ExternalIcon, FileIcon } from "./Icons";
import WorkflowDiagram from "./WorkflowDiagram";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <SectionHeader index="02" sub="PAYLOADS" title="Projects" />
      </Reveal>

      <div className="grid gap-5">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 70}>
            <div className="group relative flex h-full flex-col overflow-hidden rounded-lg panel transition-all duration-300 hover:border-cyan/40">
              {/* hover glow */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle, rgba(56,225,255,0.16), transparent 70%)",
                }}
              />

              {p.image && p.imageSize && p.imageLayout === "full" && (
                <div className="w-full border-b border-[var(--panel-border)] bg-black/20">
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

              <div className="flex flex-1 flex-col gap-6 p-6 sm:flex-row">
                {p.video && (
                  <div className="mx-auto aspect-[9/16] w-48 flex-none overflow-hidden rounded-lg border border-[var(--panel-border)] bg-black sm:mx-0">
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

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-teal">
                      {p.tag}
                    </span>
                    <div className="flex items-center gap-3">
                      {p.pdfHref && (
                        <a
                          href={p.pdfHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-widest text-text-dim transition-colors hover:text-cyan"
                        >
                          {p.pdfLabel ?? "View PDF"}
                          <FileIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {p.href && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-widest text-text-dim transition-colors hover:text-cyan"
                        >
                          {p.hrefLabel ?? "GitHub"}
                          <ExternalIcon className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold text-text-bright">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-text">{p.blurb}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-dim">{p.detail}</p>

                  {p.image && p.imageSize && p.imageLayout === "inline" && (
                    <div className="mt-4 overflow-hidden rounded-md border border-[var(--panel-border)] bg-black/30">
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

                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-[var(--panel-border)] pt-4">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-[var(--panel-border)] px-2 py-0.5 font-mono text-[0.65rem] text-text-dim"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {p.workflow && <WorkflowDiagram {...p.workflow} />}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
