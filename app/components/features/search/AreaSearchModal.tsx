"use client";

import { useState, useMemo, useEffect } from "react";
import { X, ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";
import { PREFECTURES } from "../../../lib/prefectures";

interface AreaSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrefecture?: string;
}

// Group Prefectures for Tabs (simplified)
const REGIONS = [
  {
    name: "関東",
    prefs: [
      "東京都",
      "神奈川県",
      "埼玉県",
      "千葉県",
      "茨城県",
      "栃木県",
      "群馬県",
    ],
  },
  {
    name: "関西",
    prefs: ["大阪府", "兵庫県", "京都府", "奈良県", "滋賀県", "和歌山県"],
  },
  { name: "その他", prefs: [] as string[] }, // Logic to fill others
];

export function AreaSearchModal({
  isOpen,
  onClose,
  initialPrefecture,
}: AreaSearchModalProps) {
  const [activeRegion, setActiveRegion] = useState<string>("関東");
  const [selectedPref, setSelectedPref] = useState(
    initialPrefecture || "東京都",
  );
  const [counts, setCounts] = useState<Record<string, Record<string, number>>>(
    {},
  ); // { Tokyo: { Minato: 5 } }
  const [viewState, setViewState] = useState<"region" | "city">("region");

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (isOpen) {
      // Find region for initial pref
      if (initialPrefecture) {
        const region = PREFECTURES.find((r) =>
          r.items.includes(initialPrefecture),
        );
        if (region) setActiveRegion(region.region);
        setViewState("city");
      }

      // Aggregate on open
      fetch("/api/temples?status=public")
        .then((res) => res.json())
        .then((temples: { prefecture: string; cityName: string }[]) => {
          const newCounts: Record<string, Record<string, number>> = {};
          temples.forEach((t) => {
            const p = t.prefecture;
            const c = t.cityName;
            if (!p || !c) return;

            if (!newCounts[p]) newCounts[p] = {};
            if (!newCounts[p][c]) newCounts[p][c] = 0;
            newCounts[p][c]++;
          });
          setCounts(newCounts);
        })
        .catch((err) =>
          console.error("Failed to fetch temples for modal:", err),
        );
    }
  }, [isOpen, initialPrefecture]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Derived City List for Selected Pref
  const cityList = useMemo(() => {
    if (!counts[selectedPref]) return [];
    return Object.entries(counts[selectedPref])
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count); // Sort by count desc
  }, [counts, selectedPref]);

  const totalCount = cityList.reduce((acc, curr) => acc + curr.count, 0);

  const handlePrefClick = (pref: string) => {
    setSelectedPref(pref);
    setViewState("city");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content - Mega Overlay Style */}
      <div className="relative w-full h-full md:h-auto md:max-h-[85vh] md:max-w-5xl bg-white md:rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-primary text-white p-4 md:px-6 md:py-4 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-lg md:text-xl font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" /> エリアからお墓を探す
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-primary-hover rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden flex-col md:flex-row bg-gray-50 border-t border-gray-100">
          {viewState === "region" ? (
            <>
              {/* Region Navigation (Left Sidebar on PC) */}
              <div className="w-full md:w-1/4 bg-white border-r border-gray-200 overflow-y-auto">
                <ul className="flex md:flex-col overflow-x-auto md:overflow-x-visible">
                  {PREFECTURES.map((r) => (
                    <li key={r.region} className="shrink-0 md:shrink">
                      <button
                        onClick={() => setActiveRegion(r.region)}
                        className={`w-full text-left px-4 py-4 md:py-5 border-b-2 md:border-b-0 md:border-l-4 font-bold text-sm md:text-base transition-colors whitespace-nowrap
                                                    ${
                                                      activeRegion === r.region
                                                        ? "bg-blue-50/50 border-primary text-primary"
                                                        : "border-transparent text-gray-600 hover:bg-gray-50"
                                                    }`}
                      >
                        {r.region}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prefectures Grid (Right Content on PC) */}
              <div className="w-full md:w-3/4 p-4 md:p-8 overflow-y-auto bg-gray-50">
                <h3 className="font-bold text-lg text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  {activeRegion}の都道府県を選択
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                  {PREFECTURES.find(
                    (r) => r.region === activeRegion,
                  )?.items.map((pref) => {
                    const prefTotal = Object.values(counts[pref] || {}).reduce(
                      (a, b) => a + b,
                      0,
                    );
                    return (
                      <button
                        key={pref}
                        onClick={() => handlePrefClick(pref)}
                        className="bg-white border border-gray-200 p-3 md:p-4 rounded-lg shadow-sm hover:border-primary hover:shadow-md transition-all text-left group flex justify-between items-center"
                      >
                        <span className="font-bold text-gray-800 group-hover:text-primary transition-colors">
                          {pref}
                        </span>
                        {prefTotal > 0 && (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                            {prefTotal}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* City Selection View */
            <div className="w-full p-4 md:p-8 overflow-y-auto bg-white flex flex-col h-full">
              <div className="mb-6 flex items-center gap-4 border-b pb-4 border-gray-100">
                <button
                  onClick={() => setViewState("region")}
                  className="text-sm text-gray-500 hover:text-primary flex items-center border border-gray-200 px-3 py-1.5 rounded bg-gray-50 hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4 mr-1 rotate-180" />{" "}
                  都道府県を選び直す
                </button>
              </div>

              <div className="flex items-baseline justify-between mb-6">
                <h3 className="font-bold text-xl md:text-2xl text-gray-800">
                  {selectedPref}の市区町村
                </h3>
                <Link
                  href={`/area/${encodeURIComponent(selectedPref)}`}
                  className="text-sm font-bold text-white bg-primary hover:bg-primary-hover px-4 py-2 rounded-lg transition-colors flex items-center"
                  onClick={onClose}
                >
                  {selectedPref}すべて ({totalCount}件){" "}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {cityList.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cityList.map(({ city, count }) => (
                    <Link
                      key={city}
                      href={`/area/${encodeURIComponent(selectedPref)}/${encodeURIComponent(city)}`}
                      className="block p-3 rounded-lg border border-gray-100 hover:border-primary hover:bg-blue-50/50 hover:shadow-sm transition-all group"
                      onClick={onClose}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-700 group-hover:text-primary transition-colors">
                          {city}
                        </span>
                        <span className="text-[10px] md:text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full group-hover:bg-white group-hover:text-primary transition-colors">
                          {count}件
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 my-auto">
                  <p className="text-gray-500 font-medium">
                    現在、{selectedPref}の登録情報は準備中です。
                  </p>
                  <button
                    onClick={() => setViewState("region")}
                    className="text-primary text-sm mt-4 font-bold hover:underline inline-flex items-center"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
                    他のエリアを探す
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
