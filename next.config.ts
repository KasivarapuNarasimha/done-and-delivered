import type { NextConfig } from "next";

/**
 * Deployment reliability notes (Hostinger + CDN):
 * - HTML must NOT be edge-cached for a year (prevents stale HTML → 404 chunks).
 * - Hashed /_next/static assets are immutable and can be cached long-term.
 * - Always build with `pnpm run build` (cleans .next first via prebuild).
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
    // Order matters: first matching source wins in Next.js.
    return [
      {
        // Content-hashed build assets: safe to cache forever
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Document HTML / pages: short CDN TTL so deploys become visible quickly
        // (prevents stale HTML referencing deleted chunk hashes → 404)
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
