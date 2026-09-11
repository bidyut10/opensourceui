---
name: Opensource UI
description: Clean, confident copy-paste React/Next components on a quiet neutral stage
colors:
  ink: "#171717"
  ink-soft: "#262626"
  body: "#404040"
  muted: "#737373"
  faint: "#a3a3a3"
  border: "#e5e5e5"
  border-subtle: "#f5f5f5"
  paper: "#ffffff"
  paper-tint: "#fafafa"
  accent-rose: "#f43f5e"
  accent-cyan: "#a5f3fc"
  danger: "#fda4af"
typography:
  display:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "normal"
  headline:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.3
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.025em"
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
  mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "8px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.ink-soft}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sm}"
    padding: "8px 16px"
  input-default:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0 14px"
    height: "40px"
  input-focus:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  card-surface:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.body}"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System: Opensource UI

## 1. Overview

**Creative North Star: "The Craft Bench"**

Opensource UI feels like a clean bench with tools laid out for work: pick a component, copy it, ship. The brand surface (marketing + docs) is quiet and confident — white paper, dark ink, Instrument Serif for voice, Geist for clarity. Demo accents (soft cyan, rose) sparkle on the stage; they never become the stage itself.

Density stays light. Hierarchy comes from type pairing and neutral borders, not from cards stacked on cards or motion theater. The system practices what it preaches: copy-paste components look production-ready without a design-system tax, and the site chrome stays out of the way so the component is the hero.

This system explicitly rejects generic AI UI (purple gradients, Inter monoculture, nested cards, glassmorphism, glow), heavy enterprise / Material-dense dashboards, and over-animated “wow” landing pages.

**Key Characteristics:**

- Neutral stage + sparing demo accents (cyan / rose)
- Serif display + geometric sans body (Instrument Serif + Geist)
- Flat surfaces; soft shadow only on primary CTAs
- Self-contained Tailwind components; focus via border, never rings
- Responsive with base + `md:` only — never `sm:`

## 2. Colors

A restrained neutral palette with ink for authority and two soft accents for highlight moments on demos and annotations.

### Primary

- **Workbench Ink** (`#171717` / Tailwind `neutral-900`): Primary text, active nav indicators, strongest borders on focus. Authority and readability.
- **Ink Soft** (`#262626` / `neutral-800`): Primary CTA fill and secondary button borders. Slightly softer than pure ink so buttons feel solid without shouting.

### Secondary

- **Soft Cyan Highlight** (`#a5f3fc` / `cyan-200`): Annotation underlines and demo callouts on the marketing page. Rare; used for craft moments, not chrome.
- **Rose Signal** (`#f43f5e` / `rose-500`): Required markers, soft focus accents in docs search, error-adjacent signals. Never purple-family substitutes.

### Neutral

- **Paper** (`#ffffff`): Page and card backgrounds.
- **Paper Tint** (`#fafafa` / `neutral-50`): Subtle recessed fields (search idle, disabled fills).
- **Border Subtle** (`#f5f5f5` / `neutral-100`): Hairline dividers, card edges, quiet structure.
- **Border** (`#e5e5e5` / `neutral-200`): Default input and control borders.
- **Faint** (`#a3a3a3` / `neutral-400`): Placeholders, meta labels, keyboard hints.
- **Muted** (`#737373` / `neutral-500`): Secondary body / footer prose.
- **Body Soft** (`#404040` / `neutral-700`): Muted paragraph tone when ink is too strong.

### Named Rules

**The Stage Rule.** Site chrome stays neutral. Color lives in demos, annotations, and state — never as purple, violet, or indigo family fills.

**The One Voice Rule.** Accents (cyan, rose, amber, teal, emerald in demos) stay ≤10% of any marketing screen. Neutrals carry the rest.

## 3. Typography

**Display Font:** Instrument Serif (with Georgia / ui-serif)
**Body Font:** Geist (with system-ui)
**Label/Mono Font:** Geist Mono (with Menlo / monospace)

**Character:** Editorial display for brand voice; practical sans for UI and docs. The pairing reads clean and confident — craft without costume.

### Hierarchy

- **Display** (400, `text-3xl` / 1.875rem, serif): Marketing H1 and brand moments. Instrument Serif only.
- **Headline** (400, `text-xl`–`text-3xl`, serif): Docs section titles, footer brand line.
- **Title** (600, `text-sm`, sans): Card titles, sidebar section labels, form labels.
- **Body** (400, `text-base` / 1rem, tracking-tight, sans): Marketing paragraphs and primary UI copy. Cap line length near ~65ch on marketing columns (`max-w-xl`).
- **Label** (500–600, `text-xs`–`text-sm`, sans): Meta, captions, nav items.
- **Mono** (400, ~10px, mono): Keyboard shortcuts, code-adjacent chrome, platform tags.

