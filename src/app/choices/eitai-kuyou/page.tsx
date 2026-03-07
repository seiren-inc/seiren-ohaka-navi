import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { Breadcrumb } from "../../components/ui/Breadcrumb";
import { Metadata } from "next";
import { CheckCircle, AlertCircle, HelpCircle, BookOpen, Info, Calculator, Search, Phone, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "永代供養とは｜仕組み・費用・メリットを中立に解説｜清蓮",
    description: "永代供養とは何か、仕組みや費用の考え方、メリットと注意点を供養の専門家が中立の立場で解説します。",
};

export default function EitaiKuyouPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "清蓮（Seiren）", "item": "https://seiren-ohaka-navi.vercel.app" },
                    { "@type": "ListItem", "position": 2, "name": "Choices", "item": "https://seiren-ohaka-navi.vercel.app/choices" },
                    { "@type": "ListItem", "position": 3, "name": "永代供養", "item": "https://seiren-ohaka-navi.vercel.app/choices/eitai-kuyou" }
                ]
            },
            {
                "@type": "Article",
                "headline": "永代供養とは｜仕組み・費用・メリットを中立に解説",
                "description": "永代供養の仕組み、費用、メリット・デメリットについて中立的な視点で解説します。",
                "author": { "@type": "Organization", "name": "清蓮" }
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "永代供養とは一般墓と何が違う？",
                        "acceptedAnswer": { "@type": "Answer", "text": "最大の違いは「管理の主体」です。\n一般墓は家族が管理・継承を行いますが、永代供養は霊園や寺院が家族に代わって管理・供養を行います。" }
                    },
                    {
                        "@type": "Question",
                        "name": "永代供養に管理費はかかる？",
                        "acceptedAnswer": { "@type": "Answer", "text": "多くのプランでは、初期費用に管理費が含まれており、その後の支払いは不要です。\nただし、個別安置期間中は年間管理費が必要なケースもあるため、個別の確認が必要です。" }
                    },
                    {
                        "@type": "Question",
                        "name": "合祀になるタイミングは？",
                        "acceptedAnswer": { "@type": "Answer", "text": "「契約直後」のプランと、「一定期間（7年、13年、33年など）経過後」のプランがあります。\n契約内容によって大きく異なるため、事前に必ず確認すべきポイントです。" }
                    },
                    {
                        "@type": "Question",
                        "name": "宗教宗派の制限はある？",
                        "acceptedAnswer": { "@type": "Answer", "text": "近年増えている永代供養墓の多くは、宗旨宗派不問で利用できます。\nただし寺院が運営する場合、在来仏教に限るなどの条件があることもあります。" }
                    },
                    {
                        "@type": "Question",
                        "name": "改葬先として選べる？",
                        "acceptedAnswer": { "@type": "Answer", "text": "はい、改葬（お墓じまい）後の受け入れ先として非常に多く選ばれています。\n継承者がいなくても契約できるため、墓じまいの解決策として適しています。" }
                    }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />

            <main className="flex-grow pt-24 px-4 pb-20">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="mb-6">
                        <Breadcrumb />
                    </div>

                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Permanent Memorial
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6 leading-relaxed">
                            永代供養とは<br />
                            <span className="text-lg md:text-2xl mt-2 block opacity-80">仕組みと特徴を中立に解説</span>
                        </h1>

                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 text-left max-w-3xl mx-auto mt-8">
                            <p className="text-gray-700 leading-loose">
                                「お墓の後継ぎがいない」<br />
                                「子供に負担をかけたくない」<br />
                                このような理由から、永代供養を検討し始める方が増えています。<br />
                                <br />
                                まだ具体的に決まっていなくても、全く問題ありません。<br />
                                まずは「永代供養とはどのような仕組みなのか」、<br />
                                「自分たちに合う可能性があるのか」を知ることから始めましょう。<br />
                                <br />
                                このページでは、永代供養の基本的な仕組みから<br />
                                メリット・注意点までを、中立的な立場で整理しています。
                            </p>
                        </div>
                    </div>

                    {/* H2: 永代供養とは何か */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <BookOpen className="w-6 h-6 mr-3 text-secondary" />
                            永代供養とは何か
                        </h2>
                        <div className="prose max-w-none text-gray-600 leading-loose">
                            <h3 className="font-bold text-lg text-primary-dark mb-4">基本的な考え方</h3>
                            <p className="mb-6">
                                永代供養（えいたいくよう）とは、<br />
                                家族に代わって、霊園や寺院が遺骨を管理・供養する仕組みのことです。<br />
                                <br />
                                お墓という「物」を指す言葉ではなく、<br />
                                「供養を委託する契約の形」を指す言葉として使われています。
                            </p>

                            <h3 className="font-bold text-lg text-primary-dark mb-4">一般墓との違い</h3>
                            <p className="mb-6">
                                一般的なお墓は、家族が代々継承し、管理料を支払いながら維持します。<br />
                                一方、永代供養は「継承を前提としない」のが最大の特徴です。<br />
                                <br />
                                後継ぎがいなくても契約でき、<br />
                                契約後の管理や供養は施設側が行うため、<br />
                                残された家族への負担が少ない供養方法として定着しています。
                            </p>
                        </div>
                    </section>

                    {/* H2: 永代供養を選ぶ人が多い理由 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-3 text-secondary" />
                            永代供養を選ぶ人が多い理由
                        </h2>
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-primary mb-3">後継ぎの不安がある</h4>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        子供がいない、あるいは娘が嫁いでいるなど、<br />
                                        実家のお墓を継ぐ人がいない場合でも、<br />
                                        安心して供養を任せることができます。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-3">家族に負担を残したくない</h4>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        子供はいるけれど、遠方に住んでいるため、<br />
                                        お墓の管理やお参りの手間をかけさせたくない、<br />
                                        と考える方が選ばれています。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-3">管理の負担を減らしたい</h4>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        草むしりや掃除などの身体的な負担や、<br />
                                        お寺との付き合いなどの精神的な負担を<br />
                                        軽減したいというニーズに応えています。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-3">将来を見据えて整理したい</h4>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        終活の一環として、<br />
                                        元気なうちに自分たちの入る場所を決め、<br />
                                        将来の不安を解消しておきたい方に選ばれています。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* H2: 永代供養の主な形式 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Info className="w-6 h-6 mr-3 text-secondary" />
                            永代供養の主な形式
                        </h2>
                        <div className="space-y-8">
                            <div className="border-l-4 border-secondary pl-6 py-2">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">1. 合祀型（ごうしがた）</h3>
                                <p className="text-gray-600 leading-loose mb-3">
                                    最初から他の方の遺骨と一緒に埋葬される形式です。<br />
                                    個別のスペースを持たないため、費用を最も抑えることができます。<br />
                                    一度納骨すると、後から遺骨を取り出すことはできません。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人：費用を重視する方、こだわりの少ない方</p>
                            </div>

                            <div className="border-l-4 border-secondary pl-6 py-2">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">2. 個別安置型</h3>
                                <p className="text-gray-600 leading-loose mb-3">
                                    一定期間（例えば33回忌までなど）、個別に骨壺を安置する形式です。<br />
                                    契約期間中は、家族ごとにお参りすることができます。<br />
                                    期間終了後は、合祀墓へ移されることが一般的です。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人：一定期間は個別にお参りしたい方</p>
                            </div>

                            <div className="border-l-4 border-secondary pl-6 py-2">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">3. 集合安置型</h3>
                                <p className="text-gray-600 leading-loose mb-3">
                                    個別に骨壺を分けつつ、棚やスペースは共有する形式です。<br />
                                    個別型と合祀型の中間のような位置づけで、<br />
                                    比較的リーズナブルに個別の区別を残すことができます。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人：費用と個別感のバランスを取りたい方</p>
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
                                永代供養の費用は、選ぶ形式や地域によって幅がありますが、<br />
                                一般的なお墓を建てるよりも抑えられる傾向にあります。
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gray-50 p-4 rounded text-center">
                                    <span className="block text-sm font-bold text-gray-500 mb-2">合祀型</span>
                                    <span className="block text-xl font-bold text-primary-dark">5万円 〜 30万円</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded text-center">
                                    <span className="block text-sm font-bold text-gray-500 mb-2">集合安置型</span>
                                    <span className="block text-xl font-bold text-primary-dark">20万円 〜 60万円</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded text-center">
                                    <span className="block text-sm font-bold text-gray-500 mb-2">個別安置型</span>
                                    <span className="block text-xl font-bold text-primary-dark">50万円 〜 150万円</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-primary">費用のポイント</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 leading-loose">
                                    <li>多くのプランで管理費が一括（または不要）となっています。</li>
                                    <li>墓石を建てる個別型の場合は、別途墓石代がかかることがあります。</li>
                                    <li>契約後の追加費用がかからないケースが多いのが特徴です。</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* H2: 永代供養のメリットと注意点 */}
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
                                            お墓の管理や清掃の負担がなくなります。<br />
                                            施設側が定期的に供養を行ってくれます。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-secondary mr-2">●</span>
                                        <span>
                                            後継ぎがいなくても契約できるため、<br />
                                            子供がいない方や独身の方でも安心です。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-secondary mr-2">●</span>
                                        <span>
                                            一般墓に比べて費用を抑えやすく、<br />
                                            将来の維持費の心配も少なくなります。
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
                                            合祀（ごうし）された後は、<br />
                                            遺骨を個別に取り出すことができません。<br />
                                            （改葬や分骨ができなくなります）
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">●</span>
                                        <span>
                                            合同のスペースでお参りすることが多く、<br />
                                            個別に手を合わせる感覚とは異なる場合があります。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">●</span>
                                        <span>
                                            親族の中に「お墓は代々継ぐもの」という<br />
                                            考えの方がいる場合、理解を得る必要があります。
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
                            永代供養は、他の新しい供養方法と組み合わせて語られることが多いです。<br />
                            それぞれの考え方の違いを整理します。
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-primary mb-2">樹木葬との関係</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    <Link href="/choices/jumokusou" className="text-primary font-bold hover:underline">樹木葬</Link>の多くは、永代供養の契約が含まれています。<br />
                                    「自然に還る」というコンセプトを重視するなら樹木葬、<br />
                                    「石碑や仏塔」など形あるものに手を合わせたいなら永代供養墓、<br />
                                    といった選び分けが一般的です。
                                </p>
                            </div>
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-primary mb-2">納骨堂との関係</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    <Link href="/choices/noukotsudou" className="text-primary font-bold hover:underline">納骨堂</Link>も、多くの施設で永代供養に対応しています。<br />
                                    屋外のお墓にこだわるか、天候を気にせずお参りできる屋内が良いか、<br />
                                    という「場所」の好みで比較検討されます。
                                </p>
                            </div>
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-primary mb-2">海洋散骨・自宅供養との関係</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    <Link href="/choices/sankotsu" className="text-primary font-bold hover:underline">海洋散骨</Link>や<Link href="/choices/temoto-kuyou" className="text-primary font-bold hover:underline">自宅供養</Link>は、<br />
                                    「お墓という場所を持たない」選択肢です。<br />
                                    お参りに行く場所（シンボル）が欲しいかどうか、が判断の分かれ目となります。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* H2: 診断で永代供養が候補に出た方へ */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Calculator className="w-6 h-6 mr-3 text-secondary" />
                            診断で「永代供養」が候補に出た方へ
                        </h2>
                        <div className="bg-primary/5 p-8 rounded-xl">
                            <p className="text-gray-700 leading-loose mb-4">
                                <Link href="/choices/diagnosis" className="text-primary font-bold hover:underline">供養の選択肢診断</Link>で永代供養がおすすめされた場合、<br />
                                あなたは「将来の安心」や「負担の軽減」を<br />
                                重視されている傾向にあると考えられます。
                            </p>
                            <p className="text-gray-700 leading-loose mb-0">
                                ただし、これはあくまで一つの目安です。<br />
                                実際には「お参りの頻度」や「交通アクセス」、<br />
                                「ご家族の意向」なども踏まえて判断する必要があります。<br />
                                <br />
                                永代供養と一口に言っても、<br />
                                合祀墓なのか、個別安置なのかによって条件は大きく変わります。<br />
                                まずは実際の施設をいくつか見てみることで、イメージが具体的になるはずです。
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
                                    <h3 className="font-bold text-lg text-primary-dark">永代供養墓を探してみる</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
                                    ご希望のエリアや予算条件から、<br />
                                    実際の永代供養墓を検索できます。
                                </p>
                                <Link href="/search?type=perpetual" className="w-full">
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
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
                                    樹木葬や納骨堂など、<br />
                                    他の選択肢とも改めて比較してみたい方へ。
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
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
                                    無理に決める必要はありません。<br />
                                    迷われている点は、専門家が一緒に整理します。
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
                                { q: "永代供養とは一般墓と何が違う？", a: "最大の違いは「管理の主体」です。\n一般墓は家族が管理・継承を行いますが、永代供養は霊園や寺院が家族に代わって管理・供養を行います。" },
                                { q: "永代供養に管理費はかかる？", a: "多くのプランでは、初期費用に管理費が含まれており、その後の支払いは不要です。\nただし、個別安置期間中は年間管理費が必要なケースもあるため、個別の確認が必要です。" },
                                { q: "合祀になるタイミングは？", a: "「契約直後」のプランと、「一定期間（7年、13年、33年など）経過後」のプランがあります。\n契約内容によって大きく異なるため、事前に必ず確認すべきポイントです。" },
                                { q: "宗教宗派の制限はある？", a: "近年増えている永代供養墓の多くは、宗旨宗派不問で利用できます。\nただし寺院が運営する場合、在来仏教に限るなどの条件があることもあります。" },
                                { q: "改葬先として選べる？", a: "はい、改葬（お墓じまい）後の受け入れ先として非常に多く選ばれています。\n継承者がいなくても契約できるため、墓じまいの解決策として適しています。" }
                            ].map((item, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg p-5">
                                    <h4 className="font-bold text-primary mb-2 flex flex-row items-center">
                                        <span className="bg-secondary text-white text-xs font-bold px-2 py-1 rounded mr-3 flex-shrink-0">Q</span>
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
