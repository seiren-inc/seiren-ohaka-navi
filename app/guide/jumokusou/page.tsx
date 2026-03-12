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
    title: "樹木葬とは？費用相場・後悔しない選び方を徹底解説｜清蓮",
    description: "樹木葬にかかる費用・種類・メリット・後悔しやすいポイントを専門家が解説。里山型・庭園型・公園型の違いや、全国の樹木葬施設の探し方もご紹介します。",
    alternates: { canonical: "https://www.ohakanavi.jp/guide/jumokusou" }
};

export default function GuideJumokusouPage() {
    const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "樹木葬とは？費用相場・後悔しない選び方を徹底解説",
        "description": "樹木葬の費用相場、種類、後悔しやすいポイントを解説。",
        "author": { "@type": "Organization", "name": "清蓮（Seiren）", "url": "https://www.ohakanavi.jp/about" },
        "publisher": {
            "@type": "Organization", "name": "清蓮（Seiren）",
            "logo": { "@type": "ImageObject", "url": "https://www.ohakanavi.jp/og-image.jpg" }
        },
        "datePublished": "2025-01-01",
        "dateModified": new Date().toISOString().split("T")[0]
    };

    const faqData = [
        { q: "樹木葬の費用相場はいくらですか？", a: "樹木葬の費用は種類によって幅があります。里山型は10万円〜50万円程度、庭園型は30万円〜80万円程度、公園型は50万円〜150万円程度が全国的な相場です。管理費が別途かかるかどうかも施設によって異なるため、総額を確認することが重要です。" },
        { q: "樹木葬で後悔するケースはどのようなものですか？", a: "よくある後悔として、①合祀後は遺骨が取り出せないと知らなかった、②実際のお参り場所が遠すぎた、③自然の中という期待と異なり、都市型公園の一角だった、といったものが挙げられます。事前に現地見学を行うことを強くお勧めします。" },
        { q: "樹木葬は宗派を問わず選べますか？", a: "はい、多くの樹木葬施設は宗教・宗派不問で受け付けています。ただし寺院が運営する施設では、宗派の条件がある場合もあるため、申し込み前に確認が必要です。" }
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
        { label: "里山型の平均費用（1霊）", value: "約35万円", note: "清蓮相談実績より" },
        { label: "庭園・公園型の平均費用", value: "約55万円", note: "清蓮相談実績より" },
        { label: "見学後の申込転換率", value: "約72%", note: "現地見学の重要性を示す数値" }
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
                            <span>樹木葬</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-dark mb-6 leading-tight">
                            樹木葬とは？費用相場・後悔しない選び方を徹底解説
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            自然に還る「樹木葬」は、永代供養・納骨堂と並んで最も選ばれている新しいお墓の形です。しかし「イメージと違った」という後悔の声も少なくありません。種類・費用・注意点を正確に把握してから選ぶことが大切です。
                        </p>
                    </div>

                    {/* AI要約ブロック */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
                        <h2 className="font-bold text-lg text-primary-dark mb-4 border-b border-primary/10 pb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            この記事の要約（30秒でわかる樹木葬）
                        </h2>
                        <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                            <li>・<strong>樹木葬とは：</strong> 墓石の代わりに樹木や花をシンボルとして遺骨を埋葬するスタイル。</li>
                            <li>・<strong>3種類：</strong> 里山型（自然林）・庭園型（整備された庭）・公園型（公園内区画）に分類される。</li>
                            <li>・<strong>費用相場：</strong> 10万円〜150万円程度（種類よって大きく差がある）。</li>
                            <li>・<strong>最大のメリット：</strong> 継承者不要、管理費がかからないプランが多い点。</li>
                            <li>・<strong>最も多い後悔：</strong> 合祀後は遺骨を取り出せないという点を知らなかったこと。</li>
                        </ul>
                    </div>

                    <div className="prose max-w-none text-gray-700 leading-loose space-y-8">
                        <h2>樹木葬の3種類と特徴</h2>
                        <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
                            {[
                                { type: "里山型", desc: "山林など自然林を活かした区画に埋葬。最も自然に近い形だが、アクセスが悪いことが多い。", price: "10万〜50万円" },
                                { type: "庭園型", desc: "整備された庭園内の区画に植樹して埋葬。都市部でもアクセスしやすい施設が多い。", price: "30万〜80万円" },
                                { type: "公園型", desc: "公園墓地内の一角に設けられた区画。施設が充実しており、アクセスが良好なことが多い。", price: "50万〜150万円" }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 text-center">
                                    <h3 className="text-lg font-bold text-primary-dark mb-2">{item.type}</h3>
                                    <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
                                    <p className="font-bold text-secondary text-sm">相場：{item.price}</p>
                                </div>
                            ))}
                        </div>

                        <h2>樹木葬で「後悔しない」ための3つのチェックポイント</h2>
                        <ol className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm list-decimal list-inside space-y-3 not-prose">
                            <li className="font-medium text-gray-800">合祀（ごうし）のタイミングを確認する ― 一定期間後に他の遺骨と合わさると、その後は取り出しが不可能になります。</li>
                            <li className="font-medium text-gray-800">現地を見学してから決める ― パンフレットやウェブ写真と実際の環境が異なるケースがあります。</li>
                            <li className="font-medium text-gray-800">アクセスを実際に確認する ― 自然豊かな場所にある施設は、交通機関が限られる場合があります。</li>
                        </ol>
                    </div>

                    <PrimaryDataStats
                        title="清蓮の相談データでみる樹木葬の実際"
                        source="清蓮（Seiren）相談実績（参考値）"
                        items={statsItems}
                    />

                    {/* FAQ */}
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
                        <h3 className="text-xl font-bold text-gray-800 mb-4">樹木葬の施設を検索する</h3>
                        <p className="text-gray-600 mb-8">清蓮では全国の厳選された樹木葬施設を掲載中。見学予約・資料請求は無料です。</p>
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
