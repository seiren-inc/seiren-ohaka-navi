"use client";

import { useFavorites } from "@/lib/hooks/useFavorites";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { Button } from "@/app/components/ui/Button";
import { MapPin, ArrowRight, HeartCrack, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FavoritesPage() {
    const { favorites, isInitialized, removeFavorite } = useFavorites();

    if (!isInitialized) {
        return (
            <div className="min-h-screen flex flex-col bg-slate-50">
                <Navbar />
                <main id="main-content" className="grow flex items-center justify-center">
                    <div className="animate-pulse space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main id="main-content" className="grow pt-24 px-4 pb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary-dark mb-4">
                            お気に入りリスト
                        </h1>
                        <p className="text-gray-600">
                            保存した霊園・寺院の一覧です。気になるプランを比較して、資料請求や見学予約へ進みましょう。
                        </p>
                    </div>

                    {favorites.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                            <HeartCrack className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h2 className="text-lg font-bold text-gray-700 mb-2">お気に入りはまだありません</h2>
                            <p className="text-gray-500 mb-6 text-sm">
                                霊園の一覧ページや詳細ページから、<br className="md:hidden"/>ハートマークをクリックして保存できます。
                            </p>
                            <Link href="/search">
                                <Button className="bg-primary hover:bg-primary-hover text-white px-8">
                                    霊園を探す
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Favorites List */}
                            {favorites.map((fav) => (
                                <div key={fav.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 relative group transition-all hover:shadow-md">
                                    {/* Thumbnail */}
                                    <div className="w-full md:w-48 h-32 relative rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                        {fav.image ? (
                                            <Image
                                                src={fav.image}
                                                alt={fav.name}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">No Image</div>
                                        )}
                                        <div className="absolute top-2 left-2 bg-secondary/95 text-white text-[10px] px-2 py-0.5 rounded shadow-sm font-bold">
                                            {fav.type}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold text-primary-dark mb-1 font-serif pr-8">
                                                {fav.name}
                                            </h3>
                                            <div className="flex items-start text-xs text-gray-500 mb-3">
                                                <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mr-1 mt-0.5" />
                                                <span>{fav.address}</span>
                                            </div>
                                            {fav.priceMin && (
                                                <div className="mb-2">
                                                    <span className="text-xs text-text-muted font-bold mr-2">最安目安</span>
                                                    <span className="text-xl font-bold text-primary">{fav.priceMin.toLocaleString()}</span>
                                                    <span className="text-xs text-gray-500">円〜</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
                                            <Link href={`/detail/${fav.id}`} className="flex-1 min-w-[140px]">
                                                <Button variant="outline" className="w-full text-sm h-9">
                                                    詳細を見る
                                                </Button>
                                            </Link>
                                            <Link href={`/consult/request-material?templeId=${fav.id}&templeName=${encodeURIComponent(fav.name)}&ref=favorites`} className="flex-1 min-w-[140px]">
                                                <Button className="w-full text-sm h-9 bg-primary hover:bg-primary-hover text-white">
                                                    資料請求 <ArrowRight className="w-3 h-3 ml-1" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFavorite(fav.id)}
                                        className="absolute top-4 right-4 md:top-6 md:right-6 p-1.5 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors tooltip-trigger"
                                        aria-label="お気に入りから削除"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
