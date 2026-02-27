import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Metadata } from "next";
import { Building2, Briefcase, Landmark, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/Button";

import { CompanyContactCTA } from "./CompanyContactCTA";

export const metadata: Metadata = {
    title: "運営会社｜清蓮（SEIREN）",
    description: "株式会社清蓮の会社概要、事業内容、取引先銀行、提携先企業について。",
};

export default function CompanyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-primary-dark">
            <Navbar />
            <main className="flex-grow pt-24 px-4 pb-20">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Company
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                            運営会社
                        </h1>
                    </div>

                    {/* Company Profile */}
                    <section className="mb-20">
                        <h2 className="font-serif text-xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Building2 className="w-5 h-5 mr-3 text-secondary" />
                            会社概要
                        </h2>
                        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
                            <dl className="divide-y divide-gray-100">
                                <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-bg/50">
                                    <dt className="font-bold text-text-primary">商号</dt>
                                    <dd className="md:col-span-3 text-text-secondary">株式会社清蓮</dd>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <dt className="font-bold text-text-primary">本社所在地</dt>
                                    <dd className="md:col-span-3 text-text-secondary">
                                        〒244-0003<br />
                                        神奈川県横浜市戸塚区戸塚町4170 高橋ビル1F
                                    </dd>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-bg/50">
                                    <dt className="font-bold text-text-primary">設立</dt>
                                    <dd className="md:col-span-3 text-text-secondary">2008年8月6日</dd>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <dt className="font-bold text-text-primary">代表取締役</dt>
                                    <dd className="md:col-span-3 text-text-secondary">眞如 りえ</dd>
                                </div>
                            </dl>
                        </div>
                    </section>

                    {/* Business Activities */}
                    <section className="mb-20">
                        <h2 className="font-serif text-xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Briefcase className="w-5 h-5 mr-3 text-secondary" />
                            事業内容
                        </h2>
                        <div className="bg-primary/5 rounded-xl p-8">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                {[
                                    "海洋散骨サービス（国内・海外対応）",
                                    "遺骨サービス（洗骨・粉骨）",
                                    "お墓じまい・改葬サポート",
                                    "手元供養品の企画・販売",
                                    "遺骨ダイヤモンドの紹介",
                                    "終活コンシェルジュサービス",
                                    "国際遺骨搬送コンサルティング",
                                    "墓地・納骨先検索プラットフォーム運営"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start text-text-primary">
                                        <span className="text-secondary mr-2 font-bold">・</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                        {/* Banks */}
                        <section>
                            <h2 className="font-serif text-xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                                <Landmark className="w-5 h-5 mr-3 text-secondary" />
                                取引銀行
                            </h2>
                            <ul className="space-y-4 text-text-secondary bg-white border border-border p-6 rounded-xl shadow-sm">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-border rounded-full mr-3"></span>
                                    PayPay銀行 本店
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-border rounded-full mr-3"></span>
                                    横浜信用金庫 本店
                                </li>
                                <li className="flex items-center text-sm text-text-muted pl-5">
                                    他
                                </li>
                            </ul>
                        </section>

                        {/* Partners */}
                        <section>
                            <h2 className="font-serif text-xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                                <Users className="w-5 h-5 mr-3 text-secondary" />
                                取引先・提携先
                            </h2>
                            <ul className="space-y-4 text-text-secondary bg-white border border-border p-6 rounded-xl shadow-sm">
                                {[
                                    "国内寺院・納骨堂",
                                    "大手石材店",
                                    "海外散骨事業者（ハワイ、グアム 等）",
                                    "遺骨加工・供養関連メーカー",
                                    "宝石加工関連事業者"
                                ].map((partner, i) => (
                                    <li key={i} className="flex items-center">
                                        <span className="w-2 h-2 bg-primary/40 rounded-full mr-3"></span>
                                        {partner}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* CTA */}
                    <CompanyContactCTA />

                </div>
            </main>
            <Footer />
        </div>
    );
}
