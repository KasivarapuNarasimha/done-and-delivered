/**
 * Full clean production build with rollback if build fails.
 *
 * Flow:
 * 1. Move existing .next → .next.previous (keep last-known-good)
 * 2. Run full next build (writes complete new .next)
 * 3. On success: delete .next.previous
 * 4. On failure: restore .next.previous → .next and exit non-zero
 *
 * This keeps publish atomic: never leave a half-written .next as current.
 */
import { existsSync, renameSync, rmSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { execSync } from "node:child_process";

const root = process.cwd();
const nextDir = join(root, ".next");
const prevDir = join(root, ".next.previous");
const staticDir = join(nextDir, "static");
const buildIdFile = join(nextDir, "BUILD_ID");

function rm(dir) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
  }
}

function assertBuildOutput() {
  if (!existsSync(nextDir)) {
    throw new Error("Build finished but .next/ is missing");
  }
  if (!existsSync(staticDir)) {
    throw new Error("Build finished but .next/static/ is missing");
  }
  if (!existsSync(buildIdFile)) {
    throw new Error("Build finished but .next/BUILD_ID is missing");
  }
  const chunks = join(staticDir, "chunks");
  if (!existsSync(chunks)) {
    throw new Error("Build finished but .next/static/chunks/ is missing");
  }
}

console.log("[build-atomic] starting clean production build…");

if (existsSync(nextDir)) {
  rm(prevDir);
  renameSync(nextDir, prevDir);
  console.log("[build-atomic] moved .next → .next.previous");
} else {
  rm(prevDir);
}

try {
  execSync("pnpm exec next build --turbopack", {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });
} catch {
  console.error("[build-atomic] build failed — restoring previous .next if any");
  rm(nextDir);
  if (existsSync(prevDir)) {
    renameSync(prevDir, nextDir);
    console.error("[build-atomic] restored .next.previous → .next");
  }
  process.exit(1);
}

try {
  assertBuildOutput();
  const buildId = readFileSync(buildIdFile, "utf8").trim();
  console.log("[build-atomic] BUILD_ID", buildId);
  console.log("[build-atomic] .next/static present — publish set is complete");
  rm(prevDir);
  console.log("[build-atomic] success (previous build discarded)");
} catch (err) {
  console.error("[build-atomic]", err instanceof Error ? err.message : err);
  rm(nextDir);
  if (existsSync(prevDir)) {
    renameSync(prevDir, nextDir);
    console.error("[build-atomic] restored .next.previous → .next");
  }
  process.exit(1);
}
