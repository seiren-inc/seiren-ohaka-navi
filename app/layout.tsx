import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
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

const BASE_URL = "https://ohakanavi.jp";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "お墓探しナビ｜清蓮（Seiren）",
    template: "%s｜お墓探しナビ",
  },
  description: "墓地、永代供養、樹木葬、納骨堂の検索・比較なら清蓮。専門家が中立な立場で「あなたに合った供養」をご提案。改葬や墓じまいもワンストップサポート。【相談無料】",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "お墓探しナビ｜清蓮",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "お墓探しナビ｜清蓮",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${BASE_URL}/og-image.jpg`],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

// Organization JSON-LD（全ページ共通）
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "株式会社清蓮",
  alternateName: "Seiren Co., Ltd.",
  url: BASE_URL,
  logo: `${BASE_URL}/seiren-logo-v2.png`,
  description: "墓地・永代供養・樹木葬・納骨堂の検索・比較ポータルサービス「お墓探しナビ」を運営。改葬・墓じまいのサポートも行う。",
  address: {
    "@type": "PostalAddress",
    streetAddress: "芝公園4-7-35",
    addressLocality: "港区",
    addressRegion: "東京都",
    postalCode: "105-0011",
    addressCountry: "JP",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "Japanese",
  },
  sameAs: [
    "https://ohakajimai-navi.jp/",
  ],
};

// WebSite JSON-LD（サイト全体のサイト内検索も対応）
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "お墓探しナビ｜清蓮",
  url: BASE_URL,
  description: "墓地・永代供養・樹木葬・納骨堂を全国から検索・比較。専門家が中立な立場でご提案します。",
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${notoSansJP.variable} ${shipporiMincho.variable} antialiased font-sans bg-bg text-text`}
      >
        {children}
      </body>
    </html>
  );
}
