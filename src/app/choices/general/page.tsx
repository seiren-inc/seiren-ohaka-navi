import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { Metadata } from "next";
import { CheckCircle, AlertCircle, HelpCircle, BookOpen, Calculator, Search, Phone, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "一般墓（墓石）とは｜費用・選び方・継承について解説｜清蓮",
    description: "一般墓（墓石）の仕組み・費用の目安・メリットと注意点を、供養の専門家が中立の立場で解説します。永代供養・樹木葬との違いも整理。",
};

export default function GeneralGravePage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "清蓮 お墓探しナビ", "item": "https://www.ohakanavi.jp/" },
                    { "@type": "ListItem", "position": 2, "name": "供養のカタチ", "item": "https://www.ohakanavi.jp/choices" },
                    { "@type": "ListItem", "position": 3, "name": "一般墓（墓石）", "item": "https://www.ohakanavi.jp/choices/general" },
                ],
            },
            {
                "@type": "Article",
                "headline": "一般墓（墓石）とは｜費用・選び方・継承について解説",
                "description": "一般墓の仕組み・費用・メリットと注意点を中立的な視点で解説します。",
                "author": { "@type": "Organization", "name": "清蓮" },
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "一般墓の費用はどのくらいかかりますか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "墓石代・永代使用料・管理費など合計で100万円〜300万円程度が一般的な目安です。地域・立地・墓石のサイズや素材によって大きく異なります。" },
                    },
                    {
                        "@type": "Question",
                        "name": "後継ぎがいない場合でも一般墓は選べますか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "一般墓は継承を前提とした制度設計のため、後継ぎがいない場合は将来的に「無縁墓（むえんぼ）」となり、霊園側に撤去・合祀される可能性があります。後継ぎがいない場合は永代供養墓などを検討されることをお勧めします。" },
                    },
                    {
                        "@type": "Question",
                        "name": "一般墓を建てた後、永代供養に変えることはできますか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "はい、改葬（かいそう）という手続きを通じて、一般墓から永代供養墓などへ移転することができます。ただし、墓石の撤去費用や改葬許可の取得など、複数の手続きが必要です。" },
                    },
                ],
            },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />

            <main className="grow pt-24 px-4 pb-20">
                <div className="max-w-4xl mx-auto">

                    {/* ヘッダー */}
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Traditional Memorial
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6 leading-relaxed">
                            一般墓（墓石）とは<br />
                            <span className="text-lg md:text-2xl mt-2 block opacity-80">費用・継承・選び方を中立に解説</span>
                        </h1>

                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 text-left max-w-3xl mx-auto mt-8">
                            <p className="text-gray-700 leading-loose">
                                「先祖代々のお墓を守りたい」<br />
                                「家族がお参りできる場所を残したい」<br />
                                このような思いから、従来型の墓石（一般墓）を選ぶ方も多くいらっしゃいます。<br /><br />
                                このページでは、一般墓の仕組み・費用の目安・メリットと注意点を、<br />
                                他の供養方法と比較しながら整理しています。
                            </p>
                        </div>
                    </div>

                    {/* 一般墓とは */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <BookOpen className="w-6 h-6 mr-3 text-soft-teal" />
                            一般墓とは何か
                        </h2>
                        <div className="prose max-w-none text-gray-600 leading-loose">
                            <h3 className="font-bold text-lg text-primary mb-4">基本的な仕組み</h3>
                            <p className="mb-6">
                                一般墓（いっぱんぼ）とは、墓石を建て、家族・親族が代々引き継いで管理・守っていく従来型のお墓です。<br />
                                霊園・寺院から「永代使用権」を取得し、そのスペースに墓石を建てる形が一般的です。<br /><br />
                                「永代使用権」は土地の所有権ではなく、霊園・寺院に管理料を支払い続けることで使用を維持できる権利です。
                            </p>

                            <h3 className="font-bold text-lg text-primary mb-4">永代供養・樹木葬との違い</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm border-collapse border border-gray-200 mb-6">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="border border-gray-200 px-4 py-3 text-left">項目</th>
                                            <th className="border border-gray-200 px-4 py-3 text-center">一般墓</th>
                                            <th className="border border-gray-200 px-4 py-3 text-center">永代供養墓</th>
                                            <th className="border border-gray-200 px-4 py-3 text-center">樹木葬</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            ["継承者の必要性", "必要", "不要", "不要"],
                                            ["費用目安", "100〜300万円", "5〜150万円", "30〜150万円"],
                                            ["管理の手間", "家族が管理", "施設が管理", "施設が管理"],
                                            ["墓石の有無", "あり", "施設による", "なし（樹木）"],
                                        ].map(([label, a, b, c], i) => (
                                            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                                <td className="border border-gray-200 px-4 py-3 font-medium">{label}</td>
                                                <td className="border border-gray-200 px-4 py-3 text-center">{a}</td>
                                                <td className="border border-gray-200 px-4 py-3 text-center">{b}</td>
                                                <td className="border border-gray-200 px-4 py-3 text-center">{c}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>

                    {/* 費用 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Calculator className="w-6 h-6 mr-3 text-soft-teal" />
                            費用の内訳と目安
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-xl p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {[
                                    { label: "永代使用料", desc: "墓地スペースを使用する権利費用。地域・立地により大きく異なる。", price: "30万〜150万円" },
                                    { label: "墓石代", desc: "石の種類・サイズ・加工により変動。国産石は輸入石より割高になる傾向。", price: "50万〜200万円" },
                                    { label: "管理費（年間）", desc: "霊園・寺院に毎年支払う維持管理費用。", price: "5,000〜20,000円" },
                                    { label: "彫刻・設置費用", desc: "文字の彫刻・据え付け費用。石材店への手数料が含まれることが多い。", price: "10万〜30万円" },
                                ].map((item, i) => (
                                    <div key={i} className="bg-gray-50 p-5 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-sm text-gray-800">{item.label}</span>
                                            <span className="text-primary font-bold text-sm">{item.price}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-primary/5 rounded-lg p-4 text-sm text-gray-600">
                                <strong className="text-primary">合計目安：100万円〜300万円程度</strong><br />
                                上記は一般的な参考値です。地域（都市部か地方か）、霊園の種類（公営・民営・寺院）、石材の選択によって大きく変動します。
                            </div>
                        </div>
                    </section>

                    {/* メリットと注意点 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <AlertCircle className="w-6 h-6 mr-3 text-soft-teal" />
                            メリットと注意点
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-soft-teal/5 p-6 rounded-xl">
                                <h3 className="font-bold text-lg text-soft-teal mb-4 flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    メリット
                                </h3>
                                <ul className="space-y-4 text-gray-700 leading-loose text-sm">
                                    {[
                                        "家族・親族が個別にお参りできる専用の場所を持てます。",
                                        "先祖代々のお墓を継承・維持するという文化的な意味を大切にできます。",
                                        "墓石にご家族のお名前を刻み、形として残すことができます。",
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-soft-teal mr-2 mt-1">●</span>
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="font-bold text-lg text-gray-600 mb-4 flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    注意点
                                </h3>
                                <ul className="space-y-4 text-gray-700 leading-loose text-sm">
                                    {[
                                        "継承者が必要です。後継ぎがいない場合、将来的に無縁墓となる可能性があります。",
                                        "管理料の支払いが滞ると、霊園側の規定により撤去・合祀される場合があります。",
                                        "永代供養墓や樹木葬と比較して、初期費用が高い傾向にあります。",
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-gray-400 mr-2 mt-1">●</span>
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* こんな方に向いている */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-3 text-soft-teal" />
                            一般墓が向いている方
                        </h2>
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { title: "継承者がいる", desc: "お子さんやお孫さんが墓守を引き継げる見込みがある方。" },
                                    { title: "個別の場所を大切にしたい", desc: "家族専用のお参りスペースと墓石を持ちたい方。" },
                                    { title: "先祖供養の形を残したい", desc: "「お墓を守る」という文化・伝統を大切にしたい方。" },
                                    { title: "長期的な費用より初期の確実性を重視", desc: "維持管理を含めた長期運用を前提に、しっかりとした場所を確保したい方。" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="text-soft-teal mt-1">✓</span>
                                        <div>
                                            <span className="font-bold text-sm text-gray-800 block">{item.title}</span>
                                            <span className="text-xs text-gray-500">{item.desc}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <HelpCircle className="w-6 h-6 mr-3 text-soft-teal" />
                            よくある質問
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: "一般墓の費用はどのくらいかかりますか？",
                                    a: "墓石代・永代使用料・管理費など合計で100万円〜300万円程度が一般的な目安です。地域・立地・墓石のサイズや素材によって大きく異なります。",
                                },
                                {
                                    q: "後継ぎがいない場合でも一般墓は選べますか？",
                                    a: "一般墓は継承を前提とした制度設計のため、後継ぎがいない場合は将来的に「無縁墓」となり、霊園側に撤去・合祀される可能性があります。後継ぎがいない場合は永代供養墓などを検討されることをお勧めします。",
                                },
                                {
                                    q: "一般墓を建てた後、永代供養に変えることはできますか？",
                                    a: "はい、改葬（かいそう）という手続きを通じて、一般墓から永代供養墓などへ移転することができます。ただし、墓石の撤去費用や改葬許可の取得など、複数の手続きが必要です。",
                                },
                            ].map((item, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg p-5">
                                    <h4 className="font-bold text-primary mb-2 flex flex-row items-center">
                                        <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded mr-3 shrink-0">Q</span>
                                        {item.q}
                                    </h4>
                                    <p className="text-sm text-gray-600 ml-10 leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="text-center">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-10 inline-block px-12">
                            次のアクション
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-gray-100 rounded-full mb-3">
                                        <Search className="w-8 h-8 text-gray-500" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary">一般墓を探してみる</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    エリアや条件から、実際の霊園・墓地を検索できます。
                                </p>
                                <Link href="/search?type=general" className="w-full">
                                    <Button variant="primary" className="w-full font-bold">
                                        条件から探す
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-primary/10 rounded-full mb-3">
                                        <BookOpen className="w-8 h-8 text-primary" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary">他の供養方法も比較する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    永代供養墓・樹木葬など、他の選択肢と比較する。
                                </p>
                                <Link href="/choices" className="w-full">
                                    <Button variant="outline" className="w-full font-bold">
                                        選択肢一覧を見る
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex flex-col bg-soft-teal/5 border border-soft-teal/20 rounded-xl p-6 hover:shadow-lg transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 right-0 bg-soft-teal text-white text-[10px] font-bold px-2 py-1 rounded-bl">
                                    相談無料
                                </div>
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-white rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                        <Phone className="w-8 h-8 text-soft-teal" />
                                    </span>
                                    <h3 className="font-bold text-lg text-soft-teal">状況を整理して相談する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    まだ決まっていなくて大丈夫。専門家が一緒に整理します。
                                </p>
                                <Link href="/consult" className="w-full">
                                    <Button className="w-full bg-soft-teal hover:bg-soft-teal/90 text-white border-none font-bold">
                                        無料相談する
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
}
