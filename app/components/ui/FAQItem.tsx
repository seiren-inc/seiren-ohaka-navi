"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-border rounded-[12px] bg-white overflow-hidden transition-all duration-300">
            <button
                className="w-full flex justify-between items-center p-6 text-left hover:bg-bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-soft/20"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <span className="font-bold text-text pr-8">{question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-text-muted transition-transform duration-300 shrink-0 ${
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
                <div className="p-6 pt-0 text-text-muted leading-relaxed whitespace-pre-line border-t border-border mt-2 mx-6">
                    {answer}
                </div>
            </div>
        </div>
    );
}
