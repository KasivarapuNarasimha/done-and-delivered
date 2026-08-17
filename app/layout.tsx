import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/constants";
import "./globals.css";

/** Display font — limited weights for faster download */
const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/** Body font — essential weights only */
const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Done & Delivered | Premium Real Estate Marketing & Property Branding",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Done & Delivered is a premium real estate marketing and sales partner for builders and developers—specializing in property branding, project launches, performance marketing, lead generation, and luxury property marketing.",
  keywords: [
    "Done & Delivered",
    "Done and Delivered",
    "Premium Real Estate Marketing",
    "Property Branding",
    "Project Launch",
    "Luxury Property Marketing",
    "Real Estate Lead Generation",
    "Performance Marketing for Developers",
    "Sales Funnel Optimization",
    "Real Estate Marketing Agency India",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title:
      "Done & Delivered | Premium Real Estate Marketing & Property Branding",
    description: `${SITE_TAGLINE}. Project branding, performance marketing, lead generation, and end-to-end sales support for builders and developers.`,
    images: [
      {
        url: "/logo-3.png",
        width: 1600,
        height: 800,
        alt: "Done & Delivered logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Done & Delivered | Premium Real Estate Marketing",
    description:
      "Premium property marketing, branding, project launches, and sales enablement for developers.",
    images: ["/logo-3.png"],
  },
  icons: {
    // Landscape logo is not a suitable square favicon — keep app default favicon.
    apple: "/logo-3.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B2E83",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
