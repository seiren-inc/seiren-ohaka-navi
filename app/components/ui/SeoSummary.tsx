import React from 'react';
import { Calendar, MapPin, JapaneseYen, Info } from 'lucide-react';

interface SeoSummaryProps {
    title?: string;
    regions?: string[];
    priceRange?: string;
    description: string;
    lastUpdated?: string;
}

export function SeoSummary({
    title = "この記事の要約",
    regions,
    priceRange,
    description,
    lastUpdated
}: SeoSummaryProps) {
    const defaultDate = new Date().toISOString().split('T')[0];

    return (
        <div className="bg-bg-muted border border-border rounded-xl p-6 mt-12 mb-8" itemProp="about" itemScope itemType="https://schema.org/Thing">
            <div className="flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-gray-800 text-lg" itemProp="name">{title}</h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 leading-relaxed" itemProp="description">
                {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-4 pt-4 border-t border-gray-200">
                {regions && regions.length > 0 && (
                    <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                            <span className="text-gray-500 text-xs block mb-0.5">主な対象地域</span>
                            <span className="font-medium text-gray-700">{regions.join('、')}</span>
                        </div>
                    </div>
                )}
                
                {priceRange && (
                    <div className="flex items-start gap-2">
                        <JapaneseYen className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                            <span className="text-gray-500 text-xs block mb-0.5">費用目安</span>
                            <span className="font-medium text-gray-700">{priceRange}</span>
                        </div>
                    </div>
                )}

                <div className="flex items-start gap-2 sm:col-span-2">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div>
                        <span className="text-gray-500 text-xs block mb-0.5">最終更新日</span>
                        <time dateTime={lastUpdated || defaultDate} className="font-medium text-gray-700">
                            {lastUpdated || defaultDate.replace(/-/g, '/')}
                        </time>
                    </div>
                </div>
            </div>
        </div>
    );
}
