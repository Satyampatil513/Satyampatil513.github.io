# Personal Website — Progress Notes

Next.js 16 (App Router, Turbopack) + Tailwind v4 + TypeScript. Theme: "Mission Control" —
dark space aesthetic, cyan/amber/teal accents, JetBrains Mono + Space Grotesk + Inter,
starfield background, HUD-style panels, scroll-reveal animations, ⌘K command palette.

Dev server has been running throughout at `http://localhost:3000` (background PID, port 3000).

## Done

- **Design system**: `src/app/globals.css` (color tokens, fonts, grid overlay, scanlines,
  reveal animations), fonts wired in `src/app/layout.tsx`.
- **Core primitives**: `Starfield` (canvas parallax stars), `Reveal` (IntersectionObserver
  scroll-in), `HudPanel`/`SectionHeader` (corner-bracket panels), `StatCounter` (animated
  count-up).
- **Nav + ⌘K command palette**: `Nav.tsx`, `CommandPalette.tsx`, `SiteChrome.tsx`
  (palette is conditionally mounted only while open — avoids a lint issue, see below).
- **Hero**: full-bleed background is the user's own photo (`public/images/summit-2400.jpg`,
  decoded from a Canon CR2 RAW via `rawpy`+Pillow), name/title blended directly onto it
  per explicit user request (no caption/narrative — "just me, no reason needed"). Boot-sequence
  typing effect + telemetry stat panel on top.
- **Sections built**: About (bio + education panel), Experience (timeline), Projects (7 cards,
  see below), Achievements (CANSAT/ISRO/hackathons), CanSat Mission spotlight (uses the
  CDR payload CAD image the user shared), Skills, Contact. All wired in `src/app/page.tsx`.
- **Images in `public/images/`**: `summit-2400.jpg`/`summit-1200.jpg` (hero), `cansat-payload-cad.jpg`
  (cropped from user-provided CDR slide), `mtp2-clustering.jpg` (real chart from MTP2 pair-trading
  research, converted from RGBA PNG).
- **Resume**: `public/resume.html` copied from `C:\Users\sattu\Desktop\resume_improved.html`,
  linked from Hero.
- **Projects section** (`src/lib/data.ts` → `projects[]`, rendered by `Projects.tsx`):
  Rankit, CLAI, CanSat Ground Control, Consistify, AI Resume Editor, Pair Trading Research,
  Human Activity Detector. Each has a `workflow` field rendered via a **React Flow**
  (`@xyflow/react`) diagram (`WorkflowDiagram.tsx`) — real pipeline steps with one loop-back
  edge, grounded in an agent's research of the actual repos (not guessed). CSS for react-flow
  is imported once in `layout.tsx`.
- **Lint**: `npm run lint` was fully clean (0 problems) as of the last verified pass, including
  fixes for `react-hooks/set-state-in-effect` (Hero.tsx, StatCounter.tsx — matchMedia reads
  deferred to effects, disabled with justification comments) and `react/jsx-no-comment-textnodes`
  (About.tsx, Hud.tsx).

## Key decisions made this session (don't re-litigate)

- **Rankit framing**: describe it as it is TODAY — an AI-powered JEE prep platform
  (Next.js/FastAPI/Postgres), NOT the old resume description ("multi-agent backend/RAG").
  Confirmed: **no LangGraph anywhere in the EdTech repo** — the DPP recommender is a plain
  rule-based/accuracy-tiered FastAPI handler. Removed "LangGraph" from Rankit's tech tags.
- **Consistify**: no token-slashing/staking exists in the actual Cadence contracts — corrected
  the description to "reward mints once every recorded value clears the target" instead of the
  originally-assumed slashing mechanic.
- **Rankit visual**: skip a live screenshot (browser automation kept getting interrupted this
  session) — currently using text only, no image on the Rankit card. Revisit if a screenshot is
  wanted later.
- **GitHub Pages hosting**: `Satyampatil513.github.io` is confirmed unclaimed/free. User said
  **not yet** — hold off on `next.config` static-export + deploy workflow setup until asked.
- **Extra projects added** beyond the original 4: Consistify, AI Resume Editor, Pair Trading
  Research (all per explicit user selection).
- **Photo placement**: the field/summit photo must be at the very top (inside Hero, not a
  separate scroll-triggered section) with no invented narrative caption — this was corrected
  once already, don't reintroduce a caption.

## Pending / next session

1. **Run a full `npm run build`** to do a final production-build sanity check after the
   workflow-data edits (was interrupted before this could run — last known-good build was
   before the researched workflows were applied, though `npm run lint` was clean after).
2. **Visually QA in an actual browser** — this session had repeated browser-automation
   interruptions, so the React Flow diagrams, hero photo blend, and new project cards have
   only been verified via curl/grep on rendered HTML, never visually screenshotted. Worth a
   real look, especially:
   - React Flow diagram sizing/legibility at 6-step length (some project workflows grew from
     4 to 6 steps — check `fitView` padding still looks good, nothing clipped).
   - Whether the `nodeTypes` React Flow console warning is actually gone (it appeared once
     mid-session but from a stale pre-fix state — never re-verified live).
   - Mobile/narrow viewport check — untested this session.
3. **Rankit visual** — decide whether to revisit a live screenshot of ed-tech-lyart-pi.vercel.app,
   or leave text-only.
4. **GitHub Pages deploy setup** — deferred; do this when user is ready (static export config +
   GitHub Actions workflow, per earlier discussion).
5. Consider whether `profile.about` and other bio copy need another pass now that Rankit/CanSat
   spotlight content has grown.

## Useful paths

- Project root: `C:\Users\sattu\Desktop\Projects\PersonalWebsite`
- Data file (all content lives here): `src/lib/data.ts`
- Workflow diagram component: `src/components/WorkflowDiagram.tsx`
- Dev server log: `.next/dev/logs/next-development.log`
