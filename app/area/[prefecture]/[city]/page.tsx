import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "../../../components/layout/Navbar";
import { Footer } from "../../../components/layout/Footer";
import { AreaHero } from "../../../components/features/area/AreaHero";
import { AreaFilter } from "../../../components/features/area/AreaFilter";
import { AreaTempleList } from "../../../components/features/area/AreaTempleList";
import { AreaNav } from "../../../components/features/area/AreaNav";
import { AreaSEOContent } from "../../../components/features/area/AreaSEOContent";
import { AreaFAQ } from "../../../components/features/area/AreaFAQ";
import { JsonLd } from "../../../components/seo/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ohakanavi.jp";

function isPrismaConnectivityError(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "P1001"
    );
}

export async function generateMetadata(
    props: { params: Promise<{ prefecture: string; city: string }> }
): Promise<Metadata> {
    const { prefecture, city } = await props.params;
    const decodedCity = decodeURIComponent(city);
    const decodedPref = decodeURIComponent(prefecture);
    return {
        title: `${decodedCity}（${decodedPref}）の墓地・永代供養を探す | 清蓮`,
        description: `${decodedCity}（${decodedPref}）の墓地・永代供養・樹木葬・納骨堂の一覧。地域密着の専門スタッフが無料サポート。宗旨宗派不問・生前購入対応施設も掲載。`,
        alternates: { canonical: `${BASE_URL}/area/${prefecture}/${city}` },
        openGraph: {
            title: `${decodedCity}（${decodedPref}）の墓地・永代供養 | 清蓮`,
            description: `${decodedCity}（${decodedPref}）の墓地・永代供養・樹木葬・納骨堂の一覧。無料相談受付中。`,
            url: `${BASE_URL}/area/${prefecture}/${city}`,
        },
    };
}

export default async function CityPage(props: { params: Promise<{ prefecture: string; city: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const decodedPrefecture = decodeURIComponent(params.prefecture);
    const decodedCity = decodeURIComponent(params.city);

    // Get count for Hero
    let count = 0;
    try {
        count = await prisma.temple.count({
            where: {
                prefecture: decodedPrefecture,
                cityName: decodedCity,
                status: 'public'
            }
        });
    } catch (error) {

        if (isPrismaConnectivityError(error)) {
            console.error("[CityPage] Prisma connectivity error; falling back to count=0", error);
            count = 0;
        } else {
            throw error;
        }
    }

    // If no temples in city, maybe 404? Or just show empty list? 
    // Request says "Modal only shows cities with temples", so theoretically user shouldn't land here if empty unless direct URL.
    // We'll render empty list state.

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": `${decodedPrefecture}の墓地・霊園`, "item": `${BASE_URL}/area/${params.prefecture}` },
            { "@type": "ListItem", "position": 3, "name": `${decodedCity}の墓地・霊園`, "item": `${BASE_URL}/area/${params.prefecture}/${params.city}` },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke">
            <JsonLd data={breadcrumbLd} />
            <Navbar />

            <main id="main-content" className="grow pt-20">
                <AreaHero
                    prefecture={decodedPrefecture}
                    city={decodedCity}
                    count={count}
                />

                <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Filter */}
                        <aside className="w-full md:w-64 shrink-0">
                            <div className="sticky top-24">
                                <AreaFilter />
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                            <AreaTempleList
                                prefecture={decodedPrefecture}
                                city={decodedCity}
                                searchParams={searchParams}
                            />
                        </div>
                    </div>
                </div>

                <AreaSEOContent prefecture={decodedPrefecture} city={decodedCity} count={count} />
                <AreaFAQ prefecture={decodedPrefecture} city={decodedCity} />

                <AreaNav prefecture={decodedPrefecture} />
            </main>

            <Footer />
        </div>
    );
}
