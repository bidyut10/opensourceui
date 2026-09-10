---
name: opensource-ui
description: Use Opensource UI patterns and copy-paste React/Next.js components from opensourceui.in. Trigger when building or refining interfaces that need its component catalog, visual language, Tailwind conventions, mockups, widgets, forms, tables, social cards, or interactive controls.
---

# Opensource UI

Use this skill when the user asks for an Opensource UI component, an Opensource UI-inspired interface, or a React/Next.js component selected from the Opensource UI catalog.

Works with any coding agent (Cursor, Claude Code, Codex, Copilot, Grok, etc.). Read the reference files in this skill folder before generating UI.

## Core workflow

1. Identify the requested UI role, such as button, input, calendar, widget, mockup, notification, table, social card, or editorial card.
2. Search `references/catalog.md` for the closest catalog entry and route.
3. Read `references/design.md` for the visual rules. Apply the neutral stage, Instrument Serif for brand display text, Geist for UI text, restrained accents, flat surfaces, and border-based focus states.
4. If source code is available in the attached repository or a target project, inspect the relevant component before adapting it. Preserve the component's state behavior, accessibility, and prop API unless the user requests a change.
5. For a new web project, use React or Next.js with TypeScript and Tailwind CSS v4. Copy the needed component files and icon dependencies. There is no package installation step for the UI library itself.
6. Copy `lib/cn.ts` when the component uses `cn`, then install or preserve `clsx` and `tailwind-merge`. Copy imported icons from the repository's `icons/` tree. Keep `use client` when the component uses browser state, effects, event handlers, or browser APIs.
7. Use base styles plus `md:` responsive variants. Do not introduce `sm:` breakpoints. Prefer native HTML semantics, keyboard support, labels, visible error text, and WCAG AA contrast.
8. Verify the result in the target project. Check interaction states, reduced-motion behavior, mobile layout, focus visibility, and import paths.

## Design rules

Keep site chrome neutral: white or near-white surfaces, neutral borders, dark ink, and sparse cyan, rose, amber, teal, or emerald accents inside demos and state changes. Use flat surfaces by default. Avoid purple-family colors, gradients, glow, colored blur, glassmorphism, stacked card shadows, generic AI styling, and heavy dashboard chrome.

Use `rounded-md` for buttons, `rounded-lg` for fields and small cards, and `rounded-2xl` for larger editorial or testimonial surfaces. Use `p-4` as the common internal padding. Style input focus with a darker border and `ring-0`, never a colored ring. Use rose for errors and required markers. Prefer `forwardRef` for interactive components, native HTML prop extension, and `cn()` for class merging.

## Catalog use

The catalog contains **200+ documented components** across **30 categories** as listed on the site. The source repository contains the implementation files and may include additional support or showcase files. Use the category and slug in `references/catalog.md` to locate a component page. Use the source path in `references/source_inventory.txt` when working from the cloned repository.

Component pages provide a live preview, implementation details, and copy-ready source. Treat the site's source and repository as the authority for exact props and behavior. Do not invent a prop API when source is available.

## Reference files

- Read `references/catalog.md` to select a component by category, name, slug, and summary.
- Read `references/design.md` for the full design system, tokens, typography, spacing, elevation, component rules, and prohibited patterns.
- Read `references/implementation.md` for repository layout, setup commands, dependency conventions, icon conventions, and copy-paste guidance.
- Read `references/source_inventory.txt` when exact repository file names or category directories are needed.

## Invocation examples

Use requests such as:

- "Use the Opensource UI Booking Slot Calendar in my Next.js page."
- "Build a clean dashboard with Opensource UI tables and widgets."
- "Make this form follow the Opensource UI design language."
- "Find the closest Opensource UI component for a travel boarding pass."

When the user specifies a target project, adapt imports, aliases, Tailwind setup, and image handling to that project. When no target project exists, provide the component code and state the required files and dependencies.
