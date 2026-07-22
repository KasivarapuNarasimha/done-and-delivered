/**
 * Post-deploy verification: every /_next/static asset referenced by the
 * homepage HTML must return HTTP 200.
 *
 * Usage:
 *   node scripts/verify-static.mjs
 *   node scripts/verify-static.mjs https://doneanddelivered.co.in
 */
import https from "node:https";
import http from "node:http";

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
          "User-Agent": "done-and-delivered-static-verify",
          "Cache-Control": "no-cache",
        },
        timeout: 25000,
      },
      (res) => {
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", async () => {
          const body = Buffer.concat(chunks).toString("utf8");
          const location = res.headers.location;
          if (
            location &&
            [301, 302, 307, 308].includes(res.statusCode) &&
            redirects < 5
          ) {
            const next = new URL(location, url).toString();
            resolve(await get(next, redirects + 1));
            return;
          }
          resolve({
            url,
            status: res.statusCode,
            headers: res.headers,
            body,
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
  const re =
    /\/_next\/static\/(?:chunks|media|css)\/[A-Za-z0-9._-]+\.(?:js|css|woff2?|ttf|otf|png|jpg|jpeg|svg|webp|avif)/g;
  let m;
  while ((m = re.exec(html))) paths.add(m[0]);
  return [...paths];
}

console.log("[verify-static] target", BASE);
const home = await get(BASE + "/");
console.log("[verify-static] HTML", home.status, home.headers["cache-control"]);

if (home.status !== 200) {
  console.error("[verify-static] FAIL homepage status", home.status);
  process.exit(1);
}

if (/DEPLOY TEST/.test(home.body)) {
  console.warn(
    "[verify-static] WARN: temporary DEPLOY TEST badge still present — remove after CDN purge confirms new build",
  );
}

const assets = extractAssets(home.body);
if (assets.length === 0) {
  console.error("[verify-static] FAIL no /_next/static assets found in HTML");
  process.exit(1);
}

let failed = 0;
for (const path of assets) {
  const r = await get(BASE + path);
  const ok = r.status === 200;
  if (!ok) failed += 1;
  console.log(ok ? "OK " : "FAIL", r.status, path);
}

console.log(
  `[verify-static] ${assets.length - failed}/${assets.length} assets HTTP 200`,
);

if (failed > 0) {
  console.error(
    "[verify-static] FAIL: missing static chunks — clean rebuild + CDN purge required",
  );
  process.exit(1);
}

console.log("[verify-static] PASS: all referenced /_next/static assets return 200");
console.log(
  "[verify-static] REMINDER: purge Hostinger CDN after every deploy (HTML uses long s-maxage)",
);
