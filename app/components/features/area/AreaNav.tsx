"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface AreaNavProps {
    prefecture: string;
    city?: string;
}

export function AreaNav({ prefecture, city }: AreaNavProps) {
    // Mock Nav Data - could be dynamic from DB but using static for now to satisfy UX
    const nearby = [
        "横浜市", "川崎市", "相模原市", "鎌倉市", "藤沢市"
    ];

    // SEO Links to types within the same city or prefecture
    const targetArea = city || prefecture;
    const basePath = city
        ? `/area/${encodeURIComponent(prefecture)}/${encodeURIComponent(city)}`
        : `/area/${encodeURIComponent(prefecture)}`;

    const features = [
        { label: `${targetArea}の樹木葬`, href: `${basePath}?type=jumokusou` },
        { label: `${targetArea}の永代供養墓`, href: `${basePath}?type=eitai` },
        { label: `${targetArea}の納骨堂`, href: `${basePath}?type=noukotsudou` },
        { label: `${targetArea}の一般墓`, href: `${basePath}?type=general` }
    ];

    return (
        <section className="bg-white border-t border-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Nearby Areas */}
                    <div>
                        <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                            近隣エリアから探す
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {nearby.map(area => {
                                // Exclude current city from nearby links if needed, but keeping simple
                                if (area === city) return null;
                                return (
                                    <Link key={area} href={`/area/${encodeURIComponent(prefecture)}/${encodeURIComponent(area)}`} className="text-sm text-gray-600 hover:text-primary flex items-center">
                                        <ChevronRight className="w-3 h-3 text-gray-400 mr-1" /> {area}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                            {targetArea}から条件で探す
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {features.map(feat => (
                                <Link key={feat.label} href={feat.href} className="text-sm text-gray-600 hover:text-primary flex items-center">
                                    <ChevronRight className="w-3 h-3 text-gray-400 mr-1" /> {feat.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
