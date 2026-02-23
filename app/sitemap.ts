import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ohakanavi.jp";

// 市区町村（神奈川）の供養タイプ別URLのクエリパラメータ
const MEMORIAL_TYPES = [
    { type: "jumokusou", label: "樹木葬" },
    { type: "eitai", label: "永代供養" },
    { type: "noukotsudou", label: "納骨堂" },
];

// 静的に決まったコンテンツページ（noindexでない全ページ）
const STATIC_PAGES: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/choices`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/choices/eitai-kuyou`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/choices/jumokusou`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/choices/noukotsudou`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/choices/temoto-kuyou`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/choices/sankotsu`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/choices/ikotsu-diamond`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/choices/diagnosis`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/guide`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/guide/eitai-kuyou`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/guide/jumokusou`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/guide/noukotsudou`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/guide/grave-basics`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/guide/grave-closure`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/guide/flow-after-death`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/consult/grave-search`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/consult/request-material`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/consult/ikotsu-service`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/consult`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/about/company`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/about/partner`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/about/strength`, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // ----- 1. 施設詳細ページ -----
    let facilityPages: MetadataRoute.Sitemap = [];
    try {
        const temples = await prisma.temple.findMany({
            select: { id: true, updatedAt: true },
        });
        facilityPages = temples.map((t) => ({
            url: `${SITE_URL}/detail/${t.id}`,
            lastModified: t.updatedAt ?? now,
            changeFrequency: "weekly" as const,
            priority: 0.6,
        }));
    } catch {
        // DB接続失敗時は空でフォールバック（ビルドを止めない）
        console.warn("[sitemap] Prisma fetch failed, skipping facility pages.");
    }

    // ----- 2. 市区町村ページ（神奈川制圧構造） -----
    let areaPages: MetadataRoute.Sitemap = [];
    try {
        const cityRows = await prisma.temple.findMany({
            select: { prefecture: true, cityName: true },
            distinct: ["prefecture", "cityName"],
        });

        for (const row of cityRows) {
            if (!row.prefecture || !row.cityName) continue;
            const prefEnc = encodeURIComponent(row.prefecture);
            const cityEnc = encodeURIComponent(row.cityName);
            const baseUrl = `${SITE_URL}/area/${prefEnc}/${cityEnc}`;

            // 市区町村トップ
            areaPages.push({
                url: baseUrl,
                lastModified: now,
                changeFrequency: "weekly" as const,
                priority: 0.8,
            });

            // 供養タイプ別（神奈川のみ優先、他都道府県も含む）
            for (const { type } of MEMORIAL_TYPES) {
                areaPages.push({
                    url: `${baseUrl}?type=${type}`,
                    lastModified: now,
                    changeFrequency: "weekly" as const,
                    priority: row.prefecture === "神奈川県" ? 0.8 : 0.7,
                });
            }
        }

        // 都道府県トップ（例: /area/神奈川県）
        const prefRows = await prisma.temple.findMany({
            select: { prefecture: true },
            distinct: ["prefecture"],
        });
        for (const row of prefRows) {
            if (!row.prefecture) continue;
            areaPages.push({
                url: `${SITE_URL}/area/${encodeURIComponent(row.prefecture)}`,
                lastModified: now,
                changeFrequency: "weekly" as const,
                priority: row.prefecture === "神奈川県" ? 0.9 : 0.7,
            });
        }
    } catch {
        console.warn("[sitemap] Prisma fetch failed, skipping area pages.");
    }

    return [
        ...STATIC_PAGES.map((p) => ({ ...p, lastModified: now })),
        ...areaPages,
        ...facilityPages,
    ];
}
