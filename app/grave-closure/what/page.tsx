import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "お墓じまいとは？基礎知識と流れをわかりやすく解説｜清蓮",
    description: "お墓じまい（墓じまい）の意味、なぜ増えているのか、基本的な流れ、よくある誤解をわかりやすく解説します。",
    alternates: { canonical: "https://www.ohakanavi.jp/grave-closure/what" },
};

const reasons = [
    { title: "継承者・管理者の不在", desc: "少子化や核家族化により、お墓を継ぐ人がいないケースが増えています。" },
    { title: "遠方への転居", desc: "都市部への移住などで、故郷のお墓へのお参りが困難になっています。" },
    { title: "経済的な維持コスト", desc: "年間管理費や修繕費の負担が続くことへの不安から検討されるケースもあります。" },
    { title: "宗教・宗派の変化", desc: "特定の宗派に縛られない供養のかたちを求める方が増えています。" },
];

const misconceptions = [
    { myth: "ご先祖様に申し訳ない行為では？", fact: "お墓じまいは「供養をやめる」のではなく「供養の場所・形を変える」ことです。新しい供養先でしっかりと弔い続けることができます。" },
    { myth: "とても高額な費用がかかる？", fact: "お墓の規模や移転先によりますが、適切に計画すれば30〜80万円程度が目安です。清蓮では費用の概算相談も無料でお受けしています。" },
    { myth: "寺院との関係が壊れてしまう？", fact: "手順を踏んで丁寧にご相談すれば、円満に進めることができます。いきなり告知せず、事前に相談することが大切です。" },
];

export default function GraveClosureWhatPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <Navbar />
            <main id="main-content" className="grow pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-4">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                        <Link href="/grave-closure" className="hover:text-primary transition-colors">お墓じまい</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span>お墓じまいとは</span>
                    </div>

                    {/* Hero */}
                    <div className="mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold font-serif text-primary mb-6 leading-tight">
                            お墓じまいとは？<br className="md:hidden" />基礎知識と流れをわかりやすく解説
                        </h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            「お墓じまい（墓じまい）」とは、現在のお墓を撤去・解体し、遺骨を別の供養先に移す（改葬）ことです。
                            近年、少子高齢化や核家族化を背景に、全国で年間約15万件以上の改葬が行われています。
                        </p>
                    </div>

                    {/* Why increasing */}
                    <section className="mb-14">
                        <h2 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-gray-200">
                            なぜ今、お墓じまいが増えているのか
                        </h2>
                        <div className="grid gap-4">
                            {reasons.map((r, i) => (
                                <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-xl">
                                    <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-bold text-gray-800 mb-1">{r.title}</p>
                                        <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Basic flow */}
                    <section className="mb-14">
                        <h2 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-gray-200">
                            お墓じまいの基本的な流れ
                        </h2>
                        <ol className="space-y-4">
                            {[
                                "家族・親族への相談と合意形成",
                                "改葬先（永代供養墓・樹木葬など）の選定",
                                "現在のお寺・霊園への連絡",
                                "改葬許可証の取得（市区町村役所への申請）",
                                "閉眼供養（魂抜き）の実施",
                                "遺骨の取り出しと墓石の解体・更地化",
                                "新しい供養先への納骨",
                            ].map((step, i) => (
                                <li key={i} className="flex gap-4 items-start">
                                    <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {i + 1}
                                    </span>
                                    <p className="text-gray-700 pt-1">{step}</p>
                                </li>
                            ))}
                        </ol>
                        <div className="mt-6 text-center">
                            <Link href="/guide/grave-closure">
                                <Button variant="outline" className="text-primary border-primary hover:bg-primary/5">
                                    詳しい手順・費用はこちら
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>
                    </section>

                    {/* Misconceptions */}
                    <section className="mb-14">
                        <h2 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-gray-200">
                            よくある誤解と正しい理解
                        </h2>
                        <div className="space-y-6">
                            {misconceptions.map((m, i) => (
                                <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                                    <div className="flex gap-2 items-start mb-3">
                                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                        <p className="font-bold text-amber-800">{m.myth}</p>
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed pl-7">{m.fact}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
                        <h3 className="text-xl font-bold text-primary mb-3">まずは無料相談から</h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            お墓じまいの手順や費用について、専門スタッフが丁寧にご説明します。<br />
                            お電話・メールどちらでもお気軽にどうぞ。
                        </p>
                        <Link href="/grave-closure/consult">
                            <Button variant="primary" size="lg" className="bg-primary text-white hover:bg-primary/90 shadow-md">
                                無料相談を申し込む
                            </Button>
                        </Link>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
