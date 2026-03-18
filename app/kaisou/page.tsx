import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { KaisouFlow } from "../components/features/KaisouFlow";
import { Button } from "../components/ui/Button";
import { ExternalLink, ChevronRight, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "お墓じまい・改葬について｜清蓮（せいれん）",
    description: "お墓じまいや改葬（お墓の引っ越し）の基本的な流れや費用、注意点について解説します。",
    alternates: { canonical: "https://www.ohakanavi.jp/kaisou" },
};

export default function KaisouPage() {
    return (
        <div className="min-h-screen flex flex-col pt-[60px] md:pt-[92px]">
            <Navbar />

            <main className="grow">
                {/* HERO */}
                <section className="bg-bg-muted py-16 md:py-24 border-b border-border">
                    <div className="max-w-[1280px] mx-auto px-4 text-center">
                        <span className="text-lotus-pink font-bold tracking-widest text-sm uppercase mb-4 flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Grave Closure & Transfer
                        </span>
                        <h1 className="font-serif text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                            お墓じまい・改葬について
                        </h1>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                            「遠方でお墓参りに行けない」「お墓を継ぐ人がいない」<br className="hidden md:block"/>
                            ライフスタイルの変化に伴い、お墓を住まいの近くに移したり、管理が不要な永代供養墓へ移す「改葬」を選ぶ方が増えています。
                        </p>
                    </div>
                </section>

                {/* 理由と注意点 */}
                <section className="py-[120px] bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="bg-lotus-pink/5 rounded-[12px] p-8 md:p-12 border border-lotus-pink/20">
                            <div className="flex items-start gap-4 mb-6">
                                <AlertCircle className="w-8 h-8 text-lotus-pink shrink-0 mt-1" />
                                <div>
                                    <h2 className="text-2xl font-bold font-serif text-gray-800 mb-4">
                                        改葬・墓じまいは「事前の相談」が最も重要です
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        お墓はご家族・ご親族の精神的な拠り所です。まずは関係者全員でしっかりと話し合い、合意を得ることがトラブルを防ぐ第一歩です。また、現在お墓があるお寺（菩提寺）へのご相談も、早めに行うことをおすすめします。
                                    </p>
                                    <p className="text-gray-600 leading-relaxed">
                                        「何から始めればいいかわからない」「親族間で意見がまとまらない」といった場合でも、清蓮の専門カウンセラーが中立的な立場からアドバイスいたします。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 改葬の流れ（KaisouFlow） */}
                <section className="py-[120px] bg-bg-muted border-y border-border">
                    <div className="px-4">
                        <KaisouFlow />
                    </div>
                </section>

                {/* 関連サービス案内（お墓じまいナビ連携） */}
                <section className="py-[120px] bg-white">
                    <div className="max-w-[1280px] mx-auto px-4 text-center">
                        <h2 className="font-serif text-3xl font-bold text-gray-800 mb-6">
                            実務のサポートは専門サービスへ
                        </h2>
                        <p className="text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
                            清蓮では「新しい納骨先（改葬先）探し」のお手伝いをいたします。<br />
                            また、現在の墓石の解体・撤去費用のお見積りや、面倒な行政手続きの代行などは、提携する専門サービス「お墓じまいナビ」にてワンストップで承ります。
                        </p>

                        <div className="inline-block bg-white border border-border shadow-sm rounded-[12px] p-8 hover:shadow-md transition-shadow max-w-2xl w-full text-left">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">お墓じまいナビ</h3>
                                    <p className="text-gray-600 text-sm mb-4">
                                        お墓の解体・撤去、行政手続きからご遺骨の整理まで、改葬の実務をトータルサポート。
                                    </p>
                                    <ul className="text-sm text-gray-500 space-y-1 mb-6">
                                        <li>・全国の優良石材店ネットワーク</li>
                                        <li>・明朗な料金体系（お見積り無料）</li>
                                        <li>・行政手続き代行サポート</li>
                                    </ul>
                                </div>
                                <div className="shrink-0 w-full md:w-auto">
                                    <a 
                                        href="https://ohakajimai-navi.jp/" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="w-full"
                                    >
                                        <Button variant="primary" className="bg-primary hover:bg-primary-hover w-full md:w-auto">
                                            公式サイトを見る
                                            <ExternalLink className="w-4 h-4 ml-2" />
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* お墓探しへの導線 */}
                <section className="py-20 bg-bg-muted text-center border-t border-border">
                    <div className="max-w-3xl mx-auto px-4">
                        <h2 className="font-serif text-2xl font-bold mb-6 text-gray-800">
                            まずは、新しい納骨先を探してみませんか？
                        </h2>
                        <p className="text-gray-600 mb-10">
                            改葬手続きをスムーズに進めるためには、新しい受入先（永代供養墓や納骨堂など）を先に決めておくことが重要です。
                        </p>
                        <Link href="/search">
                            <Button size="lg" className="bg-white text-primary border-2 border-primary hover:bg-primary/5">
                                納骨先（霊園・墓地）を探す
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
