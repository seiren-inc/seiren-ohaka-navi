import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { JsonLd } from "../../components/seo/JsonLd";
import { ChevronRight, ChevronDown, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ohakanavi.jp";

export const metadata: Metadata = {
    title: "樹木葬の費用相場【2024年版】安い理由・選び方・注意点｜清蓮",
    description: "樹木葬の費用相場（5万円〜150万円）、なぜ安いか、種類別費用比較、失敗しない選び方を専門家が解説。宗旨宗派不問・ペット対応も紹介。",
    alternates: { canonical: `${BASE_URL}/guide/jumokusou-cost` },
    openGraph: {
        title: "樹木葬の費用相場【2024年版】安い理由・選び方",
        description: "樹木葬の費用相場と選び方を専門家が解説。",
        url: `${BASE_URL}/guide/jumokusou-cost`,
    },
};

const faqData = [
    { q: "樹木葬の費用はなぜ一般墓より安いですか？", a: "一般墓で必要な「墓石の購入・設置費用（100万円〜200万円以上）」が不要なことと、年間管理費なしのプランが多いことが主な理由です。" },
    { q: "樹木葬は合祀（他の遺骨と一緒）になりますか？", a: "「合祀タイプ」と「個別タイプ」があります。合祀後は遺骨を取り出せないため、事前に確認が必要です。" },
    { q: "樹木葬は宗教不問で利用できますか？", a: "ほとんどの樹木葬施設は宗旨宗派不問です。寺院が運営する施設でも宗派不問のケースがほとんどです。" },
    { q: "樹木葬はお参りできますか？", a: "できます。シンボルの樹木前にお参りスペースが設けられています。線香・お花の持ち込みルールは施設ごとに異なります。" },
    { q: "樹木葬でペットと一緒に埋葬できますか？", a: "ペット対応の樹木葬を提供する施設が増えています。施設の詳細ページや見学時にご確認ください。" },
];

const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "樹木葬の費用相場【2024年版】安い理由・選び方・注意点",
    "author": { "@type": "Organization", "name": "清蓮（Seiren）", "url": `${BASE_URL}/about` },
    "publisher": { "@type": "Organization", "name": "清蓮（Seiren）", "logo": { "@type": "ImageObject", "url": `${BASE_URL}/og-image.jpg` } },
    "datePublished": "2024-04-01",
    "dateModified": new Date().toISOString().split("T")[0],
};

const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({ "@type": "Question", "name": item.q, "acceptedAnswer": { "@type": "Answer", "text": item.a } })),
};

const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "ホーム", "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "ガイド", "item": `${BASE_URL}/guide` },
        { "@type": "ListItem", "position": 3, "name": "樹木葬の費用相場", "item": `${BASE_URL}/guide/jumokusou-cost` },
    ],
};

export default function JumokusouCostPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white-smoke text-gray-800">
            <JsonLd data={articleLd} />
            <JsonLd data={faqLd} />
            <JsonLd data={breadcrumbLd} />
            <Navbar />
            <main id="main-content" className="grow pt-24 pb-20">
                <article className="max-w-3xl mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/guide" className="hover:text-primary transition-colors">ガイド一覧</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span>樹木葬の費用相場</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-dark mb-6 leading-tight">
                        樹木葬の費用相場【2024年版】<br className="md:hidden"/>安い理由・選び方・注意点
                    </h1>
                    <p className="text-gray-600 leading-relaxed text-lg mb-10">
                        「樹木葬は一般墓より安いと聞いたけれど、実際いくらかかるの？」本記事では、樹木葬の費用相場・種類別の価格比較・選ぶ際の注意点を解説します。
                    </p>

                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
                        <h2 className="font-bold text-lg text-primary-dark mb-4 border-b border-primary/10 pb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            この記事の要約
                        </h2>
                        <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                            <li>・<strong>費用相場：</strong> 5万円〜150万円（合祀型〜個別区画型で変動）</li>
                            <li>・<strong>安い理由：</strong> 墓石不要、年間管理費なしのプランが多い</li>
                            <li>・<strong>一般墓との差額：</strong> 一般墓は150万〜300万円、樹木葬は30万〜80万円が主流</li>
                            <li>・<strong>注意点：</strong> 合祀後は遺骨を取り出せない</li>
                            <li>・<strong>宗教：</strong> ほとんどの施設で宗旨宗派不問</li>
                        </ul>
                    </div>

                    <div className="prose max-w-none text-gray-700 leading-loose space-y-10">

                        <h2>樹木葬の種類と費用相場の比較</h2>
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden not-prose">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-4 py-3 font-bold text-gray-700">種類</th>
                                        <th className="text-left px-4 py-3 font-bold text-gray-700">費用目安</th>
                                        <th className="text-left px-4 py-3 font-bold text-gray-700">特徴</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr><td className="px-4 py-3 font-medium">合祀型</td><td className="px-4 py-3 text-primary font-semibold">5万〜30万円</td><td className="px-4 py-3 text-gray-600">他の遺骨と混合。最安値。</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">集合型（シンボル樹木下）</td><td className="px-4 py-3 text-primary font-semibold">30万〜80万円</td><td className="px-4 py-3 text-gray-600">1本の樹木の下に複数名が埋葬。</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">個別区画型</td><td className="px-4 py-3 text-primary font-semibold">80万〜150万円</td><td className="px-4 py-3 text-gray-600">一人（または夫婦）専用の区画。</td></tr>
                                </tbody>
                            </table>
                        </div>

                        <h2>選ぶ前に確認すること</h2>
                        <div className="space-y-3 not-prose">
                            {[
                                { check: "合祀か個別かを確認する", desc: "合祀後は遺骨を取り出せません。希望する埋葬形式を明確にしましょう。" },
                                { check: "お参りのルールを確認する", desc: "線香・お花の持ち込みが制限される施設があります。" },
                                { check: "アクセスを確認する", desc: "郊外施設が多いため、定期的に行けるか確認しましょう。" },
                                { check: "費用の内訳を確認する", desc: "「管理費なし」でも追加オプション費用が発生するケースがあります。" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-gray-800 text-sm">{item.check}</p>
                                        <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h2>よくある質問（FAQ）</h2>
                        <div className="space-y-4 not-prose">
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

                    <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">あなたに合った樹木葬を探しませんか？</h3>
                        <p className="text-gray-600 mb-8">清蓮では全国の樹木葬を費用・宗教・アクセスなどの条件で比較できます。見学予約も無料です。</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/search?type=樹木葬"><Button size="lg" className="w-full sm:w-auto">樹木葬を検索する</Button></Link>
                            <Link href="/consult"><Button size="lg" variant="outline" className="w-full sm:w-auto border-2">専門家に無料相談する</Button></Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
