"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--panel-border)] bg-[rgba(4,6,13,0.72)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="pulse-ring absolute inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-widest text-text-bright">
            S.PATIL
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={`rounded px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
                active === l.id
                  ? "text-cyan"
                  : "text-text-dim hover:text-text-bright"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          onClick={onOpenPalette}
          className="flex items-center gap-2 rounded-md border border-[var(--panel-border)] bg-[var(--panel)] px-2.5 py-1.5 font-mono text-[0.7rem] text-text-dim transition-colors hover:border-cyan/40 hover:text-text-bright"
          aria-label="Open command palette"
        >
          <span className="hidden sm:inline">Search</span>
          <kbd className="rounded border border-[var(--panel-border)] bg-black/30 px-1.5 py-0.5 text-[0.62rem]">
            ⌘K
          </kbd>
        </button>
      </nav>
    </header>
  );
}
