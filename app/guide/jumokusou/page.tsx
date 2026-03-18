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
            <main className="grow pt-24 pb-20">
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

                    <div className="prose max-w-none text-gray-700 leading-loose space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold font-serif text-primary-dark mb-6 border-b-2 border-primary/20 pb-2">樹木葬とは？人気の理由と基本知識</h2>
                            <p>
                                樹木葬（じゅもくそう）とは、従来の墓石の代わりに<strong>樹木や草花をシンボル（墓標）として埋葬する新しいお墓のスタイル</strong>です。1999年に岩手県で誕生して以来、自然志向の高まりや、少子高齢化に伴う「お墓の跡継ぎ問題」を背景に、現在では最も選ばれるお墓の形態の一つとなりました。
                            </p>
                            <p>
                                「自然に還る」というイメージが先行しますが、実際には霊園や寺院が管理する区画内に埋葬されるため、手入れが行き届いた環境で眠ることができます。また、多くの樹木葬が<strong>永代供養（えいたいくよう：お寺や霊園が家族に代わって供養と管理を行うシステム）</strong>を前提としているため、子供や孫に管理の負担を残さない点も大きな人気の理由です。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-serif text-primary-dark mb-6 border-b-2 border-primary/20 pb-2">樹木葬の3つの種類と特徴</h2>
                            <p>樹木葬は、どのような場所にどのような形で埋葬するかによって、大きく以下の3つの種類に分けられます。それぞれの特徴と費用相場を知り、ご希望に合ったタイプを選びましょう。</p>
                            
                            <div className="grid md:grid-cols-3 gap-6 my-8 not-prose">
                                {[
                                    { type: "里山型（自然林・山林）", desc: "手つかずの自然に近い山林を利用して埋葬します。元祖・樹木葬とも言えるスタイルで、最も「自然に還る」実感が得られますが、都市部からは離れた郊外に多く、アクセスや足回りに難があるケースもあります。", price: "10万〜50万円" },
                                    { type: "庭園型（ガーデニング型）", desc: "霊園や寺院の敷地内に、イングリッシュガーデンのように美しく整備された花壇や庭園を作り、そこに埋葬するタイプです。明るい雰囲気で、都市部でも見つけやすくアクセスが良好です。", price: "30万〜80万円" },
                                    { type: "公園型（シンボルツリー型）", desc: "桜やもみじなどの大きなシンボルツリーの周囲に設けられた区画に埋葬するタイプです。公園のように整備された大規模霊園で多く取り入れられており、管理体制がしっかりしています。", price: "50万〜150万円" }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                                        <h3 className="text-lg font-bold text-primary-dark mb-3">{item.type}</h3>
                                        <p className="text-sm text-gray-600 mb-6 grow">{item.desc}</p>
                                        <div className="bg-gray-50 p-3 rounded-lg text-center mt-auto">
                                            <span className="text-xs text-text-muted font-bold block mb-1">費用相場</span>
                                            <span className="font-bold text-secondary text-lg">{item.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-serif text-primary-dark mb-6 border-b-2 border-primary/20 pb-2">樹木葬のメリット・デメリット</h2>
                            
                            <div className="grid md:grid-cols-2 gap-8 my-6 not-prose">
                                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                                    <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">+</span>
                                        樹木葬のメリット
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> 一般的な墓石建立（150万〜200万円）と比べて<strong>費用を大幅に抑えられる</strong></li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> <strong>跡継ぎが不要</strong>で、子供や孫に管理や費用の負担をかけない</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> 宗教や宗派を問わず、無宗教の方でも利用できる施設が多い</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> 草花や樹木に囲まれた、<strong>明るく自然な環境</strong>で眠ることができる</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> 面倒な草むしりや清掃などの管理は、基本的に霊園側が行ってくれる</li>
                                    </ul>
                                </div>
                                <div className="bg-red-50/50 p-6 rounded-xl border border-red-100">
                                    <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                                        <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">-</span>
                                        樹木葬のデメリット・注意点
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" /> <strong>合祀（他の方と一緒に埋葬）</strong>されると、後から遺骨を取り出せない</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" /> 個別の墓石がないため、「どこに向かって手を合わせればよいかわかりづらい」と感じる親族もいる</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" /> 季節によって花が散っていたり、冬場は枯れ木のように見えて寂しく感じることがある</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" /> 新しい供養の形であるため、保守的な親族からの理解を得られない場合がある</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" /> 複数人（家族など）で入るプランを選ぶと、結果的に一般墓と同程度の費用がかかる場合がある</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-serif text-primary-dark mb-6 border-b-2 border-primary/20 pb-2">樹木葬の費用の内訳</h2>
                            <p>
                                「樹木葬は安い」と言われますが、提示されている金額にどこまでのサービスが含まれているか確認することが重要です。一般的な費用の内訳は以下の通りです。
                            </p>
                            <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                                <li><strong>永代使用料（区画使用料）：</strong> 埋葬するスペースを利用するための権利費用です。（10万〜100万円以上）</li>
                                <li><strong>永代供養料：</strong> お寺や霊園が手厚く供養を続けてくれるための費用です。初期費用に含まれることがほとんどです。（10万〜30万円）</li>
                                <li><strong>埋葬料・納骨手数料：</strong> 実際に遺骨を埋葬（納骨）する際の作業や読経にかかる費用です。（3万〜5万円／1回）</li>
                                <li><strong>銘板・彫刻料：</strong> 個別区画の目印となる小さなプレート（ネームプレートや石板）の設置や、名前を彫刻するための費用です。（3万〜15万円）</li>
                                <li><strong>年間管理費：</strong> 霊園内の草花の維持や清掃にかかる費用です。樹木葬の場合「管理費不要」のプランも多いですが、個別区画を維持する期間（13回忌まで等）だけ発生するケースもあります。（0円〜1万円／年）</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-serif text-primary-dark mb-6 border-b-2 border-primary/20 pb-2">樹木葬で「絶対に後悔しない」ための3つのチェックポイント</h2>
                            <p>
                                樹木葬を選んだ後で「こんなはずじゃなかった」と後悔しないために、以下の3つのポイントは契約前に必ず確認しましょう。
                            </p>
                            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-6 not-prose mt-6">
                                <div>
                                    <h3 className="font-bold text-lg text-primary-dark flex items-center gap-2 mb-2">
                                        <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> 
                                        合祀（ごうし）のタイミングを明確にする
                                    </h3>
                                    <p className="text-gray-600 text-sm">樹木葬の多くは、最終的に他の方の遺骨と一緒に土に還る「合祀」を前提としています。最初から合祀されるプランもあれば、「最後の人が亡くなってから13年間は個別区画、その後合祀」というプランもあります。合祀後は遺骨の移動（改葬）が一切できなくなるため、「いつ合祀されるのか」を必ず確認してください。</p>
                                </div>
                                <div className="border-t border-gray-100 pt-6">
                                    <h3 className="font-bold text-lg text-primary-dark flex items-center gap-2 mb-2">
                                        <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> 
                                        実際に「現地を見学」して周辺環境を見る
                                    </h3>
                                    <p className="text-gray-600 text-sm">パンフレットの写真は春先の一番花が綺麗な時期に撮影されています。「冬に行ってみたら枯れ木しかなかった」「山の斜面で高齢の親が登れなかった」「周囲の道が狭く車で行きにくい」といったトラブルを防ぐため、ご家族と一緒に見学に足を運ぶことが必須です。</p>
                                </div>
                                <div className="border-t border-gray-100 pt-6">
                                    <h3 className="font-bold text-lg text-primary-dark flex items-center gap-2 mb-2">
                                        <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span> 
                                        親族の理解・同意を事前に得る
                                    </h3>
                                    <p className="text-gray-600 text-sm">どれほど本人が自然に還ることを希望していても、残された家族の中には「きちんとしたお墓参りができないのは寂しい」「先祖代々の墓石に入るべきだ」と反発する方もいます。契約後に親族間トラブルにならないよう、事前に話し合いの場を持ちましょう。</p>
                                </div>
                            </div>
                        </section>
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
