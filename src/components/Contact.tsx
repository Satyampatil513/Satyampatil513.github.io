import { profile } from "@/lib/data";
import Reveal from "./Reveal";
import { ArrowUpRightIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl scroll-mt-28 px-5 pb-10 pt-20 sm:px-8 sm:pt-28">
      <Reveal className="text-center">
        <h2 className="font-display text-4xl font-medium italic tracking-tight text-fg-strong sm:text-5xl">
          Say hello.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-fg-mute">
          Open to conversations on AI systems, security research, and hard
          engineering problems. Fastest reply is over email.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="link-accent mt-7 inline-block font-display text-2xl sm:text-3xl"
        >
          {profile.email}
        </a>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-mute transition-colors hover:text-fg-strong"
          >
            GitHub
            <ArrowUpRightIcon className="mb-0.5 ml-0.5 inline h-3.5 w-3.5" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-mute transition-colors hover:text-fg-strong"
          >
            LinkedIn
            <ArrowUpRightIcon className="mb-0.5 ml-0.5 inline h-3.5 w-3.5" />
          </a>
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg-mute transition-colors hover:text-fg-strong"
          >
            Resume
            <ArrowUpRightIcon className="mb-0.5 ml-0.5 inline h-3.5 w-3.5" />
          </a>
        </div>
      </Reveal>

      <footer className="mt-20 flex flex-col items-center justify-between gap-2 border-t border-line pt-6 pb-4 text-xs text-fg-faint sm:flex-row">
        <span>© {new Date().getFullYear()} Satyam Patil</span>
        <span>Built by hand, from {profile.location}.</span>
      </footer>
    </section>
  );
}
