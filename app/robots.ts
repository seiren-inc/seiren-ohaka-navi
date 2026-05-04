import { MetadataRoute } from "next";

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.ohakanavi.jp";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            // 一般クローラー
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/api/", "/portal/"],
            },
            // AI クローラー（明示的に allow）
            { userAgent: "GPTBot", allow: "/" },
            { userAgent: "ChatGPT-User", allow: "/" },
            { userAgent: "ClaudeBot", allow: "/" },
            { userAgent: "anthropic-ai", allow: "/" },
            { userAgent: "Googlebot-Extended", allow: "/" },
            { userAgent: "PerplexityBot", allow: "/" },
            { userAgent: "cohere-ai", allow: "/" },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    };
}
