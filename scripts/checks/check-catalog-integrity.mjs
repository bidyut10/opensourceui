/**
 * Fails if showcase registry and source_inventory drift, or if slugs duplicate.
 *
 * Usage: node scripts/checks/check-catalog-integrity.mjs
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const showcasePath = path.join(root, "lib", "showcase", "showcase.tsx");
const inventoryPath = path.join(
  root,
  "skills",
  "opensource-ui",
  "references",
  "source_inventory.txt",
);

const showcase = readFileSync(showcasePath, "utf8");
const inventory = existsSync(inventoryPath)
  ? readFileSync(inventoryPath, "utf8")
  : "";

const SLUG_RE = /\bc\(\s*["']([a-z0-9-]+)["']/gi;
const FILE_RE = /["'](components\/[a-z0-9/_-]+\.tsx)["']/gi;

const slugs = [...showcase.matchAll(SLUG_RE)].map((m) => m[1]);
const files = [
  ...new Set([...showcase.matchAll(FILE_RE)].map((m) => m[1])),
].filter((file) => !file.includes("..."));

if (slugs.length === 0) {
  console.error("No showcase slugs found.");
  process.exit(1);
}

const slugCounts = new Map();
for (const slug of slugs) {
  slugCounts.set(slug, (slugCounts.get(slug) ?? 0) + 1);
}
const duplicateSlugs = [...slugCounts.entries()]
  .filter(([, count]) => count > 1)
  .map(([slug]) => slug);

const inventoryFiles = new Set(
  inventory
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("components/") && line.endsWith(".tsx")),
);

const missingFromInventory = files.filter((file) => !inventoryFiles.has(file));
const missingOnDisk = files.filter(
  (file) => !existsSync(path.join(root, file)),
);

let failed = false;

if (duplicateSlugs.length > 0) {
  failed = true;
  console.error(`\nDuplicate showcase slugs (${duplicateSlugs.length}):\n`);
  for (const slug of duplicateSlugs) {
    console.error(`  ✗ ${slug}`);
  }
}

if (missingOnDisk.length > 0) {
  failed = true;
  console.error(
    `\nShowcase files missing on disk (${missingOnDisk.length}):\n`,
  );
  for (const file of missingOnDisk) {
    console.error(`  ✗ ${file}`);
  }
}

if (missingFromInventory.length > 0) {
  failed = true;
  console.error(
    `\nShowcase files missing from source_inventory.txt (${missingFromInventory.length}):\n`,
  );
  for (const file of missingFromInventory) {
    console.error(`  ✗ ${file}`);
  }
  console.error(`
Add each path to skills/opensource-ui/references/source_inventory.txt
`);
}

if (failed) {
  process.exit(1);
}

console.log(
  `✓ Catalog OK — ${slugCounts.size} unique slugs, ${files.length} files, inventory in sync.`,
);
