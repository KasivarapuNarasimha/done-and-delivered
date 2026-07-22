/**
 * Removes build artifacts so every production build starts clean.
 * Prevents mixed HTML/chunk hashes across deploys.
 */
import { existsSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const targets = [".next", ".next.previous", ".next.tmp", "out"];

for (const name of targets) {
  const dir = join(root, name);
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
    console.log(`[clean-next] removed ${name}/`);
  }
}

console.log("[clean-next] workspace build dirs clean");
