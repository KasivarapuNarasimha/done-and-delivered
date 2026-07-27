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
          Pragma: "no-cache",
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
  for (const match of html.matchAll(
    /(?:src|href)=["'](\/_next\/static\/[^"']+)["']/gi,
  )) {
    paths.add(match[1]);
  }
  const re =
    /\/_next\/static\/(?:chunks|css|media)\/[^"'\\\s>]+\.(?:js|css|woff2?|ttf|otf)/gi;
  let m;
  while ((m = re.exec(html))) paths.add(m[0]);
  return [...paths];
}

console.log("[verify-static] target", BASE);
const home = await get(BASE + "/");
console.log("[verify-static] HTML", home.status);
console.log("[verify-static] cache-control:", home.headers["cache-control"]);
console.log("[verify-static] age:", home.headers["age"] ?? "(none)");
console.log("[verify-static] server:", home.headers["server"]);

if (home.status !== 200) {
  console.error("[verify-static] FAIL homepage status", home.status);
  process.exit(1);
}

const cacheControl = String(home.headers["cache-control"] || "");
if (/s-maxage=31536000/.test(cacheControl)) {
  console.error(
    "[verify-static] FAIL: HTML still has s-maxage=31536000 — CDN will keep stale HTML after deploys. Deploy this repo's next.config headers and purge Hostinger CDN.",
  );
  process.exit(1);
}

if (/DEPLOY TEST/i.test(home.body)) {
  console.warn(
    "[verify-static] WARN: temporary DEPLOY TEST marker still present in HTML",
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
    "[verify-static] FAIL: missing static chunks — clean rebuild + Hostinger CDN purge required",
  );
  console.error(
    "Root cause pattern: stale HTML (CDN age) references chunk hashes not present on the current Node origin.",
  );
  process.exit(1);
}

console.log(
  "[verify-static] PASS: all referenced /_next/static assets return 200",
);
