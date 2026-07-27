/**
 * Local post-build check: every /_next/static asset referenced by generated
 * HTML must exist on disk under .next/static.
 *
 * Usage: node scripts/verify-build-integrity.mjs
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const nextDir = join(root, ".next");
const staticDir = join(nextDir, "static");

if (!existsSync(nextDir) || !existsSync(staticDir)) {
  console.error("[verify-build] FAIL: .next/static missing — run pnpm build first");
  process.exit(1);
}

const buildIdPath = join(nextDir, "BUILD_ID");
const buildId = existsSync(buildIdPath)
  ? readFileSync(buildIdPath, "utf8").trim()
  : "(missing)";
console.log("[verify-build] BUILD_ID:", buildId);

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const htmlFiles = walk(join(nextDir, "server")).filter((f) =>
  f.endsWith(".html"),
);

if (htmlFiles.length === 0) {
  console.error("[verify-build] FAIL: no server HTML found under .next/server");
  process.exit(1);
}

const assetRe =
  /\/_next\/static\/(?:chunks|css|media)\/[^"'\\\s>]+\.(?:js|css|woff2?|ttf|otf)/gi;

const referenced = new Set();
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(assetRe)) {
    referenced.add(match[0]);
  }
  for (const match of html.matchAll(
    /(?:src|href)=["'](\/_next\/static\/[^"']+)["']/gi,
  )) {
    referenced.add(match[1]);
  }
}

if (referenced.size === 0) {
  console.error("[verify-build] FAIL: no /_next/static references in HTML");
  process.exit(1);
}

let missing = 0;
for (const assetPath of [...referenced].sort()) {
  const diskPath = join(root, assetPath.replace("/_next/", ".next/"));
  const ok = existsSync(diskPath);
  if (!ok) {
    missing += 1;
    console.error("MISSING", assetPath, "→", relative(root, diskPath));
  }
}

console.log(
  `[verify-build] checked ${referenced.size} assets across ${htmlFiles.length} HTML files`,
);

if (missing > 0) {
  console.error(`[verify-build] FAIL: ${missing} referenced assets missing on disk`);
  process.exit(1);
}

console.log("[verify-build] PASS: HTML references match files under .next/static");
