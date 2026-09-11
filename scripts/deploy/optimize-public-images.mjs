import {
  readdirSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const publicDir = path.join(root, "public");

/** Prefer compressing heavy demo / OG assets; skip tiny icons. */
const TARGETS = new Set([
  "opensourceui-banner.png",
  "dith-homee.png",
  "wallpaper-15.png",
  "wallpaper-2.png",
  "wallpaper-11.png",
  "wallpaper-3.png",
  "car.png",
  "footer.webp",
  "background4.webp",
  "background6.webp",
  "background5.webp",
]);

function kb(n) {
  return `${(n / 1024).toFixed(1)} KB`;
}

async function optimizeFile(filePath) {
  const name = path.basename(filePath);
  const before = statSync(filePath).size;
  const ext = path.extname(name).toLowerCase();
  let out;

  if (ext === ".png") {
    out = await sharp(filePath)
      .png({ compressionLevel: 9, effort: 10, palette: false })
      .toBuffer();
  } else if (ext === ".webp") {
    out = await sharp(filePath).webp({ quality: 78, effort: 6 }).toBuffer();
  } else {
    return;
  }

  if (out.length >= before * 0.98) {
    console.log(`skip  ${name} (${kb(before)} — no meaningful gain)`);
    return;
  }

  const tmp = `${filePath}.tmp`;
  writeFileSync(tmp, out);
  try {
    unlinkSync(filePath);
  } catch {
    // Windows may keep a handle; overwrite via rename when possible.
  }
  renameSync(tmp, filePath);
  console.log(`ok    ${name}: ${kb(before)} → ${kb(out.length)}`);
}

const files = readdirSync(publicDir)
  .filter((name) => TARGETS.has(name))
  .map((name) => path.join(publicDir, name));

for (const file of files) {
  try {
    await optimizeFile(file);
  } catch (err) {
    console.error(`fail  ${path.basename(file)}:`, err.message);
  }
}
