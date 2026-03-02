import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "../../../components/layout/Navbar";
import { Footer } from "../../../components/layout/Footer";
import { AreaHero } from "../../../components/features/area/AreaHero";
import { AreaFilter } from "../../../components/features/area/AreaFilter";
import { AreaTempleList } from "../../../components/features/area/AreaTempleList";
import { AreaNav } from "../../../components/features/area/AreaNav";

export default async function CityPage(props: { params: Promise<{ prefecture: string; city: string }>; searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    const decodedPrefecture = decodeURIComponent(params.prefecture);
    const decodedCity = decodeURIComponent(params.city);

    // Get count for Hero
    const count = await prisma.temple.count({
        where: {
            prefecture: decodedPrefecture,
            cityName: decodedCity,
            status: 'public'
        }
    });

    // If no temples in city, maybe 404? Or just show empty list? 
    // Request says "Modal only shows cities with temples", so theoretically user shouldn't land here if empty unless direct URL.
    // We'll render empty list state.

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke">
            <Navbar />

            <main className="flex-grow pt-20">
                <AreaHero
                    prefecture={decodedPrefecture}
                    city={decodedCity}
                    count={count}
                />

                <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
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

                <AreaNav prefecture={decodedPrefecture} />
            </main>

            <Footer />
        </div>
    );
}
