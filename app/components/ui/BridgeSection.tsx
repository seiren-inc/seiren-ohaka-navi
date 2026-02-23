"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface BridgeSectionProps {
    municipalityName: string;
    bridgeUrl: string;
    pageType: 'facility' | 'municipality';
}

export function BridgeSection({ municipalityName, bridgeUrl, pageType }: BridgeSectionProps) {
    const handleClick = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'bridge_click', {
                municipality: municipalityName,
                pageType: pageType
            });
        }
    };

    return (
        <aside className="bg-gray-50 border border-gray-200 rounded-xl p-6 md:p-8 my-10 text-center max-w-4xl mx-auto shadow-sm">
            <h3 className="text-lg md:text-xl font-bold text-seiren-navy mb-4 tracking-wide flex items-center justify-center gap-2">
                改葬（お墓の引っ越し）を検討中の方へ
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto">
                現在のお墓を整理し、こちらへ改葬される場合は、改葬許可証の取得や行政手続きが必要です。<br className="hidden md:block" />
                {municipalityName}での手続き方法は専門サイトで解説しています。
            </p>
            <Link
                href={bridgeUrl}
                onClick={handleClick}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-seiren-navy text-seiren-navy hover:bg-seiren-navy hover:text-white font-bold rounded-lg transition-colors duration-200"
            >
                {municipalityName}の改葬許可証取得方法を見る
                <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
        </aside>
    );
}
