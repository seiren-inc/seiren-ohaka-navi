"use client";

import { Temple } from "@/lib/store";
import { MapPin, Train, Car, Info } from "lucide-react";

interface TempleAccessProps {
    data: Temple;
}

export function TempleAccess({ data }: TempleAccessProps) {
    return (
        <div id="access" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-seiren-navy border-l-4 border-secondary pl-4 py-1 mb-6">
                アクセス・地図
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <dl className="space-y-6">
                        <div>
                            <dt className="flex items-center text-sm font-bold text-gray-500 mb-2">
                                <MapPin className="w-4 h-4 mr-2 text-primary" /> 住所
                            </dt>
                            <dd className="text-gray-800 font-medium pl-6 text-base">
                                {data.address}
                            </dd>
                        </div>
                        <div>
                            <dt className="flex items-center text-sm font-bold text-gray-500 mb-2">
                                <Train className="w-4 h-4 mr-2 text-primary" /> 最寄り駅
                            </dt>
                            <dd className="pl-6 space-y-3">
                                {data.nearestStations.map((st, i) => (
                                    <div key={i} className="text-gray-800">
                                        <span className="font-bold border-b-2 border-primary/20">{st.line} 「{st.name}」</span>
                                        <span className="text-sm text-gray-600 ml-2 font-bold">徒歩 {st.walkMinutes}分</span>
                                    </div>
                                ))}
                            </dd>
                        </div>
                        {data.access && (
                            <div>
                                <dt className="flex items-center text-sm font-bold text-gray-500 mb-2">
                                    <Car className="w-4 h-4 mr-2 text-primary" /> お車・その他
                                </dt>
                                <dd className="text-sm text-gray-600 pl-6 leading-relaxed bg-gray-50 p-3 rounded">
                                    {data.access}
                                </dd>
                            </div>
                        )}
                        <div>
                            <dt className="flex items-center text-sm font-bold text-gray-500 mb-2">
                                <Info className="w-4 h-4 mr-2 text-primary" /> 駐車場
                            </dt>
                            <dd className="text-sm text-gray-800 pl-6 font-bold">
                                あり（無料 / 要確認）
                            </dd>
                        </div>
                    </dl>
                </div>

                {/* Map Placeholder */}
                <div className="h-full min-h-[250px] bg-gray-100 rounded-lg overflow-hidden relative">
                    {data.lat && data.lng ? (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src={`https://maps.google.com/maps?q=${data.lat},${data.lng}&z=15&output=embed`}
                            ></iframe>
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold bg-gray-200">
                            Map Placeholder
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
