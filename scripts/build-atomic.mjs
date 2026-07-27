/**
 * Atomic production build for Hostinger:
 * 1. Clean build dirs
 * 2. next build into a temp dir via NEXT_DIST_DIR is not used (Next still
 *    writes to .next) — instead we rename .next away, build, and roll back
 *    on failure so a broken build never leaves a half-written tree.
 */
import { existsSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const nextDir = join(root, ".next");
const prevDir = join(root, ".next.previous");

function remove(dir) {
  if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
}

console.log("[build-atomic] starting clean production build");

if (existsSync(nextDir)) {
  remove(prevDir);
  renameSync(nextDir, prevDir);
  console.log("[build-atomic] moved existing .next → .next.previous");
}

const build = spawnSync(
  process.platform === "win32" ? "pnpm.cmd" : "pnpm",
  ["exec", "next", "build", "--turbopack"],
  { cwd: root, stdio: "inherit", shell: process.platform === "win32" },
);

if (build.status !== 0) {
  console.error("[build-atomic] build failed — restoring previous .next if any");
  remove(nextDir);
  if (existsSync(prevDir)) {
    renameSync(prevDir, nextDir);
    console.log("[build-atomic] restored .next.previous → .next");
  }
  process.exit(build.status || 1);
}

const verify = spawnSync(process.execPath, ["scripts/verify-build-integrity.mjs"], {
  cwd: root,
  stdio: "inherit",
});

if (verify.status !== 0) {
  console.error("[build-atomic] integrity check failed — rolling back");
  remove(nextDir);
  if (existsSync(prevDir)) {
    renameSync(prevDir, nextDir);
    console.log("[build-atomic] restored .next.previous → .next");
  }
  process.exit(verify.status || 1);
}

remove(prevDir);
console.log("[build-atomic] SUCCESS — clean build verified");
