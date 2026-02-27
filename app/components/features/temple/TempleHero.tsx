"use client";

import { Temple } from "@/lib/store";
import { Button } from "../../ui/Button";
import { MapPin, FileText, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface TempleHeroProps {
    data: Temple;
}

export function TempleHero({ data }: TempleHeroProps) {
    const minPrice = data.priceAggMin ? data.priceAggMin.toLocaleString() : "要確認";
    const [currentUrl, setCurrentUrl] = useState("");

    useEffect(() => {
        if (typeof window !== 'undefined') setCurrentUrl(window.location.href);
    }, []);

    const requestUrl = `/consult/request-material?templeId=${data.id}&templeName=${encodeURIComponent(data.name)}&ref=hero&refUrl=${encodeURIComponent(currentUrl)}`;

    // Display Tags (Max 6)
    const displayTags = [
        ...data.supportedMemorialTypes,
        ...(data.tags || [])
    ].slice(0, 6);

    return (
        <section className="bg-white pb-8">
            {/* Main Image */}
            <div className="w-full h-64 md:h-96 relative bg-gray-200">
                {data.mainImage ? (
                    <img
                        src={data.mainImage}
                        alt={data.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10 md:mt-0 md:pt-8 md:px-4">
                <div className="bg-white rounded-xl shadow-lg p-6 md:shadow-none md:p-0 md:bg-transparent">
                    {/* Area & Name */}
                    <div className="mb-4">
                        <div className="flex items-center text-sm text-gray-500 mb-2 font-bold">
                            <MapPin className="w-4 h-4 text-primary mr-1" />
                            {data.prefecture} {data.cityName}
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-primary font-serif leading-tight mb-2">
                            {data.name}
                        </h1>
                        <div className="text-sm text-gray-600">
                            {data.addressLine}
                            <span className="ml-2 bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
                                {data.access}
                            </span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {displayTags.map((tag) => (
                            <span key={tag} className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded border border-gray-200">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 pt-6 md:border-none md:pt-0">
                        {/* Price */}
                        <div className="mb-6 flex items-baseline gap-2">
                            <span className="text-sm text-gray-500 font-bold">最安価格</span>
                            <span className="text-3xl font-bold text-red-600">{minPrice}</span>
                            <span className="text-sm text-gray-800 font-bold">円から</span>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <Link href={requestUrl}>
                                    <Button className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-lg shadow-md rounded-lg flex flex-col justify-center items-center leading-none gap-1">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-5 h-5" /> 無料で資料請求する
                                        </div>
                                    </Button>
                                </Link>
                                <p className="text-[10px] text-gray-400 text-center mt-2">
                                    資料請求は無料です。<br className="md:hidden" />しつこい営業は行いません。
                                </p>
                            </div>

                            <div className="flex-1">
                                <Link href={requestUrl}>
                                    {/* Secondary CTA also links to Request Material but with potentially different intent if needed, or simplified as "Visit" -> same form */}
                                    {/* Note: User request says "Visit/Consult" as secondary. Logic matches sticky CTA. */}
                                    <Button variant="outline" className="w-full h-14 border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold text-lg rounded-lg">
                                        <CalendarCheck className="w-5 h-5 mr-2" /> 見学・相談する
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
