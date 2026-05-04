import Link from "next/link";
import { Navbar } from "../../../components/layout/Navbar";
import { Footer } from "../../../components/layout/Footer";
import { Button } from "../../../components/ui/Button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "お問い合わせ完了｜清蓮",
    description: "提携・掲載に関するお問い合わせの送信完了ページです。",
    robots: { index: false, follow: true },
    alternates: { canonical: "https://ohakanavi.jp/partner/contact/thanks" },
};

export default function PartnerContactThanksPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main id="main-content" className="grow pt-32 px-4 pb-20">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-500">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            お問い合わせありがとうございます
                        </h1>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            この度は、清蓮への提携・掲載に関するお問い合わせをいただき、<br className="hidden sm:block" />
                            誠にありがとうございます。<br /><br />
                            内容を確認の上、担当者より折り返しご連絡させていただきます。<br />
                            通常、3営業日以内にご返信いたします。
                        </p>

                        <div className="bg-gray-50 p-6 rounded-xl text-left text-sm text-gray-500 mb-8 border border-gray-200">
                            <p className="font-bold mb-2">今後の流れ</p>
                            <ol className="list-decimal list-inside space-y-1 ml-1">
                                <li>担当者が内容を確認いたします</li>
                                <li>メールまたはお電話にて詳細確認のご連絡をいたします</li>
                                <li>条件面等のすり合わせを行った上で、提携開始となります</li>
                            </ol>
                        </div>

                        <Link href="/">
                            <Button size="lg" variant="outline">
                                トップページに戻る
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
