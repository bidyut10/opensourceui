/**
 * Workers static assets reject _redirects with external proxy URLs.
 * Remove if present (e.g. from cached out/ or old public/ copies).
 */
import { existsSync, unlinkSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const redirects = path.join(root, "out", "_redirects");

if (existsSync(redirects)) {
  unlinkSync(redirects);
  console.log(
    "Removed out/_redirects (not supported on Workers static assets).",
  );
}
