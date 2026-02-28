"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/Button";
import { Search, MapPin, Tag } from "lucide-react";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
    { id: "general", label: "一般墓" },
    { id: "eitai", label: "永代供養墓" },
    { id: "tree", label: "樹木葬" },
    { id: "nokotsu", label: "納骨堂" },
];

const PREFECTURES = [
    "東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"
];

const TAGS = [
    "宗教不問", "檀家義務なし", "管理料不要", "駅近", "バリアフリー", "ペット可"
];

export function SearchWidget() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("eitai");
    const [selectedPrefecture, setSelectedPrefecture] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagToggle = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleSearch = () => {
        const params = new URLSearchParams();
        params.set("type", activeTab);
        if (selectedPrefecture) params.set("prefecture", selectedPrefecture);
        if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
        router.push(`/search?${params.toString()}`);
    };

    const handleCitySearch = (city: string) => {
        router.push(`/search?city=${encodeURIComponent(city)}`);
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl shadow-black/8 overflow-hidden w-full max-w-4xl mx-auto border border-white/60">
            <div className="flex relative border-b border-border bg-bg/60">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={clsx(
                            "flex-1 py-4 text-sm sm:text-base font-medium transition-colors duration-200 relative",
                            activeTab === tab.id
                                ? "text-primary font-bold"
                                : "text-text-muted hover:text-text-primary"
                        )}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.span
                                layoutId="tab-indicator"
                                className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"
                                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
                    >
                        {/* Area Selection */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-bold text-text-primary">
                                <MapPin className="w-4 h-4 text-secondary" />
                                エリアから探す
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedPrefecture}
                                    onChange={(e) => setSelectedPrefecture(e.target.value)}
                                    className="w-full h-12 pl-4 pr-10 border border-border rounded-xl appearance-none bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-text-primary"
                                >
                                    <option value="">都道府県を選択</option>
                                    {PREFECTURES.map(pref => (
                                        <option key={pref} value={pref}>{pref}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted text-xs">
                                    ▼
                                </div>
                            </div>

                            <div className="mt-4">
                                <p className="text-xs text-text-muted mb-2">人気の市区町村</p>
                                <div className="flex flex-wrap gap-2 text-xs text-text-muted">
                                    {["世田谷区", "八王子市", "府中市", "横浜市"].map(city => (
                                        <button
                                            key={city}
                                            onClick={() => handleCitySearch(city)}
                                            className="hover:text-primary hover:underline transition-colors"
                                        >
                                            {city}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Condition Tags */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-sm font-bold text-text-primary">
                                <Tag className="w-4 h-4 text-secondary" />
                                こだわり条件
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {TAGS.map(tag => (
                                    <label key={tag} className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={selectedTags.includes(tag)}
                                            onChange={() => handleTagToggle(tag)}
                                        />
                                        <span className="px-3 py-1.5 rounded-full border border-border text-xs text-text-secondary bg-white peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:border-primary/50 hover:text-primary transition-all duration-200 select-none">
                                            {tag}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* CTA */}
                <div className="text-center">
                    <Button
                        size="lg"
                        className="w-full sm:w-auto min-w-[280px] font-bold text-base shadow-lg shadow-primary/25 active:scale-[0.98] transition-transform"
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
