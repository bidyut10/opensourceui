/**
 * Deploy command for Cloudflare Workers Git builds.
 *
 * Uploads the Next.js static export (out/) via wrangler deploy + [assets].
 * npm aliases: cf:deploy, pages:deploy
 *
 * Do NOT use wrangler pages deploy — wrong product for this wrangler.toml.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const wranglerBin = path.join(
  root,
  "node_modules",
  "wrangler",
  "bin",
  "wrangler.js",
);

console.log("Deploying out/ to Worker (wrangler deploy)...");

const result = spawnSync(process.execPath, [wranglerBin, "deploy"], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

process.exit(result.status ?? 1);
