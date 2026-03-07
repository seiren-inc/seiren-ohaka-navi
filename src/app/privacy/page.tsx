import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "プライバシーポリシー｜清蓮",
    description: "清蓮（SEIREN）のプライバシーポリシー（個人情報保護方針）についてのページです。",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <Navbar />
            <main className="flex-grow pt-24 px-4 pb-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-serif text-3xl font-bold text-primary mb-8 border-b pb-4">
                        プライバシーポリシー
                    </h1>

                    <div className="prose max-w-none text-sm text-gray-700 leading-loose space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-primary-dark mb-4">1. 個人情報の取り扱いについて</h2>
                            <p>
                                清蓮（以下「当方」）は、お客様の個人情報の重要性を認識し、その保護を徹底するために、以下の個人情報保護方針を定めます。<br />
                                当方は、個人情報保護法その他関連法令を遵守し、お客様からお預かりした個人情報を適切に取り扱います。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary-dark mb-4">2. 取得する個人情報</h2>
                            <p>
                                当方は、お問い合わせ、ご相談、サービスのご利用申込み等において、以下の情報を取得する場合があります。<br />
                                ・氏名、住所、電話番号、メールアドレス<br />
                                ・ご相談内容に含まれる情報<br />
                                ・その他サービス提供に必要な情報
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary-dark mb-4">3. 個人情報の利用目的</h2>
                            <p>
                                取得した個人情報は、以下の目的のために利用いたします。<br />
                                ・お問い合わせ、ご相談への対応<br />
                                ・サービスのご案内および提供<br />
                                ・サービス改善のための分析（匿名加工した上での利用）<br />
                                ・法令に基づく対応
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary-dark mb-4">4. 第三者への提供</h2>
                            <p>
                                当方は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。<br />
                                ・法令に基づく場合<br />
                                ・人の生命、身体または財産の保護のために必要がある場合<br />
                                ・業務委託先に、利用目的の達成に必要な範囲で委託する場合
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary-dark mb-4">5. 安全管理措置</h2>
                            <p>
                                当方は、個人情報の漏洩、滅失またはき損の防止、その他個人情報の安全管理のために必要かつ適切な措置を講じます。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary-dark mb-4">6. お問い合わせ窓口</h2>
                            <p>
                                個人情報の取り扱いに関するお問い合わせは、以下の窓口までお願いいたします。<br />
                                清蓮 運営事務局<br />
                                （お問い合わせフォームよりご連絡ください）
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
