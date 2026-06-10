import { Suspense } from "react";
import Link from "next/link";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { SearchFilter } from "../components/features/search/SearchFilter";
import { GraveyardCard } from "../components/features/search/GraveyardCard";
import { FacilityType, MemorialType, Sect, BuddhistSect, Temple } from "@/lib/store";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

function isPrismaConnectivityError(error: unknown): boolean {
    const message = error instanceof Error ? error.message : "";

    return (
        (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            (error as { code?: string }).code === "P1001"
        ) ||
        message.includes("ENOTFOUND") ||
        message.includes("Can't reach database")
    );
}

// M-5: ファセット（絞り込みパラメータ）付きURLは noindex,follow にして
// クロールバジェット消費と重複インデックスを防ぐ。canonical は常に /search。
export async function generateMetadata(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
    const searchParams = await props.searchParams;
    const hasFilterParams = Object.keys(searchParams).length > 0;

    return {
        title: "墓地・霊園をさがす｜清蓮(Seiren)",
        description: "条件に合わせて最適な墓地・永代供養墓・樹木葬を検索できます。",
        alternates: { canonical: "https://www.ohakanavi.jp/search" },
        robots: hasFilterParams
            ? { index: false, follow: true }
            : { index: true, follow: true },
    };
}

export default async function SearchPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchParams = await props.searchParams;

    // Parse Query Params
    const prefs = makeArray(searchParams.pref);
    const types = makeArray(searchParams.type) as FacilityType[];
    const memorials = makeArray(searchParams.memorial) as MemorialType[];
    const sects = makeArray(searchParams.sect) as Sect[]; // Accepted Sects
    const buddhistSects = makeArray(searchParams.buddhistSect) as BuddhistSect[]; // Main Temple Sects
    const features = makeArray(searchParams.feature);
    const priceMax = searchParams.priceMax ? Number(searchParams.priceMax) : undefined;

    // Get Data from Prisma
    // In a real app with many records, we would build a dynamic 'where' clause for Prisma.
    // For MVP, we fetch all public/listed temples and filter in memory as before.
    let allTemplesData: unknown[] = [];
    let dataUnavailable = false;
    try {
        allTemplesData = await prisma.temple.findMany({
            where: {
                status: 'public',
                listedInSearch: true
            },
            select: {
                id: true,
                name: true,
                type: true,
                religion: true,
                buddhistSect: true,
                prefecture: true,
                cityName: true,
                addressLine: true,
                address: true,
                access: true,
                parkingAvailable: true,
                barrierFree: true,
                petAllowed: true,
                sects: true,
                supportedMemorialTypes: true,
                nearestStations: true,
                priceAggMin: true,
                status: true,
                listedInSearch: true,
                planType: true,
                isPrSlot: true,
                tags: true,
                mainImage: true
            }
        });
    } catch (error) {
        const reason = isPrismaConnectivityError(error) ? "database_unavailable" : "query_failed";
        console.error(`[SearchPage] Temple query failed; reason=${reason}; showing unavailable state`);
        dataUnavailable = true;
        allTemplesData = [];
    }
    const allTemples = allTemplesData as unknown as Temple[];

    const filteredGraveyards = allTemples.filter(t => {

        // 2. Prefecture Match
        if (prefs.length > 0 && !prefs.includes(t.prefecture)) return false;

        // 3. Facility Type Match
        if (types.length > 0 && !types.includes(t.type)) return false;

        // 4. Memorial Type Match (Check if *any* of the selected types are supported)
        if (memorials.length > 0) {
            const hasMatch = memorials.some(m => t.supportedMemorialTypes.includes(m));
            if (!hasMatch) return false;
        }

        // 5. Accepted Sect Match (Supported Sects)
        if (sects.length > 0) {
            const hasMatch = sects.some(s => t.sects.includes(s));
            if (!hasMatch) return false;
        }

        // 5.5 Main Temple Sect Match
        if (buddhistSects.length > 0) {
            // If temple doesn't have a sect (e.g. non-buddhist), it won't match any selected sect
            if (!t.buddhistSect) return false;
            // Check if Temple's MAIN sect matches one of the selected filter sects
            if (!buddhistSects.includes(t.buddhistSect)) return false;
        }

        // 6. Price Match (using priceAggMin from Plans)
        if (priceMax !== undefined) {
            // If the temple's minimum price is higher than the user's max budget, exclude it.
            // If priceAggMin is undefined, we assume it matches (or handle as 'ask') unless we want strict filtering.
            if (t.priceAggMin && t.priceAggMin > priceMax) return false;
        }

        // 7. Features (AND Logic)
        if (features.length > 0) {
            for (const f of features) {
                if (f === 'petAllowed' && t.petAllowed !== 'allowed') return false;
                if (f === 'barrierFree' && !t.barrierFree) return false;
                if (f === 'parking' && !t.parkingAvailable) return false;
                if (f === 'station') {
                    // Check if any station is <= 10 min
                    const isNear = Array.isArray(t.nearestStations) && t.nearestStations.some(s => s.walkMinutes <= 10);
                    if (!isNear) return false;
                }
                if (f === 'religiousFree' && t.religion !== 'unknown') {
                    // 'religiousFree' usually means 'religion: unknown' OR 'sects' includes '無宗派' 
                    // But in strict sense, if religion is set to Buddhism, it might still accept others.
                    // For now, check if accepts '無宗派'
                    if (!t.sects.includes('無宗派') && t.religion !== 'other') return false;
                }
            }
        }

        return true;
    });

    // Display Label Mapping for URL params
    const typeLabels: Record<string, string> = {
        'general': '一般墓',
        'eitai': '永代供養墓',
        'tree': '樹木葬',
        'jumokusou': '樹木葬',
        'nokotsu': '納骨堂',
        'noukotsudou': '納骨堂',
        // Fallbacks for direct Japanese inputs
        '一般墓': '一般墓',
        '永代供養墓': '永代供養墓',
        '樹木葬': '樹木葬',
        '納骨堂': '納骨堂'
    };

    // Sort by plan tier: PR slot → standard → free
    const planOrder = (t: Temple) => (t.isPrSlot ? 0 : t.planType === 'sponsor' ? 0 : t.planType === 'standard' ? 1 : 2);
    filteredGraveyards.sort((a, b) => planOrder(a) - planOrder(b));

    // Dynamic Title Generation
    let pageTitle = "検索結果";
    if (prefs.length === 1) {
        pageTitle = `${prefs[0]}の霊園・墓地`;
        if (types.length > 0) {
            const label = typeLabels[types[0]] || types[0];
            pageTitle = `${prefs[0]}の${label}`;
        }
    } else if (prefs.length > 1) {
        pageTitle = "指定エリアの霊園・墓地";
    } else if (types.length > 0) {
        const label = typeLabels[types[0]] || types[0];
        pageTitle = `${label}一覧`;
    }

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke">
            <Navbar />

            <main id="main-content" className="grow pt-20 pb-20 md:pt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <Breadcrumb />
                    </div>

                    <div className="mb-6 rounded-xl border border-primary/15 bg-white px-4 py-5 shadow-sm md:px-6">
                        <p className="mb-2 text-xs font-bold tracking-[0.18em] text-primary/70 uppercase">
                            Search
                        </p>
                        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="font-serif text-2xl font-bold text-primary md:text-3xl">
                                    {pageTitle}
                                </h1>
                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    エリア・供養形態・こだわり条件から、ご希望に合う霊園を絞り込めます。
                                </p>
                            </div>
                            <div className="rounded-lg bg-primary/5 px-4 py-3 text-left md:text-right">
                                <span className="block text-xs font-bold text-gray-500">検索結果</span>
                                <span className="text-2xl font-bold text-primary">{filteredGraveyards.length}</span>
                                <span className="ml-1 text-sm text-gray-600">件</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                        {/* Sidebar (Filter) */}
                        <aside className="w-full lg:w-1/4">
                            {/* We don't pass initialPref anymore as SearchFilter reads URL */}
                            <Suspense fallback={<div className="w-full h-96 bg-gray-100 animate-pulse rounded-lg" />}>
                                <SearchFilter />
                            </Suspense>
                        </aside>

                        {/* Main Content (Results) */}
                        <div className="w-full lg:w-3/4">
                            {/* Consult Banner */}
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <h3 className="text-primary-dark font-bold text-lg mb-1">条件が決まらない・迷っている方へ</h3>
                                    <p className="text-sm text-gray-600">専門スタッフがご希望に合わせて最適な墓地・霊園をご提案します。</p>
                                </div>
                                <Link href="/consult/grave-search" className="inline-flex h-11 w-full shrink-0 items-center justify-center rounded-md bg-primary px-6 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary-dark sm:w-auto">
                                    無料で相談する
                                </Link>
                            </div>

                            <div className="grid gap-6">
                                {dataUnavailable ? (
                                    <div className="p-8 text-center bg-white rounded-xl border border-primary/10 flex flex-col items-center justify-center gap-3 md:p-12">
                                        <div className="text-primary font-bold">検索データを取得できませんでした。</div>
                                        <p className="max-w-md text-sm leading-6 text-gray-500">
                                            時間をおいて再度お試しいただくか、条件を添えて無料相談をご利用ください。
                                        </p>
                                        <Link href="/consult/grave-search" className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-bold text-white hover:bg-primary-dark">
                                            無料相談へ進む
                                        </Link>
                                    </div>
                                ) : filteredGraveyards.length > 0 ? (
                                    filteredGraveyards.map((temple) => (
                                        <GraveyardCard key={temple.id} data={temple} />
                                    ))
                                ) : (
                                    <div className="p-8 text-center bg-white rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-4 md:p-12">
                                        <div className="text-gray-500 font-bold">条件に一致する霊園・墓地は見つかりませんでした。</div>
                                        <p className="text-sm text-gray-400">条件を緩めて再検索するか、個別にご相談ください。</p>
                                        <Link href="/consult/grave-search" className="inline-flex h-11 items-center justify-center rounded-md border border-primary px-5 text-sm font-bold text-primary hover:bg-primary/5">
                                            無料相談はこちら
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

// Helper to normalized search params to array
function makeArray(val: string | string[] | undefined): string[] {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return [val];
}
