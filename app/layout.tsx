import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
  metadataBase: new URL("https://doneanddelivered.com"),
  title: {
    default:
      "Done & Delivered | Premium Real Estate Marketing & Property Branding",
    template: "%s | Done & Delivered",
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
  authors: [{ name: "Done & Delivered" }],
  creator: "Done & Delivered",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Done & Delivered",
    title:
      "Done & Delivered | Premium Real Estate Marketing & Property Branding",
    description:
      "Premium reach for premium properties. Project branding, performance marketing, lead generation, and end-to-end sales support for builders and developers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Done & Delivered | Premium Real Estate Marketing",
    description:
      "Premium property marketing, branding, project launches, and sales enablement for developers.",
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
