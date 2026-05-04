import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { DeferredAnalytics } from "./components/analytics/DeferredAnalytics";
import { FixedCTA } from "./components/layout/FixedCTA";
import { SkipToMainLink } from "./components/accessibility/SkipToMainLink";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

// Replaces Shippori Mincho with Noto Sans JP while maintaining variable compatibility
// This ensures 'font-serif' classes render as Noto Sans JP
const shipporiMincho = Noto_Sans_JP({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ohakanavi.jp"),
  title: {
    default: "清蓮（Seiren）| お墓探しナビ",
    template: "%s | 清蓮",
  },
  description: "墓地、永代供養、樹木葬、納骨堂の検索・比較なら清蓮。専門家が中立な立場で「あなたに合った供養」をご提案。改葬や墓じまいもワンストップサポート。《相談無料》",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "清蓮（Seiren）- お墓探しナビ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "お墓探しナビ | 清蓮（Seiren）",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "hFeAEOVFWvv-7Cp5dnkeWkMV8qmkOKzWr8vySu-inYQ",
    other: {
      "msvalidate.01": "2e9d1723aa044132b6a533609eaec28b",
    },
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ohakanavi.jp";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const organizationLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "清蓮（Seiren）",
      "alternateName": "お墓探しナビ",
      "url": BASE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/icon.png`,
      },
      "description": "墓地・永代供養・樹木葬・納骨堂の検索・比較サービス。専門家が中立な立場でご提案。改葬・墓じまいもサポート。",
      "telephone": "0800-888-8788",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "0800-888-8788",
        "contactType": "customer service",
        "availableLanguage": "Japanese",
        "areaServed": "JP",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "18:00",
        },
      },
      "sameAs": [],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      "url": BASE_URL,
      "name": "清蓮（Seiren）| お墓探しナビ",
      "description": "墓地・永代供養・樹木葬・納骨堂の検索・比較なら清蓮。",
      "publisher": { "@id": `${BASE_URL}/#organization` },
      "inLanguage": "ja",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${shipporiMincho.variable} antialiased font-sans bg-bg text-text`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <DeferredAnalytics gaId={GA_ID} clarityId={CLARITY_ID} />
        <SkipToMainLink />
        {children}
        <FixedCTA />
      </body>
    </html>
  );
}
