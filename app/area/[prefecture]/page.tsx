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

const BASE_URL = "https://ohakanavi.jp";

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
        title: `${decoded}の墓地・鈴園・永代供養を探す | 清蓮`,
        description: `${decoded}の墓地・永代供養・樹木葵・納骨堂一覧。地域に密着した専門スタッフが無料サポート。`,
        alternates: { canonical: `${BASE_URL}/area/${prefecture}` },
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

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke">
            <JsonLd data={breadcrumbLd} />
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
