"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-border rounded-2xl bg-white overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
            <button
                className="w-full flex justify-between items-center p-6 sm:p-8 text-left hover:bg-bg-muted/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/20 group"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="font-bold text-text pr-8 group-hover:text-primary transition-colors">{question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-gray-400 group-hover:text-primary transition-transform duration-300 shrink-0 ${
                        isOpen ? "transform rotate-180" : ""
                    }`}
                />
            </button>
            <div
                className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
                aria-hidden={!isOpen}
            >
                <div className="p-6 sm:p-8 pt-0 text-text-muted leading-relaxed whitespace-pre-line border-t border-border mt-2 mx-6 sm:mx-8">
                    {answer}
                </div>
            </div>
        </div>
    );
}
