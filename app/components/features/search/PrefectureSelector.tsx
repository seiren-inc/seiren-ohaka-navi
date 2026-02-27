"use client";

import { useState } from "react";
import { PREFECTURES } from "../../../lib/prefectures";
import { JapanMap } from "./JapanMap";
import { AreaSearchModal } from "./AreaSearchModal";
import { Button } from "../../ui/Button";
import { MapPin } from "lucide-react";

export function PrefectureSelector() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPref, setSelectedPref] = useState("東京都");

    const openModal = (pref?: string) => {
        if (pref) setSelectedPref(pref);
        setIsModalOpen(true);
    };

    return (
        <div className="w-full">
            <AreaSearchModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialPrefecture={selectedPref}
            />

            {/* Big Trigger Button (Mobile) */}
            <div className="md:hidden text-center mb-8">
                <Button
                    onClick={() => openModal("東京都")}
                    className="w-full max-w-xs mx-auto bg-primary text-white shadow-lg h-14 text-lg font-bold"
                >
                    <MapPin className="w-5 h-5 mr-2" /> 地域を選択して探す
                </Button>
            </div>

            {/* SP Layout (Simplified Map) */}
            <div className="md:hidden">
                <div
                    className="mb-6 flex justify-center cursor-pointer active:scale-95 transition-transform"
                    onClick={() => openModal()}
                >
                    <JapanMap className="w-64 h-auto opacity-80" />
                </div>
                {/* List of Regions -> Open Modal */}
                <div className="grid grid-cols-2 gap-3">
                    {PREFECTURES.map((region) => (
                        <button
                            key={region.region}
                            onClick={() => openModal(region.items[0])} // Open with first pref of region
                            className="bg-white p-3 rounded border border-border text-sm font-bold text-text-primary hover:bg-bg flex justify-between items-center"
                        >
                            {region.region}
                            <span className="text-primary text-xs">選択 &gt;</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* PC Layout */}
            <div className="hidden md:flex gap-4 items-stretch justify-center max-w-5xl mx-auto">

                {/* Left Column: West Japan */}
                <div className="w-1/3 flex flex-col justify-center space-y-4">
                    {[PREFECTURES[6], PREFECTURES[4], PREFECTURES[5], PREFECTURES[3]].map((region) => (
                        <div key={region.region} className="bg-white/50 rounded-lg p-3 border border-border/50 hover:border-primary/20 transition-colors">
                            <h4 className="font-bold text-primary text-xs border-b border-primary/20 pb-1 mb-2">
                                {region.region}
                            </h4>
                            <div className="grid grid-cols-4 gap-1.5">
                                {region.items.map((pref) => (
                                    <button
                                        key={pref}
                                        onClick={() => openModal(pref)}
                                        className="text-xs px-1 py-1 rounded bg-white border border-border text-text-secondary hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-center whitespace-nowrap"
                                    >
                                        {pref}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Center Map */}
                <div className="w-1/3 flex items-center justify-center px-4 relative">
                    <div className="relative w-full cursor-pointer group" onClick={() => openModal()}>
                        <JapanMap className="w-full h-auto drop-shadow-xl group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute bottom-10 right-0 left-0 text-center text-xs text-text-muted bg-white/80 py-1 rounded backdrop-blur-sm pointer-events-none">
                            地図をクリックして地域を選択
                        </div>
                    </div>
                </div>

                {/* Right Column: East Japan */}
                <div className="w-1/3 flex flex-col justify-center space-y-4">
                    {[PREFECTURES[0], PREFECTURES[1], PREFECTURES[2]].map((region) => (
                        <div key={region.region} className="bg-white/50 rounded-lg p-3 border border-border/50 hover:border-primary/20 transition-colors">
                            <h4 className="font-bold text-primary text-xs border-b border-primary/20 pb-1 mb-2">
                                {region.region}
                            </h4>
                            <div className="grid grid-cols-4 gap-1.5">
                                {region.items.map((pref) => (
                                    <button
                                        key={pref}
                                        onClick={() => openModal(pref)}
                                        className="text-xs px-1 py-1 rounded bg-white border border-border text-text-secondary hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-center whitespace-nowrap"
                                    >
                                        {pref}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
