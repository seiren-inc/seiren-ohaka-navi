import Link from "next/link";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/Button";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Metadata } from "next";
import { HelpCircle, Search, Phone, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
    title: "よくある質問（FAQ）｜お墓・供養・費用の疑問に答えます｜清蓮",
    description: "お墓探し・永代供養・墓じまいに関するよくある質問をまとめました。費用・手続き・宗教の疑問を供養の専門家が中立に答えます。",
    alternates: { canonical: "https://ohakanavi.jp/faq" },
};

const FAQ_CATEGORIES = [
    {
        category: "お墓探し・供養の選び方",
        icon: "🪦",
        items: [
            {
                q: "どの供養方法が自分に合っているかわかりません",
                a: "供養の選択肢は「永代供養墓・樹木葬・納骨堂・一般墓」に大別されます。選ぶポイントは主に「継承する人がいるか」「予算の上限」「お参りの頻度・手段」の3点です。迷われている場合は、無料相談でご状況をお聞きしたうえで候補を整理します。",
            },
            {
                q: "宗教・宗派の制限はありますか？",
                a: "掲載施設の多くは「宗旨宗派不問」です。ただし、寺院が運営する施設では在来仏教に限るケースもございます。各施設の詳細ページに記載しておりますのでご確認ください。",
            },
            {
                q: "生前に自分のお墓を決めておくことはできますか？",
                a: "はい、可能です。生前に契約・購入することを「生前購入」と呼びます。永代供養墓・樹木葬・納骨堂のいずれも対応が可能な施設が多く、自分が元気なうちに希望通りの場所を確保できるため、近年利用者が増加しています。",
            },
            {
                q: "遠方に住んでいてもお墓を探せますか？",
                a: "はい、対応可能です。エリア検索や供養の種類から全国の施設を絞り込めます。見学が難しい場合は、施設の電話相談・オンライン相談をご活用ください。清蓮でも遠方の方向けにご相談を承っております。",
            },
        ],
    },
    {
        category: "永代供養について",
        icon: "🌸",
        items: [
            {
                q: "永代供養とは何ですか？",
                a: "霊園や寺院が、家族に代わって遺骨の管理・供養を継続的に行う契約の形です。後継ぎがいない方や、家族への負担を減らしたい方に選ばれています。お墓という「物」ではなく「供養を委託する仕組み」を指す言葉です。",
            },
            {
                q: "永代供養の費用はどのくらいかかりますか？",
                a: "形式によって異なります。合祀型（他の方と一緒に埋葬）は5万〜30万円程度、個別安置型は50万〜150万円程度が目安です。多くのプランでは、初期費用に管理費が含まれており、その後の追加費用は不要なケースが大半です。",
            },
            {
                q: "一度決めたら、後から変えられますか？",
                a: "合祀（他の方と混合埋葬）された後は、遺骨を個別に取り出すことが原則できません。個別安置期間中であれば、改葬（別の施設への移転）が可能な場合もありますが、施設との契約内容を事前にご確認ください。",
            },
        ],
    },
    {
        category: "費用・支払いについて",
        icon: "💴",
        items: [
            {
                q: "費用の総額はいつわかりますか？",
                a: "施設の資料請求または見学の際に、費用明細をご確認いただくことをお勧めします。「永代使用料・管理費・石材費・銘板彫刻費」など項目が複数に分かれているケースが多いため、見積りで総額を確認してください。",
            },
            {
                q: "ローンや分割払いはできますか？",
                a: "施設によって対応が異なります。分割払い・信販ローンに対応した施設もありますので、相談時にご確認ください。",
            },
            {
                q: "補助金や助成金はありますか？",
                a: "お墓・供養の費用に対する公的補助金・助成金は、現時点では一般的に存在していません。ただし、生活保護受給者向けの葬祭扶助制度など、特定の条件を満たす場合の支援制度が別途存在することがあります。",
            },
        ],
    },
    {
        category: "墓じまい・改葬について",
        icon: "🔄",
        items: [
            {
                q: "「墓じまい」と「改葬」はどう違いますか？",
                a: "「改葬」は法律用語で、遺骨を現在の埋葬場所から別の場所へ移すことを指します。「墓じまい」は、お墓を撤去・更地にして、霊園や寺院との契約を終了する一連の手続きを指す通称です。多くの場合、墓じまいをしたうえで改葬（新しい納骨先への移転）を行います。",
            },
            {
                q: "墓じまいに必要な手続きは何ですか？",
                a: "主な流れは①遺骨を受け入れてくれる新しい納骨先の確保 → ②現在の自治体への「改葬許可申請」 → ③改葬許可証の取得 → ④石材店による墓石の撤去 → ⑤新しい納骨先への納骨です。詳しくはお墓じまいナビサイトもご参照ください。",
            },
            {
                q: "遠方にある先祖のお墓を整理したいのですが相談できますか？",
                a: "はい、ご相談を承っております。遠方のお墓の場合は、地域の石材店とのやり取りや行政手続きが必要なため、問題点を整理したうえで対応方法をご提案します。",
            },
        ],
    },
    {
        category: "清蓮のサービスについて",
        icon: "🌿",
        items: [
            {
                q: "相談は本当に無料ですか？",
                a: "はい、無料です。電話相談・Web相談ともに費用は一切かかりません。清蓮は特定の施設やサービスから紹介料を受け取る形態ではなく、中立的な立場でご相談を承っておりますので、営業的な勧誘も行いません。",
            },
            {
                q: "清蓮はどんな会社ですか？",
                a: "清蓮は、お墓・供養に関する情報提供と無料相談を行う専門サービスです。霊園・寺院・石材店のいずれにも属さない中立的な立場から、お客様の状況に合った供養の選択肢をご提案します。",
            },
            {
                q: "見学の同行などはお願いできますか？",
                a: "現在は電話・Web相談を中心としたサポートを行っております。見学の同行については、状況に応じてご相談ください。施設の資料請求や見学予約のサポートは承っております。",
            },
        ],
    },
];

