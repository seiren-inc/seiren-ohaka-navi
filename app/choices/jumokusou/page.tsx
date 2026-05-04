import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { Metadata } from "next";
import { CheckCircle, AlertCircle, HelpCircle, BookOpen, Info, Calculator, Search, Phone, ArrowRight, TreeDeciduous } from "lucide-react";

export const metadata: Metadata = {
    title: "樹木葬とは｜特徴・費用・メリットを中立に解説｜清蓮",
    description: "樹木葬とは何か。自然志向の供養方法について、仕組みや費用の考え方、メリットと注意点を中立の立場で解説します。",
};

export default function JumokusouPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "清蓮（Seiren）", "item": "https://seiren-ohaka-navi.vercel.app" },
                    { "@type": "ListItem", "position": 2, "name": "Choices", "item": "https://seiren-ohaka-navi.vercel.app/choices" },
                    { "@type": "ListItem", "position": 3, "name": "樹木葬", "item": "https://seiren-ohaka-navi.vercel.app/choices/jumokusou" }
                ]
            },
            {
                "@type": "Article",
                "headline": "樹木葬とは｜自然志向の供養方法を中立に解説",
                "description": "樹木葬の仕組み、費用、メリット・デメリットについて中立的な視点で解説します。",
                "author": { "@type": "Organization", "name": "清蓮" }
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "樹木葬は永代供養に含まれる？",
                        "acceptedAnswer": { "@type": "Answer", "text": "はい、含まれるケースがほとんどです。\n多くの樹木葬プランには、継承不要な「永代供養」の契約があらかじめ組み込まれています。" }
                    },
                    {
                        "@type": "Question",
                        "name": "宗教宗派の制限はある？",
                        "acceptedAnswer": { "@type": "Answer", "text": "基本的には宗教不問（無宗教可）の施設が多いです。\nただし、寺院が運営する場合など、一部では檀家になる条件があることも稀にあります。" }
                    },
                    {
                        "@type": "Question",
                        "name": "合祀されるタイミングは？",
                        "acceptedAnswer": { "@type": "Answer", "text": "「最初から合祀（または集合埋葬）」のタイプと、「一定期間（7年〜33年など）は個別埋葬」のタイプがあります。\n契約内容によって大きく異なるポイントです。" }
                    },
                    {
                        "@type": "Question",
                        "name": "管理費はかかる？",
                        "acceptedAnswer": { "@type": "Answer", "text": "初期費用に含まれているケースと、個別埋葬の期間中のみ年間管理費がかかるケースがあります。\n永代供養墓と同様、比較的負担は少ない傾向にあります。" }
                    },
                    {
                        "@type": "Question",
                        "name": "雨の日でも参拝できる？",
                        "acceptedAnswer": { "@type": "Answer", "text": "樹木葬は基本的に屋外にあるため、天候の影響を受けます。\n足場が整備されている霊園であれば問題ありませんが、自然の山に近いタイプの場合は注意が必要です。" }
                    }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />

            <main id="main-content" className="grow pt-24 px-4 pb-20">
                <div className="max-w-4xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Tree Burial
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6 leading-relaxed">
                            樹木葬とは<br />
                            <span className="text-lg md:text-2xl mt-2 block opacity-80">自然志向の供養方法を中立に解説</span>
                        </h1>

                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 text-left max-w-3xl mx-auto mt-8">
                            <p className="text-gray-700 leading-loose">
                                近年、急速に関心が高まっている「樹木葬」。<br />
                                <br />
                                自然に還るイメージや、明るい雰囲気が人気ですが、<br />
                                全ての方にとって最適な選択肢とは限りません。<br />
                                「向いている人」と「そうでない人」がはっきりと分かれる供養方法でもあります。<br />
                                <br />
                                このページでは、イメージ先行で決めてしまう前に<br />
                                知っておきたい樹木葬の特徴や注意点を、<br />
                                中立的な視点で整理しました。
                            </p>
                        </div>
                    </div>

                    {/* H2: 樹木葬とは何か */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <TreeDeciduous className="w-6 h-6 mr-3 text-secondary" />
                            樹木葬とは何か
                        </h2>
                        <div className="prose max-w-none text-gray-600 leading-loose">
                            <p className="mb-6">
                                樹木葬（じゅもくそう）とは、<br />
                                墓石の代わりに「樹木」や「草花」を墓標（シンボル）とする供養方法です。<br />
                                <br />
                                昭和の時代までは山間部で行われることが多かったですが、<br />
                                近年は都市部の霊園内に「樹木葬エリア」が整備され、<br />
                                アクセスの良い場所で利用できるケースが主流になっています。<br />
                                <br />
                                ほとんどの樹木葬には「永代供養」が付いているため、<br />
                                従来のお墓のような継承（後継ぎ）を必要としません。
                            </p>
                        </div>
                    </section>

                    {/* H2: 選ばれる理由 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-3 text-secondary" />
                            樹木葬が選ばれる理由
                        </h2>
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-primary mb-3">自然に還るイメージ</h4>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        「冷たい石の下より、花や木の下で眠りたい」<br />
                                        「最後は土に還りたい」という、<br />
                                        自然志向の想いを叶えることができます。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-3">墓石を持たない形</h4>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        高価な墓石を建てる必要がないため、<br />
                                        費用を抑えられるだけでなく、<br />
                                        形式張ったものが苦手な方にも選ばれています。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-3">後継ぎの負担軽減</h4>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        永代供養がついているため、<br />
                                        子供にお墓の管理や継承といった<br />
                                        重荷を背負わせたくない方に適しています。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-3">管理の手間を抑制</h4>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        植栽の手入れは霊園側が行うことが多く、<br />
                                        家族が頻繁に草むしり等をする必要がありません。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* H2: 樹木葬の主な種類 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Info className="w-6 h-6 mr-3 text-secondary" />
                            樹木葬の主な種類
                        </h2>
                        <div className="space-y-8">
                            <div className="border-l-4 border-secondary pl-6 py-2">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">1. 個別型</h3>
                                <p className="text-gray-600 leading-loose mb-3">
                                    一人一人、あるいは夫婦や家族ごとに区画が分かれているタイプです。<br />
                                    それぞれの区画に小さなプレートやシンボルツリーを配置します。<br />
                                    一般的なお墓に近い感覚で個別に手を合わせることができます。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人：家族単位で眠りたい、個別の場所が欲しい方</p>
                            </div>

                            <div className="border-l-4 border-secondary pl-6 py-2">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">2. 合同型（シンボルツリー型）</h3>
                                <p className="text-gray-600 leading-loose mb-3">
                                    一本の大きなシンボルツリー（桜やモミジなど）の周囲に、<br />
                                    複数の方の遺骨を一緒に埋葬するタイプです。<br />
                                    特定のご自身の木を持つのではなく、大きな木を共有します。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人：費用を抑えたい、寂しくない場所が良い方</p>
                            </div>

                            <div className="border-l-4 border-secondary pl-6 py-2">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">3. 期間後合祀型</h3>
                                <p className="text-gray-600 leading-loose mb-3">
                                    最初は個別に埋葬されますが、<br />
                                    契約期間（13年や33年など）が過ぎると、合祀墓へ移されるタイプです。<br />
                                    多くの都市型樹木葬で採用されているシステムです。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人：一定期間は個別にお参りしたい方</p>
                            </div>
                        </div>
                    </section>

                    {/* H2: 費用の考え方 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Calculator className="w-6 h-6 mr-3 text-secondary" />
                            費用の考え方
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-xl p-8">
                            <p className="text-gray-600 leading-loose mb-6">
                                樹木葬は墓石代がかからない分、一般墓よりは安価ですが、<br />
                                立地や個別の広さによって金額には幅があります。
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-gray-50 p-4 rounded text-center">
                                    <span className="block text-sm font-bold text-gray-500 mb-2">合同型（合祀）</span>
                                    <span className="block text-xl font-bold text-primary-dark">5万円 〜 30万円</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded text-center">
                                    <span className="block text-sm font-bold text-gray-500 mb-2">個別型・家族型</span>
                                    <span className="block text-xl font-bold text-primary-dark">30万円 〜 150万円</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-primary">費用のポイント</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 leading-loose">
                                    <li>価格差の主な要因は「立地（都心か郊外か）」と「個別区画の広さ」です。</li>
                                    <li>プレート（石の銘板）を設置する場合は、数万円の彫刻料が必要な場合があります。</li>
                                    <li>年間管理費がかからないプランが多いですが、確認は必須です。</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* H2: 樹木葬のメリットと注意点 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <AlertCircle className="w-6 h-6 mr-3 text-secondary" />
                            メリットと注意点
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-secondary/5 p-6 rounded-xl">
                                <h3 className="font-bold text-lg text-secondary mb-4 flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2" />
                                    メリット
                                </h3>
                                <ul className="space-y-4 text-gray-700 leading-loose text-sm">
                                    <li className="flex items-start">
                                        <span className="text-secondary mr-2">●</span>
                                        <span>
                                            明るく開放的な雰囲気の中で、<br />
                                            自然を感じながら眠ることができます。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-secondary mr-2">●</span>
                                        <span>
                                            墓石を使わないため、<br />
                                            比較的費用を抑えやすい傾向にあります。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-secondary mr-2">●</span>
                                        <span>
                                            継承を前提としないケースが多く、<br />
                                            後継ぎのいない方でも安心して利用できます。
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl">
                                <h3 className="font-bold text-lg text-gray-600 mb-4 flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    注意点
                                </h3>
                                <ul className="space-y-4 text-gray-700 leading-loose text-sm">
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">●</span>
                                        <span>
                                            多くは屋外にあるため、<br />
                                            お参りのしやすさが天候に左右されます。<br />
                                            （雨や暑さ寒さの影響を受けます）
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">●</span>
                                        <span>
                                            土に還る（または合祀される）と、<br />
                                            後から遺骨を取り出すことは難しくなります。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">●</span>
                                        <span>
                                            季節によっては草花が枯れていたり、<br />
                                            イメージ写真と実際の景観が異なる場合があります。
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* H2: 他の供養方法との違い */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Search className="w-6 h-6 mr-3 text-secondary" />
                            他の供養方法との違い
                        </h2>
                        <p className="text-gray-600 leading-loose mb-6">
                            樹木葬は「永代供養の一種」ですが、他の選択肢とは以下の点で異なります。<br />
                            「何を優先したいか」で比較してみてください。
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-primary mb-2">永代供養墓との違い</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    <Link href="/choices/eitai-kuyou" className="text-primary font-bold hover:underline">永代供養墓</Link>の多くは石の塔やモニュメントを墓標とします。<br />
                                    「自然の草花」を好むか、「堅牢な石」に安心感を感じるか、<br />
                                    雰囲気の好みが分かれ目になります。
                                </p>
                            </div>
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-primary mb-2">納骨堂との違い</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    <Link href="/choices/noukotsudou" className="text-primary font-bold hover:underline">納骨堂</Link>は屋内施設のため、天候や汚れを気にする必要がありません。<br />
                                    「自然の中で眠りたい」という気持ちと、<br />
                                    「快適にお参りしたい（させたい）」という利便性のどちらを取るかです。
                                </p>
                            </div>
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-primary mb-2">海洋散骨との違い</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    <Link href="/choices/sankotsu" className="text-primary font-bold hover:underline">海洋散骨</Link>はお墓自体を残さないため、手を合わせる特定の場所がなくなります。<br />
                                    樹木葬は「手を合わせる場所（シンボル）」が残る点が大きな違いです。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* H2: 診断で樹木葬が候補に出た方へ */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Calculator className="w-6 h-6 mr-3 text-secondary" />
                            診断で「樹木葬」が候補に出た方へ
                        </h2>
                        <div className="bg-primary/5 p-8 rounded-xl">
                            <p className="text-gray-700 leading-loose mb-4">
                                <Link href="/choices/diagnosis" className="text-primary font-bold hover:underline">供養の選択肢診断</Link>で樹木葬がおすすめされた場合、<br />
                                あなたは「自然志向」や「形式にとらわれない供養」を<br />
                                求めている傾向にあります。
                            </p>
                            <p className="text-gray-700 leading-loose mb-0">
                                ただし、樹木葬は施設によって<br />
                                「森のような場所」もあれば「ガーデニング霊園」のような場所もあり、<br />
                                雰囲気が全く異なります。<br />
                                <br />
                                一度現地を見学し、<br />
                                「ここなら気持ちよく眠れそうだ」と感じられるかを確認することをお勧めします。
                            </p>
                        </div>
                    </section>

                    {/* H2: 迷った場合の次の行動 (CTA) */}
                    <section className="text-center">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-10 inline-block px-12">
                            迷った場合の次の行動
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            {/* Search */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-gray-100 rounded-full mb-3">
                                        <Search className="w-8 h-8 text-gray-500" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">樹木葬を探してみる</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    ご希望のエリアや予算条件から、<br />
                                    実際の樹木葬（霊園）を検索できます。
                                </p>
                                <Link href="/search?type=tree" className="w-full">
                                    <Button variant="primary" className="w-full font-bold">
                                        条件から探す
                                    </Button>
                                </Link>
                            </div>

                            {/* Choices */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-primary/10 rounded-full mb-3">
                                        <BookOpen className="w-8 h-8 text-primary" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">他の供養方法も比較する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    やっぱり屋内の納骨堂がいいかも？など<br />
                                    他の選択肢とも比較してみたい方へ。
                                </p>
                                <Link href="/choices" className="w-full">
                                    <Button variant="outline" className="w-full font-bold">
                                        選択肢一覧に戻る
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
                                        <Phone className="w-8 h-8 text-secondary" />
                                    </span>
                                    <h3 className="font-bold text-lg text-secondary">状況を整理して相談する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    無理に決める必要はありません。<br />
                                    まずは現在の状況を整理するところから始めませんか？
                                </p>
                                <Link href="/consult" className="w-full">
                                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white border-none font-bold">
                                        無料相談する
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="my-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <HelpCircle className="w-6 h-6 mr-3 text-secondary" />
                            よくある質問（FAQ）
                        </h2>
                        <div className="space-y-6">
                            {[
                                { q: "樹木葬は永代供養に含まれる？", a: "はい、含まれるケースがほとんどです。\n多くの樹木葬プランには、継承不要な「永代供養」の契約があらかじめ組み込まれています。" },
                                { q: "宗教宗派の制限はある？", a: "基本的には宗教不問（無宗教可）の施設が多いです。\nただし、寺院が運営する場合など、一部では檀家になる条件があることも稀にあります。" },
                                { q: "合祀されるタイミングは？", a: "「最初から合祀（または集合埋葬）」のタイプと、「一定期間（7年〜33年など）は個別埋葬」のタイプがあります。\n契約内容によって大きく異なるポイントです。" },
                                { q: "管理費はかかる？", a: "初期費用に含まれているケースと、個別埋葬の期間中のみ年間管理費がかかるケースがあります。\n永代供養墓と同様、比較的負担は少ない傾向にあります。" },
                                { q: "雨の日でも参拝できる？", a: "樹木葬は基本的に屋外にあるため、天候の影響を受けます。\n足場が整備されている霊園であれば問題ありませんが、自然の山に近いタイプの場合は注意が必要です。" }
                            ].map((item, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg p-5">
                                    <h4 className="font-bold text-primary mb-2 flex flex-row items-center">
                                        <span className="bg-secondary text-white text-xs font-bold px-2 py-1 rounded mr-3 shrink-0">Q</span>
                                        {item.q}
                                    </h4>
                                    <p className="text-sm text-gray-600 ml-10 leading-relaxed whitespace-pre-line">
                                        {item.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
}
