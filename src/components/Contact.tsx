import { profile } from "@/lib/data";
import { SectionHeader, HudPanel } from "./Hud";
import Reveal from "./Reveal";
import { GitHubIcon, LinkedInIcon, MailIcon, ArrowIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8">
      <Reveal>
        <SectionHeader index="06" sub="UPLINK" title="Contact" />
      </Reveal>

      <Reveal>
        <HudPanel className="scanlines overflow-hidden p-8 sm:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-teal">
                Channel open
              </div>
              <h3 className="mt-3 font-display text-3xl font-bold text-text-bright sm:text-4xl">
                Let&apos;s build something
                <span className="text-cyan"> in orbit.</span>
              </h3>
              <p className="mt-4 max-w-md text-text-dim">
                Open to conversations on AI systems, security research, and hard
                engineering problems. Fastest reply is over email.
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="group mt-7 inline-flex items-center gap-2 rounded-md bg-cyan px-6 py-3 font-mono text-sm font-semibold text-[#04121a] transition-transform hover:-translate-y-0.5"
                style={{ boxShadow: "0 0 24px rgba(56,225,255,0.35)" }}
              >
                {profile.email}
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="space-y-3 font-mono text-sm">
              <ContactRow
                href={profile.links.github}
                label="GITHUB"
                value="Satyampatil513"
              >
                <GitHubIcon className="h-5 w-5" />
              </ContactRow>
              <ContactRow
                href={profile.links.linkedin}
                label="LINKEDIN"
                value="satyam-patil"
              >
                <LinkedInIcon className="h-5 w-5" />
              </ContactRow>
              <ContactRow
                href={`mailto:${profile.email}`}
                label="EMAIL"
                value="satyam.content"
              >
                <MailIcon className="h-5 w-5" />
              </ContactRow>
            </div>
          </div>
        </HudPanel>
      </Reveal>

      <footer className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-[var(--panel-border)] pt-6 font-mono text-xs text-text-dim sm:flex-row">
        <span>© {new Date().getFullYear()} Satyam Patil · All systems nominal</span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
          Built with Next.js · Deployed to Earth orbit
        </span>
      </footer>
    </section>
  );
}

function ContactRow({
  href,
  label,
  value,
  children,
}: {
  href: string;
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-md border border-[var(--panel-border)] bg-black/20 px-4 py-3 transition-colors hover:border-cyan/40"
    >
      <span className="text-text-dim transition-colors group-hover:text-cyan">
        {children}
      </span>
      <span className="flex-1">
        <span className="block text-[0.6rem] tracking-[0.2em] text-text-dim">
          {label}
        </span>
        <span className="text-text-bright">{value}</span>
      </span>
      <ArrowIcon className="h-4 w-4 -rotate-45 text-text-dim transition-transform group-hover:translate-x-0.5 group-hover:text-cyan" />
    </a>
  );
}
