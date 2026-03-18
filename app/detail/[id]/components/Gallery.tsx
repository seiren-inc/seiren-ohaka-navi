"use client";

import { useState } from "react";
import { FacilityImage } from "../mock";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface GalleryProps {
    images: FacilityImage[];
}

export function Gallery({ images }: GalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prev = () => setCurrentIndex(i => (i === 0 ? images.length - 1 : i - 1));
    const next = () => setCurrentIndex(i => (i === images.length - 1 ? 0 : i + 1));

    if (!images.length) return (
        <div className="bg-gray-200 w-full aspect-[4/3] flex items-center justify-center text-gray-400">
            <ImageIcon className="w-12 h-12" />
        </div>
    );

    return (
        <div className="bg-white p-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] md:aspect-video bg-gray-100 rounded-lg overflow-hidden mb-2 group">
                <div className={`w-full h-full ${images[currentIndex].url} bg-cover bg-center transition-colors`} />

                {/* Navigation Arrows */}
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50">
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50">
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Count & Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white flex justify-between items-end">
                    <p className="font-bold text-sm tracking-wide">{images[currentIndex].caption}</p>
                    <div className="bg-black/50 px-2 py-1 rounded text-xs">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`shrink-0 w-20 h-16 rounded overflow-hidden border-2 transition-colors ${idx === currentIndex ? 'border-secondary' : 'border-transparent'}`}
                    >
                        <div className={`w-full h-full ${img.url} bg-cover bg-center`} />
                    </button>
                ))}
            </div>
        </div>
    );
}
