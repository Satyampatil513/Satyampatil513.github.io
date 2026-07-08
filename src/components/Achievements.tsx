import { achievements } from "@/lib/data";
import { SectionHeader } from "./Hud";
import Reveal from "./Reveal";

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8"
    >
      <Reveal>
        <SectionHeader index="03" sub="COMMENDATIONS" title="Achievements" />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        {achievements.map((a, i) => (
          <Reveal
            key={a.title}
            delay={i * 60}
            className={i === 0 ? "md:col-span-2" : ""}
          >
            <div
              className={`group relative flex items-center gap-5 overflow-hidden rounded-lg panel p-5 transition-colors hover:border-amber/40 ${
                i === 0 ? "md:p-7" : ""
              }`}
            >
              {/* rank badge */}
              <div className="flex-none">
                <div
                  className="flex h-16 w-16 flex-col items-center justify-center rounded-md border sm:h-20 sm:w-20"
                  style={{
                    borderColor: "rgba(255,182,56,0.35)",
                    background: "rgba(255,182,56,0.06)",
                  }}
                >
                  <RankMark rank={a.rank} />
                </div>
              </div>

              <div className="min-w-0">
                <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-amber">
                  {a.rank}
                </div>
                <h3 className="mt-1 font-display text-lg font-bold text-text-bright sm:text-xl">
                  {a.title}
                </h3>
                <p className="mt-0.5 text-sm text-text-dim">{a.org}</p>
              </div>

              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-32 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,182,56,0.08))",
                }}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function RankMark({ rank }: { rank: string }) {
  // pull the most eye-catching token out of the rank string
  const big = rank.includes("21")
    ? "21"
    : rank.includes("12")
      ? "12"
      : rank.includes("1st")
        ? "1"
        : "★";
  const sub = rank.includes("21")
    ? "GLOBAL"
    : rank.includes("12")
      ? "INDIA"
      : rank.includes("1st")
        ? "PLACE"
        : "WIN";
  return (
    <>
      <span className="font-display text-2xl font-bold text-amber sm:text-3xl">
        {big !== "★" && <span className="text-sm align-top">#</span>}
        {big}
      </span>
      <span className="font-mono text-[0.55rem] tracking-[0.15em] text-amber/70">
        {sub}
      </span>
    </>
  );
}
