import https from "node:https";

function get(path, extraHeaders = {}) {
  return new Promise((resolve, reject) => {
    https
      .get(
        "https://doneanddelivered.co.in" + path,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            ...extraHeaders,
          },
        },
        (res) => {
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () =>
            resolve({
              status: res.statusCode,
              body: Buffer.concat(chunks).toString("utf8"),
              headers: res.headers,
            }),
          );
        },
      )
      .on("error", reject);
  });
}

function summarize(label, home) {
  const scripts = [
    ...home.body.matchAll(/src="(\/_next\/static\/chunks\/[^"]+)"/g),
  ].map((m) => m[1]);
  const turbo = scripts.find((s) => s.includes("turbopack"));
  console.log(`\n=== ${label} ===`);
  console.log("cache-control:", home.headers["cache-control"]);
  console.log("age:", home.headers["age"] ?? "(none)");
  console.log("x-nextjs-cache:", home.headers["x-nextjs-cache"] ?? "(none)");
  console.log("turbopack script:", turbo || "(none)");
  console.log("script count:", scripts.length);
  return turbo;
}

const bare = await get("/");
const chrome = await get("/", {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept: "text/html",
});

const t1 = summarize("Request A (minimal headers)", bare);
const t2 = summarize("Request B (browser UA)", chrome);

const oldTurbo = "/_next/static/chunks/turbopack-45a8559a9cccbb35.js";
const newTurbo = "/_next/static/chunks/turbopack-28dd6a71db85f1fa.js";
for (const p of [oldTurbo, newTurbo]) {
  const r = await get(p);
  console.log("chunk", r.status, p);
}

console.log("\nCONCLUSION:");
if (t1 !== t2) {
  console.log(
    "Different HTML variants are being served (different turbopack hashes).",
  );
}
if (bare.headers["cache-control"]?.includes("31536000")) {
  console.log(
    "Variant A is YEAR-CACHED CDN HTML (s-maxage=31536000) from an older deploy.",
  );
}
if (chrome.headers["cache-control"]?.includes("s-maxage=60")) {
  console.log(
    "Variant B is newer origin HTML with short s-maxage=60 from current next.config.",
  );
}
