import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import Link from "next/link";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "墓じまいのよくある質問｜清蓮",
    description: "墓じまいや改葬に関する疑問・質問にお答えします。",
};

export default function GraveClosureFaqPage() {
    const faqs = [
        { q: "遠方に住んでいるため、現地へ行けませんが依頼できますか？", a: "はい、可能です。現地調査から工事完了まで、写真やメールでの報告のみで完結することも可能です。委任状をいただければ役所手続きも代行いたします。" },
        { q: "お墓の中に遺骨が何体あるか分かりません。", a: "現地調査の際に、カロート（納骨室）を開けて確認することが可能です（要管理者許可）。お申し込み前にお調べしますのでご安心ください。" },
        { q: "親戚と意見が合わないのですが...", a: "墓じまいは親族間のトラブルになりやすい問題です。強引に進めず、まずは皆様で話し合うことをお勧めしますが、専門家の立場からメリット・デメリット等の客観的なアドバイスをさせていただくことは可能です。" },
        { q: "費用はいつ支払えばいいですか？", a: "通常、ご契約時に着手金（50%程度）をいただき、工事完了確認後に残金をお支払いいただきます。ローン等のご相談も承ります。" },
        { q: "指定石材店があると言われましたが...", a: "民営霊園や寺院墓地の場合、工事ができる業者が決まっている場合があります。その場合は弊社で工事を行うことができませんが、その後の永代供養先のご紹介や、手続きサポートのみをお引き受けすることは可能です。" },
        { q: "遺骨が土に還ってしまっている場合はどうすれば？", a: "古いお墓で土葬の場合や、骨が土化している場合は、その土を一部採取して新しい供養先へ納める形をとることが一般的です。" },
    ];

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
                            Q & A
                        </span>
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                            よくある質問
                        </h1>
                    </div>

                    {/* FAQ List */}
                    <div className="space-y-6">
                        {faqs.map((item, idx) => (
                            <details key={idx} className="group bg-white border border-gray-200 p-6 rounded-xl cursor-pointer hover:shadow-sm transition-shadow">
                                <summary className="font-bold text-gray-800 flex justify-between items-center list-none">
                                    <span className="flex items-start gap-4 text-left">
                                        <HelpCircle className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                                        <span className="text-lg">{item.q}</span>
                                    </span>
                                    <span className="text-gray-400 group-open:rotate-180 transition-transform ml-4">▼</span>
                                </summary>
                                <div className="mt-4 pl-10 text-gray-600 leading-relaxed border-l-2 border-secondary/20 pt-2">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>

                    <div className="text-center mt-16 bg-gray-50 p-10 rounded-2xl">
                        <h3 className="font-bold text-lg text-gray-800 mb-4">その他のご質問はありますか？</h3>
                        <p className="text-gray-600 mb-8">
                            掲載されていないご質問についても、<br />
                            専門スタッフが丁寧にお答えします。
                        </p>
                        <Link href="/grave-closure/consult">
                            <Button size="lg" className="w-full sm:w-auto">
                                お問い合わせフォームへ
                            </Button>
                        </Link>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
