import Image from "next/image";
import { projects } from "@/lib/data";
import { SectionHeader } from "./Hud";
import Reveal from "./Reveal";
import { ExternalIcon } from "./Icons";
import WorkflowDiagram from "./WorkflowDiagram";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <SectionHeader index="02" sub="PAYLOADS" title="Projects" />
      </Reveal>

      <div className="grid gap-5">
        {projects.map((p, i) => {
          const Wrapper = p.href ? "a" : "div";
          return (
            <Reveal key={p.name} delay={i * 70}>
              <Wrapper
                {...(p.href
                  ? { href: p.href, target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group relative flex h-full flex-col overflow-hidden rounded-lg panel transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40"
              >
                {/* hover glow */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(circle, rgba(56,225,255,0.16), transparent 70%)",
                  }}
                />

                {p.image && (
                  <div className="relative h-40 w-full overflow-hidden border-b border-[var(--panel-border)] bg-black/20">
                    <Image
                      src={p.image}
                      alt={`${p.name} preview`}
                      fill
                      sizes="(max-width: 640px) 100vw, 480px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-teal">
                      {p.tag}
                    </span>
                    {p.href && (
                      <span className="flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-widest text-text-dim transition-colors group-hover:text-cyan">
                        {p.hrefLabel ?? "GitHub"}
                        <ExternalIcon className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-display text-2xl font-bold text-text-bright">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-text">{p.blurb}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-dim">{p.detail}</p>

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

                  <WorkflowDiagram {...p.workflow} />
                </div>
              </Wrapper>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
