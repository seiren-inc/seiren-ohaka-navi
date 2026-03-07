import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { Metadata } from "next";
import { ArrowRight, ChevronRight, AlertCircle, HelpCircle, CheckCircle, Info } from "lucide-react";

export const metadata: Metadata = {
    title: "墓じまいとは｜手続き・費用・流れを専門家が中立解説｜清蓮",
    description: "墓じまいとは何か、必要な手続きや費用、一般的な流れを供養の専門家が中立の立場で解説。改葬を検討中の方のための墓じまいガイド。",
};

export default function GuideGraveClosurePage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <Navbar />

            <main className="flex-grow pt-24 px-4 pb-20">
                <div className="max-w-4xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Grave Closure Guide
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark mb-6 leading-relaxed">
                            墓じまいガイド｜<br className="md:hidden" />手続き・費用・流れを<br className="md:hidden" />専門家が中立解説
                        </h1>
                        <p className="text-gray-600 leading-loose max-w-2xl mx-auto">
                            「継承者がいない」「遠方で管理が大変」などの理由で、墓じまいを考える方が増えています。<br />
                            このページでは、墓じまいの基本的な流れや費用目安、トラブルを防ぐポイントを解説します。<br />
                            <span className="text-sm text-gray-400 mt-2 block">※まだ決断していなくても問題ありません。まずは知識を整理しましょう。</span>
                        </p>
                    </div>

                    {/* H2: 墓じまいとは */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Info className="w-6 h-6 mr-3 text-secondary" />
                            墓じまいとは
                        </h2>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <p className="text-gray-600 leading-loose mb-4">
                                墓じまいとは、現在あるお墓を撤去して更地にし、お寺や霊園に返還することです。<br />
                                取り出した遺骨は、別の場所（永代供養墓、納骨堂、樹木葬など）に移して供養します。これを「改葬（かいそう）」と呼びます。
                            </p>
                            <div className="bg-white p-4 rounded border border-gray-200">
                                <h4 className="font-bold text-primary mb-2 flex items-center text-sm">
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    よくある誤解
                                </h4>
                                <p className="text-sm text-gray-600">
                                    「遺骨を処分する」ことではありません。生活スタイルに合わせて「供養の場所と形を変える」前向きな整理です。<br />
                                    法的にも宗教的にも、手順さえ踏めば全く問題ありません。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* H2: 墓じまいを考える主な理由 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-3 text-secondary" />
                            墓じまいを考える主な理由
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-5 border border-gray-200 rounded-lg">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">承継者がいない</h3>
                                <p className="text-sm text-gray-600">子供がいない、または娘がお嫁に行ってしまい、お墓を継ぐ人がいなくなるケースです。</p>
                            </div>
                            <div className="p-5 border border-gray-200 rounded-lg">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">お墓が遠方にある</h3>
                                <p className="text-sm text-gray-600">住まいと霊園が離れており、高齢になってお墓参りや草むしりなどの管理が難しくなった場合です。</p>
                            </div>
                            <div className="p-5 border border-gray-200 rounded-lg">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">管理や費用の負担</h3>
                                <p className="text-sm text-gray-600">毎年の護持会費やお布施、修繕費用の負担を、子供の世代に残したくないという考えです。</p>
                            </div>
                            <div className="p-5 border border-gray-200 rounded-lg">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">家族構成の変化</h3>
                                <p className="text-sm text-gray-600">夫婦だけのお墓にしたい、ペットと一緒に入りたいなど、既存のお墓では叶えられない希望がある場合です。</p>
                            </div>
                        </div>
                    </section>

                    {/* H2: 一般的な流れ */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8">
                            墓じまいの一般的な流れ
                        </h2>
                        <div className="space-y-6">
                            {[
                                { title: "1. 家族・親族での話し合い", desc: "最も重要です。事後報告はトラブルの元になるため、必ず事前に相談し同意を得ましょう。" },
                                { title: "2. 改葬先の検討・決定", desc: "遺骨の引越し先（永代供養墓、納骨堂、散骨など）を決め、「受入証明書」を発行してもらいます。" },
                                { title: "3. 行政手続き（改葬許可申請）", desc: "現在のお墓がある自治体で、既存のお墓の管理者（お寺など）の署名が入った書類を提出し、「改葬許可証」を取得します。" },
                                { title: "4. 閉眼供養・遺骨の取り出し・墓石撤去", desc: "お坊さんにお経をあげてもらい（魂抜き）、遺骨を取り出します。その後、石材店が墓石を撤去し更地に戻します。" },
                                { title: "5. 新しい場所への納骨", desc: "改葬許可証を新しい納骨先に提出し、遺骨を納めます。" }
                            ].map((step, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg shadow-sm">
                                        {i + 1}
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="font-bold text-lg text-primary-dark mb-2">{step.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-6 text-right">※自治体やお寺の状況により、順序や必要書類が異なる場合があります。</p>
                    </section>

                    {/* H2: 費用の目安 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8">
                            墓じまいにかかる費用の目安
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-700 font-bold border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4">費用の名目</th>
                                        <th className="px-6 py-4">目安金額</th>
                                        <th className="px-6 py-4 hidden sm:table-cell">備考</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-primary-dark">墓石撤去費</td>
                                        <td className="px-6 py-4">10万円 〜 30万円<span className="text-xs text-gray-400 block sm:hidden">※広さや立地による</span></td>
                                        <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">1㎡あたり10〜15万円が相場。重機が入らない場所は高くなる。</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-primary-dark">閉眼供養（お布施）</td>
                                        <td className="px-6 py-4">3万円 〜 10万円</td>
                                        <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">お寺へのお礼。「離檀料」として別途費用がかかる場合もある。</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-primary-dark">行政手続き</td>
                                        <td className="px-6 py-4">数千円</td>
                                        <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">自治体による発行手数料。</td>
                                    </tr>
                                    <tr>
                                        <td className="px-6 py-4 font-bold text-primary-dark">新しい納骨先の費用</td>
                                        <td className="px-6 py-4">5万円 〜 数百万円<span className="text-xs text-gray-400 block sm:hidden">※タイプによる</span></td>
                                        <td className="px-6 py-4 text-gray-500 hidden sm:table-cell">合祀墓なら安く、個別のお墓や高級納骨堂なら高くなる。</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-400 mt-4 text-right">※金額はあくまで目安です。具体的な金額は石材店やお寺への確認が必要です。</p>
                    </section>

                    {/* H2: 注意すべきポイント */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <AlertCircle className="w-6 h-6 mr-3 text-secondary" />
                            墓じまいで注意すべきポイント
                        </h2>
                        <div className="grid gap-6">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">親族間トラブルに注意</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    「先祖代々のお墓を勝手になくした」と後から言われないよう、必ず関係者に相談しましょう。<br />
                                    遠い親戚でも、お墓参りに来ている方がいるかもしれません。
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">菩提寺（ぼだいじ）との関係</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    お寺にとって檀家が減ることは寂しいことです。一方的に「辞めます」と伝えるのではなく、<br />
                                    「事情があって維持ができなくなった」と誠意を持って相談することが、高額な離檀料トラブルを防ぐコツです。
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">安易に決めない</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    「とにかく安く済ませたい」と合祀墓を選んでしまい、後から「やっぱり個別に拝みたかった」と後悔しても、<br />
                                    合祀された遺骨は取り出せません。焦る必要はないので、じっくり検討しましょう。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* H2: 専門家の立場からのアドバイス */}
                    <section className="mb-20">
                        <div className="bg-primary/5 p-8 rounded-xl border border-primary/20">
                            <h2 className="font-serif text-xl font-bold text-primary-dark mb-4">
                                専門家の立場からのアドバイス
                            </h2>
                            <p className="text-gray-700 leading-loose mb-4">
                                墓じまいは、決して「先祖をないがしろにする行為」ではありません。<br />
                                むしろ、<strong>「将来無縁仏にしてしまわないよう、責任を持って供養の形を整える」</strong>という、ご先祖様への最大の親孝行だと私たちは考えています。
                            </p>
                            <p className="text-gray-700 leading-loose mb-0">
                                手続きは複雑に見えますが、一つずつ進めれば必ず終わります。<br />
                                「何から手をつければいいか分からない」「お寺への切り出し方が不安」という方は、一人で悩まずに私たちにご相談ください。<br />
                                第三者の視点が入ることで、絡まった糸が解けるようにスムーズに進むことがよくあります。
                            </p>
                        </div>
                    </section>

                    {/* H2: 墓じまいを一貫して任せられる体制について */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-3 text-secondary" />
                            墓じまいを一貫して任せられる体制について
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                            <p className="text-gray-600 leading-loose mb-6">
                                墓じまいの工程は、行政への手続き、石材店による撤去工事、お寺との調整、そして新しい納骨先の準備と多岐にわたります。<br />
                                これらを個別に手配すると、「石材店と納骨先の日程が合わない」「手続きの不備で工事が止まる」といった調整の負担が発生しがちです。
                            </p>
                            <p className="text-gray-600 leading-loose mb-6">
                                こうした負担を軽減するため、清蓮では墓じまいから次の納骨までを中立的な立場で一貫してサポートできる体制を整えています。<br />
                                具体的には、以下の工程を一つの窓口で調整することが可能です。
                            </p>
                            <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-0.5 mr-3">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                        <div className="text-sm text-gray-700 leading-relaxed">
                                            <strong className="block text-primary-dark mb-1">行政・寺院手続きの整理</strong>
                                            改葬許可申請や、お寺への離檀・閉眼供養の連絡など、複雑な手続きの流れを整理しサポートします。
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-0.5 mr-3">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                        <div className="text-sm text-gray-700 leading-relaxed">
                                            <strong className="block text-primary-dark mb-1">墓石の撤去・整地</strong>
                                            現地を確認し、信頼できる石材店の手配や工事日程の調整を行います。
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-0.5 mr-3">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                        <div className="text-sm text-gray-700 leading-relaxed">
                                            <strong className="block text-primary-dark mb-1">遺骨の準備（粉骨・洗骨など）</strong>
                                            新しい納骨先の規定（容量制限など）に合わせて、ご遺骨をパウダー状にする（粉骨）などの処置を適切に行います。
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mt-0.5 mr-3">
                                            <CheckCircle className="w-4 h-4" />
                                        </div>
                                        <div className="text-sm text-gray-700 leading-relaxed">
                                            <strong className="block text-primary-dark mb-1">納骨先への配送・受け渡し</strong>
                                            ご遺骨を安全に新しい供養先へとお届けし、納骨までを見届けます。
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                ※ご相談の内容やエリア、ご希望の納骨先によって対応できる範囲は異なります。<br />
                                必ずしも全てを一括で依頼する必要はありません。ご家族で対応が難しい部分だけを切り分けてご相談いただくことも可能です。<br />
                                まずは「今の状況で何が必要か」を整理するところから始めましょう。
                            </p>
                        </div>
                    </section>

                    {/* H2: 墓じまいを考えている方へ (CTA) */}
                    <section className="mt-20 text-center">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-10 inline-block px-12">
                            墓じまいを考えている方へ
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            {/* Consult */}
                            <div className="flex flex-col bg-secondary/5 border border-secondary/20 rounded-xl p-6 hover:shadow-lg transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 right-0 bg-secondary text-white text-[10px] font-bold px-2 py-1 rounded-bl">
                                    相談無料
                                </div>
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-white rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                        <HelpCircle className="w-8 h-8 text-secondary" />
                                    </span>
                                    <h3 className="font-bold text-lg text-secondary">まずは話を整理する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
                                    まだ決断していなくても大丈夫です。現状の不安をお聞かせください。
                                </p>
                                <Link href="/consult/grave-closure" className="w-full">
                                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white border-none">
                                        墓じまい相談予約
                                    </Button>
                                </Link>
                            </div>

                            {/* Choices */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-gray-100 rounded-full mb-3">
                                        <ArrowRight className="w-8 h-8 text-gray-500" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">次の供養先を探す</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
                                    永代供養墓や樹木葬など、引っ越し先の選択肢を見てみましょう。
                                </p>
                                <Link href="/choices" className="w-full">
                                    <Button variant="outline" className="w-full">
                                        供養方法を比較
                                    </Button>
                                </Link>
                            </div>

                            {/* Guide Top */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-gray-100 rounded-full mb-3">
                                        <Info className="w-8 h-8 text-gray-500" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">ガイドトップへ戻る</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
                                    他の知識記事も読んでみたい方はこちらから。
                                </p>
                                <Link href="/guide" className="w-full">
                                    <Button variant="ghost" className="w-full bg-gray-50 hover:bg-gray-100">
                                        供養の知識まとめへ
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
}
