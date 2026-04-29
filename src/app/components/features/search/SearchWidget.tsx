"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/Button";
import { Search, MapPin, Tag } from "lucide-react";
import { clsx } from "clsx";

const TABS = [
    { id: "general", label: "一般墓" },
    { id: "eitai", label: "永代供養墓" },
    { id: "tree", label: "樹木葬" },
    { id: "nokotsu", label: "納骨堂" },
];

const PREFECTURES = [
    "東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"
];

const FEATURES = [
    { id: "religiousFree", label: "宗教不問" },
    { id: "station", label: "駅近" },
    { id: "barrierFree", label: "バリアフリー" },
    { id: "petAllowed", label: "ペット可" },
];

export function SearchWidget() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("eitai");
    const [selectedPrefecture, setSelectedPrefecture] = useState("");
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

    const handleFeatureToggle = (feature: string) => {
        setSelectedFeatures(prev =>
            prev.includes(feature)
                ? prev.filter(f => f !== feature)
                : [...prev, feature]
        );
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        params.set("type", activeTab);
        if (selectedPrefecture) params.set("pref", selectedPrefecture);
        if (selectedFeatures.length > 0) params.set("feature", selectedFeatures.join(","));
        router.push(`/search?${params.toString()}`);
    };

    const handleCitySearch = (city: string) => {
        router.push(`/search?city=${encodeURIComponent(city)}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl shadow-primary/10 overflow-hidden w-full max-w-4xl mx-auto border border-gray-100">
            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-gray-50/50">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clsx(
                            "flex-1 py-5 text-sm sm:text-base font-medium transition-all relative",
                            activeTab === tab.id
                                ? "text-primary bg-white font-bold"
                                : "text-gray-500 hover:text-primary hover:bg-white/50"
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <span className="absolute top-0 left-0 w-full h-1 bg-primary" />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

                    {/* Area Selection */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <MapPin className="w-4 h-4 text-primary-soft" />
                            エリアから探す
                        </label>
                        <div className="relative">
                            <select
                                value={selectedPrefecture}
                                onChange={(e) => setSelectedPrefecture(e.target.value)}
                                className="w-full h-12 pl-4 pr-10 border border-gray-200 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-600"
                            >
                                <option value="">都道府県を選択</option>
                                {PREFECTURES.map(pref => (
                                    <option key={pref} value={pref}>{pref}</option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                ▼
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-xs text-gray-400 mb-2">人気の市区町村</p>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                <button onClick={() => handleCitySearch("世田谷区")} className="hover:text-primary hover:underline">世田谷区</button>
                                <button onClick={() => handleCitySearch("八王子市")} className="hover:text-primary hover:underline">八王子市</button>
                                <button onClick={() => handleCitySearch("府中市")} className="hover:text-primary hover:underline">府中市</button>
                                <button onClick={() => handleCitySearch("横浜市")} className="hover:text-primary hover:underline">横浜市</button>
                            </div>
                        </div>
                    </div>

                    {/* Condition Tags */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            <Tag className="w-4 h-4 text-primary-soft" />
                            こだわり条件
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {FEATURES.map(feature => (
                                <label key={feature.id} className="inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={selectedFeatures.includes(feature.id)}
                                        onChange={() => handleFeatureToggle(feature.id)}
                                    />
                                    <span className="px-3 py-2 rounded-full border border-gray-200 text-xs sm:text-sm text-gray-600 bg-white peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:border-primary hover:text-primary transition-all select-none">
                                        {feature.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto min-w-[300px] shadow-card font-bold text-lg"
                        onClick={handleSearch}
                    >
                        <Search className="w-5 h-5 mr-2" />
                        この条件で検索する
                    </Button>
                </div>
            </div>
        </div>
    );
}
