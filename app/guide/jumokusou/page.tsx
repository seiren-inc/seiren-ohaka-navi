import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { JsonLd } from "../../components/seo/JsonLd";

export const metadata: Metadata = {
    title: "樹木葬とは？費用・特徴・選び方を徹底解説 | 清蓮",
    description: "樹木葬（じゅもくそう）の意味・種類・費用相場・メリット・デメリットをわかりやすく解説。宗教不問・後継者不要で人気の供養スタイルです。《相談無料》",
    alternates: { canonical: "https://www.ohakanavi.jp/guide/jumokusou" },
};

const BASE_URL = "https://www.ohakanavi.jp";

const FAQS = [
    {
        q: "樹木葬とは何ですか？",
        a: "樹木葬とは、墓石の代わりに樹木や草花をシンボルとして遺骨を埋葬する供養方法です。環境に優しく、宗教・宗派不問の施設が多いことが特徴です。",
    },
    {
        q: "樹木葬の費用相場はいくらですか？",
        a: "樹木葬の費用は30万円〜150万円程度が相場です。個別埋葬タイプ・集合埋葬タイプ・合祀タイプにより大きく異なります。管理費が不要なプランも多くあります。",
    },
    {
        q: "樹木葬は後継者がいなくても選べますか？",
        a: "はい、多くの樹木葬は永代供養（施設側が管理・供養を継続）とセットになっており、後継者が不要なプランが一般的です。",
    },
    {
        q: "樹木葬に宗教・宗派の制限はありますか？",
        a: "民営の樹木葬霊園の多くは宗教・宗派不問です。ただし、寺院が運営する樹木葬は宗派の条件がある場合もありますので、事前確認が必要です。",
    },
    {
        q: "遺骨を取り出すことはできますか？",
        a: "個別埋葬タイプの場合は一定期間中（一般的に13〜33回忌まで）取り出しが可能なケースがあります。合祀タイプは他の方の遺骨と混ぜるため取り出しはできません。",
    },
];

const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
};

const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "供養の知識コラム", item: `${BASE_URL}/guide` },
        { "@type": "ListItem", position: 3, name: "樹木葬とは", item: `${BASE_URL}/guide/jumokusou` },
    ],
};

export default function GuideJumokusouPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={faqLd} />
            <JsonLd data={breadcrumbLd} />
            <Navbar />
            <main className="flex-grow pt-32 px-4 max-w-4xl mx-auto w-full pb-20">
                <h1 className="text-3xl font-bold text-primary mb-4">樹木葬とは？費用・特徴・選び方を徹底解説</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    自然に還り、静かに眠る「樹木葬」。<br />
                    墓石の代わりに樹木や草花をシンボルとするこの供養方法の種類・費用・注意点をわかりやすくご紹介します。
                </p>

                <div className="space-y-4 mb-12 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">樹木葬の特徴</h2>
                    <ul className="space-y-3 text-sm text-gray-700 leading-relaxed list-disc list-inside">
                        <li>墓石不要・継承者不要で負担が少ない</li>
                        <li>宗教・宗派不問の施設が多い</li>
                        <li>費用相場：30万〜150万円（タイプによって異なる）</li>
                        <li>自然の中で眠れる環境への需要が増加中</li>
                    </ul>
                </div>

                {/* FAQ */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-primary mb-6">よくある質問</h2>
                    <div className="space-y-4">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                                <p className="font-bold text-gray-800 mb-2">Q. {faq.q}</p>
                                <p className="text-sm text-gray-600 leading-relaxed">A. {faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="mt-8 flex gap-4 flex-wrap">
                    <Link href="/consult/grave-search">
                        <Button>樹木葬について無料相談する</Button>
                    </Link>
                    <Link href="/choices/jumokusou">
                        <Button variant="outline">樹木葬の霊園を探す</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
