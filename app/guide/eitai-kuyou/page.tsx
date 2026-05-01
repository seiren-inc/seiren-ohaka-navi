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
    title: "永代供養とは？費用相場やメリット・デメリットを徹底解説｜清蓮",
    description: "永代供養（えいたいくよう）にかかる費用相場、一般的なお墓との違い、後悔しない選び方のポイントを供養の専門家が分かりやすく解説します。",
    alternates: { canonical: "https://ohakanavi.jp/guide/eitai-kuyou" }
};

export default function GuideEitaiKuyouPage() {
    const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "永代供養とは？費用相場やメリット・デメリットを徹底解説",
        "description": "永代供養にかかる費用相場、一般的なお墓との違い、後悔しない選び方のポイントを解説。",
        "author": {
            "@type": "Organization",
            "name": "清蓮（Seiren）",
            "url": "https://ohakanavi.jp/about"
        },
        "publisher": {
            "@type": "Organization",
            "name": "清蓮（Seiren）",
            "logo": {
                "@type": "ImageObject",
                "url": "https://ohakanavi.jp/og-image.jpg"
            }
        },
        "datePublished": "2025-01-01",
        "dateModified": new Date().toISOString().split('T')[0]
    };

    const faqData = [
        {
            q: "永代供養の費用相場はどのくらいですか？",
            a: "永代供養の費用は種類によって大きく異なります。最初から他の人と一緒に埋葬される「合祀（ごうし）」タイプであれば数万円〜30万円程度、一定期間個別に安置されるタイプであれば30万円〜100万円程度が相場です。"
        },
        {
            q: "永代供養にすると、お参りはできなくなりますか？",
            a: "いいえ、お参りは可能です。一般のお墓のように個別の墓石がない場合でも、共有の参拝スペースやモニュメントの前で手を合わせることができます（施設によりルールは異なります）。"
        },
        {
            q: "「永代」とは「永遠」という意味ですか？",
            a: "仏教用語の「永代」は永遠という意味ではありません。「お寺や霊園が続く限り」という意味合いです。また「一定期間（例：33回忌まで）」を過ぎると合祀されるプランも多いため、期間の確認が不可欠です。"
        }
    ];

    const faqLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
    };

    return (
        <div className="min-h-screen flex flex-col bg-white-smoke text-gray-800">
            <JsonLd data={articleLd} />
            <JsonLd data={faqLd} />
            <Navbar />
            
            <main className="grow pt-24 pb-20">
                <article className="max-w-3xl mx-auto px-4">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Link href="/guide" className="hover:text-primary transition-colors">ガイド一覧</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span>永代供養</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-dark mb-6 leading-tight">
                            永代供養とは？費用相場や<br className="md:hidden"/>メリット・デメリットを徹底解説
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            少子化や核家族化が進む現代で、最も関心を集めている供養方法が「永代供養（えいたいくよう）」です。お墓の維持や管理に関する不安を解消できる反面、選び方を間違えると後悔に繋がることも。本記事では、永代供養の基礎知識から費用相場まで詳しく解説します。
                        </p>
                    </div>

                    {/* AI Summary Block (Phase 3-1 GEO) */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
                        <h2 className="font-bold text-lg text-primary-dark mb-4 border-b border-primary/10 pb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            この記事の要約（30秒でわかる永代供養）
                        </h2>
                        <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                            <li>・<strong>永代供養とは：</strong> 家族に代わり、寺院や霊園が永代にわたって遺骨の管理と供養を行う方法。</li>
                            <li>・<strong>相場費用：</strong> 合祀（ごうし）タイプなら5万〜30万円、個別安置タイプなら30万〜100万円。</li>
                            <li>・<strong>最大のメリット：</strong> 継承者（墓守）が不要で、年間管理費がかからない施設が多い点。</li>
                            <li>・<strong>最大の注意点：</strong> 一度「合祀」されると、後から遺骨を取り出す（改葬する）ことができない点。</li>
                        </ul>
                    </div>

                    <div className="prose max-w-none text-gray-700 leading-loose space-y-8">
                        <h2>永代供養が選ばれる3つの理由</h2>
                        <p>
                            なぜ今、一般のお墓（代々墓）ではなく永代供養を選ぶ人が急増しているのでしょうか。主な理由は以下の3点です。
                        </p>
                        <ol className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm list-decimal list-inside space-y-3">
                            <li className="font-bold text-gray-800">お墓の継承者（跡継ぎ）がいなくても安心できる</li>
                            <li className="font-bold text-gray-800">子どもや孫に「お墓の管理」や「経済的な負担」をかけずに済む</li>
                            <li className="font-bold text-gray-800">従来のお墓を建てるより、初期費用が大幅に抑えられる</li>
                        </ol>

                        <h2>永代供養の種類と費用相場</h2>
                        <p>
                            「永代供養」と一口に言っても、供養のスタイルによって大きく3つの種類に分けられます。
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-bold text-primary-dark mb-2">1. 合祀（ごうし）墓</h3>
                                <p className="text-sm text-gray-600 mb-4">最初から他の方の遺骨と一緒に埋葬されるタイプ。最も費用が安いです。</p>
                                <p className="font-bold text-secondary">相場：5万円〜30万円</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200">
                                <h3 className="text-lg font-bold text-primary-dark mb-2">2. 集合安置型</h3>
                                <p className="text-sm text-gray-600 mb-4">一つのお墓（シンボル）の下に、骨壺の状態で個別に安置されるタイプ。</p>
                                <p className="font-bold text-secondary">相場：20万円〜60万円</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-gray-200 md:col-span-2">
                                <h3 className="text-lg font-bold text-primary-dark mb-2">3. 個別安置型（一定期間）</h3>
                                <p className="text-sm text-gray-600 mb-4">一般のお墓や納骨堂のように、個別のスペースに骨壺を安置するタイプ。13回忌や33回忌など「一定期間」を過ぎると合祀されるのが一般的です。</p>
                                <p className="font-bold text-secondary">相場：30万円〜100万円以上</p>
                            </div>
                        </div>

                        <h2>よくある質問（FAQ）</h2>
                        <div className="space-y-4 not-prose mt-6">
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


                    {/* CTA */}
                    <PrimaryDataStats
                        title="清蓮の相談データでみる永代供養の実際"
                        source="清蓮（Seiren）相談実績（参考値）"
                        items={[
                            { label: "永代供養の平均費用（合祀以外）", value: "約48万円", note: "清蓮相談実績の中央値" },
                            { label: "相談者のうち後継者なしの割合", value: "約67%", note: "永代供養を選ぶ最大の動機" },
                            { label: "最多の選択先", value: "集合安置型", note: "個人感を残しつつ費用を抑えられる" }
                        ]}
                    />

                    <ExpertProfile reviewedDate="2026年3月" />

                    <div className="mt-4 bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            あなたに合った永代供養墓を探しませんか？
                        </h3>
                        <p className="text-gray-600 mb-8">
                            清蓮では、全国の厳選された永代供養墓・樹木葬・納骨堂を比較検討できます。見学予約や資料のご請求も無料です。
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/search?type=永代供養墓">
                                <Button size="lg" className="w-full sm:w-auto">
                                    永代供養墓を検索する
                                </Button>
                            </Link>
                            <Link href="/consult">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2">
                                    専門家に無料相談する
                                </Button>
                            </Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
