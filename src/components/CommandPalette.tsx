"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { profile } from "@/lib/data";
import { ArrowIcon } from "./Icons";

type Command = {
  label: string;
  hint: string;
  action: () => void;
};

export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);

  const scrollTo = useCallback(
    (id: string) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      onClose();
    },
    [onClose],
  );

  const commands: Command[] = useMemo(
    () => [
      { label: "Go to Work", hint: "section", action: () => scrollTo("work") },
      { label: "Go to Projects", hint: "section", action: () => scrollTo("projects") },
      { label: "Go to Recognition", hint: "section", action: () => scrollTo("recognition") },
      { label: "Go to Skills", hint: "section", action: () => scrollTo("skills") },
      { label: "Go to Contact", hint: "section", action: () => scrollTo("contact") },
      {
        label: "Open GitHub",
        hint: "external",
        action: () => window.open(profile.links.github, "_blank"),
      },
      {
        label: "Open LinkedIn",
        hint: "external",
        action: () => window.open(profile.links.linkedin, "_blank"),
      },
      {
        label: "Copy Email",
        hint: "clipboard",
        action: () => navigator.clipboard.writeText(profile.email),
      },
      {
        label: "Open Resume",
        hint: "external",
        action: () => window.open(profile.links.resume, "_blank"),
      },
    ],
    [scrollTo],
  );

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        filtered[index]?.action();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, index, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="font-mono text-accent">{">"}</span>
          <input
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            placeholder="Search commands..."
            className="w-full bg-transparent text-sm text-fg-strong placeholder:text-fg-faint focus:outline-none"
          />
          <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[0.62rem] text-fg-faint">
            ESC
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto p-1.5">
          {filtered.length === 0 && (
            <div className="px-3 py-6 text-center text-xs text-fg-faint">
              No matching commands
            </div>
          )}
          {filtered.map((c, i) => (
            <button
              key={c.label}
              onClick={c.action}
              onMouseEnter={() => setIndex(i)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                i === index
                  ? "bg-white/[0.06] text-fg-strong"
                  : "text-fg hover:bg-white/[0.03]"
              }`}
            >
              <span className="flex items-center gap-2">
                {i === index && <ArrowIcon className="h-3.5 w-3.5 text-accent" />}
                {c.label}
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-widest text-fg-faint">
                {c.hint}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
