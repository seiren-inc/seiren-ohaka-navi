"use client";

import { Temple } from "@/lib/store";
import { Button } from "../../ui/Button";
import { FileText, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

interface TempleSuitableProps {
    data: Temple;
}

export function TempleSuitable({ data }: TempleSuitableProps) {
    const [currentUrl, setCurrentUrl] = useState("");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { if (typeof window !== 'undefined') setCurrentUrl(window.location.href); }, []);
    const requestUrl = `/consult/request-material?templeId=${data.id}&templeName=${encodeURIComponent(data.name)}&ref=suitable&refUrl=${encodeURIComponent(currentUrl)}`;

    return (
        <div className="bg-gray-50 rounded-xl p-6 md:p-8">
            <h2 className="text-center font-bold text-gray-800 mb-6">
                <span className="text-primary">この霊園</span> はあなたに合っている？
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Suitable */}
                <div className="bg-white rounded-lg p-5 shadow-sm border-t-4 border-t-blue-500">
                    <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold">
                        <CheckCircle2 className="w-5 h-5" />
                        この霊園が向いている方
                    </div>
                    <ul className="space-y-3">
                        {data.suitableFor.slice(0, 3).map((text, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                <span className="text-blue-200 mt-1">●</span>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Not Suitable */}
                <div className="bg-white rounded-lg p-5 shadow-sm border-t-4 border-t-gray-400">
                    <div className="flex items-center gap-2 mb-4 text-gray-500 font-bold">
                        <XCircle className="w-5 h-5" />
                        合わない可能性がある方
                    </div>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-gray-300 mt-1">●</span>
                            自宅からのアクセスを最優先したいが、遠いと感じる方
                        </li>
                        <li className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="text-gray-300 mt-1">●</span>
                            どうしても公営霊園しか検討したくない方
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center">
                <Link href={requestUrl}>
                    <Button variant="outline" className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50 font-bold">
                        <FileText className="w-4 h-4 mr-2" /> 比較用に資料を取り寄せる
                    </Button>
                </Link>
            </div>
        </div>
    );
}
