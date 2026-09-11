# Contributing to Opensource UI

Thanks for helping improve [opensourceui.in](https://opensourceui.in). This project is a free, MIT-licensed copy-paste React / Next.js component library (Tailwind CSS v4).

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

## Before you start

Read [opensourceui.in/contact](https://opensourceui.in/contact) for how to reach the maintainer.

- **Bugs / broken UI** — prefer a [GitHub Issue](https://github.com/bidyut10/opensourceui/issues/new) with steps to reproduce
- **Small fixes / docs** — open a focused pull request
- **New components or large work** — email first with what you want to contribute (type of work, short proposal, GitHub username). Do not send only “I want to contribute.” Click the email on the contact page to **copy** it, then paste into your mail app.
- **Sponsorships** — [sponsor page](https://opensourceui.in/sponsor), then email assets as described on [contact § sponsor](https://opensourceui.in/contact#sponsor)

Also skim [CONTRIBUTING.md](./CONTRIBUTING.md) setup below and `skills/opensource-ui/references/design.md` (no purple chrome, base + `md:` only, no `sm:`).

## Ways to contribute

- Report bugs or suggest components via [GitHub Issues](https://github.com/bidyut10/opensourceui/issues)
- Fix bugs or improve docs with a pull request
- Add new showcase components (see below)
- Improve accessibility, performance, or copy on existing components
- Update agent reference docs when adding components

## Agent kit (AI assistants)

Reference files for coding agents live in **`skills/opensource-ui/`**:

| File                                                   | Purpose                                |
| ------------------------------------------------------ | -------------------------------------- |
| `skills/opensource-ui/SKILL.md`                        | Workflow and design rules for agents   |
| `skills/opensource-ui/references/catalog.md`           | Component index (names, slugs, routes) |
| `skills/opensource-ui/references/design.md`            | Full design system                     |
| `skills/opensource-ui/references/implementation.md`    | Repo layout and copy-paste steps       |
| `skills/opensource-ui/references/source_inventory.txt` | Exact component file paths             |

When you add a component, update `source_inventory.txt` and `catalog.md` if needed. See [AGENTS.md](./AGENTS.md) for how users set this up with Cursor, Claude Code, Codex, and other tools.

Cursor project rules live in **`.cursor/rules/`** (`opensource-ui.mdc`, `component-design.mdc`, `site-chrome.mdc`, `showcase-registry.mdc`, `no-sm-breakpoints.mdc`) and align with the agent kit above.

## Local development

Requirements: **Node.js 22.22+**, **npm**

```bash
git clone https://github.com/bidyut10/opensourceui.git
cd opensourceui
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Useful commands

```bash
npm run dev            # start dev server
npm run build          # production build (runs check:showcase)
npm run lint           # eslint
npm run typecheck      # TypeScript check
npm run format         # prettier write (sorts Tailwind classes)
npm run format:check   # prettier check (dry run)
npm run check:showcase # verify showcase file paths
npm run check:catalog  # unique slugs + inventory sync
npm run check:design   # ban sm: breakpoints + purple / colored focus rings
npm run test           # unit tests in tests/unit (vitest)
npm run test:e2e       # Playwright in tests/e2e (needs build → out/ + Chromium)
npm run verify:quick   # format + lint + types + checks + unit tests (also the pre-push gate)
npm run verify         # full gate including build + e2e (CI + optional local)
```

Keep `components/` for copy-paste UI only. Put new unit tests under `tests/unit/` and e2e under `tests/e2e/`. Maintenance scripts live in `scripts/checks/` and `scripts/deploy/` — see those folders’ READMEs.

### Push gate (local)

After `npm install`, Husky hooks are set up:

1. **pre-commit** — Prettier (+ Tailwind class sort) and ESLint on staged files only
2. **pre-push** — runs `npm run verify:quick` (format, lint, types, catalog/design checks, unit tests). Push is blocked if that fails.  
   Full `npm run verify` (build + Playwright e2e) runs in **GitHub Actions CI**. For local e2e once: `npx playwright install chromium`, then `npm run verify`.

Fix failures locally (`npm run format`, then re-run `npm run verify:quick`) before pushing again.

Analytics is **optional** for local dev. Copy `.env.example` to `.env.local` only if you want to test PostHog or Google Search Console verification.

## Adding a component to the showcase

1. Create your component under `components/` (match existing folder conventions).
2. Add icons under `icons/` if needed.
3. Register it in `lib/showcase/showcase.tsx`:

```tsx
import { MyNewCard } from "@/components/text/my-new-card";

c(
  "my-new-card",
  <MyNewCard />,
  "components/text/my-new-card.tsx",
  "MyNewCard",
  {
    title: "My New Card",
    description: "Short description shown on the detail page.",
    usage: "<MyNewCard />",
  },
),
```

4. Update `skills/opensource-ui/references/source_inventory.txt` (and `catalog.md` when useful).
5. Run `npm run check:showcase`, `npm run lint`, and `npm run build` before opening a PR.

## Pull request guidelines

- Keep changes focused — one component or one fix per PR when possible
- Match existing code style (TypeScript, Tailwind, `cn()` helper)
- Use `"use client"` only when the component needs client features
- Follow design rules: neutral stage, no purple family, base + `md:` only (never `sm:`)
- Do not commit secrets (`.env`, API keys)
- Ensure CI passes (build + lint)
- For large or brand-new component ideas, align via [contact](https://opensourceui.in/contact#contribute) first

## Project structure

See the [README](./README.md#folder-structure) for the full layout. Key paths:

| Path                        | Purpose                                                    |
| --------------------------- | ---------------------------------------------------------- |
| `components/`               | Copy-paste UI widgets only (no tests)                      |
| `components/system/`        | App infrastructure (loaders, analytics tracker)            |
| `icons/`                    | SVG icon components                                        |
| `lib/showcase/showcase.tsx` | Component registry + homepage grid                         |
| `lib/docs/`                 | Docs shared code (`SaveScrollLink`, `CopyCodeBlock`)       |
| `app/(docs)/components/`    | Docs routes — browse, category, search, detail             |
| `app/(marketing)/`          | Homepage, about, contact, careers, sponsor, privacy, terms |
| `tests/`                    | Unit (Vitest) + e2e (Playwright) — see `tests/README.md`   |
| `scripts/checks/`           | Catalog / design integrity gates                           |
| `scripts/deploy/`           | Build strip + Cloudflare deploy helpers                    |
| `skills/opensource-ui/`     | Agent kit for AI coding assistants                         |
| `AGENTS.md`                 | AI assistant setup guide                                   |

## Questions

- Contact page: [opensourceui.in/contact](https://opensourceui.in/contact)
- GitHub Issues: [github.com/bidyut10/opensourceui/issues](https://github.com/bidyut10/opensourceui/issues)
- X: [@BidyutKundu12](https://x.com/BidyutKundu12)
- Portfolio: [bidyut.cc](https://bidyut.cc)
