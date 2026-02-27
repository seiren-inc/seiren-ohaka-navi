"use client";

import { MapPin, Home } from "lucide-react";
import Link from "next/link";

interface AreaHeroProps {
    prefecture: string;
    city?: string;
    count: number;
}

export function AreaHero({ prefecture, city, count }: AreaHeroProps) {
    const areaName = city ? `${prefecture}${city}` : prefecture;
    const title = `${areaName}の霊園・墓地一覧`;

    return (
        <section className="bg-white border-b border-border">
            {/* Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 py-3">
                <nav className="flex items-center text-xs text-text-muted">
                    <Link href="/" className="hover:text-primary flex items-center">
                        <Home className="w-3 h-3 mr-1" /> TOP
                    </Link>
                    <span className="mx-2">/</span>
                    <Link href="/search" className="hover:text-primary">
                        エリアから探す
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="font-bold text-primary-dark">{areaName}</span>
                </nav>
            </div>

            {/* Hero Content */}
            <div className="bg-blue-50 py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-primary font-serif mb-3">
                        {title}
                    </h1>
                    <p className="text-sm text-text-secondary mb-4 max-w-3xl leading-relaxed">
                        {areaName}には現在、<span className="font-bold text-red-600 text-lg mx-1">{count}</span>件の霊園・墓地が登録されています。
                        ご希望の条件（費用、宗教、ペット可など）で絞り込み、無料で資料請求が可能です。
                        {/* Dynamic SEO text could be expanded here */}
                    </p>

                    {/* Tags or Quick Links could go here */}
                </div>
            </div>
        </section>
    );
}
