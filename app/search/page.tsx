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

export const metadata: Metadata = {
    title: "墓地・霊園をさがす｜清蓮(Seiren)",
    description: "条件に合わせて最適な墓地・永代供養墓・樹木葬を検索できます。",
    alternates: { canonical: "https://www.ohakanavi.jp/search" },
    robots: { index: false },
};

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
    const allTemplesData = await prisma.temple.findMany({
        where: {
            status: 'public',
            listedInSearch: true
        }
    });
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
                if (f === 'petAllowed' && t.petAllowed === 'notAllowed') return false;
                if (f === 'barrierFree' && !t.barrierFree) return false;
                if (f === 'parking' && !t.parkingAvailable) return false;
                if (f === 'station') {
                    // Check if any station is <= 10 min
                    const isNear = t.nearestStations.some(s => s.walkMinutes <= 10);
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

    // Sort by plan tier: PR slot → standard → free
    const planOrder = (t: Temple) => (t.isPrSlot ? 0 : t.planType === 'sponsor' ? 0 : t.planType === 'standard' ? 1 : 2);
    filteredGraveyards.sort((a, b) => planOrder(a) - planOrder(b));

    // Dynamic Title Generation
    let pageTitle = "検索結果";
    if (prefs.length === 1) pageTitle = `${prefs[0]}の霊園・墓地`;
    else if (prefs.length > 1) pageTitle = "指定エリアの霊園・墓地";
    else if (types.length > 0) pageTitle = `${types[0]}などの霊園`;

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke">
            <Navbar />

            <main className="grow pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <Breadcrumb />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
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
                            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-primary-dark font-bold text-lg mb-1">条件が決まらない・迷っている方へ</h3>
                                    <p className="text-sm text-gray-600">専門スタッフがご希望に合わせて最適な墓地・霊園をご提案します。</p>
                                </div>
                                <Link href="/consult/grave-search" className="shrink-0 px-6 py-2 bg-primary text-white rounded-md font-bold text-sm hover:bg-primary-dark transition-colors shadow-sm">
                                    無料で相談する
                                </Link>
                            </div>

                            <div className="flex justify-between items-center mb-6">
                                <h1 className="font-serif text-2xl font-bold text-primary">
                                    {pageTitle}
                                </h1>
                                <span className="text-gray-500 text-sm">
                                    <span className="font-bold text-lg text-primary">{filteredGraveyards.length}</span> 件 ヒット
                                </span>
                            </div>

                            <div className="grid gap-6">
                                {filteredGraveyards.length > 0 ? (
                                    filteredGraveyards.map((temple) => (
                                        <GraveyardCard key={temple.id} data={temple} />
                                    ))
                                ) : (
                                    <div className="p-12 text-center bg-white rounded-xl border border-gray-100 flex flex-col items-center justify-center gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-2xl">?</div>
                                        <div className="text-gray-500 font-bold">条件に一致する霊園・墓地は見つかりませんでした。</div>
                                        <p className="text-sm text-gray-400">条件を緩めて再検索するか、個別にご相談ください。</p>
                                        <Link href="/consult" className="text-primary underline text-sm hover:text-primary">無料相談はこちら</Link>
                                    </div>
                                )}
                            </div>

                            {/* Pagination (Visual only for now) */}
                            {filteredGraveyards.length > 10 && (
                                <div className="mt-12 flex justify-center gap-2">
                                    <button className="w-10 h-10 flex items-center justify-center rounded bg-primary text-white font-bold">1</button>
                                </div>
                            )}
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
