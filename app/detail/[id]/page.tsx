import { prisma } from "@/lib/prisma";
import { Temple, Plan } from "@/lib/store"; // keep types
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

export default async function TempleDetailPage(props: { params: Promise<{ id: string }> }) {
    // Next.js 15+ params are async
    const params = await props.params;
    const templeData = await prisma.temple.findUnique({
        where: { id: params.id }
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

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke pb-24 md:pb-0">
            <Navbar />

            <main className="flex-grow pt-20">
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
