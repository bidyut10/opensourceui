/**
 * Scans components/ for banned patterns that break the design system.
 *
 * Usage: node scripts/checks/check-design-guard.mjs
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const componentsRoot = path.join(root, "components");

/** @type {{ id: string; re: RegExp; message: string }[]} */
const RULES = [
  {
    id: "sm-breakpoint",
    // Tailwind responsive variant only — not size-map keys like `sm: "h-9"`.
    re: /(?:^|[\s"'`])sm:(?=[a-z#[])/,
    message: "Do not use sm: breakpoints — use base + md: only",
  },
  {
    id: "purple-family",
    re: /(?:^|[\s"'`])(?:purple|violet|indigo)-[0-9]{2,3}\b/,
    message: "Do not use purple/violet/indigo Tailwind colors",
  },
  {
    id: "colored-focus-ring",
    re: /focus(?:-visible)?:ring-(?:sky|blue|indigo|violet|purple|cyan|emerald|rose|amber|teal|red|green)-/,
    message: "Do not use colored focus rings — use border focus instead",
  },
];

function walk(dir) {
  /** @type {string[]} */
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (name === "system" || name === "contact") continue;
      out.push(...walk(full));
    } else if (name.endsWith(".tsx") && !name.includes(".test.")) {
      out.push(full);
    }
  }
  return out;
}

const files = walk(componentsRoot);
/** @type {{ file: string; id: string; line: number; sample: string; message: string }[]} */
const hits = [];

for (const file of files) {
  const rel = path.relative(root, file).replaceAll("\\", "/");
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    // Skip import paths / comments that mention banned words without using them as classes
    if (line.trimStart().startsWith("//") || line.trimStart().startsWith("*")) {
      return;
    }
    for (const rule of RULES) {
      if (rule.re.test(line)) {
        hits.push({
          file: rel,
          id: rule.id,
          line: index + 1,
          sample: line.trim().slice(0, 120),
          message: rule.message,
        });
      }
    }
  });
}

if (hits.length > 0) {
  console.error(`\nDesign guard failed (${hits.length} hit(s)):\n`);
  for (const hit of hits) {
    console.error(`  ✗ ${hit.file}:${hit.line} [${hit.id}] ${hit.message}`);
    console.error(`    ${hit.sample}`);
  }
  process.exit(1);
}

console.log(`✓ Design guard OK — scanned ${files.length} component files.`);
