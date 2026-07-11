import type { ReactNode } from "react";
import Reveal from "./Reveal";

/** Centered editorial section heading: big serif title + italic serif subtitle. */
export function SectionHeading({ title, sub }: { title: string; sub?: string }) {
  return (
    <Reveal className="mb-14 text-center sm:mb-16">
      <h2 className="font-display text-4xl font-medium tracking-tight text-fg-strong sm:text-5xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-3 font-display text-lg italic text-fg-mute sm:text-xl">
          {sub}
        </p>
      )}
    </Reveal>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-5xl scroll-mt-28 px-5 py-20 sm:px-8 sm:py-24 ${className}`}
    >
      {children}
    </section>
  );
}
