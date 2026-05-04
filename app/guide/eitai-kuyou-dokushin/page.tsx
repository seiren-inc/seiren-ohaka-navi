import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { JsonLd } from "../../components/seo/JsonLd";
import { ChevronRight, ChevronDown, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ohakanavi.jp";

export const metadata: Metadata = {
    title: "永代供養は独身・一人っ子でも大丈夫？選び方と注意点を解説｜清蓮",
    description: "独身・おひとりさま・子なしの方が永代供養を選ぶ際のポイント、適した種類の選び方、費用相場、生前予約の方法を供養の専門家が解説します。",
    alternates: { canonical: `${BASE_URL}/guide/eitai-kuyou-dokushin` },
    openGraph: {
        title: "永代供養は独身・一人っ子でも大丈夫？選び方と注意点",
        description: "独身・おひとりさまが永代供養を選ぶ際の選び方・注意点を解説。",
        url: `${BASE_URL}/guide/eitai-kuyou-dokushin`,
    },
};

const faqData = [
    {
        q: "独身・おひとりさまでも永代供養を利用できますか？",
        a: "はい、利用できます。むしろ「永代供養」は継承者が不要な供養方法のため、独身・一人っ子・子なしの方にとって最も適した選択肢のひとつです。生前に契約・支払いが可能な施設も多く、ご自身の意思で供養先を決めておけます。"
    },
    {
        q: "生前に永代供養を契約すると何かメリットがありますか？",
        a: "生前契約の最大のメリットは、自分の意思で供養の方法・場所・費用を決められることです。亡くなった後に遺族（がいなくても手続きされる形で）対応が進む仕組みを整えておけるため、「死後事務」と組み合わせて活用する方が増えています。"
    },
    {
        q: "身寄りがない場合、亡くなった後の手続きはどうなりますか？",
        a: "身寄りがない方の場合、行政（市区町村）が火葬・埋葬を行う「行旅死亡人」制度がありますが、希望の供養を保証するものではありません。生前に「死後事務委任契約」を司法書士や行政書士と結んでおくと、希望通りの供養先への納骨が可能になります。清蓮でもこの点も含めてご相談を承っています。"
    },
    {
        q: "独身の場合、どの種類の永代供養が一番おすすめですか？",
        a: "費用と手軽さを優先する場合は「合祀型の永代供養墓」、生前にお参りの場所を持ちたい場合は「個別安置型の永代供養」や「納骨堂」がおすすめです。ご自身の生き方や価値観に合った選択が大切ですので、まず無料相談でご状況をお聞かせください。"
    },
    {
        q: "一人で永代供養を申し込む場合、誰か立会人は必要ですか？",
        a: "基本的に、永代供養の申し込みに立会人は必要ありません。施設によっては本人確認書類のみで手続きが完了します。施設見学も一人での来訪を歓迎している霊園・寺院がほとんどです。"
    },
];

const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "永代供養は独身・одного一人っ子でも大丈夫？選び方と注意点を解説",
    "description": "独身・おひとりさまが永代供養を選ぶ際のポイント・費用相場・生前予約方法を解説。",
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
        { "@type": "ListItem", "position": 3, "name": "独身・おひとりさまの永代供養", "item": `${BASE_URL}/guide/eitai-kuyou-dokushin` },
    ],
};