### Named Rules

**The Two-Voice Rule.** Serif carries brand headlines only. Product UI (buttons, inputs, nav lists) stays Geist sans — never Instrument Serif on dense controls.

**The No-Inter Rule.** Do not introduce Inter, Plus Jakarta, DM Sans, or other training-data defaults. Geist + Instrument Serif are the committed pair.

## 4. Elevation

Flat by default. Depth comes from borders, tonal fills (`paper` vs `paper-tint`), and occasional soft shadow on primary CTAs — not from stacked card shadows or glass blur.

### Shadow Vocabulary

- **CTA lift** (`box-shadow: 0 20px 25px -5px rgb(212 212 212 / 0.5)` / Tailwind `shadow-xl shadow-neutral-300/50`): Primary marketing CTA only (“Browse Components”).
- **Rest surfaces:** no shadow — white + `border-neutral-100` / `200`.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a deliberate CTA response, never as ambient card decoration. No glow, no colored blur, no gradients.

## 5. Components

Restrained and copy-ready. Every interactive piece should feel pasteable into a Next.js app without theme providers.

### Buttons

- **Shape:** Gently rounded (`rounded-md` / 6px)
- **Primary:** Ink Soft fill (`#262626`), white text, light weight, `px-4 py-2`, optional CTA lift shadow on marketing. Hover deepens toward ink; icon morph uses `--ease-smooth` (~500ms).
- **Secondary / Ghost:** White fill, ink-soft text, `border-neutral-800`. Full-width on mobile, auto on `md:`.
- **Focus:** Visible via border / contrast — never purple rings or glow.

### Cards / Containers

- **Corner Style:** Soft (`rounded-2xl` / 16px on testimonials; `rounded-lg` on fields and smaller cards)
- **Background:** Paper white
- **Shadow Strategy:** None by default (see Elevation)
- **Border:** `border-neutral-100` hairline
- **Internal Padding:** `p-4` (16px) typical; avoid nested cards

### Inputs / Fields

- **Style:** White fill, `rounded-lg` (8px), `h-10`, `border-neutral-200`, Geist `text-sm`
- **Focus:** `outline-none ring-0`; border shifts to `neutral-900` (or rose on error). Border color only — never `ring-*`
- **Error / Disabled:** Rose border + message; disabled uses `neutral-50` fill and faint text
- **Required marker:** Rose asterisk

### Navigation

- **Docs:** Sans `text-sm` / `13px`; idle `neutral-500`, hover/active `neutral-900`
- **Active TOC:** 2px ink bar on the left of the current item (structural indicator, not a decorative side-stripe on cards)
- **Mobile:** Overlay `neutral-900/20`; drawer pattern — no purple accent

### Signature: Marketing CTA row

Primary “Browse Components” + secondary “Work WIth Us” with waving-hand micro-motion. Ease: `--ease-smooth` (`cubic-bezier(0.22, 1, 0.36, 1)`). Respect `prefers-reduced-motion`.

## 6. Do's and Don'ts

### Do:

- **Do** keep site chrome on the neutral stage (paper, ink, hairline borders).
- **Do** use Instrument Serif for brand headlines and Geist for UI/docs body.
- **Do** style focus with border color only (`focus:border-neutral-900 focus:ring-0`).
- **Do** ship self-contained Tailwind components (copy-paste first).
- **Do** use base + `md:` responsive steps only.
- **Do** aim for WCAG AA contrast; bump muted grays toward ink when close.

### Don't:

- **Don't** use purple-family colors (purple, violet, indigo) anywhere — text, icons, borders, backgrounds.
- **Don't** use glow effects, colored blurs, or gradient backgrounds/fills.
- **Don't** use `ring-*` focus styles on inputs.
- **Don't** build generic AI UI: purple gradients, Inter-everywhere monoculture, nested cards, glassmorphism.
- **Don't** ship heavy enterprise / Material-dense dashboard chrome as the default look.
- **Don't** build over-animated “wow” landing pages that prioritize motion theater over clarity.
- **Don't** use `sm:` Tailwind breakpoints.
- **Don't** use `border-left` / `border-right` greater than 1px as a colored accent stripe on cards or callouts.
