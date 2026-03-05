import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
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
  verification: {
    google: "hFeAEOVFWvv-7Cp5dnkeWkMV8qmkOKzWr8vySu-inYQ",
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ohakanavi.jp";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

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
        {/* Google Analytics 4 */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
        {/* Microsoft Clarity */}
        {CLARITY_ID && (
          <Script id="clarity-init" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `}
          </Script>
        )}
        {children}
      </body>
    </html>
  );
}
