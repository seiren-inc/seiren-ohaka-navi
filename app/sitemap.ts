import { MetadataRoute } from "next";

const BASE_URL = "https://ohakanavi.jp";

// 静的ページ一覧
const staticPages: MetadataRoute.Sitemap = [
    {
        url: BASE_URL,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
    },
    {
        url: `${BASE_URL}/search`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
    },
    {
        url: `${BASE_URL}/kaisou`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        url: `${BASE_URL}/guide`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        url: `${BASE_URL}/guide/grave-basics`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        url: `${BASE_URL}/guide/eitai-kuyou`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        url: `${BASE_URL}/guide/jumokusou`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        url: `${BASE_URL}/guide/noukotsudou`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        url: `${BASE_URL}/guide/flow-after-death`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        url: `${BASE_URL}/guide/grave-closure`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        url: `${BASE_URL}/choices`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        url: `${BASE_URL}/choices/eitai-kuyou`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
    },
    {
        url: `${BASE_URL}/choices/jumokusou`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
    },
    {
        url: `${BASE_URL}/choices/noukotsudou`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
    },
    {
        url: `${BASE_URL}/choices/sankotsu`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
    },
    {
        url: `${BASE_URL}/choices/temoto-kuyou`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
    },
    {
        url: `${BASE_URL}/choices/ikotsu-diamond`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
    },
    {
        url: `${BASE_URL}/choices/diagnosis`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        url: `${BASE_URL}/consult`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        url: `${BASE_URL}/consult/grave-search`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        url: `${BASE_URL}/consult/grave-closure`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
    },
    {
        url: `${BASE_URL}/consult/ikotsu-service`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        url: `${BASE_URL}/consult/request-material`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
    },
    {
        url: `${BASE_URL}/about/company`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.5,
    },
    {
        url: `${BASE_URL}/about/strength`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.5,
    },
    {
        url: `${BASE_URL}/privacy`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
    },
    {
        url: `${BASE_URL}/terms`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 0.3,
    },
];

export default function sitemap(): MetadataRoute.Sitemap {
    return staticPages;
}
