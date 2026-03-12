"use client";

import { Temple } from "@/lib/store";
import { Button } from "../../ui/Button";
import { Tag } from "../../ui/Tag";
import { MapPin, FileText, CalendarCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useFavorites } from "@/lib/hooks/useFavorites";

interface TempleHeroProps {
    data: Temple;
}

export function TempleHero({ data }: TempleHeroProps) {
    const minPrice = data.priceAggMin ? data.priceAggMin.toLocaleString() : "要確認";
    const [currentUrl, setCurrentUrl] = useState("");
    
    const { isFavorite, toggleFavorite, isInitialized } = useFavorites();
    const isFav = isInitialized ? isFavorite(data.id) : false;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
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
                    <Image
                        src={data.mainImage}
                        alt={data.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
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
                    
                    {/* お気に入りボタン（絶対配置/右上） */}
                    <div className="absolute top-4 right-4 md:top-0 md:right-0">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                toggleFavorite(data);
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition-all duration-300 ${
                                isFav 
                                    ? "bg-rose-50 text-rose-500 border-rose-200" 
                                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                            }`}
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill={isFav ? "currentColor" : "none"} 
                                stroke="currentColor" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                className={`w-4 h-4 ${isFav ? "scale-110" : ""}`}
                            >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                            <span className="font-bold hidden sm:inline">{isFav ? "お気に入り保存済み" : "お気に入りに追加"}</span>
                        </button>
                    </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {displayTags.map((tag) => (
                            <Tag key={tag} variant="cemeteryType">
                                {tag}
                            </Tag>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 pt-6 md:border-none md:pt-0">
                        {/* Price */}
                        <div className="mb-6 flex items-baseline gap-2">
                            <span className="text-sm text-text-muted font-bold">最安価格</span>
                            <span className="text-3xl font-bold text-primary">{minPrice}</span>
                            <span className="text-sm text-text font-bold">円から</span>
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <Link href={requestUrl}>
                                    <Button className="w-full text-lg shadow-card flex flex-col justify-center items-center leading-none gap-1">
                                        <div className="flex items-center gap-2">
                                            <FileText className="w-5 h-5" /> 無料で資料請求する
                                        </div>
                                    </Button>
                                </Link>
                                <p className="text-[10px] text-text-muted text-center mt-2">
                                    資料請求は無料です。<br className="md:hidden" />しつこい営業は行いません。
                                </p>
                            </div>

                            <div className="flex-1">
                                <Link href={requestUrl}>
                                    <Button variant="secondary" className="w-full text-lg">
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
