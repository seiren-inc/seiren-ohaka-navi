import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { Metadata } from "next";
import { ArrowRight, CheckCircle, AlertCircle, HelpCircle, BookOpen, Info, Calculator, Search, Phone } from "lucide-react";
import { SeoSummary } from "../../components/ui/SeoSummary";

export const metadata: Metadata = {
    title: "お墓の基礎知識｜種類・費用・管理・選び方を中立に整理",
    description: "一般墓、永代供養墓、納骨堂、樹木葬、海洋散骨、自宅供養の違いを中立に解説。費用感、管理、継承、宗教、改葬の有無など迷いポイント別に判断基準を整理。診断チャートや無料相談への導線あり。",
};

export default function GuideGraveBasicsPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "お墓探しナビ", "item": "https://ohakanavi.jp/" },
                    { "@type": "ListItem", "position": 2, "name": "基礎知識", "item": "https://ohakanavi.jp/guide" },
                    { "@type": "ListItem", "position": 3, "name": "お墓の基礎知識", "item": "https://ohakanavi.jp/guide/grave-basics" }
                ]
            },
            {
                "@type": "Article",
                "headline": "お墓の基礎知識｜種類・費用・管理・選び方を解説",
                "description": "多様化するお墓の種類や選び方、費用について中立的な立場で解説します。",
                "author": { "@type": "Organization", "name": "清蓮" }
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "お墓の種類にはどのようなものがありますか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "大きく分けて「一般墓」「永代供養墓」「納骨堂」「樹木葬」「海洋散骨」「自宅供養（手元供養）」の6つの種類があります。供養の場所や管理形態によって異なります。" }
                    },
                    {
                        "@type": "Question",
                        "name": "永代供養墓と納骨堂の違いは何ですか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "永代供養墓は「供養の契約形態（管理を委託する）」を指すことが多く、屋外の合祀墓などを指す場合もあります。納骨堂は「屋内の建物の中に遺骨を収蔵する施設」を指し、その多くは永代供養の契約が付いています。" }
                    },
                    {
                        "@type": "Question",
                        "name": "子供に負担をかけたくない場合、どのお墓が良いですか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "承継（お墓の継承）が不要な「永代供養墓」「樹木葬」「海洋散骨」などが適しています。これらは管理を霊園などに任せるか、お墓自体を持たないため、将来の管理負担がありません。" }
                    },
                    {
                        "@type": "Question",
                        "name": "樹木葬は誰でも入れますか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "基本的には宗旨宗派不問のところが多いですが、寺院が運営している場合など、一部条件がある場合もあります。事前に確認が必要です。" }
                    },
                    {
                        "@type": "Question",
                        "name": "お墓の管理費とは何ですか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "霊園や寺院の共用部分（通路、水場、休憩所など）の清掃・維持管理に使われる費用です。一般墓や納骨堂では毎年支払うことが多いですが、永代供養墓では初期費用に含まれ、後々の支払いが不要なケースもあります。" }
                    },
                    {
                        "@type": "Question",
                        "name": "改葬（お墓じまい）とは何ですか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "すでにあるお墓を撤去し、遺骨を新しい供養先（永代供養墓や樹木葬など）に移すことです。行政手続きが必要になります。" }
                    },
                    {
                        "@type": "Question",
                        "name": "海洋散骨は誰でも自由にできますか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "法律で明確に禁止されているわけではありませんが、節度を持って行う必要があります。通常は専門業者に依頼し、粉骨処理を行った上で、適切な海域で行います。" }
                    },
                    {
                        "@type": "Question",
                        "name": "自宅供養（手元供養）は宗教的に問題ないですか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "問題ありません。仏教などの教義でも、お墓に納めなければならないという厳格な決まりはなく、故人を身近に感じたいという気持ちを優先する方法として広まっています。" }
                    },
                    {
                        "@type": "Question",
                        "name": "生前にお墓を購入することはできますか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "はい、可能です。「寿陵（じゅりょう）」と呼ばれ、長寿を願う縁起の良いこととされています。自分で納得のいく場所を選べるメリットがあります。" }
                    },
                    {
                        "@type": "Question",
                        "name": "遺骨の一部だけをお墓に入れ、残りを散骨することは可能ですか？",
                        "acceptedAnswer": { "@type": "Answer", "text": "可能です。「分骨（ぶんこつ）」といいます。火葬証明書や分骨証明書が必要になる場合があるため、事前に計画しておくのがスムーズです。" }
                    }
                ]
            }
        ]
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Navbar />

            <main className="grow pt-24 px-4 pb-20">
                <div className="max-w-4xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Grave Basics
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6 leading-relaxed">
                            お墓の基礎知識<br />
                            <span className="text-lg md:text-2xl mt-2 block opacity-80">（種類・費用・管理・選び方）</span>
                        </h1>
                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 text-left max-w-3xl mx-auto">
                            <p className="text-gray-700 leading-loose">
                                お墓選びで多くの方が迷うのは<strong>「場所」「管理」「継承」「費用感」</strong>の4つのポイントです。
                                供養の形には現在、一般墓から樹木葬、散骨まで複数の選択肢があり、正解はご家族の状況によって変わります。
                                このページでは、6つの主な供養方法の特徴と判断基準を中立に整理しました。
                                基礎を知った上で、<Link href="/choices/diagnosis" className="text-primary font-bold hover:underline">診断チャート</Link>や<Link href="/consult" className="text-primary font-bold hover:underline">専門家への相談</Link>を活用し、納得のいく選択につなげてください。
                            </p>
                        </div>
                    </div>

                    {/* H2: お墓とは何か */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <BookOpen className="w-6 h-6 mr-3 text-secondary" />
                            お墓とは何か（定義と役割）
                        </h2>
                        <div className="prose max-w-none text-gray-600 leading-loose">
                            <p className="mb-4">
                                お墓は、亡くなった方の遺骨を物理的に納める場所であると同時に、残された家族が手を合わせ、故人とのつながりを確認するための「精神的な拠り所」です。
                            </p>
                            <p>
                                以前は「先祖代々の土地に石塔を建てる」のが常識でしたが、核家族化や少子化に伴い、「お墓を持たない」という選択や、
                                「自然に還る」「自宅でともに過ごす」といった新しい供養の形も一般的になってきました。
                                法律上、遺骨は許可された場所（墓地・納骨堂）以外に埋めることはできませんが、
                                「埋めずに撒く（散骨）」や「自宅で保管する（手元供養）」ことは認められています。
                            </p>
                        </div>
                    </section>

                    {/* H2: 供養の主な選択肢 (6 Types) */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Info className="w-6 h-6 mr-3 text-secondary" />
                            供養の主な選択肢（6つのタイプ）
                        </h2>
                        <p className="mb-8 text-gray-600">
                            現在、主に選ばれている供養方法は以下の6系統です。
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                            {/* 一般墓 */}
                            <div>
                                <h3 className="font-bold text-xl text-primary mb-3 flex items-center">1. 一般墓（石のお墓）</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                    区画された墓地に石碑を建てる、最も伝統的なスタイルです。代々の遺骨を同じカロート（納骨室）に納め、家族で継承します。
                                    親族が集まる場所として馴染みがありますが、墓石代がかかるため初期費用は高めです。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人: 家族の絆を形に残したい、伝統を大切にしたい</p>
                            </div>

                            {/* 永代供養墓 */}
                            <div>
                                <h3 className="font-bold text-xl text-primary mb-3 flex items-center">2. 永代供養墓</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                    寺院や霊園が家族に代わって管理・供養を行うお墓です。継承者がいなくても無縁仏になる心配がありません。
                                    最初から他の方と一緒に眠る「合祀（ごうし）」タイプと、一定期間個別に安置するタイプがあります。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人: 子供に負担をかけたくない、費用を抑えたい</p>
                                <div className="mt-1"><Link href="/choices/eitai-kuyou" className="text-xs text-gray-400 hover:text-primary hover:underline">詳しく見る →</Link></div>
                            </div>

                            {/* 納骨堂 */}
                            <div>
                                <h3 className="font-bold text-xl text-primary mb-3 flex items-center">3. 納骨堂</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                    屋内の専用スペースに遺骨を収蔵する施設です。ロッカー式、仏壇式、自動搬送式などがあります。
                                    天候に左右されずお参りでき、駅近でアクセスが良い場所が多いのが特徴です。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人: 利便性を重視する、頻繁にお参りしたい、草むしりはしたくない</p>
                                <div className="mt-1"><Link href="/choices/noukotsudou" className="text-xs text-gray-400 hover:text-primary hover:underline">詳しく見る →</Link></div>
                            </div>

                            {/* 樹木葬 */}
                            <div>
                                <h3 className="font-bold text-xl text-primary mb-3 flex items-center">4. 樹木葬</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                    墓石の代わりに木や花をシンボルにするお墓です。自然の中に還るというコンセプトが人気で、都市部の霊園でも導入が進んでいます。
                                    永代供養がついているものが一般的で、継承の不安がありません。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人: 自然志向、明るい雰囲気で眠りたい</p>
                                <div className="mt-1"><Link href="/choices/jumokusou" className="text-xs text-gray-400 hover:text-primary hover:underline">詳しく見る →</Link></div>
                            </div>

                            {/* 海洋散骨 */}
                            <div>
                                <h3 className="font-bold text-xl text-primary mb-3 flex items-center">5. 海洋散骨</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                    粉末化した遺骨を海へ撒く供養方法です。お墓という「場所」を持たず、自然のサイクルに還ります。
                                    管理費がかからず、後継ぎの問題も発生しませんが、手元に何も残らないため、一部を分骨する方もいます。
                                </p>
                                <div className="mt-1"><Link href="/choices/sankotsu" className="text-xs text-gray-400 hover:text-primary hover:underline">詳しく見る →</Link></div>
                            </div>

                            {/* 自宅供養（手元供養） */}
                            <div>
                                <h3 className="font-bold text-xl text-primary mb-3 flex items-center">6. 自宅供養（手元供養）</h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                    遺骨を自宅で保管したり、アクセサリー加工して身につけたりする方法です。
                                    「骨箱」のまま安置するほか、インテリアに馴染む「ミニ骨壺」や、遺骨から作る「遺骨ダイヤモンド」などがあります。
                                </p>
                                <div className="mt-1"><Link href="/choices/temoto-kuyou" className="text-xs text-gray-400 hover:text-primary hover:underline">詳しく見る →</Link></div>
                            </div>
                        </div>
                    </section>

                    {/* H2: 比較表 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-3 text-secondary" />
                            迷いポイント別・比較一覧
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse min-w-[700px]">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th className="p-4 border border-primary">種類</th>
                                        <th className="p-4 border border-primary">参拝・場所</th>
                                        <th className="p-4 border border-primary">管理・継承</th>
                                        <th className="p-4 border border-primary">費用感（目安）</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white hover:bg-gray-50">
                                        <th className="p-4 border border-gray-200 font-bold text-primary">一般墓</th>
                                        <td className="p-4 border border-gray-200">屋外・墓石あり</td>
                                        <td className="p-4 border border-gray-200">家族で管理・継承が必要</td>
                                        <td className="p-4 border border-gray-200">100〜300万円</td>
                                    </tr>
                                    <tr className="bg-white hover:bg-gray-50">
                                        <th className="p-4 border border-gray-200 font-bold text-primary">永代供養墓</th>
                                        <td className="p-4 border border-gray-200">屋外・共有塔など</td>
                                        <td className="p-4 border border-gray-200 text-secondary font-bold">不要（霊園が管理）</td>
                                        <td className="p-4 border border-gray-200 font-bold">10〜150万円</td>
                                    </tr>
                                    <tr className="bg-white hover:bg-gray-50">
                                        <th className="p-4 border border-gray-200 font-bold text-primary">納骨堂</th>
                                        <td className="p-4 border border-gray-200">屋内・天候不問</td>
                                        <td className="p-4 border border-gray-200">不要（期間の定めあり）</td>
                                        <td className="p-4 border border-gray-200">50〜200万円</td>
                                    </tr>
                                    <tr className="bg-white hover:bg-gray-50">
                                        <th className="p-4 border border-gray-200 font-bold text-primary">樹木葬</th>
                                        <td className="p-4 border border-gray-200">自然・花や木</td>
                                        <td className="p-4 border border-gray-200 text-secondary font-bold">不要（霊園が管理）</td>
                                        <td className="p-4 border border-gray-200 font-bold">30〜150万円</td>
                                    </tr>
                                    <tr className="bg-white hover:bg-gray-50">
                                        <th className="p-4 border border-gray-200 font-bold text-primary">海洋散骨</th>
                                        <td className="p-4 border border-gray-200">海（場所なし）</td>
                                        <td className="p-4 border border-gray-200 text-secondary font-bold">一切不要</td>
                                        <td className="p-4 border border-gray-200 font-bold">5〜30万円</td>
                                    </tr>
                                    <tr className="bg-white hover:bg-gray-50">
                                        <th className="p-4 border border-gray-200 font-bold text-primary">自宅供養</th>
                                        <td className="p-4 border border-gray-200">自宅</td>
                                        <td className="p-4 border border-gray-200">自己管理</td>
                                        <td className="p-4 border border-gray-200 font-bold">数千円〜（商品による）</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-right">※費用は一般的な目安であり、地域や施設により大きく異なります。</p>
                    </section>

                    {/* H2: 選び方（判断基準） */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-3 text-secondary" />
                            あなたの状況に合わせた選び方
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="font-bold text-lg text-primary-dark mb-2">後継ぎがいない場合</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    将来お墓を管理する人がいない場合は、<strong>「永代供養」が付いているお墓</strong>を選びましょう。
                                    永代供養墓、樹木葬、納骨堂のいずれにも対応プランがあります。また、お墓を残さない海洋散骨も有力な選択肢です。
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-primary-dark mb-2">管理の手間を減らしたい場合</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    草むしりや墓石の掃除をしたくない場合は、屋内にある<strong>納骨堂</strong>や、霊園側が植栽管理を行う<strong>樹木葬</strong>がおすすめです。
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-primary-dark mb-2">遠方で通えない・改葬を検討している場合</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    実家のお墓が遠くて守れない場合は、「墓じまい（改葬）」を行って近くの納骨堂に移すか、海洋散骨などで墓じまいを完結させる方法があります。
                                    <br />
                                    <Link href="/guide/grave-closure" className="text-primary font-bold hover:underline">墓じまいについてはこちら</Link>で詳しく解説しています。
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-primary-dark mb-2">家族や親族の合意を優先したい場合</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    新しい供養方法は親族の理解が得られないこともあります。まずは<strong>一般墓</strong>をベースに検討するか、
                                    外観は従来のお墓に近くても永代供養がついているタイプを探すのが円満な解決策になりやすいです。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* H2: よくある質問（FAQ） */}
                    <section className="mb-24">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <HelpCircle className="w-6 h-6 mr-3 text-secondary" />
                            よくある質問（FAQ）
                        </h2>
                        <div className="space-y-6">
                            {[
                                { q: "お墓の種類は何がある？", a: "大きく分けて「一般墓」「永代供養墓」「納骨堂」「樹木葬」「海洋散骨」「自宅供養」の6種類があります。" },
                                { q: "永代供養と納骨堂の違いは？", a: "「永代供養」は管理を任せる契約形態のこと、「納骨堂」は屋内の建物のことです。多くの納骨堂には永代供養が付いています。" },
                                { q: "樹木葬は誰でも入れる？", a: "多くの樹木葬は宗旨宗派不問で利用できますが、一部寺院では檀家になる条件がある場合もあるため確認が必要です。" },
                                { q: "お墓の管理費は何の費用？", a: "霊園内の共用設備（水道、通路、休憩所など）の維持・清掃に使われる費用です。" },
                                { q: "改葬とは何をする？", a: "既存のお墓を撤去し、遺骨を新しい場所に移す手続きのことです。自治体への申請が必要です。" },
                                { q: "散骨は誰でもできる？", a: "法的な禁止規定はありませんが、トラブル防止のため専門業者に依頼し、粉骨して指定海域で行うのが一般的です。" },
                                { q: "自宅供養は宗教的に問題ない？", a: "問題ありません。故人を身近に感じたいという想いを尊重する供養の形として定着しています。" },
                                { q: "生前にお墓を買ってもいい？", a: "はい、可能です。「寿陵（じゅりょう）」といって縁起が良いとされ、相続税対策としても有効です。" },
                                { q: "複数の供養方法を併用できる？", a: "可能です。例えば遺骨の一部を散骨し、残りを手元供養にするといった「分骨」をされる方も多くいます。" }
                            ].map((item, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg p-5">
                                    <h4 className="font-bold text-primary mb-2 flex flex-row items-center">
                                        <span className="bg-secondary text-white text-xs font-bold px-2 py-1 rounded mr-3 shrink-0">Q</span>
                                        {item.q}
                                    </h4>
                                    <p className="text-sm text-gray-600 ml-10 leading-relaxed">
                                        {item.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTAs */}
                    <section className="text-center">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-10 inline-block px-12">
                            迷ったら次にできること
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            {/* Diagnosis */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-gray-100 rounded-full mb-3">
                                        <Calculator className="w-8 h-8 text-gray-500" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">供養方法を診断する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    予算や重視するポイントから、あなたに合うお墓のタイプを約1分で診断します。
                                </p>
                                <Link href="/choices/diagnosis" className="w-full">
                                    <Button variant="outline" className="w-full font-bold">
                                        診断チャートを試す
                                    </Button>
                                </Link>
                            </div>

                            {/* Search */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-primary/10 rounded-full mb-3">
                                        <Search className="w-8 h-8 text-primary" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">条件から探してみる</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    希望のエリアや予算などの条件から、実際の霊園・墓地を検索できます。
                                </p>
                                <Link href="/search" className="w-full">
                                    <Button variant="primary" className="w-full font-bold">
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
                                        <Phone className="w-8 h-8 text-secondary" />
                                    </span>
                                    <h3 className="font-bold text-lg text-secondary">専門家に相談する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    「自分の状況に合うものが分からない」という方は、専門家が無料でアドバイスします。
                                </p>
                                <Link href="/consult" className="w-full">
                                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white border-none font-bold">
                                        無料相談する
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* SEO Summary for AI/Search Engines */}
                    <div className="mt-20">
                        <SeoSummary
                            title="お墓の基礎知識（種類・費用・選び方）"
                            description="一般墓から永代供養墓、樹木葬、納骨堂、海洋散骨、自宅供養まで、現代の多様化する供養方法6種類について、それぞれの特徴や管理・継承の要否、費用感（目安）、後悔しない選び方を中立的に比較・解説したページです。"
                            regions={["全国対応"]}
                            priceRange="数千円（手元供養）〜300万円（一般墓）程度まで、選択により大きく異なります"
                            lastUpdated="2024-03-01"
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
