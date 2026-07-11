import Image from "next/image";
import { profile, telemetry, fieldPhoto } from "@/lib/data";
import Reveal from "./Reveal";
import { ArrowUpRightIcon } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-5xl px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
      {/* headline */}
      <Reveal className="text-center">
        <h1 className="font-display text-5xl font-medium tracking-tight text-fg-strong sm:text-6xl lg:text-7xl">
          {profile.name}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-display text-xl italic leading-snug text-fg-mute sm:text-2xl">
          {profile.tagline}
        </p>
      </Reveal>

      {/* photo + note */}
      <div className="mt-14 grid gap-5 sm:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <Reveal className="relative min-h-[420px] overflow-hidden rounded-2xl border border-line lg:min-h-0">
          <Image
            src={fieldPhoto.mobileSrc}
            alt={fieldPhoto.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover sm:hidden"
          />
          <Image
            src={fieldPhoto.src}
            alt={fieldPhoto.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 480px"
            className="hidden object-cover sm:block"
          />
        </Reveal>

        <Reveal delay={120} className="card rounded-2xl p-7 sm:p-9">
          <div className="space-y-5 text-[1.02rem] leading-relaxed text-fg">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p>
              Find me on{" "}
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent"
              >
                GitHub
                <ArrowUpRightIcon className="mb-0.5 ml-0.5 inline h-3.5 w-3.5" />
              </a>{" "}
              and{" "}
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent"
              >
                LinkedIn
                <ArrowUpRightIcon className="mb-0.5 ml-0.5 inline h-3.5 w-3.5" />
              </a>
              , or read my{" "}
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent"
              >
                resume
                <ArrowUpRightIcon className="mb-0.5 ml-0.5 inline h-3.5 w-3.5" />
              </a>
              .
            </p>
          </div>

          <div className="mt-9">
            <div className="font-hand text-3xl text-fg-mute">Satyam</div>
            <div className="mt-2 text-sm text-fg-faint">
              {profile.location}
              <br />
              Jul 2026
            </div>
          </div>
        </Reveal>
      </div>

      {/* quiet stats strip */}
      <Reveal delay={80} className="mt-16 border-y border-line sm:mt-20">
        <div className="grid grid-cols-2 divide-line sm:grid-cols-4 sm:divide-x">
          {telemetry.map((t) => (
            <div key={t.label} className="px-4 py-6 text-center">
              <div className="font-display text-3xl font-medium text-fg-strong">
                {t.unit === "TOP" ? `Top ${t.value}` : `${t.value}${t.unit ?? ""}`}
              </div>
              <div className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-fg-faint">
                {t.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
