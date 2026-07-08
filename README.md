# satyampatil513.github.io

Personal portfolio site for Satyam Patil — built with Next.js (App Router), TypeScript, and
Tailwind CSS v4. "Mission Control" visual theme: dark space aesthetic, HUD-style panels,
a starfield background, and React Flow diagrams tracing how each featured project actually
works under the hood.

## Stack

- Next.js 16 (static export, deployed to GitHub Pages)
- Tailwind CSS v4
- `@xyflow/react` for the project pipeline-trace diagrams

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a static site to `out/`, deployed automatically to GitHub Pages via
`.github/workflows/deploy.yml` on every push to `main`.
