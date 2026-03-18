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
    title: "墓じまいガイド｜手順・費用・注意点をわかりやすく解説｜清蓮",
    description: "墓じまいの手順（行政手続き・閉眼供養・遺骨の取り出し・改葬の流れ）と費用相場、よくある失敗を専門家が解説します。離檀料や業者の選び方も紹介。",
    alternates: { canonical: "https://www.ohakanavi.jp/guide/grave-closure" }
};

export default function GuideGraveClosurePage() {
    const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "墓じまいガイド｜手順・費用・注意点をわかりやすく解説",
        "description": "墓じまいの手順、費用相場、よくある失敗と注意点を解説。",
        "author": { "@type": "Organization", "name": "清蓮（Seiren）", "url": "https://www.ohakanavi.jp/about" },
        "publisher": {
            "@type": "Organization", "name": "清蓮（Seiren）",
            "logo": { "@type": "ImageObject", "url": "https://www.ohakanavi.jp/og-image.jpg" }
        },
        "datePublished": "2025-01-01",
        "dateModified": new Date().toISOString().split("T")[0]
    };

    const faqData = [
        { q: "墓じまいにかかる費用の相場はいくらくらいですか？", a: "墓じまいの費用は、墓石の撤去・解体費（1㎡あたり10万円前後）、行政の申請手数料（数百円〜数千円）、改葬先への入金（数万円〜100万円以上）などの合計が目安です。トータルで30万円〜100万円程度かかるケースが多いです。" },
        { q: "離檀料は必ず払わなければなりませんか？", a: "「離檀料」に法的な根拠はなく、支払いを強制されるものではありません。ただし長年お世話になった感謝の気持ちとして、数万円〜数十万円をお渡しするケースもあります。金額が不当に高い場合は、弁護士や行政書士に相談することをお勧めします。" },
        { q: "墓じまいをすると、遺骨はどこへ移りますか？", a: "遺骨は「改葬」という手続きで、別のお墓（永代供養墓・樹木葬・納骨堂）に移します。散骨（海洋・山）という選択肢もあります。清蓮では改葬先探しの相談から手続きのサポートまでお手伝いしています。" }
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
        { label: "墓じまい費用の平均", value: "約58万円", note: "清蓮サポート案件の平均（改葬先含む）" },
        { label: "最多の改葬先", value: "永代供養墓", note: "清蓮サポート案件の過半数" },
        { label: "相談〜完了までの平均期間", value: "約3〜6ヶ月", note: "行政手続きの期間を含む" }
    ];

    const steps = [
        { no: "01", title: "家族・関係者への相談", desc: "墓じまいは親族全員の合意が原則必要です。特に遠方に住む親族とは早めに話し合いを行いましょう。" },
        { no: "02", title: "改葬先（移転先）の決定", desc: "遺骨をどこへ移すかを先に決めてから、行政手続きを進めます（改葬許可証の発行に必要）。" },
        { no: "03", title: "現在のお寺・霊園への連絡", desc: "管理者に墓じまいの意向を伝えます。寺院墓地の場合はこのタイミングで離檀に関する話し合いも行います。" },
        { no: "04", title: "改葬許可証の取得（行政手続き）", desc: "現在のお墓がある市区町村の役所に「改葬許可申請書」を提出し、「改葬許可証」を取得します。" },
        { no: "05", title: "閉眼供養（魂抜き）の実施", desc: "墓石を解体する前に、お寺に「閉眼供養（へいがんくよう）」を依頼し、お墓から魂を抜く儀式を行います。" },
        { no: "06", title: "遺骨の取り出し・墓石の解体", desc: "石材業者に依頼して墓石を解体し、遺骨を取り出します。解体後、土地は更地に戻します。" },
        { no: "07", title: "改葬先で新たに納骨", desc: "取り出した遺骨を、決定した改葬先（永代供養墓・樹木葬等）に納骨します。" }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke text-gray-800">
            <JsonLd data={articleLd} />
            <JsonLd data={faqLd} />
            <Navbar />
            <main className="grow pt-24 pb-20">
                <article className="max-w-3xl mx-auto px-4">
                    <div className="mb-12">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Link href="/guide" className="hover:text-primary transition-colors">ガイド一覧</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span>墓じまいガイド</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-dark mb-6 leading-tight">
                            墓じまいガイド｜手順・費用・注意点をわかりやすく解説
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            高齢化・核家族化が進む中で、「先祖のお墓を管理しきれない」「後継者がいない」という理由から、近年急増している「墓じまい」。手順を正確に把握し、後悔のない選択ができるよう、専門家の視点から詳しく解説します。
                        </p>
                    </div>

                    {/* AI要約ブロック */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
                        <h2 className="font-bold text-lg text-primary-dark mb-4 border-b border-primary/10 pb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            この記事の要約（30秒でわかる墓じまい）
                        </h2>
                        <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                            <li>・<strong>墓じまいとは：</strong> お墓を解体・撤去し、遺骨を別の場所へ移す（改葬する）こと。</li>
                            <li>・<strong>費用の目安：</strong> 墓石解体（10万円前後）＋改葬先の費用（数万〜100万円超）で、トータル30万〜100万円程度が多い。</li>
                            <li>・<strong>手続きの核心：</strong> 役所で「改葬許可証」を取得することが法的に必要。</li>
                            <li>・<strong>流れ：</strong> ①家族合意→②改葬先決定→③役所手続き→④閉眼供養→⑤解体→⑥納骨。</li>
                            <li>・<strong>離檀料：</strong> 法的義務はない。不当な金額の請求には応じる必要はない。</li>
                        </ul>
                    </div>

                    <div className="prose max-w-none text-gray-700 leading-loose space-y-8">
                        <h2>墓じまいの全手順（7ステップ）</h2>
                        <div className="space-y-4 not-prose my-8">
                            {steps.map((step) => (
                                <div key={step.no} className="flex gap-5 bg-white p-6 rounded-xl border border-gray-200">
                                    <div className="w-12 h-12 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shrink-0">
                                        {step.no}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800 mb-1">{step.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <PrimaryDataStats
                        title="清蓮の相談データでみる墓じまいの実際"
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
                        <h3 className="text-xl font-bold text-gray-800 mb-4">墓じまい・改葬のご相談は清蓮へ</h3>
                        <p className="text-gray-600 mb-8">手続きの代行サポートから、改葬先探しまで、清蓮が中立な立場で全面サポートします。無料相談を受け付けています。</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/grave-closure"><Button size="lg" className="w-full sm:w-auto">墓じまいについてもっと見る</Button></Link>
                            <Link href="/consult/grave-closure"><Button size="lg" variant="outline" className="w-full sm:w-auto border-2">無料相談する</Button></Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
