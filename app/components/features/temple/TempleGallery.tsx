"use client";

import { useState, useCallback, useEffect } from "react";
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import Image from "next/image";

interface TempleGalleryProps {
    gallery: string[];
}

export function TempleGallery({ gallery }: TempleGalleryProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const displayItems = gallery.length > 0 ? gallery : [null, null, null, null];
    const categories = ["全景・外観", "園内・風景", "施設・設備", "周辺環境"];

    const openLightbox = (index: number) => {
        if (gallery[index]) setLightboxIndex(index);
    };

    const closeLightbox = () => setLightboxIndex(null);

    const goPrev = useCallback(() => {
        if (lightboxIndex === null || gallery.length === 0) return;
        setLightboxIndex(lightboxIndex === 0 ? gallery.length - 1 : lightboxIndex - 1);
    }, [lightboxIndex, gallery.length]);

    const goNext = useCallback(() => {
        if (lightboxIndex === null || gallery.length === 0) return;
        setLightboxIndex(lightboxIndex === gallery.length - 1 ? 0 : lightboxIndex + 1);
    }, [lightboxIndex, gallery.length]);

    // Keyboard navigation
    useEffect(() => {
        if (lightboxIndex === null) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") goPrev();
            if (e.key === "ArrowRight") goNext();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightboxIndex, goPrev, goNext]);

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <h2 className="text-xl font-bold text-primary border-l-4 border-secondary pl-4 py-1 mb-6">
                    写真ギャラリー
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {displayItems.map((src, i) => (
                        <div key={i} className="flex flex-col gap-2">
                            <button
                                onClick={() => openLightbox(i)}
                                className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative group border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
                                disabled={!src}
                            >
                                {src ? (
                                    <>
                                        <Image
                                            src={src}
                                            alt={`${categories[i] || "ギャラリー"} ${i + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                            <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                        <ImageIcon className="w-8 h-8 opacity-50 mb-1" />
                                        <span className="text-xs">No Image</span>
                                    </div>
                                )}
                            </button>
                            <div className="text-center text-xs font-bold text-gray-500">
                                {categories[i] || "その他"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && gallery[lightboxIndex] && (
                <div
                    className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center backdrop-blur-sm" role="dialog" aria-modal="true"
                    onClick={closeLightbox}
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                    >
                        <X className="w-7 h-7" />
                    </button>

                    {/* Counter */}
                    <div className="absolute top-4 left-4 text-white/80 text-sm font-bold z-10">
                        {lightboxIndex + 1} / {gallery.length}
                    </div>

                    {/* Category label */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-bold bg-black/40 px-4 py-1.5 rounded-full z-10">
                        {categories[lightboxIndex] || "その他"}
                    </div>

                    {/* Previous */}
                    <button
                        onClick={(e) => { e.stopPropagation(); goPrev(); }}
                        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 md:p-3 rounded-full hover:bg-white/10 transition-colors z-10"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    {/* Next */}
                    <button
                        onClick={(e) => { e.stopPropagation(); goNext(); }}
                        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 md:p-3 rounded-full hover:bg-white/10 transition-colors z-10"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>

                    {/* Main image */}
                    <div
                        className="relative w-[90vw] h-[70vh] md:w-[80vw] md:h-[80vh]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={gallery[lightboxIndex]}
                            alt={`${categories[lightboxIndex] || "ギャラリー"} - 拡大`}
                            fill
                            className="object-contain"
                            sizes="90vw"
                            priority
                        />
                    </div>
                </div>
            )}
        </>
    );
}
