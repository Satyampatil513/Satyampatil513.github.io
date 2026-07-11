# Personal Website — Progress Notes

Next.js 16 (App Router, Turbopack) + Tailwind v4 + TypeScript.

## Current theme: "Editorial Dark" (replaced "Mission Control", Jul 2026)

Full redesign inspired by aade.sh and ishandeveloper.com — typography-first, calm,
editorial. The old HUD/starfield/scanlines/boot-sequence theme is gone.

- **Palette** (`src/app/globals.css`): warm near-black `#101010`, card `#161615`,
  hairline borders `#262624`, warm off-whites, single green accent `#85c99e`.
- **Type**: Newsreader (serif display, normal+italic) + Inter (body) + JetBrains Mono
  (tiny labels only) + Kalam (signature). Big centered serif section titles with
  italic serif subtitles (`src/components/Section.tsx`).
- **Nav**: centered floating pill (`Nav.tsx`) with active-section highlight + ⌘K
  palette button. CommandPalette kept, restyled.
- **Hero**: centered serif name + italic tagline; two-column card row — summit photo
  (rounded, hairline border) + prose card with about paragraphs, accent ↗ links,
  Kalam signature, location/date; quiet 4-up stats strip below (no animation).
  Absorbs the old About section (About.tsx deleted).
- **Work section**: experience + education as hairline-divided rows,
  `[dates | content]` grid, chips rounded-full.
- **Projects**: rounded-3xl cards, 2-col grid (workflow/full-image cards span both),
  serif titles, accent ↗ links, WorkflowDiagram recolored to new tokens ("How it works").
- **CanSat**: single full-width card, image left / text + specs right.
- **Recognition / Toolbox**: quiet `[label | content]` hairline rows.
- **Contact**: centered italic "Say hello." + big email link + footer.
- **Deleted**: Starfield.tsx, Hud.tsx, About.tsx, StatCounter.tsx.

All content still lives in `src/lib/data.ts` (unchanged this pass).

Verified: `npm run lint` clean, `npm run build` clean. User approved visually
("it's better") and asked to push.

## Key content decisions (don't re-litigate — see git history for details)

- Rankit described as it is today (no LangGraph), Consistify has no slashing mechanic,
  summit photo at top with no invented caption, extra projects were user-selected.

## Pending / next session

1. Mobile/narrow-viewport QA pass of the new design (only desktop was eyeballed).
2. React Flow diagram sizing inside the new narrower card columns — verify nothing clips.
3. Rankit visual: still text-only; revisit live screenshot if wanted.
4. GitHub Pages deploy: remote is `Satyampatil513/Satyampatil513.github.io` — static
   export config + Actions workflow still not set up; do when asked.

## Useful paths

- Data file (all content): `src/lib/data.ts`
- Design tokens: `src/app/globals.css`
- Section heading primitives: `src/components/Section.tsx`
