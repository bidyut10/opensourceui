/**
 * Fails if any showcase `file` path in lib/showcase/showcase.tsx is missing on disk.
 * Run after moving components so stale paths cannot ship silently.
 *
 * Usage: node scripts/checks/check-showcase-files.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const showcasePath = path.join(root, "lib", "showcase", "showcase.tsx");
const source = readFileSync(showcasePath, "utf8");

const FILE_RE = /["'](components\/[a-z0-9/_-]+\.tsx)["']/gi;
const files = [
  ...new Set([...source.matchAll(FILE_RE)].map((m) => m[1])),
].filter((file) => !file.includes("..."));

if (files.length === 0) {
  console.error("No component file paths found in showcase.tsx");
  process.exit(1);
}

const missing = files.filter((file) => !existsSync(path.join(root, file)));

if (missing.length > 0) {
  console.error(
    `\nShowcase file paths missing on disk (${missing.length}/${files.length}):\n`,
  );
  for (const file of missing) {
    console.error(`  ✗ ${file}`);
  }
  console.error(`
When you move a component:
  1. Update the import in lib/showcase/showcase.tsx
  2. Update the matching c(..., "components/.../file.tsx", ...) path
  3. Re-run: npm run check:showcase
`);
  process.exit(1);
}

console.log(`✓ Showcase OK — ${files.length} component files exist.`);
