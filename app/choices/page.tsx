import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Metadata } from "next";
import { ArrowRight, CheckCircle, HelpCircle, Info, Landmark, Sprout, Building, Wallet, Waves, HeartHandshake, Gem, Calculator } from "lucide-react";
import Link from "next/link";
import { Button } from "../components/ui/Button";

export const metadata: Metadata = {
    title: "供養の選択肢比較｜永代供養・樹木葬・納骨堂・散骨を整理｜清蓮",
    description: "永代供養墓、樹木葬、納骨堂、海洋散骨、手元供養など、供養の選択肢を中立の立場で比較整理。迷っている方のための供養比較ガイド。",
};

export default function ChoicesHub() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <Navbar />

            <main className="flex-grow pt-24 px-4 pb-20">
                <div className="max-w-6xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Comparison & Guidance
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark mb-6 leading-relaxed">
                            供養の選択肢比較｜<br className="md:hidden" />自分に合った供養方法を整理する
                        </h1>
                        <p className="text-gray-600 leading-loose max-w-2xl mx-auto">
                            「結局どれを選べばいいの？」と迷うのは自然なことです。正解は人それぞれ異なります。<br />
                            このページでは、多様化する供養方法の違いを整理し、あなたが納得できる選択をするための判断材料を提供します。
                        </p>
                    </div>

                    {/* Diagnostic CTA Section */}
                    <section className="mb-24">
                        <div className="bg-primary rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
                            {/* Decorative element */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-6 relative z-10 flex items-center justify-center">
                                <Calculator className="w-8 h-8 mr-3 text-secondary" />
                                供養の選択肢診断（海洋散骨・自宅供養も含む）
                            </h2>
                            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-8 relative z-10">
                                簡単な5つの質問に答えるだけで、あなたの希望や条件に近い供養方法を診断します。<br />
                                迷われている方は、まずはこちらから整理してみましょう。
                            </p>
                            <div className="relative z-10">
                                <Link href="/choices/diagnosis">
                                    <Button size="lg" className="bg-white text-primary hover:bg-gray-100 border-none px-10 py-6 text-lg shadow-lg">
                                        診断チャートをスタートする <ArrowRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* H2: 主な供養の選択肢 */}
                    <section className="mb-24">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-10 text-center">
                            主な供養の選択肢
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* 永代供養墓 */}
                            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
                                <div className="mb-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                                        <Landmark className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-dark mb-2">永代供養墓</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        お寺や霊園が家族に代わって管理・供養を行うお墓。承継者がいなくても無縁仏になる心配がありません。
                                    </p>
                                    <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 mb-4">
                                        <span className="font-bold text-secondary block mb-1">向いている人:</span>
                                        お墓を継ぐ人がいない、費用を抑えたい、子供に負担をかけたくない
                                    </div>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <Link href="/choices/eitai-kuyou" className="flex items-center text-primary font-bold text-sm hover:underline justify-end">
                                        詳しく見る <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>

                            {/* 樹木葬 */}
                            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
                                <div className="mb-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
                                        <Sprout className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-dark mb-2">樹木葬</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        墓石の代わりに木や花をシンボルにする、自然志向のお墓。明るい雰囲気で、永代供養付きが主流です。
                                    </p>
                                    <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 mb-4">
                                        <span className="font-bold text-secondary block mb-1">向いている人:</span>
                                        自然に還りたい、明るい場所で眠りたい、従来のお墓に抵抗がある
                                    </div>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <Link href="/choices/jumokusou" className="flex items-center text-primary font-bold text-sm hover:underline justify-end">
                                        詳しく見る <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>

                            {/* 納骨堂 */}
                            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
                                <div className="mb-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                        <Building className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-dark mb-2">納骨堂</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        屋内の専用スペースに遺骨を収蔵する施設。天候に関係なくお参りでき、セキュリティも万全です。
                                    </p>
                                    <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 mb-4">
                                        <span className="font-bold text-secondary block mb-1">向いている人:</span>
                                        アクセス重視、お参りの手軽さを求める、草むしりなどの管理をしたくない
                                    </div>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <Link href="/choices/noukotsudou" className="flex items-center text-primary font-bold text-sm hover:underline justify-end">
                                        詳しく見る <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>

                            {/* 海洋散骨 */}
                            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
                                <div className="mb-4">
                                    <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mb-4 text-cyan-600">
                                        <Waves className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-dark mb-2">海洋散骨</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        遺骨をパウダー状にし、海へ還す供養方法。お墓を持たない選択として近年注目されています。
                                    </p>
                                    <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 mb-4">
                                        <span className="font-bold text-secondary block mb-1">向いている人:</span>
                                        海が好き、お墓を残したくない、子供たちに負担をかけたくない
                                    </div>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <Link href="/choices/sankotsu" className="flex items-center text-primary font-bold text-sm hover:underline justify-end">
                                        詳しく見る <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>

                            {/* 手元供養 */}
                            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
                                <div className="mb-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600">
                                        <HeartHandshake className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-dark mb-2">手元供養</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        遺骨の一部を小さな骨壷やアクセサリーに入れて自宅で供養する方法。いつでも故人を身近に感じられます。
                                    </p>
                                    <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 mb-4">
                                        <span className="font-bold text-secondary block mb-1">向いている人:</span>
                                        お墓が遠い、寂しさを感じる、分骨して手元に残したい
                                    </div>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <Link href="/choices/temoto-kuyou" className="flex items-center text-primary font-bold text-sm hover:underline justify-end">
                                        詳しく見る <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>

                            {/* 遺骨ダイヤモンド */}
                            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow flex flex-col">
                                <div className="mb-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600">
                                        <Gem className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-primary-dark mb-2">遺骨ダイヤモンド</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        遺骨に含まれる炭素から人工ダイヤモンドを精製する究極の手元供養。
                                    </p>
                                    <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 mb-4">
                                        <span className="font-bold text-secondary block mb-1">向いている人:</span>
                                        美しい形で残したい、常に身につけていたい
                                    </div>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <Link href="/choices/ikotsu-diamond" className="flex items-center text-primary font-bold text-sm hover:underline justify-end">
                                        詳しく見る <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* H2: 供養方法の比較ポイント (Table) */}
                    <section className="mb-24">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 text-center">
                            供養方法の比較ポイント
                        </h2>
                        <div className="overflow-x-auto pb-4">
                            <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="p-4 rounded-tl-lg">比較項目</th>
                                        <th className="p-4">一般墓</th>
                                        <th className="p-4">永代供養墓</th>
                                        <th className="p-4">樹木葬</th>
                                        <th className="p-4 rounded-tr-lg">納骨堂</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 border-x border-b border-gray-200">
                                    <tr className="bg-white">
                                        <th className="p-4 bg-gray-50 text-gray-700 font-bold border-r border-gray-200">費用</th>
                                        <td className="p-4">高め<br /><span className="text-xs text-gray-400">100〜300万円前後</span></td>
                                        <td className="p-4 text-secondary font-bold">抑えやすい<br /><span className="text-xs text-gray-400">10〜100万円前後</span></td>
                                        <td className="p-4">抑えやすい<br /><span className="text-xs text-gray-400">30〜150万円前後</span></td>
                                        <td className="p-4">中程度<br /><span className="text-xs text-gray-400">50〜200万円前後</span></td>
                                    </tr>
                                    <tr className="bg-white">
                                        <th className="p-4 bg-gray-50 text-gray-700 font-bold border-r border-gray-200">承継者</th>
                                        <td className="p-4">原則必要</td>
                                        <td className="p-4 text-secondary font-bold">不要</td>
                                        <td className="p-4 text-secondary font-bold">不要（多め）</td>
                                        <td className="p-4">不要（多め）</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <th className="p-4 bg-gray-50 text-gray-700 font-bold border-r border-gray-200">個別安置</th>
                                        <td className="p-4">永続的</td>
                                        <td className="p-4">一定期間〜合祀</td>
                                        <td className="p-4">一定期間〜合祀<br /><span className="text-xs text-gray-400">※永続タイプもあり</span></td>
                                        <td className="p-4">一定期間〜合祀</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <th className="p-4 bg-gray-50 text-gray-700 font-bold border-r border-gray-200">宗教制約</th>
                                        <td className="p-4">ある場合が多い</td>
                                        <td className="p-4 text-secondary font-bold">なし・自由が多い</td>
                                        <td className="p-4 text-secondary font-bold">なし・自由</td>
                                        <td className="p-4">様々</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <th className="p-4 bg-gray-50 text-gray-700 font-bold border-r border-gray-200">管理の手間</th>
                                        <td className="p-4">草むしり等が必要</td>
                                        <td className="p-4 text-secondary font-bold">ほぼなし</td>
                                        <td className="p-4 text-secondary font-bold">ほぼなし</td>
                                        <td className="p-4 text-secondary font-bold">なし</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-400 text-right mt-2">※一般的な傾向です。個別の寺院・霊園により条件は異なります。</p>
                    </section>

                    {/* H2: 専門家の立場からの整理の考え方 */}
                    <section className="mb-24">
                        <div className="bg-primary/5 p-8 rounded-xl border border-primary/20">
                            <h2 className="font-serif text-xl font-bold text-primary-dark mb-4 text-center">
                                専門家からのアドバイス
                            </h2>
                            <p className="text-gray-700 leading-loose mb-4">
                                比較表を見ても「決めきれない」というのは、決して悪いことではありません。<br />
                                供養方法選びは、単に「形式」を選ぶだけでなく、<strong>「家族の将来の安心」をどう設計するか</strong>という深い問いを含んでいるからです。
                            </p>
                            <p className="text-gray-700 leading-loose mb-0">
                                墓じまいが必要なケース、遺骨の一部だけを手元に残したいケースなど、複数の方法を組み合わせることも可能です。<br />
                                清蓮では、特定の選択肢を強く勧めることはありません。あなたの状況や想いを整理し、最適な組み合わせを見つけるお手伝いをしています。
                            </p>
                        </div>
                    </section>

                    {/* H2: 迷ったら次にできること (CTA) */}
                    <section className="text-center">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-10 inline-block px-12">
                            迷ったら次にできること
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            {/* Guide */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-gray-100 rounded-full mb-3">
                                        <Info className="w-8 h-8 text-gray-500" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">供養の基礎から知る</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
                                    用語や仕組みがよく分からない場合は、基礎知識から確認してみましょう。
                                </p>
                                <Link href="/guide" className="w-full">
                                    <Button variant="ghost" className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600">
                                        供養の知識まとめへ
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
                                    エリア、予算、こだわり条件などから、実際の候補地を検索できます。
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
                                    <h3 className="font-bold text-lg text-secondary">一度整理してみる</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
                                    考えがまとまっていなくても大丈夫です。第三者に話すことで、頭の中が整理されます。
                                </p>
                                <Link href="/consult" className="w-full">
                                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white border-none">
                                        無料相談する
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
