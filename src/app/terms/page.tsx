import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "利用規約｜清蓮",
    description: "清蓮（SEIREN）のウェブサイト利用規約です。",
    robots: { index: false, follow: true },
};

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <Navbar />
            <main className="flex-grow pt-24 px-4 pb-20">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-serif text-3xl font-bold text-primary mb-8 border-b pb-4">
                        利用規約
                    </h1>

                    <div className="prose max-w-none text-sm text-gray-700 leading-loose space-y-8">
                        <section>
                            <h2 className="text-xl font-bold text-primary-dark mb-4">第1条（適用）</h2>
                            <p>
                                本規約は、清蓮（以下「当方」）が運営する本ウェブサイトおよび提供するサービス（以下「本サービス」）の利用条件を定めるものです。<br />
                                本サービスを利用される方（以下「利用者」）は、本規約に同意したものとみなされます。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary-dark mb-4">第2条（サービス内容）</h2>
                            <p>
                                当方は、お墓や供養に関する情報の提供、相談対応、および提携事業者への紹介などを行います。<br />
                                当方は、提供する情報について可能な限り正確性を期しますが、その完全性、正確性、有用性を保証するものではありません。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary-dark mb-4">第3条（禁止事項）</h2>
                            <p>
                                利用者は、本サービスの利用にあたり、以下の行為を行ってはならないものとします。<br />
                                1. 法令または公序良俗に違反する行為<br />
                                2. 当方または第三者の権利を侵害する行為<br />
                                3. 本サービスの運営を妨害する行為<br />
                                4. 虚偽の情報を登録・送信する行為<br />
                                5. その他、当方が不適切と判断する行為
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary-dark mb-4">第4条（免責事項）</h2>
                            <p>
                                1. 当方は、本サービスの利用により利用者に生じた損害について、当方の故意または重大な過失がある場合を除き、一切の責任を負いません。<br />
                                2. 当方は、利用者と第三者（提携事業者等を含む）との間で生じたトラブルについて、一切関知しません。<br />
                                3. お墓や契約に関する最終的な判断は、利用者ご自身の責任において行ってください。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary-dark mb-4">第5条（規約の変更）</h2>
                            <p>
                                当方は、必要と判断した場合には、利用者に通知することなく本規約を変更することができるものとします。<br />
                                変更後の規約は、本ウェブサイトに掲載された時点で効力を生じるものとします。
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-primary-dark mb-4">第6条（準拠法・管轄裁判所）</h2>
                            <p>
                                本規約の解釈にあたっては、日本法を準拠法とします。<br />
                                本サービスに関して紛争が生じた場合には、当方の所在地を管轄する裁判所を専属的合意管轄とします。
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
