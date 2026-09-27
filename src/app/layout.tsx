import type { Metadata } from "next";
import { DM_Mono, Newsreader, Schibsted_Grotesk } from "next/font/google";
import "katex/dist/katex.min.css";
import { CookieConsentBanner } from "@/components/cookie-consent";
import { GoogleAnalytics } from "@/components/google-analytics";
import { googleAnalyticsId } from "@/lib/site-data";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

// The HumemAI faces (github.com/humemai/design-system). globals.css feeds
// these variables into --hm-font-display, --hm-font-text and --hm-font-mono.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://humem.ai"),
  title: {
    default: "HumemAI",
    template: "%s | HumemAI",
  },
  description: "Open source memory systems for agentic AI.",
  openGraph: {
    title: "HumemAI",
    description: "Open source memory systems for agentic AI.",
    url: "https://humem.ai",
    siteName: "HumemAI",
    images: [
      {
        url: "/brand/export/og-1200x630.png",
        width: 1200,
        height: 630,
        alt: "HumemAI: machines with human-like memory. Open source memory systems for agentic AI.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HumemAI",
    description: "Open source memory systems for agentic AI.",
    images: ["/brand/export/og-1200x630.png"],
  },
  icons: {
    icon: [
      { url: "/brand/export/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/export/favicon.ico", sizes: "48x48" },
    ],
    apple: "/brand/export/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The font variables go on <html>, not <body>: globals.css builds the
    // --hm-font-* tokens from them on :root, and a var() that is undefined
    // where it is resolved makes the whole font-family fall back to Times.
    <html
      className={`${newsreader.variable} ${schibstedGrotesk.variable} ${dmMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <GoogleAnalytics measurementId={googleAnalyticsId} />
      <body className="antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
        <CookieConsentBanner />
      </body>
    </html>
  );
}
