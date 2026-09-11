# Scripts

Maintenance and deploy helpers. Prefer `npm run …` over calling these directly.

```
scripts/
├── checks/   # CI integrity gates (showcase paths, catalog, design rules)
└── deploy/   # Build post-process + Cloudflare Worker deploy helpers
```

| Script                                        | npm command                                 |
| --------------------------------------------- | ------------------------------------------- |
| `checks/check-showcase-files.mjs`             | `npm run check:showcase`                    |
| `checks/check-catalog-integrity.mjs`          | `npm run check:catalog`                     |
| `checks/check-design-guard.mjs`               | `npm run check:design`                      |
| `checks/check-jsx-text-space.mjs`             | `npm run check:jsx-space`                   |
| `deploy/strip-worker-incompatible-assets.mjs` | runs as `postbuild`                         |
| `deploy/cloudflare-pages-deploy.mjs`          | `npm run cf:deploy` (Worker + assets)       |
| `deploy/optimize-public-images.mjs`           | optional: recompress heavy `public/` assets |

`pages:deploy` / `pages:dev` are aliases of `cf:*` for older docs. Do not use Cloudflare Pages upload for this repo.
