import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { PREFECTURES } from "./lib/prefectures";

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.ohakanavi.jp";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date();

    // --- Static Pages ---
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
        { url: `${BASE_URL}/search`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
        { url: `${BASE_URL}/choices`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/choices/eitai-kuyou`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/choices/jumokusou`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/choices/noukotsudou`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/choices/general`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/choices/temoto-kuyou`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/choices/ikotsu-diamond`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/choices/sankotsu`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/grave-closure`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/grave-closure/what`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/grave-closure/flow`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/grave-closure/cost`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/grave-closure/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/guide`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/guide/eitai-kuyou`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/guide/jumokusou`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/guide/noukotsudou`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/guide/grave-basics`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/guide/grave-closure`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/kaisou`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/consult`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/consult/grave-search`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/consult/grave-closure`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/consult/ikotsu-service`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
        { url: `${BASE_URL}/about/company`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
        { url: `${BASE_URL}/about/strength`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
        { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ];

    // --- Dynamic: Area (Prefecture) Pages ---
    const allPrefectures = PREFECTURES.flatMap((r) => r.items);
    const areaRoutes: MetadataRoute.Sitemap = allPrefectures.map((pref) => ({
        url: `${BASE_URL}/area/${encodeURIComponent(pref)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
    }));

    // --- Dynamic: Temple Detail Pages ---
    let templeRoutes: MetadataRoute.Sitemap = [];
    try {
        const temples = await prisma.temple.findMany({
            where: { status: "public", listedInSearch: true },
            select: { id: true, updatedAt: true },
        });
        templeRoutes = temples.map((t) => ({
            url: `${BASE_URL}/detail/${t.id}`,
            lastModified: t.updatedAt,
            changeFrequency: "weekly",
            priority: 0.8,
        }));
    } catch (e) {
        console.error("[sitemap] Failed to fetch temples:", e);
    }

    return [...staticRoutes, ...areaRoutes, ...templeRoutes];
}
