"use client";

import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { DiagnosisWizard } from "../../components/features/choices/DiagnosisWizard";
import { ArrowRight, HelpCircle, BookOpen, Phone, X, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "../../components/ui/Button";
import { useState } from "react";

export function DiagnosisContent() {
    const [showConsultModal, setShowConsultModal] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-gray-800">
            <Navbar />

            <main className="grow pt-24 px-4 pb-20">
                <div className="max-w-6xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Diagnosis
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark mb-6 leading-relaxed">
                            供養の選択肢診断チャート｜<br className="md:hidden" />あなたに合う候補を整理する
                        </h1>
                        <p className="text-gray-600 leading-loose max-w-2xl mx-auto">
                            いくつかの簡単な質問に答えるだけで、あなたの希望や条件に近い供養方法をご提案します。<br />
                            これはあくまで「目安」であり、最終的な決定はお客様のご状況次第ですが、選択肢を絞り込むためのヒントとしてご活用ください。
                        </p>
                    </div>

                    {/* Wizard Section */}
                    <div className="mb-24">
                        <DiagnosisWizard />
                    </div>

                    {/* Content Section: 診断のポイント・解説 */}
                    <div className="max-w-4xl mx-auto space-y-20 mb-24">

                        {/* 診断でわかること */}
                        <section>
                            <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8">
                                この診断で分かること
                            </h2>
                            <p className="text-gray-700 leading-loose mb-6">
                                供養の方法は近年非常に多様化しており、「自分には何が合っているのか分からない」という声が多く聞かれます。
                                この診断チャートでは、あなたの<strong>「重視するポイント（場所、費用、手間）」</strong>と<strong>「将来への備え（承継、変更可能性）」</strong>を整理し、
                                数ある選択肢の中から相性の良い供養方法を客観的に絞り込みます。
                            </p>
                            <div className="bg-white border border-gray-200 p-6 rounded-xl flex flex-col md:flex-row gap-6 items-start">
                                <div className="flex-1">
                                    <h3 className="font-bold text-primary-dark mb-2 flex items-center">
                                        <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-2">1</span>
                                        候補を3つに絞り込む
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        全7種類の主要な供養方法（一般墓、永代供養墓、樹木葬、納骨堂、海洋散骨、手元供養、遺骨ダイヤモンド）から、特におすすめの3つを提示します。
                                    </p>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-primary-dark mb-2 flex items-center">
                                        <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs mr-2">2</span>
                                        選定の根拠がわかる
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        「なぜその方法がおすすめなのか」、あなたの回答に基づいた理由も合わせて表示するため、納得感のある選択が可能です。
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 質問の意図と判断軸 */}
                        <section>
                            <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8">
                                5つの質問の意図と判断軸
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="text-xs font-bold text-secondary uppercase block mb-1">Q1 Place</span>
                                    <h3 className="font-bold text-gray-800 mb-1">場所のイメージ</h3>
                                    <p className="text-sm text-gray-600">「お墓参りに行く」行為を重視するか、場所に縛られない自由さを取るかを確認します。</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="text-xs font-bold text-secondary uppercase block mb-1">Q2 Succession</span>
                                    <h3 className="font-bold text-gray-800 mb-1">承継と管理</h3>
                                    <p className="text-sm text-gray-600">お子様やお孫様に管理の手間を託すか、自分たちの代で完結させる（永代供養）かを判断します。</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="text-xs font-bold text-secondary uppercase block mb-1">Q3 Religion</span>
                                    <h3 className="font-bold text-gray-800 mb-1">宗教・宗派</h3>
                                    <p className="text-sm text-gray-600">寺院との付き合い（檀家）を望むか、宗教色のないフラットな契約を望むかで選択肢が大きく分かれます。</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="text-xs font-bold text-secondary uppercase block mb-1">Q4 Cost</span>
                                    <h3 className="font-bold text-gray-800 mb-1">予算感</h3>
                                    <p className="text-sm text-gray-600">費用を抑えることを最優先するか、多少費用がかかってもこだわりを実現したいかを確認します。</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <span className="text-xs font-bold text-secondary uppercase block mb-1">Q5 Future</span>
                                    <h3 className="font-bold text-gray-800 mb-1">将来の変更</h3>
                                    <p className="text-sm text-gray-600">将来的に「改葬（お墓の引越し）」の可能性があるか、永続的にその場所で良いかを考慮します。</p>
                                </div>
                            </div>
                        </section>

                        {/* FAQ */}
                        <section>
                            <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8">
                                よくある質問（FAQ）
                            </h2>
                            <div className="space-y-4">
                                <details className="group bg-white border border-gray-200 p-4 rounded-lg cursor-pointer">
                                    <summary className="font-bold text-gray-800 flex justify-between items-center">
                                        Q. 診断結果は必ず従わないといけませんか？
                                        <span className="text-secondary group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="text-sm text-gray-600 mt-3 pl-4 border-l-2 border-secondary/20">
                                        いいえ、あくまで目安です。実際の霊園の雰囲気や、ご家族との話し合いによって最適な選択は変わります。一つの検討材料としてお使いください。
                                    </p>
                                </details>
                                <details className="group bg-white border border-gray-200 p-4 rounded-lg cursor-pointer">
                                    <summary className="font-bold text-gray-800 flex justify-between items-center">
                                        Q. どの供養方法が一番「正解」ですか？
                                        <span className="text-secondary group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="text-sm text-gray-600 mt-3 pl-4 border-l-2 border-secondary/20">
                                        供養に絶対の正解はありません。「残された家族が負担に感じないか」「故人が安らかに眠れるか」など、それぞれの家庭が納得できる形が正解です。
                                    </p>
                                </details>
                                <details className="group bg-white border border-gray-200 p-4 rounded-lg cursor-pointer">
                                    <summary className="font-bold text-gray-800 flex justify-between items-center">
                                        Q. 家族と意見が割れた場合はどうすればいいですか？
                                        <span className="text-secondary group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="text-sm text-gray-600 mt-3 pl-4 border-l-2 border-secondary/20">
                                        まずはそれぞれの希望（場所、費用、供養の形）を書き出し、優先順位をつけてみることをお勧めします。第三者（専門家）を交えて相談するのも有効です。
                                    </p>
                                </details>
                                <details className="group bg-white border border-gray-200 p-4 rounded-lg cursor-pointer">
                                    <summary className="font-bold text-gray-800 flex justify-between items-center">
                                        Q. 将来、お墓を引っ越す（改葬）ことはできますか？
                                        <span className="text-secondary group-open:rotate-180 transition-transform">▼</span>
                                    </summary>
                                    <p className="text-sm text-gray-600 mt-3 pl-4 border-l-2 border-secondary/20">
                                        「一般墓」や「納骨堂」など個別に遺骨を安置するタイプは改葬しやすいですが、「合祀（他の方と一緒に埋葬）」されるタイプは、一度納めると遺骨を取り出せないため注意が必要です。
                                    </p>
                                </details>
                            </div>
                        </section>
                    </div>

                    {/* Next Actions */}
                    <section className="text-center border-t border-gray-200 pt-16">
                        <h2 className="font-serif text-2xl font-bold text-primary pb-4 mb-10 inline-block px-12">
                            迷ったら次にできること
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
                            {/* Guide */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-gray-100 rounded-full mb-3">
                                        <BookOpen className="w-8 h-8 text-gray-500" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">供養の基礎から知る</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    「そもそも用語がわからない」「基礎知識を確認したい」という方はガイドページへ。
                                </p>
                                <Link href="/guide/grave-basics" className="w-full">
                                    <Button variant="ghost" className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600">
                                        基礎知識を見る
                                    </Button>
                                </Link>
                            </div>

                            {/* Search */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-primary/10 rounded-full mb-3">
                                        <ArrowRight className="w-8 h-8 text-primary" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">条件から探してみる</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    エリアや予算、「ペットと入れる」などの条件から、具体的な候補地を検索できます。
                                </p>
                                <Link href="/search" className="w-full">
                                    <Button variant="primary" className="w-full">
                                        お墓を探す
                                    </Button>
                                </Link>
                            </div>

                            {/* Consult */}
                            <div className="flex flex-col bg-secondary/5 border border-secondary/20 rounded-xl p-6 hover:shadow-lg transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-bl">
                                    相談無料
                                </div>
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-white rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                        <HelpCircle className="w-8 h-8 text-secondary" />
                                    </span>
                                    <h3 className="font-bold text-lg text-secondary">迷ったら相談する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    診断結果を見ても迷う場合や、個別の事情がある場合は、専門家に直接相談できます。
                                </p>
                                <div className="w-full">
                                    <Button
                                        className="w-full bg-secondary hover:bg-secondary/90 text-white border-none"
                                        onClick={() => setShowConsultModal(true)}
                                    >
                                        無料相談する
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />

            {/* Consultation Modal */}
            {showConsultModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowConsultModal(false)}
                    />
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-slide-up">
                        <div className="p-6 text-center">
                            <button
                                onClick={() => setShowConsultModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <h3 className="text-xl font-bold text-gray-800 mb-2">無料相談の方法を選択</h3>
                            <p className="text-sm text-gray-600 mb-8">
                                ご希望の方法で専門スタッフにご相談いただけます。<br />
                                些細なことでもお気軽にご連絡ください。
                            </p>

                            <div className="space-y-4">
                                <a href="tel:0800-888-8788" className="block w-full group">
                                    <div className="flex items-center p-4 border border-secondary/20 rounded-xl bg-secondary/5 group-hover:bg-secondary/10 transition-colors">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-secondary shadow-sm mr-4">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-xs font-bold text-secondary">お電話で相談</span>
                                            <span className="block text-xl font-bold text-gray-800 font-mono">0800-888-8788</span>
                                        </div>
                                        <div className="ml-auto text-secondary/50">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </a>

                                <Link href="/contact" className="block w-full group" onClick={() => setShowConsultModal(false)}>
                                    <div className="flex items-center p-4 border border-gray-200 rounded-xl bg-gray-50 group-hover:bg-gray-100 transition-colors">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 shadow-sm mr-4">
                                            <Globe className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-xs font-bold text-gray-500">WEBフォームで相談</span>
                                            <span className="block text-base font-bold text-gray-800">問い合わせフォームへ</span>
                                        </div>
                                        <div className="ml-auto text-gray-400">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 text-center text-xs text-gray-400 border-t border-gray-100">
                            受付時間: 9:00〜18:00（年中無休）
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