export default function FaqPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "清蓮 お墓探しナビ", "item": "https://ohakanavi.jp/" },
                    { "@type": "ListItem", "position": 2, "name": "よくある質問", "item": "https://ohakanavi.jp/faq" },
                ],
            },
            {
                "@type": "FAQPage",
                "mainEntity": FAQ_CATEGORIES.flatMap((cat) =>
                    cat.items.map((item) => ({
                        "@type": "Question",
                        "name": item.q,
                        "acceptedAnswer": { "@type": "Answer", "text": item.a },
                    }))
                ),
            },
        ],
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />

            <main id="main-content" className="grow pt-24 px-4 pb-20">
                <div className="max-w-4xl mx-auto">

                    {/* Breadcrumb */}
                    <div className="mb-6 text-left">
                        <Breadcrumb />
                    </div>

                    {/* ヘッダー */}
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">FAQ</span>
                        <h1 className="font-serif text-2xl md:text-4xl font-bold text-primary mb-6 leading-relaxed">
                            よくある質問
                        </h1>
                        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                            お墓探し・供養・墓じまいに関する疑問に、供養の専門家が中立の立場でお答えします。<br />
                            お探しの質問が見つからない場合は、無料相談をご利用ください。
                        </p>
                    </div>

                    {/* FAQ カテゴリ別 */}
                    <div className="space-y-12">
                        {FAQ_CATEGORIES.map((cat, ci) => (
                            <section key={ci}>
                                <h2 className="font-serif text-xl font-bold text-primary border-b border-gray-200 pb-4 mb-6 flex items-center gap-3">
                                    <span className="text-2xl">{cat.icon}</span>
                                    {cat.category}
                                </h2>
                                <div className="space-y-4">
                                    {cat.items.map((item, qi) => (
                                        <details key={qi} className="group bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                            <summary className="flex items-start justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none">
                                                <span className="flex items-start gap-3">
                                                    <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded shrink-0 mt-0.5">Q</span>
                                                    <span className="font-medium text-gray-800 text-sm md:text-base leading-relaxed">{item.q}</span>
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
                            </section>
                        ))}
                    </div>

                    {/* 解決しなかった場合のCTA */}
                    <section className="mt-20 bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
                        <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4" />
                        <h2 className="font-serif text-xl md:text-2xl font-bold text-primary mb-4">
                            疑問が解決しなかった方へ
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                            専門スタッフが、あなたの状況に合わせて個別にお答えします。<br />
                            お気軽にご相談ください。相談は無料です。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/consult">
                                <Button className="bg-primary hover:bg-primary-hover text-white shadow-md h-12 px-8">
                                    <Phone className="w-4 h-4 mr-2" />
                                    無料相談を予約する
                                </Button>
                            </Link>
                            <Link href="/search">
                                <Button variant="secondary" className="h-12 px-8">
                                    <Search className="w-4 h-4 mr-2" />
                                    墓地・霊園を探す
                                </Button>
                            </Link>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
}
