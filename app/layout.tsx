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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://seiren-ohaka-navi.vercel.app"),
  title: {
    default: "清蓮（Seiren）| お墓探しナビ",
    template: "%s | 清蓮",
  },
  description: "墓地、永代供養、樹木葵、納骨堂の検索・比較なら清蓮。専門家が中立な立場で「あなたに合った供養」をご提案。改葬や墓じまいもワンストップサポート。《相談無料》",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "清蓮（Seiren）- お墓探しナビ",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seiren-ohaka-navi.vercel.app";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "清蓮（Seiren）",
  "url": BASE_URL,
  "logo": `${BASE_URL}/icon.png`,
  "description": "墓地・永代供養・樹木葬・納骨堂の検索・比較サービス。専門家が中立な立場でご提案。改葬・墓じまいもサポート。",
  "sameAs": [],
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
        {children}
      </body>
    </html>
  );
}
