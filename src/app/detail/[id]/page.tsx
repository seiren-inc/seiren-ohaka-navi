import { prisma } from "@/lib/prisma";
import { Temple, Plan } from "@/lib/store"; // keep types
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ohakanavi.jp";

export async function generateMetadata(
    props: { params: Promise<{ id: string }> }
): Promise<Metadata> {
    const { id } = await props.params;
    const temple = await prisma.temple.findUnique({ where: { id, status: 'public' } });
    if (!temple) return { title: "施設が見つかりません | 清蓮" };

    const seo = temple.seo as Record<string, unknown> | null;
    const location = [temple.cityName, temple.prefecture].filter(Boolean).join("・");
    const defaultTitle = `${temple.name}（${location}）| 墓地・永代供養なら清蓮`;
    const defaultDesc = `${temple.name}（${location}）の墓地情報。永代供養・樹木葵・納骨堂の区画一覧、料金・アクセス情報を掲載。無料相談可。`;

    const title = (seo?.title as string) || defaultTitle;
    const description = (seo?.description as string) || defaultDesc;
    const noIndex = (seo?.indexControl as string) === "noindex";

    return {
        title,
        description,
        alternates: { canonical: `${BASE_URL}/detail/${id}` },
        robots: noIndex ? { index: false, follow: true } : { index: true, follow: true },
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/detail/${id}`,
            images: temple.mainImage ? [{ url: temple.mainImage }] : [],
        },
    };
}

export default async function TempleDetailPage(props: { params: Promise<{ id: string }> }) {
    // Next.js 15+ params are async
    const params = await props.params;
    const templeData = await prisma.temple.findUnique({
        where: { id: params.id, status: 'public' }   // 非公開・準備中は 404
    });

    if (!templeData) {
        return notFound();
    }

    const plansData = await prisma.plan.findMany({
        where: { templeId: params.id },
        orderBy: { price: 'asc' } // or whatever order is appropriate
    });

    const temple = templeData as unknown as Temple;
    const plans = plansData as unknown as Plan[];

    // --- SEO: Build JSON-LD ---
    const seo = templeData.seo as Record<string, unknown> | null;
    const location = [templeData.cityName, templeData.prefecture].filter(Boolean).join("（");
    const structuredDataEnabled = seo?.structuredDataEnabled !== false;

    const localBusinessLd = structuredDataEnabled ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": templeData.name,
        "description": templeData.catchphrase || templeData.overview || "",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": templeData.cityName || "",
            "addressRegion": templeData.prefecture,
            "addressCountry": "JP",
        },
        ...(templeData.lat && templeData.lng ? {
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": templeData.lat,
                "longitude": templeData.lng,
            }
        } : {}),
        ...(templeData.phone ? { "telephone": templeData.phone } : {}),
        ...(templeData.mainImage ? { "image": templeData.mainImage } : {}),
    } : null;

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "ホーム", "item": BASE_URL },
            { "@type": "ListItem", "position": 2, "name": "墓地を探す", "item": `${BASE_URL}/search` },
            { "@type": "ListItem", "position": 3, "name": templeData.name, "item": `${BASE_URL}/detail/${templeData.id}` },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke pb-24 md:pb-0">
            {/* JSON-LD Structured Data */}
            {localBusinessLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
            />

            <Navbar />

            <main className="grow pt-20">
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
