/**
 * Deep production static diagnosis.
 * Usage: node scripts/diagnose-prod-static.mjs [baseUrl]
 */
import https from "node:https";
import http from "node:http";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BASE = (process.argv[2] || "https://doneanddelivered.co.in").replace(
  /\/$/,
  "",
);

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const req = lib.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Accept: "*/*",
        },
        timeout: 30000,
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", async () => {
          const body = Buffer.concat(chunks);
          const location = res.headers.location;
          if (
            location &&
            [301, 302, 307, 308].includes(res.statusCode) &&
            redirects < 5
          ) {
            resolve(await get(new URL(location, url).toString(), redirects + 1));
            return;
          }
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: body.toString("utf8"),
            raw: body,
          });
        });
      },
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("timeout " + url));
    });
  });
}

function extractAssets(html) {
  const paths = new Set();
  for (const m of html.matchAll(/(?:src|href)=["'](\/_next\/static\/[^"']+)["']/gi)) {
    paths.add(m[1].split("?")[0]);
  }
  for (const m of html.matchAll(
    /\/_next\/static\/(?:chunks|css|media)\/[A-Za-z0-9._-]+\.(?:js|css|woff2?)/gi,
  )) {
    paths.add(m[0]);
  }
  return [...paths];
}

function extractChunkIdsFromJs(js) {
  const ids = new Set();
  // hashed filenames referenced as static/chunks/...
  for (const m of js.matchAll(
    /static\/chunks\/([A-Za-z0-9._-]+\.(?:js|css))/g,
  )) {
    ids.add(`/_next/static/chunks/${m[1]}`);
  }
  for (const m of js.matchAll(/\/_next\/static\/chunks\/([A-Za-z0-9._-]+\.js)/g)) {
    ids.add(`/_next/static/chunks/${m[1]}`);
  }
  return [...ids];
}

async function checkPaths(label, paths) {
  console.log(`\n[${label}] ${paths.length} paths`);
  let ok = 0;
  let fail = 0;
  const failed = [];
  for (const path of paths) {
    const r = await get(BASE + path);
    const good = r.status === 200;
    if (good) ok += 1;
    else {
      fail += 1;
      failed.push(path);
    }
    console.log(
      good ? " OK " : "FAIL",
      r.status,
      path,
      "| ct:",
      (r.headers["content-type"] || "").slice(0, 40),
      "| cc:",
      r.headers["cache-control"] || "none",
    );
  }
  console.log(` summary ${label}: ${ok}/${paths.length} OK, ${fail} FAIL`);
  return failed;
}

console.log("=== PRODUCTION DEEP DIAGNOSIS ===");
console.log("target:", BASE);

for (const route of ["/", "/about", "/contact"]) {
  const page = await get(BASE + route);
  console.log(`\n========== ROUTE ${route} ==========`);
  console.log(" status:", page.status);
  console.log(" cache-control:", page.headers["cache-control"]);
  console.log(" age:", page.headers["age"] ?? "(none)");
  console.log(" x-nextjs-cache:", page.headers["x-nextjs-cache"] ?? "(none)");
  console.log(" server:", page.headers["server"]);

  const buildId =
    page.body.match(/"buildId"\s*:\s*"([^"]+)"/)?.[1] ||
    (() => {
      try {
        const nd = page.body.match(
          /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/,
        );
        return nd ? JSON.parse(nd[1]).buildId : null;
      } catch {
        return null;
      }
    })();
  console.log(" buildId:", buildId ?? "(not in document)");

  const assets = extractAssets(page.body);
  const failedHtml = await checkPaths(`HTML assets ${route}`, assets);

  // Follow JS bundles for more chunk references
  const jsAssets = assets.filter((p) => p.endsWith(".js"));
  const dynamic = new Set();
  for (const jsPath of jsAssets.slice(0, 8)) {
    const js = await get(BASE + jsPath);
    if (js.status !== 200) continue;
    for (const p of extractChunkIdsFromJs(js.body)) dynamic.add(p);
  }
  const extra = [...dynamic].filter((p) => !assets.includes(p));
  if (extra.length) {
    await checkPaths(`Dynamic imports from JS (${route})`, extra);
  }

  if (failedHtml.length) {
    console.log(" FAILED HTML ASSETS:", failedHtml.join(", "));
  }
}

// Control probes
console.log("\n========== CONTROL PROBES ==========");
const controls = [
  "/images/hero-bg.jpg",
  "/favicon.ico",
  "/_next/static/chunks/does-not-exist-abc123.js",
  "/_next/static/chunks/../../../package.json",
];
for (const path of controls) {
  const r = await get(BASE + path);
  console.log(r.status, path, "| ct:", (r.headers["content-type"] || "").slice(0, 50));
  if (r.status === 404 && path.includes("does-not-exist")) {
    console.log("  404 body starts:", r.body.slice(0, 120).replace(/\s+/g, " "));
  }
}

// Local comparison
console.log("\n========== LOCAL .next ==========");
const localBuildIdPath = join(process.cwd(), ".next", "BUILD_ID");
if (existsSync(localBuildIdPath)) {
  const localBuildId = readFileSync(localBuildIdPath, "utf8").trim();
  console.log(" local BUILD_ID:", localBuildId);
  const chunksDir = join(process.cwd(), ".next", "static", "chunks");
  if (existsSync(chunksDir)) {
    const files = readdirSync(chunksDir);
    console.log(" local chunk count:", files.length);
    console.log(
      " local sample:",
      files.filter((f) => f.endsWith(".js")).slice(0, 10).join(", "),
    );
  }
} else {
  console.log(" no local .next");
}

console.log("\n=== DONE ===");
