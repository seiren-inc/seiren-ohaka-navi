"use client";

import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";
import { FAQItem } from "../../ui/FAQItem";

const FAQ_DATA = [
    { q: "見学は必須ですか？", a: "必須ではありませんが、実際の雰囲気や設備をご確認いただくことをおすすめしております。" },
    { q: "追加費用はかかりますか？", a: "通常、プランに含まれる費用以外に追加費用は発生しません。ただし、法要などを希望される場合は別途費用がかかる場合がございます。" },
    { q: "将来合祀されますか？", a: "プランにより異なります。「永代供養」が付いているプランは、一定期間後または最初から合祀される形式が一般的です。詳細は各プランをご確認ください。" },
    { q: "ペットと一緒に入れますか？", a: "ペット共葬可能な区画をご用意しているプランもございます。「ペット可」のアイコンが付いているプランをご確認ください。" }
];

export function TempleFAQ() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold text-primary border-l-4 border-secondary pl-4 py-1 mb-6">
                よくある質問
            </h2>

            <div className="space-y-4">
                {FAQ_DATA.map((item, i) => (
                    <FAQItem key={i} question={item.q} answer={item.a} />
                ))}
            </div>

            <p className="text-right text-xs text-gray-400 mt-4">
                ※ 詳細は資料請求にてご確認ください
            </p>
        </div>
    );
}
