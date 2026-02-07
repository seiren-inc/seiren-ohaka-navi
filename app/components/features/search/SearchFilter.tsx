"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { PREFECTURES } from "../../../lib/prefectures";
import { FacilityType, MemorialType, Sect, BuddhistSect, BUDDHIST_SECTS, BUDDHIST_SECT_GROUPS } from "@/lib/store";
import { Button } from "../../ui/Button";
import { Filter, RotateCcw, Search } from "lucide-react";

export function SearchFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Local state for filters
    const [prefs, setPrefs] = useState<string[]>([]);
    const [types, setTypes] = useState<FacilityType[]>([]);
    const [sects, setSects] = useState<Sect[]>([]);
    const [buddhistSects, setBuddhistSects] = useState<BuddhistSect[]>([]); // New Filter
    const [memorials, setMemorials] = useState<MemorialType[]>([]);
    const [features, setFeatures] = useState<string[]>([]); // pet, barrierFree, etc.
    const [priceMax, setPriceMax] = useState<string>("");

    // Initialize from URL
    useEffect(() => {
        setPrefs(searchParams.getAll("pref"));
        setTypes(searchParams.getAll("type") as FacilityType[]);
        setSects(searchParams.getAll("sect") as Sect[]);
        setBuddhistSects(searchParams.getAll("buddhistSect") as BuddhistSect[]);
        setMemorials(searchParams.getAll("memorial") as MemorialType[]);
        setFeatures(searchParams.getAll("feature"));
        setPriceMax(searchParams.get("priceMax") || "");
    }, [searchParams]);

    const applyFilters = useCallback(() => {
        const params = new URLSearchParams();
        prefs.forEach(p => params.append("pref", p));
        types.forEach(p => params.append("type", p));
        sects.forEach(p => params.append("sect", p));
        buddhistSects.forEach(p => params.append("buddhistSect", p));
        memorials.forEach(p => params.append("memorial", p));
        features.forEach(p => params.append("feature", p));
        if (priceMax) params.set("priceMax", priceMax);

        // Reset pagination if exists
        params.delete("page");

        router.push(`/search?${params.toString()}`, { scroll: false });
    }, [router, prefs, types, sects, buddhistSects, memorials, features, priceMax]);

    const resetFilters = () => {
        setPrefs([]);
        setTypes([]);
        setSects([]);
        setBuddhistSects([]);
        setMemorials([]);
        setFeatures([]);
        setPriceMax("");
        router.push('/search');
    };

    // Toggle Helper
    const toggle = <T extends string>(list: T[], val: T, setFn: (l: T[]) => void) => {
        setFn(list.includes(val) ? list.filter(v => v !== val) : [...list, val]);
    };

    return (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-seiren-navy flex items-center gap-2">
                    <Filter className="w-5 h-5" /> 条件で絞り込む
                </h3>
                <button onClick={resetFilters} className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1">
                    <RotateCcw className="w-3 h-3" /> クリア
                </button>
            </div>

            {/* Price Filter - New */}
            <div className="mb-8 border-b pb-6 border-dashed">
                <h4 className="font-bold text-sm text-gray-700 mb-3">予算上限</h4>
                <select
                    className="w-full border p-2 rounded bg-gray-50"
                    value={priceMax}
                    onChange={e => setPriceMax(e.target.value)}
                >
                    <option value="">指定なし</option>
                    <option value="500000">50万円以下</option>
                    <option value="1000000">100万円以下</option>
                    <option value="1500000">150万円以下</option>
                    <option value="2000000">200万円以下</option>
                    <option value="3000000">300万円以下</option>
                </select>
            </div>

            {/* Area Filter */}
            <div className="mb-8 border-b pb-6 border-dashed">
                <h4 className="font-bold text-sm text-gray-700 mb-3">エリア (都道府県)</h4>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                    {PREFECTURES.map((region) => (
                        <div key={region.region}>
                            <h5 className="text-xs font-bold text-gray-400 mb-2">{region.region}</h5>
                            <div className="grid grid-cols-2 gap-2">
                                {region.items.map(pref => (
                                    <label key={pref} className={`flex items-center space-x-2 cursor-pointer p-1.5 rounded transition-colors text-xs ${prefs.includes(pref) ? 'bg-seiren-navy/10 font-bold text-seiren-navy' : 'hover:bg-gray-50 text-gray-700'}`}>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={prefs.includes(pref)}
                                            onChange={() => toggle(prefs, pref, setPrefs)}
                                        />
                                        <div className={`w-3 h-3 rounded-full border ${prefs.includes(pref) ? 'bg-seiren-navy border-seiren-navy' : 'border-gray-300'}`} />
                                        <span>{pref}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Facility Type */}
            <div className="mb-8 border-b pb-6 border-dashed">
                <h4 className="font-bold text-sm text-gray-700 mb-3">施設タイプ</h4>
                <div className="space-y-2">
                    {['寺院墓地', '民営霊園', '公営霊園', '納骨堂', '複合型'].map(type => (
                        <label key={type} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-seiren-navy rounded border-gray-300 focus:ring-seiren-navy"
                                checked={types.includes(type as FacilityType)}
                                onChange={() => toggle(types, type as FacilityType, setTypes)}
                            />
                            <span className="text-gray-700 text-sm">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Buddhist Sect Filter (Only show if Temple related or no type selected) */}
            <div className="mb-8 border-b pb-6 border-dashed">
                <h4 className="font-bold text-sm text-gray-700 mb-3">宗派 (寺院)</h4>
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                    {BUDDHIST_SECT_GROUPS.map(group => (
                        <div key={group.label}>
                            <h5 className="text-xs font-bold text-gray-400 mb-2">{group.label}</h5>
                            <div className="space-y-1">
                                {group.options.map(sectKey => (
                                    <label key={sectKey} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded transition-colors">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-4 w-4 text-seiren-navy rounded border-gray-300 focus:ring-seiren-navy"
                                            checked={buddhistSects.includes(sectKey as BuddhistSect)}
                                            onChange={() => toggle(buddhistSects, sectKey as BuddhistSect, setBuddhistSects)}
                                        />
                                        <span className="text-gray-700 text-sm">{BUDDHIST_SECTS[sectKey as BuddhistSect]}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Memorial Type */}
            <div className="mb-8 border-b pb-6 border-dashed">
                <h4 className="font-bold text-sm text-gray-700 mb-3">供養形態</h4>
                <div className="space-y-2">
                    {['一般墓', '永代供養墓', '樹木葬', '納骨堂'].map(m => (
                        <label key={m} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4 text-seiren-navy rounded border-gray-300 focus:ring-seiren-navy"
                                checked={memorials.includes(m as MemorialType)}
                                onChange={() => toggle(memorials, m as MemorialType, setMemorials)}
                            />
                            <span className="text-gray-700 text-sm">{m}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Features (Tags) */}
            <div className="mb-8">
                <h4 className="font-bold text-sm text-gray-700 mb-3">こだわり条件</h4>
                <div className="flex flex-wrap gap-2">
                    {[
                        { id: 'petAllowed', label: 'ペット可' },
                        { id: 'barrierFree', label: 'バリアフリー' },
                        { id: 'parking', label: '駐車場あり' },
                        { id: 'station', label: '駅近' },
                        { id: 'religiousFree', label: '宗教不問' }
                    ].map(feat => (
                        <label key={feat.id} className="cursor-pointer">
                            <input
                                type="checkbox"
                                className="peer sr-only"
                                checked={features.includes(feat.id)}
                                onChange={() => toggle(features, feat.id, setFeatures)}
                            />
                            <span className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 bg-white peer-checked:bg-seiren-navy peer-checked:text-white peer-checked:border-seiren-navy hover:border-seiren-navy hover:text-seiren-navy transition-all select-none block">
                                {feat.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <Button className="w-full font-bold shadow-md" onClick={applyFilters}>
                <Search className="w-4 h-4 mr-2" />
                この条件で検索
            </Button>
        </div>
    );
}
