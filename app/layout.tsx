import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

import { AnalyticsTracker } from "@/components/system/analytics";
import { NavigationLoader } from "@/app/_shared/navigation/navigation-loader";
import { PathMemoryTracker } from "@/app/_shared/navigation/path-memory-tracker";
import { ScrollToTopButton } from "@/app/_shared/scroll/scroll-to-top-button";
import { JsonLd, getRootSiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif-display",
  weight: "400",
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.displayName}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.displayName,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.portfolioUrl }],
  creator: siteConfig.author.name,
  publisher: siteConfig.displayName,
  keywords: [...siteConfig.keywords],
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.displayName,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.displayName} — free React UI components`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.author.twitter,
    site: siteConfig.author.twitter,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.displayName} — free React UI components`,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased selection:bg-neutral-800 selection:text-white`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col overflow-x-hidden"
      >
        <JsonLd data={getRootSiteJsonLd()} />
        {children}
        <AnalyticsTracker />
        <Suspense fallback={null}>
          <PathMemoryTracker />
        </Suspense>
        <NavigationLoader />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
