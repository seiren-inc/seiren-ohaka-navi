"use client";

import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";

const FAQ_DATA = [
    { q: "見学は必須ですか？", a: "必須ではありませんが、実際の雰囲気や設備をご確認いただくことをおすすめしております。" },
    { q: "追加費用はかかりますか？", a: "通常、プランに含まれる費用以外に追加費用は発生しません。ただし、法要などを希望される場合は別途費用がかかる場合がございます。" },
    { q: "将来合祀されますか？", a: "プランにより異なります。「永代供養」が付いているプランは、一定期間後または最初から合祀される形式が一般的です。詳細は各プランをご確認ください。" },
    { q: "ペットと一緒に入れますか？", a: "ペット共葬可能な区画をご用意しているプランもございます。「ペット可」のアイコンが付いているプランをご確認ください。" }
];

export function TempleFAQ() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-8">
            <h2 className="text-xl font-bold text-primary border-l-4 border-secondary pl-4 py-1 mb-6">
                よくある質問
            </h2>

            <div className="space-y-4">
                {FAQ_DATA.map((item, i) => (
                    <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
            </div>

            <p className="text-right text-xs text-text-muted mt-4">
                ※ 詳細は資料請求にてご確認ください
            </p>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-border rounded-lg overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-bg hover:bg-bg transition-colors text-left"
            >
                <div className="flex items-center gap-3 font-bold text-primary-dark text-sm">
                    <span className="text-primary font-serif italic text-lg">Q.</span>
                    {question}
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-text-muted" /> : <ChevronDown className="w-5 h-5 text-text-muted" />}
            </button>
            {isOpen && (
                <div className="p-4 bg-white text-text-secondary text-sm leading-relaxed border-t border-border flex gap-3">
                    <span className="text-red-500 font-serif italic text-lg font-bold">A.</span>
                    <div>{answer}</div>
                </div>
            )}
        </div>
    );
}
