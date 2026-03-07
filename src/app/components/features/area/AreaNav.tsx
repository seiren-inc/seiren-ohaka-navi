"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface AreaNavProps {
    prefecture: string;
}

export function AreaNav({ prefecture }: AreaNavProps) {
    // Mock Nav Data
    const nearby = [
        "横浜市", "川崎市", "相模原市", "鎌倉市" // Simplified
    ];
    const features = [
        `${prefecture}のペット可霊園`,
        `${prefecture}の永代供養墓`,
        `${prefecture}の樹木葬`,
        `${prefecture}の公営霊園`
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
                            {nearby.map(area => (
                                <Link key={area} href={`/search?q=${area}`} className="text-sm text-gray-600 hover:text-primary flex items-center">
                                    <ChevronRight className="w-3 h-3 text-gray-400 mr-1" /> {area}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div>
                        <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
                            {prefecture}の特集
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {features.map(feat => (
                                <Link key={feat} href={`/search?tag=${feat}`} className="text-sm text-gray-600 hover:text-primary flex items-center">
                                    <ChevronRight className="w-3 h-3 text-gray-400 mr-1" /> {feat}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
