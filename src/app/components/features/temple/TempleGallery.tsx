"use client";

import { Temple } from "@/lib/store";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface TempleGalleryProps {
    gallery: string[];
}

export function TempleGallery({ gallery }: TempleGalleryProps) {
    // If no gallery, show placeholders
    const displayItems = gallery.length > 0 ? gallery : [null, null, null, null];
    const categories = ["全景・外観", "園内・風景", "施設・設備", "周辺環境"];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-primary border-l-4 border-secondary pl-4 py-1 mb-6">
                写真ギャラリー
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {displayItems.map((src, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative group border border-gray-200">
                            {src ? (
                                <Image
                                    src={src}
                                    alt={`Gallery ${i + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                                    <ImageIcon className="w-8 h-8 opacity-50 mb-1" />
                                    <span className="text-xs">No Image</span>
                                </div>
                            )}
                        </div>
                        <div className="text-center text-xs font-bold text-gray-500">
                            {categories[i] || "その他"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
