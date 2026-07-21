import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://doneanddelivered.com"),
  title: {
    default: "Done & Delivered | Verified Properties, Developers & Investments",
    template: "%s | Done & Delivered",
  },
  description:
    "Done & Delivered is a premium enterprise real estate platform for verified properties, verified developers, and verified investments—helping people invest with confidence.",
  keywords: [
    "Done and Delivered",
    "verified properties",
    "verified developers",
    "verified investments",
    "luxury real estate",
    "premium property advisory",
    "RERA verified projects",
  ],
  authors: [{ name: "Done & Delivered" }],
  creator: "Done & Delivered",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Done & Delivered",
    title: "Done & Delivered | Verified Properties, Developers & Investments",
    description:
      "Premium enterprise real estate platform for verified properties, developers, and investments.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Done & Delivered | Verified Real Estate",
    description:
      "Helping people invest with confidence through verified properties, developers, and investments.",
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
