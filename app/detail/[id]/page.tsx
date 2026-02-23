import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { TempleHero } from "../../components/features/temple/TempleHero";
import { PlanList } from "../../components/features/temple/PlanList";
import { TempleFeatures } from "../../components/features/temple/TempleFeatures";
import { TempleGallery } from "../../components/features/temple/TempleGallery";
import { TempleAccess } from "../../components/features/temple/TempleAccess";
import { TempleFAQ } from "../../components/features/temple/TempleFAQ";
import { NearbyTemples } from "../../components/features/temple/NearbyTemples";
import { StickyCTA } from "../../components/features/temple/StickyCTA";
import { TempleSuitable } from "../../components/features/temple/TempleSuitable";
import { TempleGuide } from "../../components/features/temple/TempleGuide";
import { TempleClosing } from "../../components/features/temple/TempleClosing";
import { Breadcrumbs } from "../../components/ui/Breadcrumbs";
import { BridgeSection } from "../../components/ui/BridgeSection";
import { Temple, Plan } from "@/lib/store";
import { Metadata } from "next";

export async function generateMetadata(
    props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const params = await props.params;
    const temple = await prisma.temple.findUnique({
        where: { id: params.id },
        select: { name: true, cityName: true }
    });

    if (!temple) {
        return {
            title: "霊園が見つかりません｜お墓探しナビ",
            description: "指定された霊園は見つかりませんでした。"
        };
    }

    const { name, cityName } = temple;

    return {
        title: `${name}（${cityName}）の費用・アクセス・口コミ｜永代供養・樹木葬【お墓探しナビ】`,
        description: `${cityName}にある「${name}」の費用プラン（一般墓・永代供養・樹木葬・納骨堂）、アクセス情報、口コミ・評判を詳しく解説。見学予約やパンフレットの無料資料請求はこちらから行えます。`,
    };
}

export default async function TempleDetailPage(props: { params: Promise<{ id: string }> }) {
    // Next.js 15+ params are async
    const params = await props.params;

    // Fetch from Prisma with plans
    const temple = await prisma.temple.findUnique({
        where: { id: params.id },
        include: { plans: { orderBy: { order: 'asc' } } }
    }) as unknown as Temple & { plans: Plan[] };

    if (!temple) {
        return notFound();
    }

    const plans = temple.plans;

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": temple.name,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": temple.addressLine || "",
                "addressLocality": temple.cityName || "",
                "addressRegion": temple.prefecture || "",
                "addressCountry": "JP"
            },
            "url": `https://ohakanavi.jp/detail/${temple.id}`,
            "telephone": temple.phone || ""
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "見学は必須ですか？",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "必須ではありませんが、実際の雰囲気や設備をご確認いただくことをおすすめしております。"
                    }
                },
                {
                    "@type": "Question",
                    "name": "追加費用はかかりますか？",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "通常、プランに含まれる費用以外に追加費用は発生しません。ただし、法要などを希望される場合は別途費用がかかる場合がございます。"
                    }
                },
                {
                    "@type": "Question",
                    "name": "将来合祀されますか？",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "プランにより異なります。「永代供養」が付いているプランは、一定期間後または最初から合祀される形式が一般的です。詳細は各プランをご確認ください。"
                    }
                }
            ]
        }
    ];

    const breadcrumbs = [
        { label: "ホーム", href: "/" },
        { label: temple.prefecture || "", href: `/area/${encodeURIComponent(temple.prefecture || "")}` },
        { label: temple.cityName || "", href: `/area/${encodeURIComponent(temple.prefecture || "")}/${encodeURIComponent(temple.cityName || "")}` },
        { label: temple.name || "", href: `/detail/${temple.id}` }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke pb-24 md:pb-0">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            <main className="flex-grow pt-20">
                <div className="max-w-6xl mx-auto px-4 md:px-8 mt-4 mb-2">
                    <Breadcrumbs items={breadcrumbs} className="mb-2" />
                </div>
                {/* 1. Hero (First View) */}
                <TempleHero data={temple} />

                <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-16">
                    {/* 2. Suitable For */}
                    <TempleSuitable data={temple} />

                    {/* 3. Plan List (Most Important) */}
                    <div className="scroll-mt-24" id="plans">
                        <PlanList plans={plans} temple={temple} />
                    </div>

                    {/* 改葬CTA (BridgeSection) - 神奈川県限定かつ永代供養/樹木葬/納骨堂プランがある場合のみ */}
                    {temple.prefecture === '神奈川県' && plans.some(p => ['perpetualMemorial', 'treeBurial', 'ossuary'].includes(p.category)) && (
                        <BridgeSection
                            municipalityName={temple.cityName || ""}
                            bridgeUrl={`https://ohaka-jimai.seiren.ne.jp/kanagawa/${encodeURIComponent(temple.cityName || "")}`}
                            pageType="facility"
                        />
                    )}

                    {/* 4. Guide (For those confused) */}
                    <TempleGuide data={temple} />

                    {/* 5. Features */}
                    <TempleFeatures data={temple} />

                    {/* 6. Gallery */}
                    <TempleGallery gallery={temple.galleryImages} />

                    {/* 7. Access */}
                    <TempleAccess data={temple} />

                    {/* 8. FAQ */}
                    <TempleFAQ />

                    {/* 9. Final Closing CTA */}
                    <TempleClosing data={temple} />
                </div>
            </main>

            {/* 10. Mobile Sticky CTA */}
            <StickyCTA temple={temple} />
            <Footer />
        </div>
    );
}
