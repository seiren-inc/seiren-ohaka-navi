import { MetadataRoute } from "next";

const BASE_URL = "https://ohakanavi.jp";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin/",
                    "/api/",
                    "/partner/",
                    // 検索・フィルター用URLはnoindex相当（インデックスはさせない）
                    "/search?*",
                ],
            },
        ],
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
