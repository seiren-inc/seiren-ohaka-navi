"use client";

import { Button } from "../../ui/Button";
import { MessageCircle, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Temple } from "@/lib/store";
import { useState, useEffect } from "react";

interface TempleGuideProps {
    data: Temple;
}

export function TempleGuide({ data }: TempleGuideProps) {
    const [currentUrl, setCurrentUrl] = useState("");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { if (typeof window !== 'undefined') setCurrentUrl(window.location.href); }, []);
    const requestUrl = `/consult/request-material?templeId=${data.id}&templeName=${encodeURIComponent(data.name)}&ref=guide&refUrl=${encodeURIComponent(currentUrl)}`;

    return (
        <div className="bg-blue-50 rounded-xl p-6 md:p-8">
            <h2 className="font-bold text-center text-blue-900 mb-6">
                プラン選びに迷った方へ
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                    <div className="text-xs font-bold text-blue-400 mb-2">費用を抑えたい</div>
                    <p className="text-sm font-bold text-gray-700">永代供養・樹木葬が<br />候補になります</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                    <div className="text-xs font-bold text-blue-400 mb-2">家族でお参りしたい</div>
                    <p className="text-sm font-bold text-gray-700">個別型プランや<br />一般墓がおすすめです</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-center shadow-sm">
                    <div className="text-xs font-bold text-blue-400 mb-2">将来が不安</div>
                    <p className="text-sm font-bold text-gray-700">「年間管理費不要」の<br />プランも確認できます</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/consult/grave-search">
                    <Button variant="secondary" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white border-none font-bold">
                        <MessageCircle className="w-4 h-4 mr-2" /> 条件整理だけ相談する
                    </Button>
                </Link>
                <Link href={requestUrl}>
                    <Button variant="outline" className="w-full sm:w-auto bg-white text-blue-600 border-blue-200 hover:bg-blue-50 font-bold">
                        <FileText className="w-4 h-4 mr-2" /> おすすめプランを資料で確認
                    </Button>
                </Link>
            </div>
        </div>
    );
}