export default function EitaiKuyouDokushinPage() {
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
                        <span>独身・おひとりさまの永代供養</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary-dark mb-6 leading-tight">
                        永代供養は独身・おひとりさまでも大丈夫？<br className="md:hidden"/>選び方と注意点を解説
                    </h1>
                    <p className="text-gray-600 leading-relaxed text-lg mb-10">
                        「独身なので、自分が亡くなった後のお墓のことが心配」「子どもがいないから、お墓の管理を頼める人がいない」——そのような不安を抱える方にとって、「永代供養」は有力な解決策のひとつです。本記事では、おひとりさまが永代供養を選ぶ際の選び方・注意点・手続きの流れを解説します。
                    </p>

                    {/* AI Summary Block */}
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
                        <h2 className="font-bold text-lg text-primary-dark mb-4 border-b border-primary/10 pb-2 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                            この記事の要約（30秒でわかるおひとりさまの永代供養）
                        </h2>
                        <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                            <li>・<strong>結論：</strong> 独身・一人っ子・子なしの方こそ、継承者不要の永代供養が最適な選択肢</li>
                            <li>・<strong>生前予約が可能：</strong> 存命中に自分の意思で供養先と契約・支払いができる</li>
                            <li>・<strong>費用相場：</strong> 合祀型なら5万〜30万円、個別安置型なら30万〜100万円</li>
                            <li>・<strong>重要な組み合わせ：</strong> 「死後事務委任契約」と合わせることで、亡くなった後の手続きも安心</li>
                            <li>・<strong>立会人は不要：</strong> ひとりで見学・申し込みができる施設がほとんど</li>
                        </ul>
                    </div>

                    <div className="prose max-w-none text-gray-700 leading-loose space-y-10">

                        <h2>なぜ独身・おひとりさまに永代供養が向いているか</h2>
                        <p>
                            「永代供養」とは、寺院や霊園が家族に代わって継続的に遺骨の管理・供養を行う仕組みです。<strong>継承者（お墓を管理してくれる子孫）が不要</strong>というのが最大の特徴であり、独身・一人っ子・子なしの方に特に支持されています。
                        </p>
                        <div className="grid md:grid-cols-3 gap-4 not-prose">
                            {[
                                { label: "継承者が不要", desc: "跡継ぎがいなくても、施設が永代にわたって管理・供養を続けます" },
                                { label: "管理費がかからない", desc: "多くのプランで初期費用のみで、その後の年間管理費が不要です" },
                                { label: "生前予約ができる", desc: "元気なうちに自分の意思で供養先・費用を確定できます" },
                            ].map((item, i) => (
                                <div key={i} className="bg-white border border-gray-200 rounded-xl p-5">
                                    <p className="font-bold text-primary-dark mb-2">✓ {item.label}</p>
                                    <p className="text-sm text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2>おひとりさまにおすすめの永代供養の種類</h2>
                        <div className="space-y-4 not-prose">
                            {[
                                {
                                    type: "合祀型永代供養墓（ごうし）",
                                    cost: "5万円〜30万円",
                                    desc: "他の方の遺骨と一緒に埋葬されるタイプ。費用が最も安く、管理が不要。「遺骨を個別に取り出せなくてもいい」という方に向いています。",
                                    badge: "費用重視"
                                },
                                {
                                    type: "個別安置型（集合墓・個人区画）",
                                    cost: "30万円〜100万円",
                                    desc: "一定期間（13回忌・33回忌など）は個別のスペースに安置。期間後は合祀されます。生前のお参りの場を持ちたい方に向いています。",
                                    badge: "バランス型"
                                },
                                {
                                    type: "納骨堂（屋内型）",
                                    cost: "30万円〜100万円",
                                    desc: "屋内施設で遺骨を預かるタイプ。都市部に多く、アクセスが良好。生前から自分専用のスペースを確保できます。",
                                    badge: "アクセス重視"
                                },
                                {
                                    type: "樹木葬（自然葬）",
                                    cost: "30万円〜150万円",
                                    desc: "樹木や草花を墓標とする自然葬。「自然に還りたい」という方に選ばれています。宗教不問の施設がほとんどです。",
                                    badge: "自然・シンプル志向"
                                },
                            ].map((item, i) => (
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

                        <h2>身寄りがない場合、亡くなった後の手続きはどうなるか</h2>
                        <p>
                            最も多いご不安が「自分が亡くなった後、誰が手続きしてくれるのか？」という点です。身寄りがない場合でも、以下の方法で事前に対策ができます。
                        </p>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 not-prose">
                            <h3 className="font-bold text-gray-800 mb-4">死後事務委任契約とは</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                死後事務委任契約とは、亡くなった後の各種手続き（遺体の引き取り・火葬・遺骨の納骨・家財整理など）を、生前に信頼できる人（司法書士・行政書士・NPOなど）に委任しておく契約です。永代供養先への納骨も指定できるため、自分の意思通りの供養が実現します。
                            </p>
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
                    <div className="mt-16 bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                            おひとりさまの供養、まずは無料相談から
                        </h3>
                        <p className="text-gray-600 mb-8">
                            清蓮では、独身・おひとりさまの方の供養選びを中立な立場でサポートしています。生前予約・死後事務についてもお気軽にご相談ください。
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link href="/consult">
                                <Button size="lg" className="w-full sm:w-auto">無料で相談する</Button>
                            </Link>
                            <Link href="/search?type=永代供養墓">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2">永代供養墓を探す</Button>
                            </Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </div>
    );
}
