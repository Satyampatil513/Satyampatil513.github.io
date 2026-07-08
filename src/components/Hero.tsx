"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { profile, telemetry, fieldPhoto } from "@/lib/data";
import StatCounter from "./StatCounter";
import { HudPanel } from "./Hud";
import { GitHubIcon, LinkedInIcon, MailIcon, FileIcon, ArrowIcon } from "./Icons";

const bootLines = [
  "> initializing mission-control...",
  "> loading operator profile [OK]",
  "> uplink established :: SATYAM.PATIL",
];

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    // matchMedia is browser-only; deferring to an effect avoids an SSR/client markup mismatch.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBooted(true);
      setLineIdx(bootLines.length);
      return;
    }
    if (lineIdx >= bootLines.length) {
      const t = setTimeout(() => setBooted(true), 250);
      return () => clearTimeout(t);
    }
    const current = bootLines[lineIdx];
    if (typed.length < current.length) {
      const t = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 26);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setTyped("");
    }, 320);
    return () => clearTimeout(t);
  }, [typed, lineIdx]);

  return (
    <section id="top" className="relative isolate min-h-[100svh]">
      {/* photo backdrop */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={fieldPhoto.src}
          alt={fieldPhoto.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,4,9,0.32) 0%, rgba(2,4,9,0.5) 38%, rgba(2,4,9,0.82) 78%, var(--bg) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,4,9,0.4) 0%, rgba(2,4,9,0.08) 45%, rgba(2,4,9,0.4) 100%)",
          }}
        />
        <div className="grid-overlay absolute inset-0 opacity-[0.06]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-5 pb-16 pt-28 sm:px-8">
      {/* boot log */}
      <div className="mb-6 font-mono text-xs text-cyan/80 sm:text-sm">
        {bootLines.slice(0, lineIdx).map((l, i) => (
          <div key={i} className="opacity-60">
            {l}
          </div>
        ))}
        {lineIdx < bootLines.length && (
          <div>
            {typed}
            <span className="cursor-blink">▋</span>
          </div>
        )}
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
        {/* left: identity */}
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--panel-border)] bg-[var(--panel)] px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-teal">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Research Engineer · Samsung Research
          </div>

          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-text-bright sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>

          <p className="mt-4 font-mono text-lg text-cyan sm:text-xl">
            {profile.role}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-text sm:text-lg">
            {profile.tagline} From on-device ML and satellites that flew to
            production multi-agent systems — I work where the AI layer meets the
            systems layer.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-cyan px-5 py-2.5 font-mono text-sm font-semibold text-[#04121a] transition-transform hover:-translate-y-0.5"
              style={{ boxShadow: "0 0 24px rgba(56,225,255,0.35)" }}
            >
              View Missions
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={profile.links.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--panel-border)] bg-[var(--panel)] px-5 py-2.5 font-mono text-sm text-text-bright transition-colors hover:border-cyan/50"
            >
              <FileIcon className="h-4 w-4" />
              Resume
            </a>
            <div className="ml-1 flex items-center gap-1">
              <IconLink href={profile.links.github} label="GitHub">
                <GitHubIcon className="h-5 w-5" />
              </IconLink>
              <IconLink href={profile.links.linkedin} label="LinkedIn">
                <LinkedInIcon className="h-5 w-5" />
              </IconLink>
              <IconLink href={`mailto:${profile.email}`} label="Email">
                <MailIcon className="h-5 w-5" />
              </IconLink>
            </div>
          </div>
        </div>

        {/* right: telemetry readout */}
        <div
          className={`transition-all duration-700 ${
            booted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <HudPanel className="scanlines overflow-hidden p-6">
            <div className="mb-5 flex items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.2em] text-text-dim">
              <span>Telemetry</span>
              <span className="flex items-center gap-1.5 text-teal">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
                LIVE
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-7">
              {telemetry.map((t) => (
                <StatCounter
                  key={t.label}
                  value={t.value}
                  unit={t.unit}
                  label={t.label}
                />
              ))}
            </div>
            <div className="mt-6 border-t border-[var(--panel-border)] pt-4 font-mono text-[0.65rem] text-text-dim">
              <div className="flex justify-between">
                <span>LOC</span>
                <span className="text-text">{profile.location}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span>STATUS</span>
                <span className="text-teal">OPERATIONAL</span>
              </div>
            </div>
          </HudPanel>
        </div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-text-dim">
        <div className="flex flex-col items-center gap-2">
          scroll
          <span className="h-8 w-px bg-gradient-to-b from-cyan to-transparent" />
        </div>
      </div>
      </div>
    </section>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md text-text-dim transition-colors hover:bg-[var(--panel)] hover:text-cyan"
    >
      {children}
    </a>
  );
}
