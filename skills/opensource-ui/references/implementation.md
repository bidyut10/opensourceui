# Opensource UI — Implementation Guide

Repo: [github.com/bidyut10/opensourceui](https://github.com/bidyut10/opensourceui) · Live: [opensourceui.in](https://opensourceui.in)

This file is for **developers and coding agents** working in this repository — not end users copying a single component.

## Stack

| Layer       | Choice                                                          |
| ----------- | --------------------------------------------------------------- |
| Framework   | Next.js 16 (App Router), static export (`output: "export"`)     |
| UI          | React 19, TypeScript, Tailwind CSS v4                           |
| Class merge | `cn()` from `lib/cn.ts` (`clsx` + `tailwind-merge`)             |
| Icons       | `icons/` (hand-written SVG) + `lucide-react` in many components |
| Analytics   | PostHog (optional — no key = no tracking)                       |
| Deploy      | Vercel or Cloudflare Pages (`out/`)                             |

## Repository layout

```
app/
  (marketing)/          Homepage + about, contact, careers, sponsor, privacy, terms
  (docs)/components/    Docs (/components, /components/category/[slug], /components/[slug])
  layout.tsx            Root fonts, SEO
  error.tsx, not-found.tsx, loading.tsx
  sitemap.ts, robots.ts, manifest.ts

components/             Copy-paste library (200+ showcase entries, 30 categories)
  audio/, buttons/, calender/, docks/, dropdowns/, forms/, gallery/,
  inputs/, loaders/, mockups/, notifications/, socials/, table/,
  text/, travel/, underlines/, widgets/, wallet/, …
  system/               App-only (analytics tracker, page loader)

icons/                  actions/, activity/, brands/, elements/, keys/
lib/
  cn.ts                 Class merge helper
  site.ts               Site name, URL, author, license, Polar tiers
  showcase/showcase.tsx Component registry (homepage + docs)
  showcase/category-slug.ts  Category URL helpers
  seo/                  Metadata + JSON-LD helpers
  navigation/           Marketing path memory (go-back)
skills/opensource-ui/   Agent kit (SKILL.md + references/)
```

Category in the docs sidebar is derived from the folder after `components/` (e.g. `widgets/` → **Widgets**). Category pages live at `/components/category/{slug}` (e.g. `/components/category/mockups`).

## Local setup

```bash
git clone https://github.com/bidyut10/opensourceui.git
cd opensourceui
npm install
npm run dev
```

Requires **Node.js 20+**.

```bash
npm run dev            # dev server → http://localhost:3000
npm run build          # static export to out/ (runs check:showcase first)
npm run lint           # ESLint
npm run typecheck      # tsc --noEmit
npm run format         # Prettier write
npm run format:check   # Prettier check
npm run check:showcase # verify showcase file paths exist
```

Optional env (copy `.env.example` → `.env.local`):

- `NEXT_PUBLIC_POSTHOG_KEY` — analytics
- `GOOGLE_SITE_VERIFICATION` — Search Console

## Copy-paste components (for consumers)

There is no npm package. Users copy files from `components/` into their own Next.js app.

**Usually required:**

1. The component file from `components/<category>/<name>.tsx`
2. `lib/cn.ts` + `npm install clsx tailwind-merge`
3. Any `@/icons/...` imports — copy matching files from `icons/`
4. Keep `"use client"` when present

**Component file rules:**

- Self-contained — types, hooks, helpers in the same file
- Allowed imports: `@/lib/cn`, `next/link`, `next/image`, `lucide-react`, `@/icons/...`
- `forwardRef` for interactive elements; props extend native HTML types
- Tailwind utilities only — no `<style>`, no inline `style={{}}` in components
- Responsive: base + `md:` only — never `sm:`

See `skills/opensource-ui/references/design.md` for visual rules.

## Adding a component to this repo

1. Create `components/<category>/<kebab-name>.tsx`
2. Add icons under `icons/` if needed
3. Register in `lib/showcase/showcase.tsx`:

```tsx
import { MyCard } from "@/components/text/my-card";

c(
  "my-card",
  <MyCard />,
  "components/text/my-card.tsx",
  "MyCard",
  {
    title: "My Card",
    description: "Shown on the detail page.",
    usage: '<MyCard title="Hello" />',
    isNew: true,
  },
),
```

4. Add path to `skills/opensource-ui/references/source_inventory.txt`
5. Update `skills/opensource-ui/references/catalog.md` if adding a new slug description
6. Verify: `npm run check:showcase && npm run lint && npm run build`

## Showcase path sync

The string in `c(..., "components/.../file.tsx", ...)` **must match the real file on disk**. Moving a file does not auto-update the registry. `npm run check:showcase` runs on `prebuild` and fails on missing paths.

## Icons

Files: **kebab-case** (`arrow-right.tsx`). Exports: **PascalCase** (`ArrowRight`).

```tsx
import { ArrowRight } from "@/icons/actions/arrow-right";
import { Github } from "@/icons/brands/github";
```

More icons: [nexticons.in](https://nexticons.in)

## Agent kit

| File                              | Purpose                                   |
| --------------------------------- | ----------------------------------------- |
| `skills/opensource-ui/SKILL.md`   | Agent workflow                            |
| `references/design.md`            | Design system                             |
| `references/catalog.md`           | Component index                           |
| `references/source_inventory.txt` | File paths (showcase + app support files) |
| `AGENTS.md`                       | Multi-agent setup guide                   |
| `.cursor/rules/`                  | Cursor project rules                      |

## Deploy

**Vercel:** connect repo, build `npm run build`, output `out` is handled by Next static export.

**Cloudflare Pages:** see `wrangler.toml` and `npm run pages:deploy`. Use static HTML export build command.

## Numbers (keep in sync when adding components)

- **207** showcase slugs (~200+ in marketing copy)
- **30** docs categories (from showcase folder segments)
- **205** unique component files (some slugs share one file, e.g. analog clocks)
