"use client";

import { useState } from "react";
import { Phone, Mail, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/Button";

export function CompanyContactCTA() {
    const [activeTab, setActiveTab] = useState<'phone' | 'form'>('phone');

    return (
        <div className="bg-[#5F97AD] text-white rounded-3xl p-8 md:p-12 shadow-sm border border-white/20 overflow-hidden relative">
            {/* Background Decor - Subtle high-key */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-20" />

            <div className="relative z-10 text-center mb-10">
                <h2 className="font-serif text-xl md:text-2xl font-bold mb-4 text-white">
                    お墓のお悩み、私たちにご相談ください
                </h2>
                <p className="text-white/90 text-sm max-w-xl mx-auto leading-relaxed font-medium">
                    「まずは資料だけ」「金額の目安が知りたい」など、<br className="hidden sm:block" />
                    どんな小さなお悩みでも、専門スタッフが丁寧にお答えします。
                </p>
            </div>

            <div className="max-w-md mx-auto relative z-10">
                {/* Tabs */}
                <div className="flex bg-gray-200/50 p-1 rounded-full mb-8 relative">
                    <button
                        onClick={() => setActiveTab('phone')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'phone'
                            ? 'bg-white text-[#2F4F4F] shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                            }`}
                    >
                        <Phone className="w-4 h-4" />
                        電話で相談
                    </button>
                    <button
                        onClick={() => setActiveTab('form')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === 'form'
                            ? 'bg-white text-[#2F4F4F] shadow-sm'
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                            }`}
                    >
                        <Mail className="w-4 h-4" />
                        WEBで相談
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm transition-all duration-500 min-h-[220px] flex flex-col justify-center">

                    {/* Phone Tab Content */}
                    <div className={`transition-opacity duration-300 ${activeTab === 'phone' ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                        <div className="text-center">
                            <p className="text-sm text-gray-500 mb-2 font-medium">通話無料・携帯OK</p>
                            <a href="tel:0800-888-8788" className="block w-fit mx-auto group bg-gray-50 px-6 py-2 rounded-xl mb-3 border border-gray-100">
                                <p className="text-3xl md:text-4xl font-bold font-serif text-[#2F4F4F] group-hover:opacity-80 transition-opacity flex items-center gap-2">
                                    <Phone className="w-6 h-6 md:w-8 md:h-8 text-secondary" />
                                    0800-888-8788
                                </p>
                            </a>
                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-6">
                                <Clock className="w-3 h-3" />
                                <span>受付 9:00〜18:00 (年中無休)</span>
                            </div>
                            <a href="tel:0800-888-8788" className="block sm:hidden">
                                <Button className="w-full bg-secondary hover:bg-secondary/90 text-white border-0 font-bold shadow-lg shadow-secondary/20 h-14 text-lg">
                                    <Phone className="w-5 h-5 mr-2" />
                                    今すぐ電話をかける
                                </Button>
                            </a>
                            <div className="hidden sm:block text-xs text-secondary bg-secondary/5 px-3 py-1 rounded-full w-fit mx-auto font-bold">
                                専門スタッフがお待ちしています
                            </div>
                        </div>
                    </div>

                    {/* Form Tab Content */}
                    <div className={`transition-opacity duration-300 ${activeTab === 'form' ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                        <div className="text-center">
                            <p className="text-sm text-gray-600 mb-6 font-medium">
                                24時間365日受付中。<br />
                                最短30分で返信いたします。
                            </p>
                            <div className="space-y-4">
                                <Link href="/consult/request-material" className="block">
                                    <Button className="w-full bg-white text-secondary hover:bg-secondary/5 border-2 border-secondary font-bold shadow-sm h-12">
                                        <Mail className="w-4 h-4 mr-2" />
                                        無料相談フォームへ
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                                <div className="text-xs text-gray-500 flex flex-col gap-1 items-center">
                                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> 匿名でのご相談も可能です</span>
                                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> しつこい営業は一切いたしません</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
