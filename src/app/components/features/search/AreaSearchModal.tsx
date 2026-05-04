"use client";

import { useState, useMemo, useEffect } from "react";
import { X, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";

interface AreaSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialPrefecture?: string;
}

export function AreaSearchModal({ isOpen, onClose, initialPrefecture }: AreaSearchModalProps) {
    const [selectedPref, setSelectedPref] = useState(initialPrefecture || "東京都");
    const [counts, setCounts] = useState<Record<string, Record<string, number>>>({}); // { Tokyo: { Minato: 5 } }

    useEffect(() => {
        if (isOpen) {
            // Aggregate on open
            fetch('/api/temples?status=public')
                .then(res => res.json())
                .then((temples: { prefecture: string; cityName: string }[]) => {
                    const newCounts: Record<string, Record<string, number>> = {};

                    temples.forEach(t => {
                        const p = t.prefecture;
                        const c = t.cityName;
                        if (!p || !c) return;

                        if (!newCounts[p]) newCounts[p] = {};
                        if (!newCounts[p][c]) newCounts[p][c] = 0;
                        newCounts[p][c]++;
                    });
                    setCounts(newCounts);

                    if (initialPrefecture) setSelectedPref(initialPrefecture);
                })
                .catch(err => console.error("Failed to fetch temples for modal:", err));
        }
    }, [isOpen, initialPrefecture]);

    // Derived City List for Selected Pref
    const cityList = useMemo(() => {
        if (!counts[selectedPref]) return [];
        return Object.entries(counts[selectedPref])
            .map(([city, count]) => ({ city, count }))
            .sort((a, b) => a.city.localeCompare(b.city, "ja"));
    }, [counts, selectedPref]);

    const totalCount = cityList.reduce((acc, curr) => acc + curr.count, 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-gray-50 border-b border-gray-100 p-4 md:p-6 flex justify-between items-center shrink-0">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-primary flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-secondary" /> 地域から探す
                        </h2>
                        <p className="text-xs text-gray-500 mt-1 hidden md:block">
                            ご希望のエリアを選択してください。市区町村ごとに霊園・墓地を検索できます。
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Mobile/Tablet Prefecture Scroll Tabs (Horizontal) */}
                <div className="border-b border-gray-200 overflow-x-auto shrink-0 bg-white">
                    <div className="flex px-4 pt-2 min-w-max">
                        {/* Major Prefectures Quick Access */}
                        {["東京都", "神奈川県", "埼玉県", "千葉県", "大阪府", "兵庫県", "愛知県", "北海道", "福岡県"].map(pref => (
                            <button
                                key={pref}
                                onClick={() => setSelectedPref(pref)}
                                className={`px-4 py-3 text-sm font-bold border-b-4 transition-colors ${selectedPref === pref ? 'border-secondary text-secondary' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
                            >
                                {pref}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-white min-h-[300px]">
                    <div className="mb-6 flex items-baseline justify-between border-b pb-2 border-gray-100">
                        <h3 className="font-bold text-xl text-gray-800">
                            {selectedPref}の霊園・墓地
                        </h3>
                        <Link
                            href={`/area/${encodeURIComponent(selectedPref)}`}
                            className="text-sm font-bold text-primary hover:underline flex items-center"
                            onClick={onClose}
                        >
                            {selectedPref}内すべてを見る ({totalCount}件) <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {cityList.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {cityList.map(({ city, count }) => (
                                <Link
                                    key={city}
                                    href={`/area/${encodeURIComponent(selectedPref)}/${encodeURIComponent(city)}`}
                                    className="block p-3 rounded border border-gray-100 hover:border-primary hover:bg-blue-50 transition-all group"
                                    onClick={onClose}
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                                            {city}
                                        </span>
                                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-white group-hover:text-primary">
                                            {count}件
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                            <p className="text-gray-500 text-sm">現在、このエリア（{selectedPref}）の登録情報は準備中です。</p>
                            <Link href="/search" className="text-primary text-sm mt-2 inline-block hover:underline" onClick={onClose}>
                                他の条件で探す
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
