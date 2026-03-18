import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { ArrowLeft, ArrowDown } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "墓じまい・改葬の流れ｜完了までのステップ",
    description: "ご相談から工事完了、納骨までの具体的な流れをご説明します。",
};

export default function GraveClosureFlowPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <main className="grow pt-32 px-4 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Link href="/grave-closure" className="text-gray-500 hover:text-primary flex items-center text-sm">
                            <ArrowLeft className="w-4 h-4 mr-1" /> 墓じまいトップへ戻る
                        </Link>
                    </div>

                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Flow Chart
                        </span>
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                            ご依頼から完了までの流れ
                        </h1>
                        <p className="text-gray-600 leading-loose">
                            初めての方でも安心して進められるよう、<br />
                            専任スタッフが各ステップでサポートいたします。
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="relative border-l-2 border-gray-200 ml-4 md:ml-12 space-y-12 pb-12">
                        {[
                            {
                                step: "STEP 01",
                                title: "お問い合わせ・無料相談",
                                content: "まずはお電話またはフォームよりご連絡ください。現在のお墓の場所や、ご希望の供養方法（改葬か完全撤去かなど）をお伺いします。"
                            },
                            {
                                step: "STEP 02",
                                title: "現地調査・お見積り",
                                content: "スタッフが現地のお墓を確認し、正確な測量を行います。石の量や搬出経路を確認し、詳細なお見積りを作成・提出します。"
                            },
                            {
                                step: "STEP 03",
                                title: "新しい納骨先の決定",
                                content: "ご遺骨の引越し先（改葬先）を決定します。「受入証明書」の発行が必要になります。（散骨や手元供養の場合は不要な場合もあります）"
                            },
                            {
                                step: "STEP 04",
                                title: "行政手続き・寺院への連絡",
                                content: "現在のお墓がある自治体へ「改葬許可申請」を行います。また、お寺様へ閉眼供養の日程調整や離檀の申し入れを行います。"
                            },
                            {
                                step: "STEP 05",
                                title: "閉眼供養・遺骨の取り出し",
                                content: "お坊さんにお経をあげていただき（魂抜き）、お墓からご遺骨を取り出します。"
                            },
                            {
                                step: "STEP 06",
                                title: "解体・撤去工事",
                                content: "墓石を解体・撤去し、基礎部分も取り除いて更地に戻します。完了後、管理者（お寺や霊園）へ引き渡します。"
                            },
                            {
                                step: "STEP 07",
                                title: "新しい場所への納骨",
                                content: "新しい供養先へご遺骨を納めます。粉骨や洗骨が必要な場合も対応いたします。"
                            },
                        ].map((item, index) => (
                            <div key={index} className="relative pl-8 md:pl-12">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-secondary rounded-full border-4 border-white shadow-sm" />
                                <span className="text-xs font-bold text-secondary tracking-widest block mb-2">{item.step}</span>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    {item.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/grave-closure/consult">
                            <Button size="lg" className="w-full sm:w-auto shadow-lg">
                                まずは無料相談から始める
                            </Button>
                        </Link>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
