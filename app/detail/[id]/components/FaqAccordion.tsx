"use client";

import { FacilityFaq } from "../mock";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqAccordionProps {
    faqs: FacilityFaq[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-3">
            {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                return (
                    <div key={idx} className="border border-border rounded-lg bg-white overflow-hidden">
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-bg transition-colors"
                        >
                            <span className="flex items-start text-sm font-bold text-primary pr-4">
                                <span className="text-secondary mr-3 text-lg">Q.</span>
                                <span className="pt-0.5">{faq.q}</span>
                            </span>
                            {isOpen ? <Minus className="w-4 h-4 text-text-muted flex-shrink-0" /> : <Plus className="w-4 h-4 text-text-muted flex-shrink-0" />}
                        </button>
                        {isOpen && (
                            <div className="px-4 pb-4 pl-10">
                                <p className="text-sm text-text-secondary leading-loose border-t border-border pt-3">
                                    {faq.a}
                                </p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
