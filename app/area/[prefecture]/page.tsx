import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { AreaHero } from "../../components/features/area/AreaHero";
import { AreaFilter } from "../../components/features/area/AreaFilter";
import { AreaTempleList } from "../../components/features/area/AreaTempleList";
import { AreaNav } from "../../components/features/area/AreaNav";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://seiren-ohaka-navi.vercel.app";

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

// Generate static params for common prefectures if needed, but for now dynamic
// export async function generateStaticParams() { ... }

export default async function AreaPage(props: { params: Promise<{ prefecture: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const decodedPrefecture = decodeURIComponent(params.prefecture);

    // Validate Prefecture? For now, if no temples found, the list component handles "No results".
    // But we might want basic validation. 
    // Ideally check against a list of valid prefectures. 
    // Assuming simple passthrough for MVP.

    // Get count for Hero (Only public)
    const count = await prisma.temple.count({
        where: {
            prefecture: decodedPrefecture,
            status: 'public'
        }
    });

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke">
            <Navbar />

            <main className="flex-grow pt-20">
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

                <AreaNav prefecture={decodedPrefecture} />
            </main>

            <Footer />
        </div>
    );
}
