# Using Opensource UI with AI coding assistants

Opensource UI works with **any** coding agent — Cursor, Claude Code, Codex, GitHub Copilot, Grok, ChatGPT, Windsurf, and others. The agent kit is plain markdown and text files; no vendor lock-in.

## Agent kit location

```
skills/opensource-ui/
├── SKILL.md                        # Workflow and design rules for agents
└── references/
    ├── catalog.md                  # Component index (names, slugs, routes)
    ├── design.md                   # Full design system
    ├── implementation.md           # Repo layout and copy-paste steps
    └── source_inventory.txt        # Exact component file paths
```

## Quick start

1. Clone this repository or open it in your editor.
2. Point your agent at `skills/opensource-ui/SKILL.md`.
3. Ask for a component by name, category, or use case.

Example prompts:

- "Read `skills/opensource-ui/SKILL.md` and add the Opensource UI Login Form to my app."
- "Build a dashboard using Opensource UI tables and widgets. Follow the design rules in `skills/opensource-ui/references/design.md`."
- "Find the closest Opensource UI component for a music player and copy it into my Next.js project."

## Setup by tool

### Cursor

Use `skills/opensource-ui/SKILL.md` directly — same folder as every other agent. In chat, reference it with `@skills/opensource-ui/SKILL.md` or ask the agent to read that file.

You do **not** need a duplicate under `.cursor/skills/`. That path is only for personal skills stored outside the repo. This project's agent kit lives in `skills/` at the repo root.

### Claude Code

Add the repository (or `skills/opensource-ui/`) to your project. Tell Claude to read `skills/opensource-ui/SKILL.md` before building UI. You can also paste `skills/opensource-ui/references/design.md` into `CLAUDE.md` for persistent style rules.

### OpenAI Codex / GitHub Copilot

Reference `AGENTS.md` and `skills/opensource-ui/SKILL.md` in your repo. Copilot uses repository context when the files are in the workspace.

### Grok, ChatGPT, and other chat agents

Upload or paste:

- `skills/opensource-ui/SKILL.md` — workflow
- `skills/opensource-ui/references/design.md` — visual rules
- `skills/opensource-ui/references/catalog.md` — component picker

Then ask for a specific component or page.

## What agents should do

1. Read `skills/opensource-ui/SKILL.md` for the workflow.
2. Search `skills/opensource-ui/references/catalog.md` for the right component.
3. Read `skills/opensource-ui/references/design.md` for visual rules (no purple, no gradients, border-only focus, base + `md:` only).
4. Copy source from `components/` using paths in `skills/opensource-ui/references/source_inventory.txt`.
5. Copy `lib/cn.ts` and any required icons from `icons/`.
6. Adapt import paths to the target project.

## Live site

Browse components with previews and copy-ready code at [opensourceui.in/components](https://opensourceui.in/components).

Contact, sponsorships, and contribution guidance: [opensourceui.in/contact](https://opensourceui.in/contact).

## License

MIT — free for personal and commercial use, permanently. See [LICENSE](./LICENSE).
