import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import { GoogleAnalytics } from "@/components/google-analytics";
import { googleAnalyticsId } from "@/lib/site-data";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://humem.ai"),
  title: {
    default: "HumemAI",
    template: "%s | HumemAI",
  },
  description: "Persistent, explainable memory for agentic AI systems.",
  openGraph: {
    title: "HumemAI",
    description: "Persistent, explainable memory for agentic AI systems.",
    url: "https://humem.ai",
    siteName: "HumemAI",
    images: [
      {
        url: "/illustrations/og-memory-for-agentic-ai.png",
        alt: "HumemAI social preview image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HumemAI",
    description: "Persistent, explainable memory for agentic AI systems.",
    images: ["/illustrations/og-memory-for-agentic-ai.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics measurementId={googleAnalyticsId} />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
