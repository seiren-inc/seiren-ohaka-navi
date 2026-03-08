import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { JsonLd } from "../../components/seo/JsonLd";
import { ChevronRight, ChevronDown, CheckCircle2, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ohakanavi.jp";

export const metadata: Metadata = {
    title: "墓じまいの費用相場【2024年版】内訳・安くする方法を専門家が解説｜清蓮",
    description: "墓じまいにかかる費用の総額相場（30万〜100万円）、内訳（解体・撤去・行政手続き・離檀料）、費用を安くする方法を供養の専門家がわかりやすく解説。",
    alternates: { canonical: `${BASE_URL}/guide/haka-jiman-cost` },
    openGraph: {
        title: "墓じまいの費用相場【2024年版】内訳・安くする方法",
        description: "墓じまいの費用総額・内訳・安くする方法を専門家が解説。",
        url: `${BASE_URL}/guide/haka-jiman-cost`,
    },
};

const faqData = [
    {
        q: "墓じまいの費用の総額はいくらくらいかかりますか？",
        a: "墓じまいにかかる費用の総額は、一般的に30万円〜100万円程度が目安です。墓石のサイズや搬出経路、離檀料（お寺に支払う費用）の有無によって大きく変動します。都市部や狭路の現場、大型の墓石は費用が高くなる傾向があります。"
    },
    {
        q: "離檀料とは何ですか？支払わないといけませんか？",
        a: "離檀料とは、お寺の檀家（だんか）をやめる際に、これまでの供養へのお礼として寺院にお支払いする費用です。法的な義務はありませんが、慣習的に10万円〜30万円程度が相場とされています。ただし金額の交渉は可能であり、内容と金額に納得できない場合は専門家への相談をおすすめします。"
    },
    {
        q: "墓じまいで補助金・助成金はもらえますか？",
        a: "墓じまいの費用に対する国の補助金・助成金制度は、現時点では一般的に存在しません。ただし一部の自治体で、過疎地の墓地整備に対する補助を実施しているケースがあります。お住まいの自治体に直接ご確認ください。"
    },
    {
        q: "墓じまいにかかる期間はどのくらいですか？",
        a: "墓じまいの手続き開始から完了まで、一般的に3ヶ月〜6ヶ月程度かかります。行政手続き（改葬許可申請）、寺院との交渉・日程調整、石材店の工事日程などが複合するため、早めに動き出すことが重要です。"
    },
    {
        q: "墓じまいをする前に、寺院への相談は必要ですか？",
        a: "はい、必須です。お寺の墓地に埋葬されている場合、墓じまい（離檀）には寺院への事前連絡と合意が必要です。突然の通告はトラブルになりやすいため、まず丁寧に相談することが大切です。清蓮では寺院との交渉サポートも承っています。"
    },
];

const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "墓じまいの費用相場【2024年版】内訳・安くする方法を専門家が解説",
    "description": "墓じまいにかかる費用の総額相場、内訳、費用を安くする方法を解説。",
    "author": { "@type": "Organization", "name": "清蓮（Seiren）", "url": `${BASE_URL}/about` },
    "publisher": { "@type": "Organization", "name": "清蓮（Seiren）", "logo": { "@type": "ImageObject", "url": `${BASE_URL}/og-image.jpg` } },
    "datePublished": "2024-04-01",
    "dateModified": new Date().toISOString().split("T")[0],
};

const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": { "@type": "Answer", "text": item.a },
    })),
};

const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "ホーム", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "ガイド", "item": `${BASE_URL}/guide` },
        { "@type": "ListItem", "position": 3, "name": "墓じまいの費用相場", "item": `${BASE_URL}/guide/haka-jiman-cost` },
    ],
};

