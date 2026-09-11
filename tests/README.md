# Tests

All automated tests live here — not under `components/` or `lib/`.

```
tests/
├── setup/          # Vitest setup (jest-dom, cleanup)
├── unit/           # Fast unit / component tests (Vitest)
│   ├── lib/        # Helpers, registry, slugs
│   └── components/ # Mirrors components/ categories when needed
└── e2e/            # Playwright smoke + a11y against `out/`
```

## Commands

```bash
npm run test        # unit tests
npm run test:watch  # unit tests, watch mode
npm run test:e2e    # Playwright (run `npm run build` first)
```

First-time e2e on a machine:

```bash
npx playwright install chromium
```

Configs stay at the repo root: `vitest.config.ts`, `playwright.config.ts`.
