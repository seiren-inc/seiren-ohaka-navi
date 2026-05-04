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
    title: "お墓の基礎知識｜種類・費用・建て方・選び方を一挙解説｜清蓮",
    description: "一般墓・永代供養墓・樹木葬・納骨堂の種類別の費用相場、寺院墓地・民営霊園・公営霊園の違いと選び方のポイントをわかりやすく解説します。",
    alternates: { canonical: "https://www.ohakanavi.jp/guide/grave-basics" }
};

export default function GuideGraveBasicsPage() {
    const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "お墓の基礎知識｜種類・費用・建て方・選び方を一挙解説",
        "description": "一般墓・永代供養墓・樹木葬・納骨堂の種類と費用、霊園選びのポイントを解説。",
        "author": { "@type": "Organization", "name": "清蓮（Seiren）", "url": "https://www.ohakanavi.jp/about" },
        "publisher": {
            "@type": "Organization", "name": "清蓮（Seiren）",
            "logo": { "@type": "ImageObject", "url": "https://www.ohakanavi.jp/og-image.jpg" }
        },
        "datePublished": "2025-01-01",
        "dateModified": new Date().toISOString().split("T")[0]
    };

    const faqData = [
        { q: "お墓を建てるのにどのくらいの費用がかかりますか？", a: "お墓の種類によって大きく異なります。一般墓（墓石）の場合は150万円〜300万円程度が全国平均です。永代供養墓は数万円〜100万円程度、樹木葬は10万円〜150万円程度、納骨堂は10万円〜150万円程度が相場です。" },
        { q: "公営霊園・民営霊園・寺院墓地の違いは何ですか？", a: "公営霊園は地方自治体が運営するもので、費用が安く倒産リスクがほぼない反面、抽選になることが多く宗教・宗派不問が基本です。民営霊園は民間会社が運営し選択肢が豊富ですが、費用は高めです。寺院墓地はお寺が管理し、宗派の条件がある場合があります。" },
        { q: "お墓は生前に準備（購入）しても良いですか？", a: "はい、「生前墓（寿陵/じゅりょう）」として生前に準備するケースは増えています。自分の意思で選べる、相続が不要、節税効果が期待できる（一般的に墓石代は相続税の対象外）などのメリットがあります。" }
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
        { label: "墓石（一般墓）の平均費用", value: "約220万円", note: "全国平均（清蓮相談実績より）" },
        { label: "年間管理費の中央値", value: "約10,000円", note: "霊園管理費・護寺費等を含む" },
        { label: "供養スタイル変更の相談で最多の理由", value: "後継者不足", note: "清蓮への相談で最多の動機" }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke text-gray-800">
            <JsonLd data={articleLd} />
            <JsonLd data={faqLd} />
            <Navbar />
            <main id="main-content" className="grow pt-24 pb-20">
                <article className="max-w-3xl mx-auto px-4">
                    <div className="mb-12">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Link href="/guide" className="hover:text-primary transition-colors">ガイド一覧</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span>お墓の基礎知識</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-dark mb-6 leading-tight">
                            お墓の基礎知識｜種類・費用・建て方・選び方を一挙解説
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            「お墓について何も知らない」という方でも安心して読めるよう、種類・費用・霊園の選び方まで、基礎知識をまとめてご紹介します。
                        </p>
                    </div>

                    {/* AI要約ブロック */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
                        <h2 className="font-bold text-lg text-primary-dark mb-4 border-b border-primary/10 pb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            この記事の要約（30秒でわかるお墓の基礎知識）
                        </h2>
                        <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                            <li>・<strong>お墓の種類は大きく4つ：</strong> 一般墓（墓石）・永代供養墓・樹木葬・納骨堂。</li>
                            <li>・<strong>費用の幅：</strong> 数万円〜300万円以上と種類によって大きく異なる。一般墓が最も高い傾向。</li>
                            <li>・<strong>運営主体：</strong> 公営霊園・民営霊園・寺院墓地の3種類。それぞれ特徴が異なる。</li>
                            <li>・<strong>最近の傾向：</strong> 後継者不要・管理費不要の「永代供養墓」「樹木葬」の需要が急増。</li>
                        </ul>
                    </div>

                    <div className="prose max-w-none text-gray-700 leading-loose space-y-8">
                        <h2>お墓の種類と費用一覧</h2>
                        <div className="overflow-x-auto not-prose my-8">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="bg-primary text-white">
                                        <th className="p-3 text-left rounded-tl-lg">種類</th>
                                        <th className="p-3 text-left">費用目安</th>
                                        <th className="p-3 text-left">継承者</th>
                                        <th className="p-3 text-left rounded-tr-lg">特徴</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { type: "一般墓（墓石）", price: "150万〜300万円", heir: "必要", note: "代々引き継ぐ伝統的な形" },
                                        { type: "永代供養墓", price: "数万〜100万円", heir: "不要", note: "寺院・霊園が管理を継続" },
                                        { type: "樹木葬", price: "10万〜150万円", heir: "不要", note: "自然に還る新しいスタイル" },
                                        { type: "納骨堂", price: "10万〜150万円", heir: "不要が多い", note: "屋内で快適にお参りできる" }
                                    ].map((row, i) => (
                                        <tr key={i} className="bg-white hover:bg-gray-50">
                                            <td className="p-3 font-bold text-gray-800">{row.type}</td>
                                            <td className="p-3 font-bold text-secondary">{row.price}</td>
                                            <td className="p-3">{row.heir}</td>
                                            <td className="p-3 text-gray-600">{row.note}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h2>運営主体（公営・民営・寺院）の比較</h2>
                        <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
                            {[
                                { type: "公営霊園", pros: ["費用が安い", "倒産リスクが少ない", "宗教・宗派不問"], cons: ["抽選が多い", "選択肢が限られる"] },
                                { type: "民営霊園", pros: ["選択肢が豊富", "サービスが充実", "好立地が多い"], cons: ["費用が高め", "管理会社の継続性リスク"] },
                                { type: "寺院墓地", pros: ["手厚い法要サービス", "歴史・格式がある", "境内で安心感"], cons: ["宗派の条件あることも", "檀家義務の場合あり"] }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                                    <h3 className="text-base font-bold text-primary-dark mb-3 border-b border-gray-100 pb-2">{item.type}</h3>
                                    <div className="mb-2">
                                        <p className="text-xs font-bold text-green-600 mb-1">✓ メリット</p>
                                        <ul className="text-sm text-gray-600 space-y-1">{item.pros.map((p, i) => <li key={i}>・{p}</li>)}</ul>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-orange-500 mb-1">△ 注意点</p>
                                        <ul className="text-sm text-gray-600 space-y-1">{item.cons.map((c, i) => <li key={i}>・{c}</li>)}</ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <PrimaryDataStats
                        title="清蓮の相談データでみるお墓の実情"
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
                        <h3 className="text-xl font-bold text-gray-800 mb-4">自分に合ったお墓を探す</h3>
                        <p className="text-gray-600 mb-8">種類・費用・地域で絞り込んで、全国のお墓・霊園を探せます。まずは無料相談もご利用ください。</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/search"><Button size="lg" className="w-full sm:w-auto">お墓を検索する</Button></Link>
                            <Link href="/choices/diagnosis"><Button size="lg" variant="outline" className="w-full sm:w-auto border-2">供養スタイルを診断する</Button></Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
