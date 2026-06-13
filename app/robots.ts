import { MetadataRoute } from "next";

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.ohakanavi.jp";

export default function robots(): MetadataRoute.Robots {
    // 非公開領域（named UA グループは "*" の disallow を継承しないため各UAに明示）
    const disallow = ["/admin", "/api/", "/portal/"];

    return {
        rules: [
            // 一般クローラー
            {
                userAgent: "*",
                allow: "/",
                disallow,
            },
            // AI クローラー（コンテンツは許可しつつ非公開領域は除外）
            { userAgent: "GPTBot", allow: "/", disallow },
            { userAgent: "ChatGPT-User", allow: "/", disallow },
            { userAgent: "ClaudeBot", allow: "/", disallow },
            { userAgent: "anthropic-ai", allow: "/", disallow },
            { userAgent: "Googlebot-Extended", allow: "/", disallow },
            { userAgent: "PerplexityBot", allow: "/", disallow },
            { userAgent: "cohere-ai", allow: "/", disallow },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}
