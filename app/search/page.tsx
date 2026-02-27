import { Suspense } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { SearchFilter } from "../components/features/search/SearchFilter";
import { GraveyardCard } from "../components/features/search/GraveyardCard";
import { Store, FacilityType, MemorialType, Sect, BuddhistSect } from "@/lib/store";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "墓地・霊園をさがす｜清蓮(Seiren)",
    description: "条件に合わせて最適な墓地・永代供養墓・樹木葬を検索できます。",
};

export default async function SearchPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const searchParams = await props.searchParams;

    // Parse Query Params
    const prefs = makeArray(searchParams.pref);
    const types = makeArray(searchParams.type) as FacilityType[];
    const memorials = makeArray(searchParams.memorial) as MemorialType[];
    const sects = makeArray(searchParams.sect) as Sect[];
    const buddhistSects = makeArray(searchParams.buddhistSect) as BuddhistSect[];
    const features = makeArray(searchParams.feature);
    const priceMax = searchParams.priceMax ? Number(searchParams.priceMax) : undefined;

    const allTemples = Store.getTemples();

    const filteredGraveyards = allTemples.filter(t => {
        if (t.status !== 'public' || !t.listedInSearch) return false;
        if (prefs.length > 0 && !prefs.includes(t.prefecture)) return false;
        if (types.length > 0 && !types.includes(t.type)) return false;
        if (memorials.length > 0) {
            const hasMatch = memorials.some(m => t.supportedMemorialTypes.includes(m));
            if (!hasMatch) return false;
        }
        if (sects.length > 0) {
            const hasMatch = sects.some(s => t.sects.includes(s));
            if (!hasMatch) return false;
        }
        if (buddhistSects.length > 0) {
            if (!t.buddhistSect) return false;
            if (!buddhistSects.includes(t.buddhistSect)) return false;
        }
        if (priceMax !== undefined) {
            if (t.priceAggMin && t.priceAggMin > priceMax) return false;
        }
        if (features.length > 0) {
            for (const f of features) {
                if (f === 'petAllowed' && t.petAllowed === 'notAllowed') return false;
                if (f === 'barrierFree' && !t.barrierFree) return false;
                if (f === 'parking' && !t.parkingAvailable) return false;
                if (f === 'station') {
                    const isNear = t.nearestStations.some(s => s.walkMinutes <= 10);
                    if (!isNear) return false;
                }
                if (f === 'religiousFree' && t.religion !== 'unknown') {
                    if (!t.sects.includes('無宗派') && t.religion !== 'other') return false;
                }
            }
        }
        return true;
    });

    let pageTitle = "検索結果";
    if (prefs.length === 1) pageTitle = `${prefs[0]}の霊園・墓地`;
    else if (prefs.length > 1) pageTitle = "指定エリアの霊園・墓地";
    else if (types.length > 0) pageTitle = `${types[0]}などの霊園`;

    return (
        <div className="min-h-screen flex flex-col bg-bg">
            <Navbar />

            <main className="flex-grow pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-[--content-px]">

                    {/* Breadcrumb */}
                    <div className="text-xs text-text-muted mb-8 flex gap-2 tracking-wide">
                        <span>TOP</span> <span>&gt;</span> <span>墓地をさがす</span>
                        {prefs.length > 0 && <span>&gt; エリア指定あり</span>}
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Sidebar (Filter) */}
                        <aside className="w-full lg:w-1/4">
                            <Suspense fallback={<div className="w-full h-96 bg-surface animate-pulse rounded-[--radius-lg]" />}>
                                <SearchFilter />
                            </Suspense>
                        </aside>

                        {/* Main Content (Results) */}
                        <div className="w-full lg:w-3/4">
                            {/* Consult Banner */}
                            <div className="bg-surface border border-border rounded-[--radius-lg] p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div>
                                    <h3 className="text-primary-dark font-medium text-base mb-1">条件が決まらない・迷っている方へ</h3>
                                    <p className="text-sm text-text-muted">専門スタッフがご希望に合わせて最適な墓地・霊園をご提案します。</p>
                                </div>
                                <a href="/consult/grave-search" className="shrink-0 px-6 py-2.5 bg-primary text-white rounded-[--radius-md] text-sm hover:bg-primary-dark transition-colors">
                                    無料で相談する
                                </a>
                            </div>

                            <div className="flex justify-between items-center mb-8">
                                <h1 className="font-serif text-2xl text-primary-dark">
                                    {pageTitle}
                                </h1>
                                <span className="text-text-muted text-sm">
                                    <span className="font-medium text-lg text-primary-dark">{filteredGraveyards.length}</span> 件
                                </span>
                            </div>

                            <div className="grid gap-6">
                                {filteredGraveyards.length > 0 ? (
                                    filteredGraveyards.map((temple) => (
                                        <GraveyardCard key={temple.id} data={temple as any} />
                                    ))
                                ) : (
                                    <div className="py-16 text-center bg-white rounded-[--radius-lg] border border-border flex flex-col items-center justify-center gap-4">
                                        <div className="w-16 h-16 bg-bg rounded-full flex items-center justify-center text-text-muted text-2xl">?</div>
                                        <div className="text-text-secondary font-medium">条件に一致する霊園・墓地は見つかりませんでした。</div>
                                        <p className="text-sm text-text-muted">条件を緩めて再検索するか、個別にご相談ください。</p>
                                        <a href="/consult" className="text-primary text-sm hover:text-primary-dark transition-colors">無料相談はこちら →</a>
                                    </div>
                                )}
                            </div>

                            {/* Pagination */}
                            {filteredGraveyards.length > 10 && (
                                <div className="mt-14 flex justify-center gap-2">
                                    <button className="w-10 h-10 flex items-center justify-center rounded-[--radius-md] bg-primary text-white text-sm font-medium">1</button>
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

function makeArray(val: string | string[] | undefined): string[] {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return [val];
}
