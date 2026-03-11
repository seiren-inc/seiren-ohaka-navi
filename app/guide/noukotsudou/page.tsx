import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { JsonLd } from "../../components/seo/JsonLd";

export const metadata: Metadata = {
    title: "納骨堂とは？費用・種類・選び方を徹底解説 | 清蓮",
    description: "納骨堂（のうこつどう）の意味・種類（ロッカー型・自動搬送型など）・費用相場・メリット・デメリットをわかりやすく解説。都市部で人気の屋内供養スタイルです。《相談無料》",
    alternates: { canonical: "https://www.ohakanavi.jp/guide/noukotsudou" },
};

const BASE_URL = "https://www.ohakanavi.jp";

const FAQS = [
    {
        q: "納骨堂とはどんなお墓ですか？",
        a: "納骨堂は屋内施設で遺骨を安置する形式のお墓です。天候に左右されずお参りができ、駅近など利便性の高い立地が多いのが特徴です。ロッカー型・棚型・自動搬送型などの種類があります。",
    },
    {
        q: "納骨堂の費用相場はいくらですか？",
        a: "納骨堂の費用は30万円〜100万円程度が相場です。ロッカー型は比較的安価（30万〜50万円台）で、自動搬送型（マンション型）は100万円以上になる場合もあります。",
    },
    {
        q: "納骨堂は一般墓と比べてどんなメリットがありますか？",
        a: "①雨天でも快適にお参りできる ②駅近など交通の便が良い立地が多い ③墓石を建てるより費用が抑えられる ④管理・清掃は施設側が行う、といったメリットがあります。",
    },
    {
        q: "後継者がいなくても納骨堂は選べますか？",
        a: "はい、多くの納骨堂は永代供養プランとセットになっており、後継者がいなくても施設側が管理・供養を継続します。一定期間後に合祀（共同埋葬）に移行するプランが一般的です。",
    },
    {
        q: "納骨堂の契約期間はどのくらいですか？",
        a: "施設によって異なりますが、13回忌・33回忌まで個別保管し、その後合祀するケースが多いです。最初から合祀希望の場合は費用がさらに抑えられます。",
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
        { "@type": "ListItem", position: 3, name: "納骨堂とは", item: `${BASE_URL}/guide/noukotsudou` },
    ],
};

export default function GuideNoukotsudouPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <JsonLd data={faqLd} />
            <JsonLd data={breadcrumbLd} />
            <Navbar />
            <main className="flex-grow pt-32 px-4 max-w-4xl mx-auto w-full pb-20">
                <h1 className="text-3xl font-bold text-primary mb-4">納骨堂とは？費用・種類・選び方を徹底解説</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    天候に左右されず、駅から近い「納骨堂」。<br />
                    ロッカー型・棚型・自動搬送型など種類も多い屋内型のお墓について詳しく解説します。
                </p>

                <div className="space-y-4 mb-12 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">納骨堂の主な特徴</h2>
                    <ul className="space-y-3 text-sm text-gray-700 leading-relaxed list-disc list-inside">
                        <li>屋内施設のためお参りが天候に左右されない</li>
                        <li>駅近・都市型の施設が多くアクセスしやすい</li>
                        <li>費用相場：30万〜100万円（タイプにより異なる）</li>
                        <li>永代供養一体型のプランが多く、後継者不要</li>
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
                        <Button>納骨堂について無料相談する</Button>
                    </Link>
                    <Link href="/choices/noukotsudou">
                        <Button variant="outline">納骨堂を探す</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
