"use client";

import { useState, useEffect } from "react";

export function SectionTabs() {
    const tabs = [
        { id: "top", label: "トップ" },
        { id: "features", label: "特徴" },
        { id: "plans", label: "販売区画" },
        { id: "reviews", label: "口コミ" },
        { id: "access", label: "地図" },
        { id: "faq", label: "Q&A" },
    ];

    const [activeId, setActiveId] = useState("top");

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 120; // sticky header + tab height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            setActiveId(id);
        }
    };

    return (
        <div className="sticky top-[60px] z-30 bg-white shadow-sm border-b border-border overflow-x-auto scrollbar-hide">
            <div className="flex md:justify-center min-w-max px-4">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => scrollTo(tab.id)}
                        className={`
                            px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap
                            ${activeId === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-text-muted hover:text-primary-dark'
                            }
                        `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
