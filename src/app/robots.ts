import { MetadataRoute } from "next";

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.ohakanavi.jp";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/api/"],
            },
            // AI検索エンジン — GEO/AEO対応
            { userAgent: "GPTBot",          allow: "/" },
            { userAgent: "PerplexityBot",   allow: "/" },
            { userAgent: "ClaudeBot",       allow: "/" },
            { userAgent: "Google-Extended", allow: "/" },
            { userAgent: "Bingbot",         allow: "/" },
            { userAgent: "Applebot",        allow: "/" },
            { userAgent: "FacebookBot",     allow: "/" },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