export default function HakaJimanCostPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white-smoke text-gray-800">
            <JsonLd data={articleLd} />
            <JsonLd data={faqLd} />
            <JsonLd data={breadcrumbLd} />
            <Navbar />

            <main className="grow pt-24 pb-20">
                <article className="max-w-3xl mx-auto px-4">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/guide" className="hover:text-primary transition-colors">ガイド一覧</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span>墓じまいの費用相場</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-dark mb-6 leading-tight">
                        墓じまいの費用相場【2024年版】<br className="md:hidden"/>内訳・安くする方法を専門家が解説
                    </h1>
                    <p className="text-gray-600 leading-relaxed text-lg mb-10">
                        「墓じまいをしたいけど費用がいくらかかるか不安」という方は多くいます。本記事では、墓じまいにかかる費用の総額相場から内訳の詳細、費用を抑えるポイントまでを供養の専門家がわかりやすく解説します。
                    </p>

                    {/* AI Summary Block */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
                        <h2 className="font-bold text-lg text-primary-dark mb-4 border-b border-primary/10 pb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            この記事の要約（30秒でわかる墓じまい費用）
                        </h2>
                        <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                            <li>・<strong>総額の目安：</strong> 30万円〜100万円程度（墓石サイズ・立地・お寺との関係で変動）</li>
                            <li>・<strong>主な内訳：</strong> 石材店への解体・撤去費用＋行政手続き費用＋離檀料（寺院）</li>
                            <li>・<strong>最も費用がかかるのは：</strong> 離檀料（0円〜30万円以上）と石材撤去費用（15万〜50万円）</li>
                            <li>・<strong>費用を抑えるには：</strong> 複数の石材店に見積もりを取り、離檀料は相場内で交渉する</li>
                            <li>・<strong>補助金：</strong> 一般的な国の補助金は現時点では存在しない</li>
                        </ul>
                    </div>

                    <div className="prose max-w-none text-gray-700 leading-loose space-y-10">

                        <h2>墓じまいの費用総額相場</h2>
                        <p>
                            墓じまいの費用総額は、一般的に<strong>30万円〜100万円程度</strong>が目安です。ただし、以下の条件によって大きく変動します。
                        </p>
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden not-prose">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-4 py-3 font-bold text-gray-700">条件</th>
                                        <th className="text-left px-4 py-3 font-bold text-gray-700">費用の目安</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="px-4 py-3">小型のお墓（1㎡未満）・霊園</td>
                                        <td className="px-4 py-3 font-medium text-primary">30万円〜50万円</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">一般的なお墓（1〜3㎡）・寺院</td>
                                        <td className="px-4 py-3 font-medium text-primary">50万円〜80万円</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3">大型のお墓・離檀料・遠方</td>
                                        <td className="px-4 py-3 font-medium text-primary">80万円〜100万円以上</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h2>費用の内訳（4項目）</h2>

                        <h3>① 石材店への解体・撤去費用（15万〜50万円）</h3>
                        <p>
                            墓じまい費用の中核となるのが、石材店に支払う解体・撤去・運搬・処分費用です。墓石の大きさ、搬出経路の難易度（狭い道・段差の有無）、地域によって金額が変わります。<strong>必ず複数の石材店から見積もりを取る</strong>ことが費用削減の基本です。
                        </p>

                        <h3>② 行政手続き費用（数千円〜1万円程度）</h3>
                        <p>
                            「改葬許可申請」に必要な書類の発行費用です。市区町村の窓口で「改葬許可証」を取得するための費用で、数百円〜数千円程度の手数料がかかります。
                        </p>

                        <h3>③ 離檀料（0円〜30万円）</h3>
                        <p>
                            お寺の檀家をやめる際に、これまでの供養へのお礼として寺院に支払う費用です。<strong>法的な義務ではありません</strong>が、慣習として支払うケースが多く、相場は10万円〜30万円程度です。金額が高すぎると感じた場合は交渉が可能です。
                        </p>

                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 not-prose flex gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-bold text-amber-800 mb-1">注意点</p>
                                <p className="text-sm text-amber-700">離檀料で100万円以上を請求されるケースもまれに発生しています。納得できない金額を請求された場合は、弁護士や行政書士への相談をおすすめします。清蓮でも無料相談を承っています。</p>
                            </div>
                        </div>

                        <h3>④ 新しい納骨先の費用（別途）</h3>
                        <p>
                            遺骨を新しい場所へ移す場合（改葬）は、新たな納骨先の費用が必要です。永代供養・納骨堂・樹木葬など選択肢によって数万円〜数十万円異なります。
                        </p>

                        <h2>費用を安くする3つのポイント</h2>
                        <ol className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 not-prose list-none">
                            <li className="flex items-start gap-3">
                                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded shrink-0 mt-0.5">1</span>
                                <div>
                                    <p className="font-bold text-gray-800">複数の石材店から見積もりを取る</p>
                                    <p className="text-sm text-gray-600 mt-1">同じ工事でも石材店によって費用は20〜30%異なることがあります。最低3社に見積もりを依頼しましょう。</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded shrink-0 mt-0.5">2</span>
                                <div>
                                    <p className="font-bold text-gray-800">離檀料は相場内で丁寧に交渉する</p>
                                    <p className="text-sm text-gray-600 mt-1">離檀料の相場（3〜10万円が目安との見方もある）を把握したうえで、誠実に交渉することで費用を抑えられる場合があります。</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded shrink-0 mt-0.5">3</span>
                                <div>
                                    <p className="font-bold text-gray-800">工事の最適タイミングを選ぶ</p>
                                    <p className="text-sm text-gray-600 mt-1">お彼岸・お盆前後は石材店の繁忙期のため費用が高くなりやすい傾向があります。時期をずらすことで多少の節約になる場合があります。</p>
                                </div>
                            </li>
                        </ol>

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
                    <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            墓じまい・改葬のご相談は清蓮へ
                        </h3>
                        <p className="text-gray-600 mb-8">
                            費用の不安、お寺との交渉、新しい納骨先の選び方まで、専門スタッフが中立な立場で無料サポートいたします。
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/consult/grave-closure">
                                <Button size="lg" className="w-full sm:w-auto">無料で相談する</Button>
                            </Link>
                            <Link href="/grave-closure">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2">墓じまいガイドを読む</Button>
                            </Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
