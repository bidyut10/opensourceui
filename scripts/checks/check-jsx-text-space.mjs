/**
 * Fail when curated prose values use fragile `{expr} word` JSX (space can
 * collapse across Prettier line breaks). Prefer `${expr} word` in a template.
 *
 * Skips `${expr}` interpolations (lookbehind for `$`).
 *
 * Usage: node scripts/checks/check-jsx-text-space.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

const EXPR =
  "(?:siteConfig\\.)?(?:license\\.name|stats\\.(?:pageViews|visitors)|displayName)|" +
  "displayName|launchLabel|planLabel|words|completed|" +
  "(?:MEMBERS|CUSTOMERS|TASKS)\\.length|author\\.name";

// Not `${…}` — only bare `{expr}` followed by prose (same line or wrapped).
const HIT_RE = new RegExp(
  `(?<!\\$)\\{(${EXPR})\\}(?:[ \\t]+|\\s*\\n\\s*)[A-Za-z]`,
  "g",
);

const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  "out",
  ".git",
  "tests",
  "skills",
]);

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(name.name)) continue;
    const full = path.join(dir, name.name);
    if (name.isDirectory()) walk(full, acc);
    else if (name.name.endsWith(".tsx") || name.name.endsWith(".jsx")) {
      acc.push(full);
    }
  }
  return acc;
}

const failures = [];
for (const file of walk(root)) {
  const text = fs.readFileSync(file, "utf8");
  let m;
  HIT_RE.lastIndex = 0;
  while ((m = HIT_RE.exec(text))) {
    const after = text.slice(m.index + m[0].length - 1);
    // JSX attribute value position: `{foo} label=` / `{foo} className=`
    if (/^[A-Za-z][\w.-]*\s*=/.test(after)) continue;
    const line = text.slice(0, m.index).split("\n").length;
    const snippet = text
      .slice(Math.max(0, m.index - 12), m.index + 56)
      .replace(/\s+/g, " ")
      .trim();
    failures.push({
      file: path.relative(root, file),
      line,
      expr: m[1],
      snippet,
    });
  }
}

if (failures.length) {
  console.error(
    "Fragile JSX text spacing — put the following word inside a template literal:\n",
  );
  for (const f of failures) {
    console.error(`  ${f.file}:${f.line}  {${f.expr}} …`);
    console.error(`    ${f.snippet}\n`);
  }
  console.error(
    `${failures.length} hit(s). Example: {\`\${siteConfig.displayName} gives …\`}`,
  );
  process.exit(1);
}

console.log("check-jsx-text-space: ok");
