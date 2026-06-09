import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { AreaHero } from "../../components/features/area/AreaHero";
import { AreaFilter } from "../../components/features/area/AreaFilter";
import { AreaTempleList } from "../../components/features/area/AreaTempleList";
import { AreaNav } from "../../components/features/area/AreaNav";
import { AreaSEOContent } from "../../components/features/area/AreaSEOContent";
import { AreaFAQ } from "../../components/features/area/AreaFAQ";
import { JsonLd } from "../../components/seo/JsonLd";
import { PREFECTURES } from "../../lib/prefectures";

const BASE_URL = "https://www.ohakanavi.jp";

function isPrismaConnectivityError(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "P1001"
    );
}

export async function generateMetadata(
    props: { params: Promise<{ prefecture: string }> }
): Promise<Metadata> {
    const { prefecture } = await props.params;
    const decoded = decodeURIComponent(prefecture);
    return {
        title: `${decoded}の墓地・霊園・永代供養を探す`,
        description: `${decoded}の墓地・永代供養・樹木葬・納骨堂一覧。地域に密着した専門スタッフが無料サポート。`,
        alternates: { canonical: `${BASE_URL}/area/${prefecture}` },
        openGraph: {
            title: `${decoded}の墓地・霊園・永代供養 | 清蓮`,
            description: `${decoded}の墓地・永代供養・樹木葬・納骨堂の一覧。無料相談受付中。`,
            url: `${BASE_URL}/area/${prefecture}`,
        },
    };
}

export async function generateStaticParams() {
    const allPrefectures = PREFECTURES.flatMap((r) => r.items);
    return allPrefectures.map((pref) => ({ prefecture: encodeURIComponent(pref) }));
}

export default async function AreaPage(props: { params: Promise<{ prefecture: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const decodedPrefecture = decodeURIComponent(params.prefecture);

    // Validate Prefecture? For now, if no temples found, the list component handles "No results".
    // But we might want basic validation. 
    // Ideally check against a list of valid prefectures. 
    // Assuming simple passthrough for MVP.

    // Get count for Hero (Only public)
    let count = 0;
    try {
        count = await prisma.temple.count({
            where: {
                prefecture: decodedPrefecture,
                status: 'public'
            }
        });
    } catch (error) {

        if (isPrismaConnectivityError(error)) {
            console.error("[AreaPage] Prisma connectivity error; falling back to count=0", error);
            count = 0;
        } else {
            throw error;
        }
    }

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": `${decodedPrefecture}の墓地・霊園`, "item": `${BASE_URL}/area/${params.prefecture}` },
        ],
    };

    const areaPageLd = {
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        "@id": `${BASE_URL}/area/${params.prefecture}#webpage`,
        "name": `${decodedPrefecture}の墓地・永代供養・樹木葬・納骨堂一覧`,
        "description": `${decodedPrefecture}の墓地・永代供養・樹木葬・納骨堂を検索・比較。清蓮の専門スタッフが無料でサポートします。`,
        "url": `${BASE_URL}/area/${params.prefecture}`,
        "inLanguage": "ja",
        "about": {
            "@type": "Thing",
            "name": `${decodedPrefecture}の墓地・霊園・供養施設`,
        },
        "provider": {
            "@type": "Organization",
            "name": "清蓮（Seiren）",
            "url": BASE_URL,
        },
        "areaServed": {
            "@type": "AdministrativeArea",
            "name": decodedPrefecture,
            "addressCountry": "JP",
        },
    };

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke">
            <JsonLd data={breadcrumbLd} />
            <JsonLd data={areaPageLd} />
            <Navbar />

            <main id="main-content" className="grow pt-20">
                <AreaHero
                    prefecture={decodedPrefecture}
                    count={count}
                />

                <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Filter (Desktop) / Modal Trigger (Mobile inside) */}
                        <aside className="w-full md:w-64 shrink-0">
                            <div className="sticky top-24">
                                <AreaFilter />
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                            <AreaTempleList
                                prefecture={decodedPrefecture}
                                searchParams={searchParams}
                            />
                        </div>
                    </div>
                </div>

                <AreaSEOContent prefecture={decodedPrefecture} count={count} />
                <AreaFAQ prefecture={decodedPrefecture} />
                
                <AreaNav prefecture={decodedPrefecture} />
            </main>

            <Footer />
        </div>
    );
}
