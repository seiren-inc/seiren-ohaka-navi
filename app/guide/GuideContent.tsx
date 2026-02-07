"use client";

import Link from "next/link";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Button } from "../components/ui/Button";
import { ArrowRight, ChevronRight, BookOpen, AlertCircle, HelpCircle, Phone, X, Globe } from "lucide-react";
import { useState } from "react";

export function GuideContent() {
    const [showConsultModal, setShowConsultModal] = useState(false);

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <Navbar />

            <main className="flex-grow pt-24 px-4 pb-20">
                <div className="max-w-4xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Knowledge Hub
                        </span>
                        <h1 className="font-serif text-2xl md:text-4xl font-bold text-primary-dark mb-6 leading-relaxed">
                            供養の知識｜<br className="md:hidden" />墓地・永代供養・樹木葬を<br className="md:hidden" />中立的に解説
                        </h1>
                        <p className="text-gray-600 leading-loose max-w-2xl mx-auto">
                            お墓や供養について調べ始めたばかりの方へ。<br />
                            「何から考えればいいかわからない」という状態でも全く問題ありません。<br />
                            清蓮は、特定の霊園を勧めるのではなく、供養の専門家として<br className="hidden md:inline" />
                            あなたの選択肢を整理し、納得のいく判断をサポートします。
                        </p>
                    </div>

                    {/* H2: 供養の選択肢 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-8 flex items-center">
                            <BookOpen className="w-6 h-6 mr-3 text-secondary" />
                            供養方法にはどんな選択肢があるのか
                        </h2>

                        <div className="space-y-8">
                            {/* 一般墓 */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">一般墓（従来のお墓）</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    代々継承していく家族単位のお墓です。石碑を建て、遺骨を埋葬します。<br />
                                    親族が集まる場所として最も馴染みがありますが、管理費や承継者の確保が必要です。
                                </p>
                                <ul className="text-sm space-y-1 text-gray-500 bg-white p-4 rounded border border-gray-100">
                                    <li><span className="font-bold text-primary">向いている:</span> 家族の絆を大切にしたい、管理できる親族がいる</li>
                                    <li><span className="font-bold text-gray-400">注意点:</span> 承継者がいないと無縁仏になるリスクがある</li>
                                </ul>
                            </div>

                            {/* 永代供養墓 */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">永代供養墓</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    寺院や霊園が家族に代わって管理・供養を行うお墓です。<br />
                                    「合祀（他の方と一緒に埋葬）」と「個別安置（一定期間個別に埋葬）」の2タイプが主流です。
                                </p>
                                <ul className="text-sm space-y-1 text-gray-500 bg-white p-4 rounded border border-gray-100">
                                    <li><span className="font-bold text-primary">向いている:</span> 子供に負担をかけたくない、承継者がいない</li>
                                    <li><span className="font-bold text-gray-400">誤解:</span> 「無宗教しか入れない」わけではなく、多くの寺院が受け入れている</li>
                                </ul>
                            </div>

                            {/* 樹木葬 */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">樹木葬</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    墓石の代わりに木や花をシンボルとする、自然志向の供養方法です。<br />
                                    永代供養が付いていることが多く、人気急上昇中ですが、場所によって雰囲気は大きく異なります。
                                </p>
                                <ul className="text-sm space-y-1 text-gray-500 bg-white p-4 rounded border border-gray-100">
                                    <li><span className="font-bold text-primary">向いている:</span> 自然に還りたい、明るい雰囲気で眠りたい</li>
                                    <li><span className="font-bold text-gray-400">注意点:</span> 遺骨を取り出せない（改葬できない）タイプが多い</li>
                                </ul>
                            </div>

                            {/* 納骨堂 */}
                            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">納骨堂</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    屋内に遺骨を安置する施設です。ロッカー式、仏壇式、自動搬送式などがあります。<br />
                                    天候に左右されずお参りができ、都心部などアクセスの良い場所に多いのが特徴です。
                                </p>
                                <ul className="text-sm space-y-1 text-gray-500 bg-white p-4 rounded border border-gray-100">
                                    <li><span className="font-bold text-primary">向いている:</span> 利便性を重視する、頻繁にお参りしたい</li>
                                    <li><span className="font-bold text-gray-400">注意点:</span> 建物の老朽化や建て替え時の対応を確認する必要がある</li>
                                </ul>
                            </div>

                            {/* 墓じまい */}
                            <div className="bg-white p-6 rounded-lg border-l-4 border-secondary shadow-sm">
                                <h3 className="font-bold text-lg text-secondary mb-3">「墓じまい」という選択</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    既存のお墓を撤去し、遺骨を別の場所（永代供養墓など）に移すことです。<br />
                                    「お墓を捨てる」のではなく、「今の生活スタイルに合わせて供養の形を変える」前向きな決断です。
                                </p>
                                <Link href="/consult/grave-closure" className="text-sm text-secondary font-bold flex items-center hover:underline">
                                    墓じまいの詳細な流れを見る <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* CTA: Diagnosis */}
                    <section className="mb-16">
                        <div className="bg-seiren-navy rounded-2xl p-8 text-center text-white relative overflow-hidden">
                            <div className="relative z-10 max-w-2xl mx-auto">
                                <h2 className="text-2xl font-serif font-bold mb-4">
                                    「自分に合う供養」がまだ分からない方へ
                                </h2>
                                <p className="opacity-90 leading-relaxed mb-8">
                                    永代供養、樹木葬、納骨堂… 選択肢が多くて迷っていませんか？<br />
                                    5つの質問に答えるだけで、あなたの希望に近い供養方法を診断できます。
                                </p>
                                <Link href="/choices/diagnosis" className="inline-block bg-white text-seiren-navy font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-colors">
                                    供養の選択肢診断を試す →
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* H2: 多くの方が迷うポイント */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-8 flex items-center">
                            <HelpCircle className="w-6 h-6 mr-3 text-secondary" />
                            多くの方が迷うポイント
                        </h2>

                        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-bold text-primary mb-2">費用の考え方</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        初期費用だけでなく、年間管理費（護持会費）や寄付金が必要かどうかが重要です。<br />
                                        「安いから」という理由だけで選ぶと、後から追加費用が発生したり、管理が行き届いていない場合があります。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-2">管理・承継の有無</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        「子供に迷惑をかけたくない」場合は、永代供養付きのものを選びましょう。<br />
                                        ただし、永代供養でも「一定期間は個別管理、その後合祀」というケースが一般的です。期間の確認が必要です。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-2">宗教・宗派</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        「宗教不問」の霊園が増えていますが、寺院墓地の場合はそのお寺の檀家になる必要があることも。<br />
                                        親族間で信仰の違いがないかも事前に確認しておくと、後々のトラブルを防げます。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* H2: 専門家の立場からの考え方 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-8 flex items-center">
                            <AlertCircle className="w-6 h-6 mr-3 text-secondary" />
                            専門家の立場からの考え方
                        </h2>
                        <div className="prose text-gray-600 leading-loose text-sm md:text-base">
                            <p className="mb-4">
                                私たちはこれまで数多くのご相談を受けてきましたが、<strong className="text-primary-dark bg-yellow-100">供養に「万人に共通する正解」はありません。</strong>
                            </p>
                            <p className="mb-4">
                                一見素晴らしい設備に見える納骨堂でも、お参りの頻度が年に一度なら宝の持ち腐れかもしれません。<br />
                                逆に、少し不便な場所にある樹木葬が、故人が愛した風景に近くてご家族にとって最高の場所になることもあります。
                            </p>
                            <p>
                                価格や流行だけで決めず、<strong className="text-primary-dark">「10年後、20年後も家族がお参りに行きたくなる場所か？」</strong>という視点で選ぶことが、後悔しない最大の秘訣です。<br />
                                清蓮は、皆様がフラットな目線で判断できるよう、メリットもデメリットも全て正直にお伝えすることを約束します。
                            </p>
                        </div>
                    </section>

                    {/* H2: 知識を踏まえて、次にできること (CTA) */}
                    <section className="mt-20">
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-8 text-center">
                            知識を踏まえて、次にできること
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
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
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
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
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
                                <div className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-bl">
                                    相談無料
                                </div>
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-white rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                        <HelpCircle className="w-8 h-8 text-secondary" />
                                    </span>
                                    <h3 className="font-bold text-lg text-secondary">迷ったら相談する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
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
                                <a href="tel:0120-000-000" className="block w-full group">
                                    <div className="flex items-center p-4 border border-secondary/20 rounded-xl bg-secondary/5 group-hover:bg-secondary/10 transition-colors">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-secondary shadow-sm mr-4">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div className="text-left">
                                            <span className="block text-xs font-bold text-secondary">お電話で相談</span>
                                            <span className="block text-xl font-bold text-gray-800 font-mono">0120-000-000</span>
                                        </div>
                                        <div className="ml-auto text-secondary/50">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </a>

                                <Link href="/consult/request-material" className="block w-full group" onClick={() => setShowConsultModal(false)}>
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
