import { projects } from "@/lib/data";
import { SectionHeading } from "./Section";
import ProjectStage from "./ProjectStage";

/** Alternate which side the copy sits on, so eight full sections read as a
 * rhythm rather than eight of the same slide. */
const ALIGN = ["left", "right"] as const;

export default function Projects() {
  return (
    <div id="projects">
      <div className="mx-auto max-w-6xl px-5 pb-4 pt-24 sm:px-8">
        <SectionHeading title="Projects" sub="Things I've built, that shaped my craft." />
      </div>

      {projects.map((p, i) => (
        <ProjectStage
          key={p.slug}
          project={p}
          align={ALIGN[i % ALIGN.length]}
          height={i % 3 === 2 ? "short" : "tall"}
        />
      ))}
    </div>
  );
}
