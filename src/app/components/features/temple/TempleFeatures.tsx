"use client";

import { Temple } from "@/lib/store";
import { CheckCircle2 } from "lucide-react";

interface TempleFeaturesProps {
    data: Temple;
}

export function TempleFeatures({ data }: TempleFeaturesProps) {
    if (!data.keyFeatures?.length) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-primary border-l-4 border-secondary pl-4 py-1 mb-6">
                特徴・おすすめポイント
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                {data.keyFeatures.map((feature, i) => (
                    <div key={i} className="flex gap-4 p-4 border-b border-gray-100 last:border-0 md:border-0">
                        <div className="shrink-0 text-secondary bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-800 mb-1">{feature.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {feature.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
