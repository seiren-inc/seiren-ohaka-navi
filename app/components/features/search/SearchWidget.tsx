"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/Button";
import { Search, MapPin, Tag, MessageCircle, ArrowRight } from "lucide-react";
import { clsx } from "clsx";
import Link from "next/link";

const SEARCH_TABS = [
    { id: "area", label: "エリアから探す", icon: MapPin },
    { id: "type", label: "供養方法から探す", icon: Tag },
    { id: "consult", label: "まずは相談する", icon: MessageCircle },
];

const PREFECTURES = [
    "東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"
];

const TYPES = [
    { id: "一般墓", label: "一般墓" },
    { id: "樹木葬", label: "樹木葬" },
    { id: "納骨堂", label: "納骨堂" },
    { id: "永代供養墓", label: "永代供養墓" },
];

export function SearchWidget() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("area");
    const [selectedPrefecture, setSelectedPrefecture] = useState("");
    const [selectedType, setSelectedType] = useState("");

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (activeTab === "area" && selectedPrefecture) {
            params.set("pref", selectedPrefecture);
        } else if (activeTab === "type" && selectedType) {
            params.set("type", selectedType);
        }
        router.push(`/search?${params.toString()}`);
    };

    const handleCitySearch = (city: string) => {
        router.push(`/search?pref=東京都&city=${encodeURIComponent(city)}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-2xl shadow-primary/10 overflow-hidden w-full max-w-4xl mx-auto border border-gray-100">
            {/* 3 Main Entrances (Tabs) */}
            <div className="flex border-b border-gray-100 bg-gray-50/50">
                {SEARCH_TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "flex-1 py-4 sm:py-5 px-2 flex flex-col items-center justify-center gap-1 sm:gap-2 transition-all relative overflow-hidden",
                                isActive
                                    ? "text-primary bg-white"
                                    : "text-gray-500 hover:text-primary hover:bg-white/50"
                            )}
                        >
                            <Icon className={clsx("w-5 h-5 sm:w-6 sm:h-6", isActive ? "text-primary" : "text-gray-400")} />
                            <span className={clsx("text-xs sm:text-sm font-bold tracking-tight", isActive ? "text-primary" : "")}>
                                {tab.label}
                            </span>
                            {isActive && (
                                <span className="absolute top-0 left-0 w-full h-1 bg-primary" />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 min-h-[240px] flex flex-col justify-center">
                {activeTab === "area" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="max-w-xl mx-auto space-y-2">
                           <label className="block text-sm font-bold text-gray-700 text-center mb-4">
                               ご希望の都道府県を選択してください
                           </label>
                           <div className="relative">
                               <select
                                   value={selectedPrefecture}
                                   onChange={(e) => setSelectedPrefecture(e.target.value)}
                                   className="w-full h-14 pl-4 pr-10 border-2 border-gray-200 rounded-xl appearance-none bg-white focus:ring-0 focus:border-primary transition-all text-gray-700 font-bold text-lg cursor-pointer"
                               >
                                   <option value="" disabled>都道府県を選択</option>
                                   {PREFECTURES.map(pref => (
                                       <option key={pref} value={pref}>{pref}</option>
                                   ))}
                               </select>
                               <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                   ▼
                               </div>
                           </div>
                        </div>

                        {/* Popular Cities Quick Link */}
                        <div className="text-center mt-6">
                            <p className="text-xs text-gray-400 mb-2">人気のエリア（東京）</p>
                            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600">
                                <button onClick={() => handleCitySearch("世田谷区")} className="bg-gray-50 hover:bg-blue-50 hover:text-primary px-3 py-1.5 rounded-full border border-gray-100 transition-colors">世田谷区</button>
                                <button onClick={() => handleCitySearch("八王子市")} className="bg-gray-50 hover:bg-blue-50 hover:text-primary px-3 py-1.5 rounded-full border border-gray-100 transition-colors">八王子市</button>
                                <button onClick={() => handleCitySearch("府中市")} className="bg-gray-50 hover:bg-blue-50 hover:text-primary px-3 py-1.5 rounded-full border border-gray-100 transition-colors">府中市</button>
                                <button onClick={() => handleCitySearch("町田市")} className="bg-gray-50 hover:bg-blue-50 hover:text-primary px-3 py-1.5 rounded-full border border-gray-100 transition-colors">町田市</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "type" && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <label className="block text-sm font-bold text-gray-700 text-center mb-2">
                           ご希望のお墓の種類を選択してください
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                            {TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={clsx(
                                        "py-4 px-2 rounded-xl border-2 font-bold text-sm transition-all focus:outline-none",
                                        selectedType === type.id
                                            ? "border-primary bg-primary/5 text-primary"
                                            : "border-gray-100 bg-white text-gray-600 hover:border-primary/30 hover:bg-gray-50"
                                    )}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "consult" && (
                    <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-xl mx-auto">
                        <div>
                            <p className="text-lg font-bold text-gray-800 mb-2">何から探せばいいか迷っていませんか？</p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                専門の相談員が、ご希望やご予算に合わせて最適な霊園・墓地を無料でご提案いたします。しつこい営業は一切いたしません。
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/consult/grave-search" className="inline-flex items-center justify-center h-14 px-8 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                                無料で相談する <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                    </div>
                )}

                {/* Common Search CTA (Only for Area and Type) */}
                {activeTab !== "consult" && (
                     <div className="text-center mt-8">
                         <Button
                             size="lg"
                             className="w-full sm:w-auto min-w-[280px] shadow-lg shadow-primary/20 font-bold text-lg h-14 rounded-xl"
                             onClick={handleSearch}
                             disabled={activeTab === "area" ? !selectedPrefecture : !selectedType}
                         >
                             <Search className="w-5 h-5 mr-2" />
                             この条件で探す
                         </Button>
                     </div>
                )}
            </div>
        </div>
    );
}
