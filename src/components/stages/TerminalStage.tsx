"use client";

import type { StageProps } from "../ProjectStage";

/** A real CLAI session, told in its own medium.
 *
 * Not a screenshot of a terminal — the section is the terminal, and scrolling
 * runs the session. The danger check refusing the command is the point of the
 * project, so it is the beat the whole sequence builds to. */
const SESSION: { text: string; tone?: "cmd" | "trace" | "warn" | "ok" }[] = [
  { text: "$ clai \"why did last night's build fail?\"", tone: "cmd" },
  { text: "" },
  { text: "  searching memory ................ 42 folders, 3 prior sessions", tone: "trace" },
  { text: "  recalled  ~/aosp/out/target/product   (visited 19x)", tone: "trace" },
  { text: "  recalled  session 2026-02-11 22:14    \"selinux denial\"", tone: "trace" },
  { text: "" },
  { text: "  avc: denied { write } for comm=\"system_server\"", tone: "warn" },
  { text: "        scontext=u:r:system_server:s0", tone: "warn" },
  { text: "        tcontext=u:object_r:vendor_data_file:s0", tone: "warn" },
  { text: "" },
  { text: "  proposed  adb shell setenforce 0", tone: "trace" },
  { text: "  danger check .................... BLOCKED", tone: "warn" },
  { text: "  reason    disables SELinux enforcement device-wide", tone: "warn" },
  { text: "" },
  { text: "  instead   audit2allow -i denials.log -p policy", tone: "ok" },
  { text: "  writing   vendor_data_file.te (+4 lines)", tone: "ok" },
  { text: "  memory    updated — 1 fix, 1 refusal", tone: "trace" },
  { text: "" },
  { text: "$ ", tone: "cmd" },
];

const TONES: Record<string, string> = {
  cmd: "text-fg-strong",
  trace: "text-fg-mute",
  warn: "text-[#d9a05b]",
  ok: "text-accent",
};

export default function TerminalStage({ progress, align }: StageProps) {
  // Run the session across the middle of the scroll, so it starts and ends
  // while the section is actually on screen.
  const run = Math.min(1, Math.max(0, (progress - 0.12) / 0.55));
  const shown = Math.round(run * SESSION.length);

  return (
    <div className="h-full w-full bg-[#0b0c0c]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, rgba(133,201,158,0.035) 0 1px, transparent 1px 3px)",
        }}
      />
      <div
        className={`absolute inset-0 flex items-center px-4 sm:px-10 ${
          align === "right" ? "lg:justify-start" : "lg:justify-end"
        }`}
      >
        <pre className="max-w-[46rem] flex-1 overflow-hidden font-mono text-[0.58rem] leading-[1.5] sm:text-[0.72rem] lg:text-[0.82rem]">
          {SESSION.slice(0, shown).map((line, i) => (
            <div
              key={i}
              className={`${TONES[line.tone ?? "trace"]} whitespace-pre`}
              style={{ opacity: i === shown - 1 ? 0.65 : 1 }}
            >
              {line.text}
              {i === shown - 1 && line.text.startsWith("$") && (
                <span className="ml-0.5 inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] animate-pulse bg-accent" />
              )}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
