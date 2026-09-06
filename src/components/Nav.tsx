"use client";

import { useEffect, useState } from "react";

const links = [
  { id: "top", label: "Index" },
  { id: "projects", label: "Projects" },
  { id: "work", label: "Work" },
  { id: "recognition", label: "Recognition" },
  { id: "contact", label: "Contact" },
];

/** Below this, treat the page as "at the top". */
const TOP_THRESHOLD = 120;

export default function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [active, setActive] = useState("top");
  const [atTop, setAtTop] = useState(true);

  // The bar gets out of the way once you start reading and comes back when you
  // return to the top. Sections are full-viewport environments, so a permanent
  // bar sits over whatever each one is doing.
  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setAtTop(window.scrollY < TOP_THRESHOLD);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      // Hidden from pointer and keyboard while it is off-screen, so nobody can
      // tab into a bar they cannot see.
      inert={!atTop}
      className={`fixed inset-x-0 top-4 z-40 flex justify-center px-4 transition-[opacity,transform] duration-300 ease-out sm:top-6 ${
        atTop ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-[150%] opacity-0"
      }`}
    >
      <nav
        className="flex items-center gap-0.5 rounded-full border border-line px-1.5 py-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.45)] backdrop-blur-md"
        style={{ background: "rgba(16,16,16,0.72)" }}
      >
        <a
          href="#top"
          aria-label="Back to top"
          className="mr-1 flex h-8 w-8 items-center justify-center rounded-full font-display text-lg font-semibold italic text-fg-strong"
        >
          S
        </a>
        {links.map((l) => (
          <a
            key={l.id}
            href={l.id === "top" ? "#top" : `#${l.id}`}
            className={`rounded-full px-3 py-1.5 text-[0.83rem] transition-colors sm:px-3.5 ${
              active === l.id
                ? "bg-white/[0.08] text-fg-strong"
                : "text-fg-mute hover:text-fg-strong"
            } ${l.id === "recognition" ? "hidden sm:block" : ""}`}
          >
            {l.label}
          </a>
        ))}
        <button
          onClick={onOpenPalette}
          aria-label="Open command palette (Ctrl+K)"
          className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-line text-fg-mute transition-colors hover:text-fg-strong"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-3.5 w-3.5"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
        </button>
      </nav>
    </header>
  );
}
