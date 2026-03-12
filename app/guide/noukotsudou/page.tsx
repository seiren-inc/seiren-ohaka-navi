import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { JsonLd } from "../../components/seo/JsonLd";
import { ExpertProfile } from "../../components/seo/ExpertProfile";
import { PrimaryDataStats } from "../../components/seo/PrimaryDataStats";
import { ChevronRight, ChevronDown, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "納骨堂とは？種類・費用相場・メリット・選び方を解説｜清蓮",
    description: "納骨堂の種類（ロッカー型・仏壇型・自動搬送式など）、費用相場、メリット・デメリット、失敗しない選び方を専門家が解説します。",
    alternates: { canonical: "https://www.ohakanavi.jp/guide/noukotsudou" }
};

export default function GuideNoukotsudouPage() {
    const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "納骨堂とは？種類・費用相場・メリット・選び方を解説",
        "description": "納骨堂の種類、費用相場、メリット・デメリット、失敗しない選び方を解説。",
        "author": { "@type": "Organization", "name": "清蓮（Seiren）", "url": "https://www.ohakanavi.jp/about" },
        "publisher": {
            "@type": "Organization", "name": "清蓮（Seiren）",
            "logo": { "@type": "ImageObject", "url": "https://www.ohakanavi.jp/og-image.jpg" }
        },
        "datePublished": "2025-01-01",
        "dateModified": new Date().toISOString().split("T")[0]
    };

    const faqData = [
        { q: "納骨堂の費用相場はいくらですか？", a: "種類によって大きく異なります。ロッカー型は10万円〜30万円、仏壇型は30万円〜80万円、自動搬送式（機械式）は50万円〜150万円程度が全国相場です。年間管理費が別途かかる施設がほとんどです。" },
        { q: "納骨堂は寺院が倒産・廃業した場合どうなりますか？", a: "大きな懸念点の一つです。寺院や運営法人が経営難に陥った場合、遺骨の移管先を自分で手配する必要が生じる可能性があります。選ぶ際は運営法人の財務状況や実績を確認し、万が一の際の対応規定があるかを事前に確認することをお勧めします。" },
        { q: "納骨堂への改葬（お墓の引っ越し）は可能ですか？", a: "はい、可能です。現在のお墓から遺骨を取り出して納骨堂に移すことを「改葬」といいます。自治体への改葬許可申請が必要ですが、清蓮では手続きのサポートも行っています。" }
    ];

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question", "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
    };

    const statsItems = [
        { label: "都市部の平均的な費用（1区画）", value: "約65万円", note: "首都圏の清蓮相談実績より" },
        { label: "年間管理費の平均", value: "約1.2万円", note: "中央値（施設により大きく変動）" },
        { label: "納骨堂希望者のうち改葬目的の割合", value: "約38%", note: "既存のお墓からの移転" }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke text-gray-800">
            <JsonLd data={articleLd} />
            <JsonLd data={faqLd} />
            <Navbar />
            <main className="flex-grow pt-24 pb-20">
                <article className="max-w-3xl mx-auto px-4">
                    <div className="mb-12">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Link href="/guide" className="hover:text-primary transition-colors">ガイド一覧</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span>納骨堂</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-dark mb-6 leading-tight">
                            納骨堂とは？種類・費用相場・メリット・選び方を解説
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            納骨堂は、屋内施設で遺骨を管理するお墓の一形態です。天候を問わずお参りできる利便性の高さから、都市部を中心に需要が急速に高まっています。種類が多く費用も様々なため、正確な知識が大切です。
                        </p>
                    </div>

                    {/* AI要約ブロック */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
                        <h2 className="font-bold text-lg text-primary-dark mb-4 border-b border-primary/10 pb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            この記事の要約（30秒でわかる納骨堂）
                        </h2>
                        <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                            <li>・<strong>納骨堂とは：</strong> 屋内に遺骨を納める施設。屋外のお墓と違い、年間を通じて快適にお参りできる。</li>
                            <li>・<strong>主な種類：</strong> ロッカー型・仏壇型・自動搬送式（機械式）・位牌型 の4分類。</li>
                            <li>・<strong>費用相場：</strong> 10万円〜150万円程度（種類・立地により大きく変動）。年間管理費が別途必要な場合が多い。</li>
                            <li>・<strong>最大のメリット：</strong> 雨風を気にせずお参りできる。都心部でも選びやすい。</li>
                            <li>・<strong>主な注意点：</strong> 運営法人の継続性リスク、一定期間後に合祀されるプランもある点。</li>
                        </ul>
                    </div>

                    <div className="prose max-w-none text-gray-700 leading-loose space-y-8">
                        <h2>納骨堂の4つの種類と費用の目安</h2>
                        <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
                            {[
                                { type: "ロッカー型", desc: "コインロッカーのような個別の収納スペースに骨壺を安置。最もシンプルで費用が抑えられる。", price: "10万〜30万円" },
                                { type: "仏壇型", desc: "個人専用の仏壇スペースが設けられたタイプ。故人の遺影や位牌を飾れるものが多い。", price: "30万〜80万円" },
                                { type: "自動搬送式（機械式）", desc: "ICカードをかざすと骨壺が自動で参拝ブースに搬送される最新型。都市部の大型施設に多い。", price: "50万〜150万円" },
                                { type: "位牌型", desc: "位牌のみを納め、遺骨は合祀スペースに埋葬するタイプ。最も費用が抑えられる。", price: "数万〜30万円" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                                    <h3 className="text-base font-bold text-primary-dark mb-2">{item.type}</h3>
                                    <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
                                    <p className="font-bold text-secondary text-sm">初期費用：{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <PrimaryDataStats
                        title="清蓮の相談データでみる納骨堂の実際"
                        source="清蓮（Seiren）相談実績（参考値）"
                        items={statsItems}
                    />

                    <div className="my-12">
                        <h2 className="text-2xl font-bold font-serif text-primary-dark mb-6">よくある質問（FAQ）</h2>
                        <div className="space-y-4">
                            {faqData.map((item, idx) => (
                                <details key={idx} className="group bg-white rounded-xl overflow-hidden border border-gray-200">
                                    <summary className="flex items-start justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none">
                                        <span className="flex items-start gap-3">
                                            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded shrink-0 mt-0.5">Q</span>
                                            <span className="font-medium text-gray-800">{item.q}</span>
                                        </span>
                                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 mt-0.5 transition-transform duration-200 group-open:rotate-180" />
                                    </summary>
                                    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                                        <div className="flex items-start gap-3">
                                            <span className="bg-soft-teal text-white text-xs font-bold px-2 py-1 rounded shrink-0">A</span>
                                            <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
                                        </div>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>

                    <ExpertProfile reviewedDate="2026年3月" />

                    <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">納骨堂を探す</h3>
                        <p className="text-gray-600 mb-8">清蓮では全国の厳選された納骨堂を掲載中。見学予約・資料請求は無料です。</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/search?type=納骨堂"><Button size="lg" className="w-full sm:w-auto">納骨堂を検索する</Button></Link>
                            <Link href="/consult"><Button size="lg" variant="outline" className="w-full sm:w-auto border-2">専門家に無料相談する</Button></Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
