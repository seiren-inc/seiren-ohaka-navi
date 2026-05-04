import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/Button";
import Link from "next/link";
import { ArrowRight, CheckCircle, AlertCircle, FileText, Phone, Calculator, HelpCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "墓じまい・改葬の無料相談｜清蓮",
    description: "全国対応・見積り無料。お墓じまいや改葬（お墓の引越し）の手続きから施工までワンストップでサポートします。",
    alternates: { canonical: "https://ohakanavi.jp/grave-closure" },
};

export default function GraveClosurePage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <main id="main-content">
            {/* 1. Hero Section */}
            <section className="relative pt-32 pb-20 px-4 bg-slate-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 translate-x-1/2" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-6 tracking-wider">
                        全国対応・相談無料
                    </span>
                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        お墓じまい・改葬<br />
                        <span className="text-secondary text-2xl md:text-4xl mt-2 block">
                            手続き・調整・施工までワンストップ
                        </span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        「お墓が遠くて行けない」「跡継ぎがいない」<br className="md:hidden" />そんなお悩みを解決します。<br />
                        面倒な役所手続きや寺院との調整も、<br className="md:hidden" />専門スタッフが丁寧にサポート。
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/grave-closure/consult?mode=general">
                            <Button size="lg" className="w-full sm:w-auto px-8 py-6 text-lg shadow-xl shadow-primary/20">
                                <Phone className="mr-2 h-5 w-5" />
                                無料相談する
                            </Button>
                        </Link>
                        <Link href="/grave-closure/cost">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg bg-white hover:bg-gray-50">
                                <Calculator className="mr-2 h-5 w-5" />
                                費用の目安を見る
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. Problem Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl font-bold text-primary-dark mb-4">こんなお悩みありませんか？</h2>
                        <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "遠方で管理できない", text: "住まいからお墓が遠く、お参りや掃除に行けず荒れてしまっている。" },
                            { title: "跡継ぎがいない", text: "子供に負担をかけたくない、また自身も高齢で管理が難しい。" },
                            { title: "遺骨先が決まらない", text: "お墓を閉じた後、遺骨をどこに移せばいいか分からない。" },
                            { title: "費用が不透明", text: "撤去工事や離檀料など、総額でいくらかかるのか不安。" },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="text-secondary mb-4">
                                    <AlertCircle className="w-10 h-10" />
                                </div>
                                <h3 className="font-bold text-lg text-gray-800 mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Definition Section */}
            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-2 block">Difference</span>
                            <h2 className="font-serif text-3xl font-bold text-primary-dark mb-6">「改葬」と「墓じまい」の違い</h2>
                            <p className="text-gray-600 mb-8 leading-loose">
                                お墓を片付けることは共通していますが、その後のご遺骨の行方によって呼び方が変わります。
                                どちらの場合も、現在のお墓の撤去工事と行政手続きが必要です。
                            </p>
                            <Link href="/grave-closure/flow">
                                <Button variant="outline">
                                    詳しい流れを見る <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-lg shrink-0">
                                    <CheckCircle className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800 mb-2">改葬（お墓の引越し）</h3>
                                    <p className="text-sm text-gray-600">
                                        現在の墓石を撤去し、遺骨を新しいお墓（霊園・納骨堂・樹木葬など）へ移すこと。
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-4">
                                <div className="bg-secondary/10 p-3 rounded-lg shrink-0">
                                    <CheckCircle className="w-6 h-6 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-800 mb-2">墓じまい（撤去・粉骨）</h3>
                                    <p className="text-sm text-gray-600">
                                        お墓を撤去して更地に戻し、遺骨を自宅で保管（手元供養）したり、海へ散骨したりすること。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Cost Section */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl font-bold text-primary-dark mb-4">費用の目安</h2>
                        <p className="text-gray-600">お墓の広さや立地条件によって変動します</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gray-200" />
                            <h3 className="text-lg font-bold text-gray-800 mb-2">撤去工事費</h3>
                            <p className="text-3xl font-bold text-secondary font-serif mb-1">
                                <span className="text-sm text-gray-500 font-sans font-normal mr-1">目安</span>
                                10<span className="text-base font-sans font-normal ml-1">万円〜</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-2">1㎡あたり / 立地により変動</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gray-200" />
                            <h3 className="text-lg font-bold text-gray-800 mb-2">行政手続き代行</h3>
                            <p className="text-3xl font-bold text-secondary font-serif mb-1">
                                <span className="text-sm text-gray-500 font-sans font-normal mr-1">目安</span>
                                3<span className="text-base font-sans font-normal ml-1">万円〜</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-2">改葬許可申請など</p>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gray-200" />
                            <h3 className="text-lg font-bold text-gray-800 mb-2">新しい供養先</h3>
                            <p className="text-3xl font-bold text-secondary font-serif mb-1">
                                <span className="text-sm text-gray-500 font-sans font-normal mr-1">目安</span>
                                5<span className="text-base font-sans font-normal ml-1">万円〜</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-2">合祀墓・散骨の場合</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <Link href="/grave-closure/consult?mode=estimate">
                            <Button size="lg" className="w-full sm:w-auto px-12 py-6 text-lg shadow-xl shadow-primary/20">
                                無料見積もりを依頼する
                            </Button>
                        </Link>
                        <p className="mt-4 text-sm text-gray-500">
                            ※ 正確な金額は現地確認が必要です（全国対応・見積り無料）
                        </p>
                    </div>
                </div>
            </section>

            {/* 5. Flow Section */}
            <section className="py-20 px-4 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl font-bold mb-4">完了までの流れ</h2>
                        <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {[
                            { num: "01", title: "ヒアリング", text: "現状と希望をお伺いします" },
                            { num: "02", title: "現地調査", text: "お墓のサイズを確認しお見積り" },
                            { num: "03", title: "手続き", text: "役所・寺院への申請サポート" },
                            { num: "04", title: "撤去工事", text: "魂抜き・墓石の解体・整地" },
                            { num: "05", title: "完了・納骨", text: "ご遺骨を新しい場所へ" },
                        ].map((step, idx) => (
                            <div key={idx} className="relative p-6 border border-white/10 rounded-xl bg-white/5">
                                <span className="text-4xl font-bold text-secondary/40 font-serif absolute top-4 right-4">{step.num}</span>
                                <h3 className="font-bold text-lg mb-2 relative z-10">{step.title}</h3>
                                <p className="text-sm text-gray-400 relative z-10">{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. FAQ Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-3xl font-bold text-primary-dark mb-4">よくある質問</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { q: "依頼から完了までどのくらいかかりますか？", a: "通常2〜3ヶ月程度です。新しいお墓の決定や、役所の手続きの進行状況により前後します。" },
                            { q: "お寺との話し合い（離檀）もサポートしてもらえますか？", a: "はい、可能です。トラブルにならないよう、専門スタッフがアドバイスや調整の代行を行います。" },
                            { q: "まだ新しい納骨先が決まっていませんが相談できますか？", a: "もちろん可能です。ご遺骨の一時預かりや、ご予算に合わせた永代供養墓のご提案も行っています。" },
                            { q: "書類の手続きは自分で行う必要がありますか？", a: "基本的には弊社が代行またはサポートいたします。お客様にご用意いただく書類（印鑑証明など）については丁寧にご案内します。" },
                        ].map((item, idx) => (
                            <details key={idx} className="group bg-white border border-gray-200 p-6 rounded-xl cursor-pointer">
                                <summary className="font-bold text-gray-800 flex justify-between items-center list-none">
                                    <span className="flex items-center gap-3">
                                        <HelpCircle className="w-5 h-5 text-secondary" />
                                        {item.q}
                                    </span>
                                    <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <div className="mt-4 pl-8 text-gray-600 leading-relaxed border-l-2 border-secondary/20">
                                    {item.a}
                                    <div className="mt-2 text-right">
                                        <Link href="/grave-closure/consult" className="text-sm text-primary hover:underline">
                                            これについて相談する &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </details>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/grave-closure/faq" className="text-primary font-bold hover:underline">
                            その他の質問を見る
                        </Link>
                    </div>
                </div>
            </section>

            {/* 7. Final CTA */}
            <section className="py-20 px-4 bg-secondary/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-serif text-3xl font-bold text-primary-dark mb-6">
                        まずはお気軽にご相談ください
                    </h2>
                    <p className="text-gray-600 mb-10 leading-loose">
                        お墓じまい・改葬は、ご家族の状況によって最適な進め方が異なります。<br />
                        経験豊富な専門スタッフが、あなたに寄り添ってサポートいたします。
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/grave-closure/consult">
                            <Button size="lg" className="w-full sm:w-auto px-12 py-6 text-xl shadow-xl shadow-primary/20">
                                <FileText className="mr-2 h-6 w-6" />
                                無料相談フォーム
                            </Button>
                        </Link>
                        <a href="tel:0800-888-8788" className="inline-flex w-full sm:w-auto">
                            <Button variant="outline" size="lg" className="w-full px-12 py-6 text-xl border-2 hover:bg-white">
                                <Phone className="mr-2 h-6 w-6" />
                                0800-888-8788
                            </Button>
                        </a>
                    </div>
                    <p className="mt-4 text-sm text-gray-500">
                        受付時間: 9:00 - 18:00（年中無休）
                    </p>
                </div>
            </section>

            </main>
            <Footer />
        </div>
    );
}
