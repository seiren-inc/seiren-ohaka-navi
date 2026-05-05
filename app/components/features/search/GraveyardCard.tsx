"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  MapPin,
  Tag as TagIcon,
  ArrowRight,
  Image as ImageIcon,
  FileText,
  Star,
} from "lucide-react";
import { Temple } from "@/lib/store";
import { Card } from "../../ui/Card";
import { Tag } from "../../ui/Tag";
import { useFavorites } from "@/lib/hooks/useFavorites";

interface GraveyardCardProps {
  data: Temple;
}

export function GraveyardCard({ data }: GraveyardCardProps) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const { isFavorite, toggleFavorite, isInitialized } = useFavorites();
  const isFav = isInitialized ? isFavorite(data.id) : false;

  // Generate tags from supported memorial types and features
  const displayTags = [
    ...data.supportedMemorialTypes,
    ...(data.tags || []),
  ].slice(0, 5); // Limit to 5 tags

  const minPrice = data.priceAggMin
    ? data.priceAggMin.toLocaleString()
    : "要確認";
  const priceDisplay =
    typeof data.priceAggMin === "number" ? (
      <>
        <span className="text-2xl font-bold text-primary">{minPrice}</span>
        <span className="text-sm text-text-muted mb-1">円〜</span>
      </>
    ) : (
      <span className="text-lg font-bold text-gray-500">価格要問い合わせ</span>
    );

  const requestUrl = `/consult/request-material?templeId=${data.id}&templeName=${encodeURIComponent(data.name)}&ref=search&refUrl=${encodeURIComponent(currentUrl || "")}`;

  // Trust Signals Mock Generation
  const rating = (4.0 + (data.id.charCodeAt(0) % 10) / 10).toFixed(1); // e.g., "4.3"
  const consultCount = 50 + (data.id.charCodeAt(1) || 0) * 3;
  const hasJumokuso = data.supportedMemorialTypes?.includes("樹木葬");

  return (
    <Card
      hoverEffect
      className="p-0 overflow-hidden flex flex-col md:flex-row h-full transition-all duration-300 hover:shadow-md"
    >
      {/* Thumbnail */}
      <div className="w-full md:w-1/3 bg-gray-100 aspect-video md:aspect-auto relative overflow-hidden group">
        {data.mainImage ? (
          <Image
            src={data.mainImage}
            alt={data.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <ImageIcon className="w-12 h-12 opacity-20" />
          </div>
        )}

        {/* バッジ: facility type + plan badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 z-10">
          <span className="bg-secondary/95 text-white text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider font-bold shadow-sm backdrop-blur-sm">
            {data.type}
          </span>
          {hasJumokuso && (
            <span className="bg-emerald-600/95 text-white text-[10px] px-2 py-1 rounded-sm font-bold shadow-sm backdrop-blur-sm tracking-wide">
              樹木葬あり
            </span>
          )}
          {data.status === "private" && (
            <span className="bg-gray-500/90 text-white text-[10px] px-2 py-1 rounded-sm tracking-wide">
              非公開
            </span>
          )}
        </div>

        {/* PR / おすすめバッジ + お気に入りボタン（右上） */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 items-end z-10">
          <div className="flex flex-col gap-1 items-end">
            {data.isPrSlot && (
              <span className="bg-amber-500/90 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold shadow-sm backdrop-blur-sm tracking-wide">
                PR
              </span>
            )}
            {data.planType === "standard" && !data.isPrSlot && (
              <span className="bg-emerald-500/90 text-white text-[10px] px-2 py-0.5 rounded-sm font-bold shadow-sm backdrop-blur-sm tracking-wide">
                おすすめ
              </span>
            )}
          </div>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(data);
            }}
            className={`p-2 rounded-full backdrop-blur-md shadow-sm transition-all duration-300 ${
              isFav 
                ? "bg-rose-50 text-rose-500 border border-rose-200" 
                : "bg-black/30 text-white border border-white/20 hover:bg-black/50"
            }`}
            aria-label={isFav ? "お気に入りから削除" : "お気に入りに追加"}
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
          </button>
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
              {data.prefecture}
              {data.cityName} {data.addressLine}
              {data.access && (
                <span className="block text-gray-400 mt-0.5 text-xs">
                  {data.access}
                </span>
              )}
            </span>
          </div>

          {/* Trust Signals Block (JTB inspired) */}
          <div className="flex flex-wrap items-center gap-2 mb-3 bg-red-50/50 p-2 md:px-3 md:py-2.5 rounded-md border border-red-100/50">
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3.5 h-3.5 ${star <= Math.floor(Number(rating)) ? "fill-current" : "fill-amber-100 text-amber-100"}`}
                />
              ))}
              <span className="font-bold ml-1 text-gray-800 text-xs md:text-sm">
                {rating}
              </span>
            </div>
            <span className="text-[10px] md:text-xs text-gray-500 border-l pl-2 border-gray-300">
              相談実績{" "}
              <span className="font-bold text-accent text-xs md:text-sm">
                {consultCount}
              </span>
              件突破
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {displayTags.map((tag, i) => (
              <Tag
                key={i}
                variant="ghost"
                size="sm"
                className="bg-white border-gray-200 text-gray-600"
              >
                <TagIcon className="w-3 h-3 mr-1 opacity-40" />
                {tag}
              </Tag>
            ))}
          </div>

          <hr className="border-gray-100 my-3" />

          <div className="flex items-end gap-2 mb-2">
            <span className="text-xs text-gray-400 font-bold mb-1">
              費用目安
            </span>
            {priceDisplay}
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-end">
          <Link href={requestUrl} className="block w-full sm:w-auto">
            <div className="inline-flex items-center justify-center rounded-[8px] font-medium transition-transform active:scale-[0.98] duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border border-border bg-white text-primary hover:bg-primary/5 px-4 h-10 text-sm w-full sm:w-auto">
              <FileText className="w-4 h-4 mr-2" /> 資料請求
            </div>
          </Link>
          <Link href={`/detail/${data.id}`} className="block w-full sm:w-auto">
            <div className="inline-flex items-center justify-center rounded-[8px] font-medium transition-transform active:scale-[0.98] duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-primary text-white bg-primary hover:bg-primary-hover px-4 h-10 text-sm w-full sm:w-auto transition-colors">
              詳細を見る <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </Link>
        </div>
      </div>
    </Card>
  );
}
