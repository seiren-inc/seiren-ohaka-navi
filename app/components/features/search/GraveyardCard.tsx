"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Tag, ArrowRight, Image as ImageIcon, FileText } from "lucide-react";
import { Temple } from "@/lib/store";
import { Card } from "../../ui/Card";

interface GraveyardCardProps {
    data: Temple;
}

export function GraveyardCard({ data }: GraveyardCardProps) {
    const pathname = usePathname();
    const currentUrl = typeof window !== 'undefined' ? window.location.href : pathname;

    const displayTags = [
        ...data.supportedMemorialTypes,
        ...(data.tags || [])
    ].slice(0, 5);

    const minPrice = data.priceAggMin ? data.priceAggMin.toLocaleString() : "要確認";
    const priceDisplay = typeof data.priceAggMin === 'number' ? (
        <>
            <span className="text-xl font-medium text-primary-dark">{minPrice}</span>
            <span className="text-sm text-text-muted mb-0.5">円〜</span>
        </>
    ) : (
        <span className="text-base text-text-muted">価格要問い合わせ</span>
    );

    const requestUrl = `/consult/request-material?templeId=${data.id}&templeName=${encodeURIComponent(data.name)}&ref=search&refUrl=${encodeURIComponent(currentUrl || '')}`;

    return (
        <Card hoverEffect className="p-0 overflow-hidden flex flex-col md:flex-row h-full">
            {/* Thumbnail */}
            <div className="w-full md:w-1/3 bg-bg aspect-video md:aspect-auto relative overflow-hidden group">
                {data.mainImage ? (
                    <img
                        src={data.mainImage}
                        alt={data.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                        <ImageIcon className="w-12 h-12 opacity-20" />
                    </div>
                )}

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-primary-dark/85 text-white text-[10px] px-2.5 py-1 rounded-[--radius-sm] uppercase tracking-wider font-medium backdrop-blur-sm">
                        {data.type}
                    </span>
                    {data.status === 'private' && <span className="bg-gray-500/85 text-white text-[10px] px-2.5 py-1 rounded-[--radius-sm] backdrop-blur-sm">非公開</span>}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg md:text-xl font-medium text-primary-dark font-serif leading-tight">
                            {data.name}
                        </h3>
                    </div>

                    <div className="flex items-start text-text-muted text-xs md:text-sm mb-4 gap-1.5">
                        <MapPin className="w-4 h-4 text-primary/60 shrink-0 mt-0.5" />
                        <span>
                            {data.prefecture}{data.cityName} {data.addressLine}
                            {data.access && <span className="block text-text-muted mt-0.5 text-xs">{data.access}</span>}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {displayTags.map((tag, i) => (
                            <span key={i} className="bg-bg text-text-secondary text-[10px] md:text-xs px-2.5 py-1 rounded-full flex items-center border border-border">
                                <Tag className="w-3 h-3 mr-1 opacity-40" />{tag}
                            </span>
                        ))}
                    </div>

                    <hr className="border-border-light my-4" />

                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-xs text-text-muted mb-0.5">費用目安</span>
                        {priceDisplay}
                    </div>
                </div>

                <div className="mt-5 flex gap-3 justify-end">
                    <Link href={requestUrl} className="block w-full sm:w-auto">
                        <div className="inline-flex items-center justify-center rounded-[--radius-md] transition-all duration-200 active:scale-[0.98] border border-border bg-white text-primary hover:bg-bg hover:border-primary/20 px-4 py-2 text-sm w-full sm:w-auto">
                            <FileText className="w-4 h-4 mr-2 opacity-60" /> 資料請求
                        </div>
                    </Link>
                    <Link href={`/detail/${data.id}`} className="block w-full sm:w-auto">
                        <div className="inline-flex items-center justify-center rounded-[--radius-md] transition-all duration-200 active:scale-[0.98] border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 text-sm w-full sm:w-auto">
                            詳細を見る <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                    </Link>
                </div>
            </div>
        </Card>
    );
}
