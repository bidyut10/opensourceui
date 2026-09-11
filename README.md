# [Opensource UI](https://opensourceui.in)

[![Live site](https://img.shields.io/badge/live-opensourceui.in-000000?style=flat-square)](https://opensourceui.in)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Deploy with Vercel](https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/bidyut10/opensourceui)

[opensourceui.in](https://opensourceui.in) — free React and Next.js UI you copy into your project.

**200+ components**, Tailwind, TypeScript, live previews. MIT for good — no paywall later, no “free forever\*” fine print. I maintain this myself.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bidyut10/opensourceui)

## Why this exists

Most kits want you to learn a whole system before one button feels usable. I got tired of that. I wanted to find something that looks right, paste the file, tweak props, and ship.

So these pieces are meant to be copied, not installed. No provider maze. No theme config ritual. One file, your repo, your edits.

Hand-written SVGs live in `icons/`. I pull from [nexticons.in](https://nexticons.in) too. Plenty of components use [lucide-react](https://lucide.dev) as well.

## AI coding agents

Works with Cursor, Claude Code, Codex, Copilot, Grok, ChatGPT — whatever you use.

Point the agent at **`skills/opensource-ui/`**. Full setup notes are in **[AGENTS.md](./AGENTS.md)**.

```text
Read skills/opensource-ui/SKILL.md and add the Opensource UI Login Form to my Next.js app.
```

In Cursor you can `@skills/opensource-ui/SKILL.md` or just mention that path. No duplicate skill folder required.

## Stack

- Next.js 16 (App Router, static export)
- React 19
- TypeScript
- Tailwind CSS v4
- `clsx` + `tailwind-merge` via `cn()`
- PostHog if you want analytics (optional)

No shadcn, MUI, or Radix under the hood — React, Tailwind, and SVG.

## Where things live on the site

| Route                          | What you get                         |
| ------------------------------ | ------------------------------------ |
| `/`                            | Homepage — demos, FAQ, sponsors      |
| `/components`                  | Full catalog                         |
| `/components?q=iphone`         | Search                               |
| `/components/category/mockups` | Category browse (swap the slug)      |
| `/components/[slug]`           | Preview, setup, copy source          |
| `/about`                       | Story and who runs this              |
| `/contact`                     | Support, bugs, PRs, contributions    |
| `/careers`                     | Hiring truth (usually: nothing open) |
| `/sponsor`                     | Brand placement on the site          |
| `/privacy` · `/terms`          | Legal                                |

Docs on a wide screen: sidebar, content, TOC. Dead search queries get popular demos instead of an empty hole.

## How I like the UI to feel

**Copy-paste first.** Paste into Next.js, fix imports, it should render.

**Craft Bench.** Paper white, quiet borders, accents only when state needs them. No purple dashboard cosplay. Catalog stays light on purpose — you can add dark in your app after you own the file.

**Boring in the good way.** `forwardRef`, native HTML props, `cn()` for classes, `"use client"` only when the browser is required.

**Real demo copy.** Names and numbers that look like product UI, not gray placeholders.

**Icons.** Kebab-case files, PascalCase exports, under `icons/`.

**Responsive.** Base + `md:` — never `sm:`.

**By purpose.** `forms/`, `mockups/`, `widgets/`, and the rest of the folders match how you hunt for pieces.

## Repo map

```
app/
  (marketing)/     Home, about, contact, careers, sponsor, privacy, terms
  (docs)/          /components browse, category, search, detail
  _shared/         Navigation + scroll helpers

components/        Copy-paste library (200+)
icons/             SVG components
lib/
  cn.ts            Class merge
  site.ts          Site config, author, sponsorship tiers
  showcase/        Registry — edit showcase.tsx to add components
  seo/             Metadata + JSON-LD
skills/opensource-ui/   Agent kit
AGENTS.md
```

`(marketing)` and `(docs)` are route groups — they do not show up in the URL.

## Icons

```tsx
import { ArrowRight } from "@/icons/actions/arrow-right";
import { Bell } from "@/icons/elements/bell";

<ArrowRight size={16} />
<Bell size={20} color="#171717" className="opacity-60" />
```

More at [nexticons.in](https://nexticons.in).

## Run it locally

```bash
git clone https://github.com/bidyut10/opensourceui.git
cd opensourceui
npm install
npm run dev
```

Homepage: [http://localhost:3000](http://localhost:3000)  
Components: [http://localhost:3000/components](http://localhost:3000/components)

```bash
npm run dev            # dev server
npm run build          # static export (runs check:showcase)
npm run lint
npm run typecheck
npm run format         # Prettier + Tailwind class sort
npm run format:check
npm run test           # vitest unit tests
npm run verify         # full gate before push (format, lint, types, catalog, design, tests, build, e2e)
npm run verify:quick   # same without build + e2e
npm run check:showcase
```

Needs Node.js 20+.

**Before push:** Husky runs Prettier/ESLint on commit, then `npm run verify` on push. If verify fails, the push is blocked until you fix it. GitHub CI mirrors the same checks.

## Folder structure

| Path                    | What it is                             |
| ----------------------- | -------------------------------------- |
| `components/`           | Copy-paste UI only (no tests mixed in) |
| `app/`                  | Marketing site + docs shell            |
| `lib/`                  | Shared helpers, showcase registry, SEO |
| `icons/`                | SVG icons                              |
| `tests/unit/`           | Vitest unit tests                      |
| `tests/e2e/`            | Playwright smoke + a11y                |
| `scripts/checks/`       | Catalog / design integrity gates       |
| `scripts/deploy/`       | Build strip + Cloudflare deploy        |
| `skills/opensource-ui/` | Agent kit for AI assistants            |

Details: [tests/README.md](./tests/README.md), [scripts/README.md](./scripts/README.md), [CONTRIBUTING.md](./CONTRIBUTING.md).

## Use a component in your app

Skip `npm install opensourceui` — there is no such package. Copy the file from `components/`, then usually:

- `lib/cn.ts` (+ `clsx`, `tailwind-merge`)
- matching files from `icons/`
- `lucide-react` if that import is there
- `next/image` when the component uses images

Keep `"use client"` when the source has it.

Detail pages at `/components/[slug]` have the preview and copy-ready source.

### Register something new in the showcase

Edit `lib/showcase/showcase.tsx`:

```tsx
import { MyNewCard } from "@/components/text/my-new-card";

c(
  "my-new-card",
  <MyNewCard />,
  "components/text/my-new-card.tsx",
  "MyNewCard",
  {
    title: "My New Card",
    description: "Shown on the detail page.",
    usage: "<MyNewCard />",
  },
),
```

Drop that into a row in `showcaseRows`. Update `skills/opensource-ui/references/source_inventory.txt` (and `catalog.md` when it helps).

## Analytics

Optional. Set `NEXT_PUBLIC_POSTHOG_KEY` in `.env.local` if you want page views and click tracking. Leave it blank to stay dark.

## Deploy

### Vercel (primary)

1. Fork or clone [github.com/bidyut10/opensourceui](https://github.com/bidyut10/opensourceui)
2. Import in [Vercel](https://vercel.com/new)
3. Framework: **Next.js** (static export is automatic via `output: "export"`)
4. Build: `npm run build` → output `out/`
5. Env from `.env.example` only if you want PostHog / Search Console

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/bidyut10/opensourceui)

`vercel.json` sets security headers + optional `/ingest` → PostHog rewrites.

### Cloudflare (Worker + static assets)

This is **not** Cloudflare Pages. Config: `wrangler.toml`.

| Dashboard field  | Value               |
| ---------------- | ------------------- |
| Build command    | `npm run build`     |
| Deploy command   | `npm run cf:deploy` |
| Output directory | `out`               |

Local: `npm run cf:dev` (build + `wrangler dev`).  
Do **not** use `wrangler pages deploy` for this project.

PostHog on Workers uses the direct API host (not `/ingest`). The `functions/ingest/` folder is Pages-only and unused on the Worker path.

Security headers for CF come from `public/_headers` → copied into `out/` on build.

## Sponsoring

If this saved you an afternoon:

- **[GitHub Sponsors](https://github.com/sponsors/bidyut10)** — support me directly
- **[opensourceui.in/sponsor](https://opensourceui.in/sponsor)** — put your brand on the site (homepage, docs, README listing)

Components stay free either way. Sponsoring is optional.

## Contributing

Happy to take help. [CONTRIBUTING.md](./CONTRIBUTING.md) covers setup and PRs.

Questions, sponsorships, or bigger contribution ideas → [opensourceui.in/contact](https://opensourceui.in/contact). Click the email to copy it; it will not open your mail app.

We follow the [Contributor Covenant](./CODE_OF_CONDUCT.md).

## Security

Found something sensitive? Read [SECURITY.md](./SECURITY.md). Do not file a public issue for that.

## Links

- Site: [opensourceui.in](https://opensourceui.in)
- Contact: [opensourceui.in/contact](https://opensourceui.in/contact)
- GitHub Sponsors: [github.com/sponsors/bidyut10](https://github.com/sponsors/bidyut10)
- Brand sponsorships: [opensourceui.in/sponsor](https://opensourceui.in/sponsor)
- Repo: [github.com/bidyut10/opensourceui](https://github.com/bidyut10/opensourceui)
- Me: [bidyut.cc](https://bidyut.cc) · [X](https://x.com/BidyutKundu12)

## License

[MIT](./LICENSE) — personal and commercial use, permanently. Credit is nice; not required.

Something broken? Open an issue on [GitHub](https://github.com/bidyut10/opensourceui/issues).
