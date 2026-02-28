"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MapPin, Tag as TagIcon, ArrowRight, Image as ImageIcon, FileText } from "lucide-react";
import { Temple } from "@/lib/store";
import { Card } from "../../ui/Card";
import { Tag } from "../../ui/Tag";

interface GraveyardCardProps {
    data: Temple;
}

export function GraveyardCard({ data }: GraveyardCardProps) {
    const pathname = usePathname();
    const currentUrl = typeof window !== 'undefined' ? window.location.href : pathname;

    // Generate tags from supported memorial types and features
    const displayTags = [
        ...data.supportedMemorialTypes,
        ...(data.tags || [])
    ].slice(0, 5); // Limit to 5 tags

    const minPrice = data.priceAggMin ? data.priceAggMin.toLocaleString() : "要確認";
    const priceDisplay = typeof data.priceAggMin === 'number' ? (
        <>
            <span className="text-2xl font-bold text-primary">{minPrice}</span>
            <span className="text-sm text-text-muted mb-1">円〜</span>
        </>
    ) : (
        <span className="text-lg font-bold text-gray-500">価格要問い合わせ</span>
    );

    const requestUrl = `/consult/request-material?templeId=${data.id}&templeName=${encodeURIComponent(data.name)}&ref=search&refUrl=${encodeURIComponent(currentUrl || '')}`;

    return (
        <Card hoverEffect className="p-0 overflow-hidden flex flex-col md:flex-row h-full transition-all duration-300 hover:shadow-md">
            {/* Thumbnail */}
            <div className="w-full md:w-[280px] shrink-0 bg-gray-100 aspect-video md:aspect-auto relative overflow-hidden group">
                {data.mainImage ? (
                    <Image
                        src={data.mainImage}
                        alt={`${data.name}の外観写真`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 280px"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
                        <ImageIcon className="w-8 h-8 opacity-20" />
                    </div>
                )}

                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    <span className="bg-primary-soft/90 text-white text-[10px] px-2 py-1 rounded-[4px] font-bold shadow-sm backdrop-blur-sm">
                        {data.type}
                    </span>
                    {data.status === 'private' && <span className="bg-gray-500/90 text-white text-[10px] px-2 py-1 rounded-[4px] backdrop-blur-sm">非公開</span>}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg md:text-xl font-bold text-primary font-serif leading-tight group-hover:text-primary-hover transition-colors">
                            {data.name}
                        </h3>
                    </div>

                    <div className="flex items-start text-gray-500 text-xs md:text-sm mb-3 gap-1">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>
                            {data.prefecture}{data.cityName} {data.addressLine}
                            {data.access && <span className="block text-gray-400 mt-0.5 text-xs">{data.access}</span>}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {displayTags.map((tag, i) => (
                            <Tag key={i} variant="ghost" size="sm" className="bg-white">
                                <TagIcon className="w-3 h-3 mr-1 opacity-50" />{tag}
                            </Tag>
                        ))}
                    </div>

                    <hr className="border-gray-100 my-3" />

                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-xs text-gray-400 font-bold mb-1">費用目安</span>
                        {priceDisplay}
                    </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-end">
                    <Link href={requestUrl} className="block w-full sm:w-auto">
                        <button className="inline-flex items-center justify-center rounded-[10px] font-bold transition-all active:scale-[0.98] duration-200 border border-primary text-primary hover:bg-primary/5 px-4 h-11 text-sm w-full sm:w-auto">
                            <FileText className="w-4 h-4 mr-2" /> 資料請求
                        </button>
                    </Link>
                    <Link href={`/detail/${data.id}`} className="block w-full sm:w-auto">
                        <button className="inline-flex items-center justify-center rounded-[10px] font-bold transition-all active:scale-[0.98] duration-200 bg-primary text-white hover:bg-primary-hover px-6 h-11 text-sm w-full sm:w-auto shadow-sm">
                            詳細を見る <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </Link>
                </div>
            </div>
        </Card>
    );
}
