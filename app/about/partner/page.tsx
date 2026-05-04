import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "../../components/ui/Button";

export const metadata: Metadata = {
    title: "提携をご希望の寺院・事業者様へ｜清蓮",
    description: "清蓮への掲載・提携をご希望の寺院様、霊園管理者様、関連事業者様へのお知らせ。",
    alternates: { canonical: "https://ohakanavi.jp/about/partner" },
};

export default function PartnerPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <Navbar />
            <main id="main-content" className="grow pt-24 px-4 pb-20">
                <div className="max-w-3xl mx-auto">

                    <div className="text-center mb-12">
                        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
                            提携をご希望の<br className="md:hidden" />寺院・事業者様へ
                        </h1>
                        <p className="text-gray-600 text-sm leading-loose">
                            清蓮では、情報の透明性・中立性を大切にしながら、<br />
                            ご相談者様に最適な供養先をご提案しています。
                        </p>
                    </div>

                    <div className="bg-gray-50 p-8 rounded-xl mb-12">
                        <h2 className="font-bold text-xl text-primary mb-4">掲載・提携の基準について</h2>
                        <ul className="list-disc list-outside pl-5 space-y-3 text-gray-600 text-sm leading-relaxed">
                            <li>
                                <strong>情報の開示性:</strong> 費用体系、契約内容、解約条件などを明確にご開示いただけること。
                            </li>
                            <li>
                                <strong>適正な運営:</strong> 宗教法人法および関連法規に基づき、適正に運営されていること。
                            </li>
                            <li>
                                <strong>理念への共感:</strong> 弊社の「中立的な立場での提案」という理念にご理解いただけること。
                            </li>
                        </ul>
                        <p className="mt-4 text-xs text-gray-500">
                            ※審査の結果、掲載をお断りする場合もございます。あらかじめご了承ください。
                        </p>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600 mb-6">
                            掲載・提携をご検討の場合は、<br className="md:hidden" />下記フォームよりお問い合わせください。<br />
                            本フォームは法人・提携希望専用です。
                        </p>
                        <Link href="/partner/contact">
                            <Button variant="primary" className="px-8 bg-primary text-white hover:bg-primary/90 h-14 text-lg font-bold shadow-lg">
                                提携・掲載のお問い合わせ
                            </Button>
                        </Link>
                        <p className="text-xs text-gray-500 mt-4">
                            内容を確認の上、担当者より折り返しご連絡します。
                        </p>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
