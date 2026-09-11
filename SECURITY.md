# Security Policy

## Supported versions

Security fixes are applied to the latest version on the `main` branch.

| Version          | Supported |
| ---------------- | --------- |
| latest on `main` | yes       |

## Reporting a vulnerability

**Please do not open a public GitHub issue for security vulnerabilities.**

Report security issues privately using one of these channels:

1. **[GitHub Security Advisories](https://github.com/bidyut10/opensourceui/security/advisories/new)** (preferred)
2. Email the maintainer — copy the address from [opensourceui.in/contact](https://opensourceui.in/contact) (click to copy; do not rely on a public issue)
3. Direct message on [X (@BidyutKundu12)](https://x.com/BidyutKundu12)

Include as much detail as possible: affected paths, reproduction steps, and impact.

We aim to acknowledge reports within **72 hours** and will work on a fix as quickly as possible.

## Scope

In scope:

- The opensourceui.in static site (Next.js export)
- Client-side analytics integration (PostHog)
- Dependency vulnerabilities introduced by this repository
- Misconfiguration in deployment files (`vercel.json`, `wrangler.toml`, env handling)

Out of scope:

- Vulnerabilities in third-party services (Vercel, Cloudflare, PostHog) — report those to the respective vendors
- Social engineering or physical attacks
- Issues in forked deployments with modified secrets or configuration
- Applications built by users who copy components into their own projects

## Security notes for self-hosting

- Never commit `.env` or `.env.local` — use `.env.example` as a template only
- PostHog keys are public client keys (`NEXT_PUBLIC_*`) — restrict project access in PostHog dashboard
- Security response headers (CSP, `X-Frame-Options`, `nosniff`, referrer, permissions) are set in:
  - `vercel.json` → `headers` (Vercel)
  - `public/_headers` (copied into `out/` for Cloudflare Workers static assets)
- Review those files if you change third-party script hosts (PostHog EU, etc.)

## Disclosure

We follow coordinated disclosure. We will credit reporters in release notes when fixes are published, unless you prefer to remain anonymous.
