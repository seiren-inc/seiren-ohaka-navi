/**
 * Author JSON-LD コンポーネント（E-E-A-T強化）
 * 記事の著者・監修者情報をGoogleに伝え、コンテンツの専門性・権威性を示す。
 */

interface AuthorJsonLdProps {
  pageUrl: string
  headline: string
  description: string
  datePublished?: string
  dateModified?: string
}

export function AuthorJsonLd({
  pageUrl,
  headline,
  description,
  datePublished = "2024-10-01",
  dateModified,
}: AuthorJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: pageUrl,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: "清蓮（Seiren）",
      url: "https://ohakanavi.jp",
    },
    publisher: {
      "@type": "Organization",
      name: "清蓮（Seiren）",
      url: "https://ohakanavi.jp",
      logo: "https://ohakanavi.jp/icon.png",
    },
    reviewedBy: {
      "@type": "Person",
      name: "眞如 理恵",
      jobTitle: "代表取締役",
      worksFor: {
        "@type": "Organization",
        name: "株式会社清蓮",
      },
    },
    inLanguage: "ja-JP",
    isPartOf: {
      "@type": "WebSite",
      name: "清蓮 お墓探しナビ",
      url: "https://ohakanavi.jp",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
