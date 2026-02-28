import { Store } from "@/lib/store";
import { notFound } from "next/navigation";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { TempleHero } from "../../components/features/temple/TempleHero";
import { PlanList } from "../../components/features/temple/PlanList";
import { TempleFeatures } from "../../components/features/temple/TempleFeatures";
import { TempleGallery } from "../../components/features/temple/TempleGallery";
import { TempleAccess } from "../../components/features/temple/TempleAccess";
import { TempleFAQ } from "../../components/features/temple/TempleFAQ";
import { StickyCTA } from "../../components/features/temple/StickyCTA";
import { TempleSuitable } from "../../components/features/temple/TempleSuitable";
import { TempleGuide } from "../../components/features/temple/TempleGuide";
import { TempleClosing } from "../../components/features/temple/TempleClosing";

export default async function TempleDetailPage(props: { params: Promise<{ id: string }> }) {
    // Next.js 15+ params are async
    const params = await props.params;
    const temple = Store.getTemple(params.id);

    if (!temple) {
        return notFound();
    }

    const plans = Store.getPlans(params.id);

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke pb-24 md:pb-0">
            <Navbar />

            {/* 構造化データ (JSON-LD) - LocalBusiness & BreadcrumbList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "LocalBusiness",
                                "@id": `https://ohakanavi.jp/detail/${temple.id}`,
                                "name": temple.name,
                                "image": temple.mainImage ? [`https://ohakanavi.jp${temple.mainImage}`] : [],
                                "telephone": temple.phone || "",
                                "address": {
                                    "@type": "PostalAddress",
                                    "streetAddress": temple.addressLine || "",
                                    "addressLocality": temple.cityName || "",
                                    "addressRegion": temple.prefecture || "",
                                    "addressCountry": "JP"
                                },
                                "geo": (temple.lat && temple.lng) ? {
                                    "@type": "GeoCoordinates",
                                    "latitude": temple.lat,
                                    "longitude": temple.lng
                                } : undefined,
                                "priceRange": temple.priceAggMin ? `¥${temple.priceAggMin.toLocaleString()}〜` : "価格要確認",
                            },
                            {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": "https://ohakanavi.jp/" },
                                    { "@type": "ListItem", "position": 2, "name": "お墓を探す", "item": "https://ohakanavi.jp/search" },
                                    { "@type": "ListItem", "position": 3, "name": temple.name }
                                ]
                            }
                        ]
                    })
                }}
            />

            <main className="flex-grow pt-24">
                {/* 0. Breadcrumbs UI */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 mb-4">
                    <div className="text-xs text-text-muted flex flex-wrap gap-2 items-center">
                        <a href="/" className="hover:text-primary transition-colors">TOP</a>
                        <span className="text-gray-300">&gt;</span>
                        <a href="/search" className="hover:text-primary transition-colors">お墓を探す</a>
                        <span className="text-gray-300">&gt;</span>
                        <span className="text-gray-600 font-bold truncate max-w-[200px] sm:max-w-none">{temple.name}</span>
                    </div>
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
