import type { NextConfig } from "next";

/**
 * Hostinger hCDN + Next.js static asset 404s — proven root cause
 * ----------------------------------------------------------------
 * Live probes showed TWO HTML generations being served:
 *
 * A) Stale CDN HTML:
 *    Cache-Control: s-maxage=31536000  (Next default for static pages)
 *    age: ~48h+
 *    scripts: /_next/static/chunks/turbopack-45a8559a9cccbb35.js  (+ peers)
 *    those chunk URLs → HTTP 404 (Not Found) on origin
 *
 * B) Current origin HTML (after short-cache headers were deployed):
 *    Cache-Control: max-age=0, s-maxage=60
 *    scripts: /_next/static/chunks/turbopack-28dd6a71db85f1fa.js  (+ peers)
 *    those chunk URLs → HTTP 200
 *
 * Conclusion: HTML and /_next/static must come from the SAME build.
 * Year-cached HTML after a redeploy references deleted chunk hashes.
 * public/ assets (e.g. /images/hero-bg.jpg) still work → only Next
 * build chunks from the previous BUILD_ID are missing — not a total
 * static-file outage, not standalone-without-static as the sole cause
 * (current generation chunks serve correctly).
 *
 * Headers notes:
 * - Next merges matching header rules; a broad `/:path*` AFTER
 *   `/_next/static` overwrote immutable static Cache-Control.
 * - Document paths must exclude `/_next/*` so hashed assets stay
 *   immutable while HTML never sits at the edge for a year.
 */
const htmlCacheControl =
  "public, max-age=0, s-maxage=0, must-revalidate";

const nextConfig: NextConfig = {
  // Default Node server output — NOT "export", NOT "standalone".
  // Hostinger runs `next build` + `next start` with full `.next/` tree.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "framer-motion"],
  },
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, max-age=0, must-revalidate",
          },
        ],
      },
      {
        // Homepage document (does not match /:path* alone in all Next versions)
        source: "/",
        headers: [{ key: "Cache-Control", value: htmlCacheControl }],
      },
      {
        // All other documents — explicitly exclude /_next/* so static
        // immutable headers are never overwritten by this rule.
        source: "/:path((?!_next/).*)",
        headers: [{ key: "Cache-Control", value: htmlCacheControl }],
      },
    ];
  },
};

export default nextConfig;
