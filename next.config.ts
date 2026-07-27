import type { NextConfig } from "next";

/**
 * Hostinger (hCDN) deployment notes:
 *
 * Next.js fully-static App Router pages default to:
 *   Cache-Control: s-maxage=31536000
 * That lets hCDN hold HTML for up to a year. After a redeploy, the edge can
 * keep serving old HTML while the Node origin has a new BUILD_ID / chunk set
 * → browser requests missing /_next/static/chunks/* → 404.
 *
 * Fix: short-circuit HTML/document CDN caching; keep hashed static assets
 * immutable and long-lived.
 *
 * No assetPrefix / basePath / custom distDir — Hostinger Node expects defaults.
 */
const nextConfig: NextConfig = {
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
    // First matching source wins in Next.js.
    return [
      {
        // Content-hashed build assets: safe to cache forever at CDN/browser.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Next image optimizer responses can be cached moderately.
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        // API must never be CDN-cached.
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store, max-age=0, must-revalidate",
          },
        ],
      },
      {
        // Documents / RSC HTML: short CDN TTL so deploys are visible quickly
        // and never leave stale HTML pointing at deleted chunk hashes.
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
