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
    alternates: { canonical: "https://ohakanavi.jp/guide/noukotsudou" }
};

export default function GuideNoukotsudouPage() {
    const articleLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "納骨堂とは？種類・費用相場・メリット・選び方を解説",
        "description": "納骨堂の種類、費用相場、メリット・デメリット、失敗しない選び方を解説。",
        "author": { "@type": "Organization", "name": "清蓮（Seiren）", "url": "https://ohakanavi.jp/about" },
        "publisher": {
            "@type": "Organization", "name": "清蓮（Seiren）",
            "logo": { "@type": "ImageObject", "url": "https://ohakanavi.jp/og-image.jpg" }
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
            <main id="main-content" className="grow pt-24 pb-20">
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

                    <div className="prose max-w-none text-gray-700 leading-loose space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold font-serif text-primary-dark mb-6 border-b-2 border-primary/20 pb-2">納骨堂とは？選ばれている背景と基本知識</h2>
                            <p>
                                納骨堂（のうこつどう）とは、<strong>屋内の施設に遺骨を安置する新しいスタイルのお墓</strong>です。元々は、お墓を建てるまでの一時的な遺骨の預かり所として利用されていましたが、現在では恒久的なお墓の代わりとして、特に都市部を中心に爆発的な人気を集めています。
                            </p>
                            <p>
                                「雨や雪の日でも濡れずにお参りができる」「駅から近くて通いやすい」「墓石を建てるより安価」「最後は永代供養（えいたいくよう）に移行できる」といったメリットから、高齢の方や跡継ぎがいない方だけでなく、お墓への価値観が変化した若い世代からも支持されています。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-serif text-primary-dark mb-6 border-b-2 border-primary/20 pb-2">納骨堂の4つの種類とそれぞれの特徴</h2>
                            <p>納骨堂は建物の構造や遺骨の安置方法によって、大きく以下の4種類に分けられます。見栄えや価格に大きな差があるため、違いをしっかり把握しておきましょう。</p>
                            
                            <div className="grid sm:grid-cols-2 gap-6 my-8 not-prose">
                                {[
                                    { type: "ロッカー型・棚型", desc: "コインロッカーや本棚のように区切られた個別のスペースに骨壺を安置するタイプ。最もシンプルでコンパクトなため、費用が大幅に抑えられます。扉をあけてお参りする形式と、共有の参拝ブースが設けられている形式があります。", price: "10万〜30万円" },
                                    { type: "仏壇型（霊廟型）", desc: "上段が仏壇スペース、下段がカロート（納骨スペース）になっているタイプ。個別の仏壇に遺影やお花、思い出の品を飾れるため、従来のお墓や自宅の仏壇に近い感覚で手を合わせることができます。複数世代での利用に向いています。", price: "30万〜80万円" },
                                    { type: "自動搬送式（機械式・マンション型）", desc: "受付で専用のICカードをかざすと、バックヤードで保管されている遺骨が自動的にお参りブースまで運ばれてくる最新鋭のシステムです。都市部の駅近に多く、設備の充実度や高級感が魅力ですが、その分システム維持費がかさみます。", price: "50万〜150万円" },
                                    { type: "位牌型（いはいがた）", desc: "個別の位牌だけを専用の棚などに並べて安置し、遺骨は最初からまたは早い段階で合祀（ごうし：他の方と一緒に埋葬）するタイプです。個別のスペースを持たないため、全ての納骨堂スタイルの中で最も費用が安く済みます。", price: "数万〜30万円" }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
                                        <h3 className="text-base font-bold text-primary-dark mb-3">【{idx+1}】 {item.type}</h3>
                                        <p className="text-sm text-gray-600 mb-6 grow">{item.desc}</p>
                                        <div className="bg-gray-50 p-3 rounded-lg text-center mt-auto">
                                            <span className="text-xs text-text-muted font-bold block mb-1">費用相場</span>
                                            <span className="font-bold text-secondary text-base">{item.price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-serif text-primary-dark mb-6 border-b-2 border-primary/20 pb-2">納骨堂のメリットとデメリット</h2>
                            
                            <div className="grid md:grid-cols-2 gap-8 my-6 not-prose">
                                <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
                                    <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                                        <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">+</span>
                                        納骨堂のメリット
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> <strong>天候に左右されない：</strong> 完全屋内のため、雨雪の日や真夏の暑さ、真冬の寒さを気にせず快適にお参りできます。</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> <strong>アクセスが抜群：</strong> 都市部の主要駅近くなど、公共交通機関で通いやすい一等地に建てられていることが多いです。</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> <strong>準備不要で手ぶら参拝：</strong> 施設内にお花やお香が常備されているため、手ぶらでフラッと立ち寄ることができます。</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> <strong>掃除・草むしり不要：</strong> 施設の管理者が定期的に清掃を行うため、お墓掃除の肉体的負担がありません。</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" /> <strong>永代供養への移行がスムーズ：</strong> 跡継ぎがいなくなっても、施設内の合祀墓などに移されて永代供養してもらえます。</li>
                                    </ul>
                                </div>
                                <div className="bg-red-50/50 p-6 rounded-xl border border-red-100">
                                    <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
                                        <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">-</span>
                                        納骨堂のデメリット・注意点
                                    </h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" /> <strong>年間管理費が続く：</strong> 自動搬送式などは設備の維持にかかる「管理費（年間1万〜2万円程度）」が継続して発生します。</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" /> <strong>建物の老朽化・倒産リスク：</strong> 数十年後に建物の建て替え問題が発生したり、最悪の場合、運営法人が破綻するリスクがゼロではありません。</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" /> <strong>混雑時の待ち時間：</strong> お盆やお彼岸など繁忙期には、お参りブースが空くまで順番待ちを強いられることがあります。</li>
                                        <li className="flex items-start gap-2 text-gray-700 text-sm"><div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" /> <strong>お供え物に制限がある：</strong> 衛生面や防災の観点から「生花」や「火を使う線香」「飲食物」の持ち込みを禁止している施設が少なくありません。</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold font-serif text-primary-dark mb-6 border-b-2 border-primary/20 pb-2">納骨堂選びで「失敗しない」ための3つのチェックポイント</h2>
                            <p>
                                納骨堂は便利で人気が高い反面、特有のリスクも存在します。契約前に以下のポイントを念入りに確認してください。
                            </p>
                            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm space-y-6 not-prose mt-6">
                                <div>
                                    <h3 className="font-bold text-lg text-primary-dark flex items-center gap-2 mb-2">
                                        <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> 
                                        運営法人の信頼性と経営状況を確認する
                                    </h3>
                                    <p className="text-gray-600 text-sm">納骨堂で最も恐ろしいのは運営元の経営破綻です。「事業主体は誰か（宗教法人なのか、開発業者が裏にいるのか）」「過去の実績はどうか」を調べ、過度に安いプランや強引な営業手法をとる施設は避けるのが無難です。</p>
                                </div>
                                <div className="border-t border-gray-100 pt-6">
                                    <h3 className="font-bold text-lg text-primary-dark flex items-center gap-2 mb-2">
                                        <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> 
                                        「合祀されるまでの期間」と「年間管理費の未納対応」
                                    </h3>
                                    <p className="text-gray-600 text-sm">個別区画を使用できる期間（例：13回忌まで、33回忌まで）と、購入者（または継承者）が年間管理費を支払えなくなった場合に、いつどのような条件で遺骨が合祀スペースに移されるのかというルールの確認が必須です。</p>
                                </div>
                                <div className="border-t border-gray-100 pt-6">
                                    <h3 className="font-bold text-lg text-primary-dark flex items-center gap-2 mb-2">
                                        <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span> 
                                        必ず「体験見学会」に参加して実写を確認する
                                    </h3>
                                    <p className="text-gray-600 text-sm">特に自動搬送式の場合、「機械の作動音は気にならないか」「お参りブースの広さは十分か」「お盆など混雑時の対応策はどうなっているか」など、実際に自分の目で見て初めてわかることが多々あります。</p>
                                </div>
                            </div>
                        </section>
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
