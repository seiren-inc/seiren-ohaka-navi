import { Store } from "@/lib/store";
import { notFound } from "next/navigation";
import { Navbar } from "../../../components/layout/Navbar";
import { Footer } from "../../../components/layout/Footer";
import { AreaHero } from "../../../components/features/area/AreaHero";
import { AreaFilter } from "../../../components/features/area/AreaFilter";
import { AreaTempleList } from "../../../components/features/area/AreaTempleList";
import { AreaNav } from "../../../components/features/area/AreaNav";
import { Breadcrumbs } from "../../../components/ui/Breadcrumbs";
import { BridgeSection } from "../../../components/ui/BridgeSection";
import { Metadata } from "next";

export async function generateMetadata(
    props: { params: Promise<{ prefecture: string; city: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
): Promise<Metadata> {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const decodedPrefecture = decodeURIComponent(params.prefecture);
    const decodedCity = decodeURIComponent(params.city);

    const typeIds = searchParams.type;
    const isEitaikuyo = typeof typeIds === 'string' && typeIds.includes('eitai');
    const isJyumokusou = typeof typeIds === 'string' && typeIds.includes('jumokusou');
    const isNoukotsudo = typeof typeIds === 'string' && typeIds.includes('noukotsudou');

    const temples = Store.getTemples().filter(t => t.prefecture === decodedPrefecture && t.cityName === decodedCity);
    const count = temples.length;

    if (isJyumokusou) {
        return {
            title: `${decodedCity}の樹木葬ランキング・費用比較｜おすすめ霊園一覧【お墓探しナビ】`,
            description: `${decodedCity}で人気の樹木葬（自然葬）を厳選比較。夫婦や家族で入れる樹木葬、ペット共葬可能、継承者不要で費用が安い霊園の選び方を解説。最新の価格相場とともにご希望の条件に合う樹木葬をご案内します。`,
        };
    } else if (isEitaikuyo) {
        return {
            title: `${decodedCity}の永代供養ランキング・費用比較｜おすすめ霊園一覧【お墓探しナビ】`,
            description: `${decodedCity}で人気の永代供養墓を厳選比較。夫婦や家族で入れる永代供養、ペット共葬可能、継承者不要で費用が安い霊園の選び方を解説。最新の価格相場とともにご希望の条件に合う永代供養をご案内します。`,
        };
    } else if (isNoukotsudo) {
        return {
            title: `${decodedCity}の納骨堂ランキング・費用比較｜おすすめ霊園一覧【お墓探しナビ】`,
            description: `${decodedCity}で人気の納骨堂を厳選比較。夫婦や家族で入れる納骨堂、ペット共葬可能、継承者不要で費用が安い霊園の選び方を解説。最新の価格相場とともにご希望の条件に合う納骨堂をご案内します。`,
        };
    }

    return {
        title: `${decodedCity}の霊園・お墓一覧｜永代供養・樹木葬の費用相場と見学予約【お墓探しナビ】`,
        description: `${decodedCity}（${decodedPrefecture}）の霊園・墓地を${count}件掲載中。永代供養墓、樹木葬、納骨堂の費用相場や口コミ、アクセス情報を比較できます。中立的な立場の専門アドバイザーによる無料相談・見学予約を受付中。`,
    };
}

export default async function CityPage(props: { params: Promise<{ prefecture: string; city: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const decodedPrefecture = decodeURIComponent(params.prefecture);
    const decodedCity = decodeURIComponent(params.city);

    // Get count for Hero
    const temples = Store.getTemples().filter(t => t.prefecture === decodedPrefecture && t.cityName === decodedCity);

    // JSON-LD Generation
    const typeIds = searchParams.type;
    const isEitaikuyo = typeof typeIds === 'string' && typeIds.includes('eitai');
    const isJyumokusou = typeof typeIds === 'string' && typeIds.includes('jumokusou');
    const isNoukotsudo = typeof typeIds === 'string' && typeIds.includes('noukotsudou');

    let currentTypeName = "";
    if (isJyumokusou) currentTypeName = "樹木葬";
    else if (isEitaikuyo) currentTypeName = "永代供養";
    else if (isNoukotsudo) currentTypeName = "納骨堂";

    // 1. BreadcrumbList
    const breadcrumbs = [
        { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://ohakanavi.jp/" },
        { "@type": "ListItem", "position": 2, "name": decodedPrefecture, "item": `https://ohakanavi.jp/area/${params.prefecture}` },
        { "@type": "ListItem", "position": 3, "name": decodedCity, "item": `https://ohakanavi.jp/area/${params.prefecture}/${params.city}` }
    ];
    if (currentTypeName) {
        breadcrumbs.push({
            "@type": "ListItem",
            "position": 4,
            "name": currentTypeName,
            "item": `https://ohakanavi.jp/area/${params.prefecture}/${params.city}?type=${typeIds}`
        });
    }

    // 2. ItemList (List of temples in this city)
    const itemListElements = temples.map((t, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://ohakanavi.jp/detail/${t.id}`
    }));

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs
        },
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": itemListElements
        }
    ];

    // If no temples in city, maybe 404? Or just show empty list? 
    // Request says "Modal only shows cities with temples", so theoretically user shouldn't land here if empty unless direct URL.
    // We'll render empty list state.

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            <main className="flex-grow pt-20">
                <AreaHero
                    prefecture={decodedPrefecture}
                    city={decodedCity}
                    count={temples.length}
                />

                <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                    <Breadcrumbs
                        items={breadcrumbs.map(b => ({ label: b.name, href: b.item }))}
                        className="mb-6 md:mb-8"
                    />

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

                {/* 改葬CTA (BridgeSection) - 神奈川県限定 */}
                {decodedPrefecture === '神奈川県' && (
                    <div className="max-w-7xl mx-auto px-4">
                        <BridgeSection
                            municipalityName={decodedCity}
                            bridgeUrl={`https://ohaka-jimai.seiren.ne.jp/kanagawa/${encodeURIComponent(decodedCity)}`}
                            pageType="municipality"
                        />
                    </div>
                )}

                <AreaNav prefecture={decodedPrefecture} city={decodedCity} />
            </main>

            <Footer />
        </div>
    );
}
