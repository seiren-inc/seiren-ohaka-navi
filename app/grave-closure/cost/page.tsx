import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { ArrowLeft, Calculator } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "墓じまい費用の詳細｜目安と内訳",
    description: "墓じまいにかかる費用の総額や内訳（撤去費、行政手続き、離檀料など）を詳しく解説します。",
};

export default function GraveClosureCostPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />

            <main id="main-content" className="grow pt-32 px-4 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="mb-8">
                        <Link href="/grave-closure" className="text-gray-500 hover:text-primary flex items-center text-sm">
                            <ArrowLeft className="w-4 h-4 mr-1" /> 墓じまいトップへ戻る
                        </Link>
                    </div>

                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Cost Breakdown
                        </span>
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                            墓じまい・改葬の費用内訳
                        </h1>
                        <p className="text-gray-600 leading-loose">
                            お墓の立地や大きさによって変動しますが、<br />
                            一般的な費用の構成要素は以下の通りです。
                        </p>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-8 mb-16">
                        <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="bg-primary/10 p-4 rounded-lg shrink-0">
                                    <Calculator className="w-8 h-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-800 mb-2">1. 墓石の撤去工事費</h3>
                                    <p className="text-2xl font-bold text-secondary font-serif mb-4">
                                        10<span className="text-base text-gray-600 font-normal">万円〜 / 1㎡あたり</span>
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                        墓石の解体、処分、基礎の撤去を行い、更地に戻すための費用です。<br />
                                        重機が入らない場所（階段のみ、道幅が狭いなど）や、石の量が多い場合は追加費用がかかることがあります。
                                    </p>
                                    <div className="bg-gray-50 p-4 rounded text-xs text-gray-500">
                                        ※ 指定石材店制度がある霊園の場合、その石材店への依頼が必要になります。
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="bg-secondary/10 p-4 rounded-lg shrink-0">
                                    <Calculator className="w-8 h-8 text-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-800 mb-2">2. 行政手続き・書類作成</h3>
                                    <p className="text-2xl font-bold text-secondary font-serif mb-4">
                                        3<span className="text-base text-gray-600 font-normal">万円〜</span>
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        「改葬許可申請書」の作成や役所への提出代行費用です。<br />
                                        複雑な戸籍の収集が必要な場合などは、司法書士・行政書士への依頼費用が別途発生することがあります。
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="bg-gray-100 p-4 rounded-lg shrink-0">
                                    <Calculator className="w-8 h-8 text-gray-500" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-gray-800 mb-2">3. 供養・法要のお布施</h3>
                                    <p className="text-2xl font-bold text-secondary font-serif mb-4">
                                        <span className="text-base text-gray-600 font-normal">お寺による</span>
                                    </p>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        閉眼供養（魂抜き）のお布施や、いわゆる「離檀料」が含まれます。<br />
                                        これまでのお付き合いの感謝としてお包みするものですが、金額感は寺院によって大きく異なります。<br />
                                        トラブルにならないよう、事前にご相談いただければ相場感をお伝えし、サポートいたします。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-secondary/5 p-8 rounded-xl text-center">
                        <h3 className="font-bold text-lg text-primary-dark mb-4">あなたの場合はいくらかかる？</h3>
                        <p className="text-gray-600 mb-8">
                            写真をお送りいただくだけでの概算見積もりも可能です。<br />
                            まずはお気軽にお問い合わせください。
                        </p>
                        <Link href="/grave-closure/consult?mode=estimate">
                            <Button size="lg" className="w-full sm:w-auto shadow-lg">
                                無料見積もりを依頼する
                            </Button>
                        </Link>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
