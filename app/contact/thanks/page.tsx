import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { CheckCircle2, ArrowRight, Search } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "お問い合わせ完了｜清蓮 お墓探しナビ",
    description: "お問い合わせを受け付けました。担当者より折り返しご連絡いたします。",
    robots: { index: false, follow: true },
};

export default function ContactThanksPage() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main id="main-content" className="grow pt-32 px-4 pb-20">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>

                        <h1 className="text-2xl font-bold text-gray-800 mb-4">
                            お問い合わせありがとうございます
                        </h1>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            内容を確認の上、担当者より折り返しご連絡いたします。<br />
                            通常、2〜3営業日以内にご返信いたします。
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/search">
                                <Button size="lg" variant="primary" className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto">
                                    <Search className="w-4 h-4 mr-2" />
                                    お墓を探す
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                    トップページに戻る
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
