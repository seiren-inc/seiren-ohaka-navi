"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "../../ui/Button";
import { SlidersHorizontal, X } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";

// Filter Options (Synced with Store)
const MEMORIAL_TYPES = ['一般墓', '永代供養墓', '樹木葬', '納骨堂'];
const TAGS = ['駅近', 'ペット可', 'バリアフリー', '駐車場', '宗教不問'];
const PREFECTURES = ["東京都", "神奈川県", "埼玉県", "千葉県", "茨城県", "栃木県", "群馬県"];

export function AreaFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    
    // Prevent background scrolling on mobile modal open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Current State
    const currentTypes = searchParams.getAll('type');
    const currentTags = searchParams.getAll('tag');
    const currentPrefecture = searchParams.get('pref');

    const handlePrefectureChange = (pref: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentPrefecture === pref) {
            params.delete('pref');
        } else {
            params.set('pref', pref);
            // Reset city if pref changes
            params.delete('city');
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleTypeChange = (type: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.getAll('type');
        if (current.includes(type)) {
            params.delete('type');
            current.filter(t => t !== type).forEach(t => params.append('type', t));
        } else {
            params.append('type', type);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleTagChange = (tag: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const current = params.getAll('tag');
        if (current.includes(tag)) {
            params.delete('tag');
            current.filter(t => t !== tag).forEach(t => params.append('tag', t));
        } else {
            params.append('tag', tag);
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleReset = () => {
        router.push(pathname, { scroll: false });
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    // Mobile Modal Toggle
    const toggleModal = () => setIsOpen(!isOpen);

    // Calc active filter count
    const activeFilterCount = currentTypes.length + currentTags.length + (currentPrefecture ? 1 : 0);

    return (
        <div className="md:w-72 shrink-0">
            {/* Mobile Trigger */}
            <div className="md:hidden sticky top-[72px] z-40 bg-white/95 backdrop-blur border-b border-gray-100 p-4 -mx-4 mb-4">
                <Button onClick={toggleModal} variant="outline" className="w-full flex justify-between items-center h-12 border-gray-200">
                    <span className="flex items-center font-bold text-gray-700">
                        <SlidersHorizontal className="w-4 h-4 mr-2" /> 条件を絞り込む
                    </span>
                    {activeFilterCount > 0 && (
                        <span className="bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                            {activeFilterCount}
                        </span>
                    )}
                </Button>
            </div>

            {/* Sidebar / Modal Content */}
            <div className={clsx(
                "fixed inset-0 bg-black/50 z-50 transition-opacity md:static md:bg-transparent md:z-auto md:block",
                isOpen ? "opacity-100 visible" : "opacity-0 invisible md:opacity-100 md:visible"
            )}>
                {/* Overlay Click for Mobile */}
                <div className="absolute inset-0 md:hidden" onClick={toggleModal} />

                {/* Bottom Sheet for Mobile, Sidebar for PC */}
                <div className={clsx(
                    "absolute bottom-0 left-0 right-0 w-full bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 transform max-h-[85vh] flex flex-col",
                    "md:static md:transform-none md:w-full md:shadow-none md:bg-transparent md:border md:border-gray-100 md:rounded-xl md:max-h-none",
                    isOpen ? "translate-y-0" : "translate-y-full md:translate-y-0"
                )}>
                    {/* Header (Mobile Only) */}
                    <div className="flex justify-between items-center p-4 border-b border-gray-100 md:hidden shrink-0">
                        <h3 className="font-bold text-lg flex items-center">
                            絞り込み条件
                            {activeFilterCount > 0 && (
                                <span className="ml-2 bg-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </h3>
                        <button onClick={toggleModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="p-6 space-y-8 overflow-y-auto w-full">
                        {/* Selected Tags Summary (PC Only) */}
                        <div className="hidden md:flex justify-between items-center pb-4 border-b border-gray-100">
                            <h3 className="font-bold text-lg">絞り込み</h3>
                            {activeFilterCount > 0 && (
                                <button onClick={handleReset} className="text-xs text-primary hover:underline font-medium">
                                    クリア
                                </button>
                            )}
                        </div>

                        {/* Area */}
                        <div>
                            <h4 className="font-bold text-sm text-gray-700 mb-3 block">都道府県</h4>
                            <div className="relative">
                                <select
                                    value={currentPrefecture || ""}
                                    onChange={(e) => handlePrefectureChange(e.target.value)}
                                    className="w-full h-12 pl-4 pr-10 border border-gray-200 rounded-lg appearance-none bg-white focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm text-gray-700 cursor-pointer"
                                >
                                    <option value="">すべての地域</option>
                                    {PREFECTURES.map(pref => (
                                        <option key={pref} value={pref}>{pref}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">
                                    ▼
                                </div>
                            </div>
                        </div>

                        {/* Grave Type */}
                        <div>
                            <h4 className="font-bold text-sm text-gray-700 mb-3">供養タイプ（複数可）</h4>
                            <div className="flex flex-col gap-3">
                                {MEMORIAL_TYPES.map(type => (
                                    <label key={type} className="flex items-center cursor-pointer group">
                                        <div className="relative flex items-center justify-center w-5 h-5 mr-3">
                                            <input
                                                type="checkbox"
                                                checked={currentTypes.includes(type)}
                                                onChange={() => handleTypeChange(type)}
                                                className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded focus:ring-1 focus:ring-primary focus:outline-none checked:bg-primary checked:border-primary transition-all cursor-pointer"
                                            />
                                            <svg className="absolute w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Feature Tags */}
                        <div>
                            <h4 className="font-bold text-sm text-gray-700 mb-3">こだわり条件</h4>
                            <div className="flex flex-wrap gap-2">
                                {TAGS.map(tag => {
                                    const isSelected = currentTags.includes(tag);
                                    return (
                                        <button
                                            key={tag}
                                            onClick={() => handleTagChange(tag)}
                                            className={clsx(
                                                "px-3 py-1.5 rounded-full text-xs font-bold transition-all border",
                                                isSelected
                                                    ? "bg-primary text-white border-primary"
                                                    : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
                                            )}
                                        >
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Footer / Apply Button (Mobile Only) */}
                    <div className="p-4 border-t border-gray-100 bg-white md:hidden shrink-0">
                        <div className="flex gap-2">
                           <Button 
                               variant="outline" 
                               onClick={handleReset} 
                               className="flex-1 h-12"
                           >
                               クリア
                           </Button>
                           <Button 
                               onClick={toggleModal} 
                               className="flex-[2] h-12 shadow-primary/20 shadow-lg text-base font-bold"
                           >
                               結果を表示
                           </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
