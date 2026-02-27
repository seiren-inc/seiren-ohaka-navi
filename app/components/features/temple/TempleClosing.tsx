"use client";

import { Button } from "../../ui/Button";
import { FileText, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Temple } from "@/lib/store";
import { useState, useEffect } from "react";

interface TempleClosingProps {
    data: Temple;
}

export function TempleClosing({ data }: TempleClosingProps) {
    const [currentUrl, setCurrentUrl] = useState("");
    useEffect(() => { if (typeof window !== 'undefined') setCurrentUrl(window.location.href); }, []);
    const requestUrl = `/consult/request-material?templeId=${data.id}&templeName=${encodeURIComponent(data.name)}&ref=closing&refUrl=${encodeURIComponent(currentUrl)}`;

    return (
        <div className="bg-primary-dark text-white rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-xl md:text-2xl font-bold font-serif mb-6">
                最後までご覧いただき<br className="md:hidden" />ありがとうございます
            </h2>

            <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
                他の霊園と比較しながら、じっくりご検討いただいて問題ありません。<br />
                条件整理やご相談だけでも、お気軽にご利用ください。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link href={requestUrl} className="w-full">
                    <Button className="w-full h-14 bg-red-600 hover:bg-red-700 text-white font-bold text-lg shadow-lg border-2 border-red-600 rounded-lg">
                        <FileText className="w-5 h-5 mr-2" /> この霊園の資料を取り寄せる
                    </Button>
                </Link>
                <Link href="/consult/grave-search" className="w-full">
                    <Button className="w-full h-14 bg-transparent hover:bg-white/10 text-white font-bold text-lg border-2 border-white rounded-lg">
                        <MessageCircle className="w-5 h-5 mr-2" /> 比較相談する
                    </Button>
                </Link>
            </div>
        </div>
    );
}
