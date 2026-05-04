import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { JsonLd } from "../../components/seo/JsonLd";
import { ChevronRight, ChevronDown, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ohakanavi.jp";

export const metadata: Metadata = {
    title: "納骨堂の費用相場【2024年版】種類別の価格・選び方・注意点｜清蓮",
    description: "納骨堂の費用相場（30万〜150万円）、種類別（ロッカー型・仏壇型・自動搬送型）の費用比較、選び方のポイントを供養の専門家が解説します。",
    alternates: { canonical: `${BASE_URL}/guide/noukotsudo-cost` },
    openGraph: {
        title: "納骨堂の費用相場【2024年版】種類別の価格・選び方",
        description: "納骨堂の費用相場と種類別の価格比較を専門家が解説。",
        url: `${BASE_URL}/guide/noukotsudo-cost`,
    },
};

const faqData = [
    { q: "納骨堂は何人分の遺骨を納められますか？", a: "施設や契約プランによって異なります。1人用・2人用（夫婦）・家族対応（最大4〜8人）など様々なプランがあります。購入前に何名分の容量が確保されているか確認してください。" },
    { q: "納骨堂の費用は一般墓より安いですか？", a: "多くの場合、一般墓（150万〜300万円が相場）より安く、都市部でのアクセス良好な施設を選べるのが納骨堂の利点です。ただし、年間管理費や光熱費が別途かかる施設もあるため、総額で比較することが重要です。" },
    { q: "納骨堂に期限はありますか？", a: "多くの納骨堂には「使用期限」があります。一般的に13回忌・33回忌などの期間が設定されており、期間後は合祀（永代供養）になるプランが主流です。期限なしの施設も一部あります。" },
    { q: "納骨堂はお参りの自由度はどのくらいですか？", a: "施設の営業時間内であれば基本的にいつでもお参りができます。自動搬送式は端末操作で遺骨がお参りスペースに運ばれてくるため、雨の日も快適です。駅近の施設が多く、定期的なお参りがしやすいのが特徴です。" },
    { q: "納骨堂と霊園の違いは何ですか？", a: "納骨堂は「屋内」で遺骨を保管する施設で、天候に影響されずお参りできます。霊園は「屋外」に墓石を建てるタイプです。都市部在住の方や、お参りのしやすさを重視する方には納骨堂が選ばれる傾向があります。" },
];

const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "納骨堂の費用相場【2024年版】種類別の価格・選び方・注意点",
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
        { "@type": "ListItem", "position": 3, "name": "納骨堂の費用相場", "item": `${BASE_URL}/guide/noukotsudo-cost` },
    ],
};

const TYPES = [
    { type: "ロッカー型", cost: "30万〜70万円", desc: "ロッカーのような個別スペースに骨壺を安置。費用が比較的安く、都市部に多い。", badge: "費用重視" },
    { type: "仏壇型", cost: "50万〜150万円", desc: "仏壇の下に遺骨を安置するタイプ。参拝スペースが広く、自宅に近い感覚でお参りできる。", badge: "参拝重視" },
    { type: "自動搬送型（機械式）", cost: "70万〜150万円", desc: "ICカードや端末操作で遺骨が自動でお参りスペースへ移動。都市部の大型施設に多い。", badge: "快適・最新設備" },
    { type: "位牌型（堂内墓地）", cost: "30万〜80万円", desc: "共有スペースに位牌と遺骨を安置するタイプ。宗教色のある施設（寺院系）に多い。", badge: "寺院お参り文化向け" },
];

export default function NoukotsudoCostPage() {
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
                        <span>納骨堂の費用相場</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-dark mb-6 leading-tight">
                        納骨堂の費用相場【2024年版】<br className="md:hidden"/>種類別の価格・選び方・注意点
                    </h1>
                    <p className="text-gray-600 leading-relaxed text-lg mb-10">
                        納骨堂は「屋内で遺骨を安置できる」「駅近でアクセスが良い」「費用が抑えられる」と、都市部を中心に急増している供養スタイルです。本記事では、納骨堂の費用相場・種類別の価格比較・選び方のポイントを解説します。
                    </p>

                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
                        <h2 className="font-bold text-lg text-primary-dark mb-4 border-b border-primary/10 pb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            この記事の要約
                        </h2>
                        <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                            <li>・<strong>費用相場：</strong> 30万円〜150万円（種類・立地・容量で変動）</li>
                            <li>・<strong>一般墓との違い：</strong> 屋内施設、天候に関係なくお参りできる</li>
                            <li>・<strong>使用期限：</strong> 多くの施設で13〜33回忌後に合祀になる</li>
                            <li>・<strong>都市部中心：</strong> 駅近の施設が多く定期的なお参りがしやすい</li>
                            <li>・<strong>年間管理費：</strong> 別途かかる施設もあるため総額で比較することが重要</li>
                        </ul>
                    </div>

                    <div className="prose max-w-none text-gray-700 leading-loose space-y-10">

                        <h2>納骨堂の種類と費用相場の比較</h2>
                        <div className="space-y-4 not-prose">
                            {TYPES.map((item, i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5">
                                    <div className="flex items-start justify-between gap-4 mb-2">
                                        <p className="font-bold text-primary-dark">{item.type}</p>
                                        <span className="bg-secondary/10 text-secondary text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap">{item.badge}</span>
                                    </div>
                                    <p className="text-sm font-semibold text-primary mb-2">相場：{item.cost}</p>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2>納骨堂と一般墓・永代供養の費用比較</h2>
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden not-prose">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="text-left px-4 py-3 font-bold text-gray-700">供養スタイル</th>
                                        <th className="text-left px-4 py-3 font-bold text-gray-700">費用目安</th>
                                        <th className="text-left px-4 py-3 font-bold text-gray-700">特徴</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr><td className="px-4 py-3 font-medium">一般墓（墓石）</td><td className="px-4 py-3 text-gray-700 font-semibold">150万〜300万円</td><td className="px-4 py-3 text-gray-600">屋外・代々継承・管理費あり</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">納骨堂</td><td className="px-4 py-3 text-primary font-semibold">30万〜150万円</td><td className="px-4 py-3 text-gray-600">屋内・使用期限あり・駅近多い</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">樹木葬</td><td className="px-4 py-3 text-primary font-semibold">5万〜150万円</td><td className="px-4 py-3 text-gray-600">屋外・自然葬・郊外多い</td></tr>
                                    <tr><td className="px-4 py-3 font-medium">永代供養（合祀）</td><td className="px-4 py-3 text-primary font-semibold">5万〜30万円</td><td className="px-4 py-3 text-gray-600">最安値・継承者不要</td></tr>
                                </tbody>
                            </table>
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
                        <h3 className="text-xl font-bold text-gray-800 mb-4">あなたに合った納骨堂を探しませんか？</h3>
                        <p className="text-gray-600 mb-8">清蓮では全国の納骨堂を費用・アクセス・宗教などの条件で比較できます。見学予約も無料です。</p>
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
