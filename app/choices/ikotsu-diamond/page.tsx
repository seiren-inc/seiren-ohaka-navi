import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { Metadata } from "next";
import { CheckCircle, AlertCircle, HelpCircle, BookOpen, Info, Calculator, Search, Phone, Gem, Clock, FileText } from "lucide-react";

export const metadata: Metadata = {
    title: "遺骨ダイヤモンドとは｜費用・期間・注意点を中立に解説｜清蓮",
    description: "遺骨ダイヤモンドとは何か。遺骨から作る人工ダイヤモンドの仕組み、費用と製作期間の目安、注文前に確認すべき注意点を中立の立場で解説します。",
};

export default function IkotsuDiamondPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "お墓探しナビ", "item": "https://ohakanavi.jp/" },
                    { "@type": "ListItem", "position": 2, "name": "供養の選択肢", "item": "https://ohakanavi.jp/choices" },
                    { "@type": "ListItem", "position": 3, "name": "遺骨ダイヤモンド", "item": "https://ohakanavi.jp/choices/ikotsu-diamond" }
                ]
            },
            {
                "@type": "Article",
                "headline": "遺骨ダイヤモンドとは｜仕組みと判断ポイントを中立に整理",
                "description": "遺骨ダイヤモンドの仕組み、費用、製作における注意点について中立的な視点で解説します。",
                "author": { "@type": "Organization", "name": "清蓮" }
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "遺骨はどれくらい必要？",
                        "acceptedAnswer": { "@type": "Answer", "text": "製作するダイヤモンドのサイズ（カラット）によりますが、\n一般的には70g〜300g程度の遺骨（粉骨後の状態）が必要とされています。\n全量ではなく、一部のみを使用することがほとんどです。" }
                    },
                    {
                        "@type": "Question",
                        "name": "製作期間はどれくらい？",
                        "acceptedAnswer": { "@type": "Answer", "text": "海外の施設で生成・加工を行うケースが多いため、\n申し込みから完成まで、平均して6ヶ月〜1年程度の期間を要します。" }
                    },
                    {
                        "@type": "Question",
                        "name": "証明書はつく？",
                        "acceptedAnswer": { "@type": "Answer", "text": "信頼できるメーカーであれば、成分分析表や生成証明書、\nGIA（米国宝石学会）などの第三者機関による鑑定書が付帯します。" }
                    },
                    {
                        "@type": "Question",
                        "name": "途中キャンセルはできる？",
                        "acceptedAnswer": { "@type": "Answer", "text": "工程が進んでしまうと基本的にキャンセルはできません。\n特に炭素抽出の工程に入った後は不可となるケースが大半ですので、\n契約時の約款確認が非常に重要です。" }
                    },
                    {
                        "@type": "Question",
                        "name": "分骨して作れる？",
                        "acceptedAnswer": { "@type": "Answer", "text": "可能です。\n遺骨の一部を使ってダイヤモンドを作り、\n残りを散骨や納骨にするという組み合わせが多く選ばれています。" }
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

                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Cremation Diamond
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6 leading-relaxed">
                            遺骨ダイヤモンドとは<br />
                            <span className="text-lg md:text-2xl mt-2 block opacity-80">仕組みと判断ポイントを中立に整理</span>
                        </h1>

                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 text-left max-w-3xl mx-auto mt-8">
                            <p className="text-gray-700 leading-loose">
                                故人の遺骨から人工ダイヤモンドを作る「遺骨ダイヤモンド」。<br />
                                手元供養の一つとして、近年認知度が高まってきました。<br />
                                <br />
                                「いつもそばに感じていたい」という強い想いを形にできる一方で、<br />
                                決して安価ではなく、製作期間もかかる大きな決断となります。<br />
                                <br />
                                美しさや感情的な価値だけでなく、<br />
                                依頼前に必ず確認しておくべきリスクや実務的なポイントを、<br />
                                中立的な視点で整理しました。
                            </p>
                        </div>
                    </div>

                    {/* H2: 遺骨ダイヤモンドとは何か */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Gem className="w-6 h-6 mr-3 text-secondary" />
                            遺骨ダイヤモンドとは何か
                        </h2>
                        <div className="prose max-w-none text-gray-600 leading-loose">
                            <p className="mb-6">
                                遺骨ダイヤモンド（メモリアルダイヤモンド）とは、<br />
                                遺骨に含まれる「炭素」成分を抽出し、人工的に高温高圧にかけることで生成した合成ダイヤモンドです。<br />
                                <br />
                                物理的な組成や硬度は天然ダイヤモンドと同じであり、<br />
                                宝飾品としての輝きを持ちます。<br />
                                <br />
                                遺骨そのものを変質させて再結晶化するため、<br />
                                「究極の形見」あるいは「最も美しい自宅供養の形」として捉えられています。
                            </p>
                        </div>
                    </section>

                    {/* H2: 遺骨ダイヤモンドが向きやすいケース */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-3 text-secondary" />
                            遺骨ダイヤモンドが向きやすいケース
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-primary mb-2">手元で故人を感じたい</h3>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        ただ骨壺を置くのではなく、美しく昇華された形で手元に残したい。<br />
                                        いつでも触れられるアクセサリーとして身につけたい。<br />
                                        そうした「つながり」を強く求める方に選ばれています。
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary mb-2">形として残したい</h3>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        散骨などで遺骨がなくなってしまうのは寂しいが、<br />
                                        骨壺のままでは抵抗があるという場合に、<br />
                                        「宝石」という永続的な形に変えて残すことができます。
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary mb-2">お墓を持たない供養と相性が良い</h3>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        お墓を継承する人がいない場合でも、<br />
                                        ダイヤモンドであれば場所を取らず、<br />
                                        子供や孫へ「形見」として負担なく引き継ぐことが可能です。
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary mb-2">分骨して家族で持つ</h3>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        一つの遺骨から複数のダイヤモンド（またはジュエリー）を作ることで、<br />
                                        離れて暮らす家族それぞれが、故人を分かち合うことができます。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* H2: 費用と期間の考え方 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Clock className="w-6 h-6 mr-3 text-secondary" />
                            費用と期間の考え方
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-xl p-8">
                            <p className="text-gray-600 leading-loose mb-6">
                                高度な技術を用いるため、決して安い買い物ではありません。<br />
                                メーカーや希望するスペックによって費用と期間は変動します。
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="font-bold text-primary-dark mb-4 flex items-center">
                                        <Calculator className="w-5 h-5 mr-2" />
                                        費用の目安：30万円 〜 200万円以上
                                    </h3>
                                    <ul className="list-disc list-inside text-sm text-gray-600 leading-loose">
                                        <li><span className="font-bold">カラット（大きさ）</span>: 大きくなるほど高額になります（0.2ct〜1.0ct超）。</li>
                                        <li><span className="font-bold">カラー</span>: 無色透明やブルー、イエローなど、色によって精製難易度・価格が変わります。</li>
                                        <li><span className="font-bold">カット</span>: ラウンドブリリアントカットなどが一般的ですが、特殊カットは追加費用がかかる場合があります。</li>
                                        <li><span className="font-bold">ジュエリー加工</span>: 裸石（ルース）のままか、リングやペンダントに加工するかで費用が変わります。</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="font-bold text-primary-dark mb-4 flex items-center">
                                        <Clock className="w-5 h-5 mr-2" />
                                        期間の目安：6ヶ月 〜 1年
                                    </h3>
                                    <ul className="list-disc list-inside text-sm text-gray-600 leading-loose">
                                        <li>遺骨の受け取り、炭素抽出、生成、研磨、鑑定という多くの工程を経ます。</li>
                                        <li>多くのメーカーは海外（スイスやアメリカ等）に製造拠点を持っているため、輸送の時間も含まれます。</li>
                                        <li>急ぎで手元に欲しい場合には不向きな選択肢と言えます。</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* H2: 確認しておきたいポイント */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <FileText className="w-6 h-6 mr-3 text-secondary" />
                            注文前に確認しておきたいポイント
                        </h2>
                        <div className="space-y-6">
                            <div className="bg-white border-l-4 border-secondary p-6 shadow-sm">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">1. 必要な遺骨の量と、残った遺骨の扱い</h3>
                                <p className="text-gray-600 leading-loose text-sm">
                                    製作には一定量（数100g程度）の遺骨が必要です。<br />
                                    「全骨を使うのか」「一部だけ使うのか」を確認しましょう。<br />
                                    また、使用しなかった（炭素抽出後の）残余遺骨をどのように返却してくれるのかも重要な確認事項です。
                                </p>
                            </div>
                            <div className="bg-white border-l-4 border-secondary p-6 shadow-sm">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">2. 証明書とトレーサビリティ</h3>
                                <p className="text-gray-600 leading-loose text-sm">
                                    本当に故人の遺骨から作られたかを確認するために、<br />
                                    製造工程の管理体制（トレーサビリティ）が明確か、<br />
                                    GIAなどの権威ある機関の鑑定書が付くかを確認してください。
                                </p>
                            </div>
                            <div className="bg-white border-l-4 border-secondary p-6 shadow-sm">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">3. 保管と輸送の安全性</h3>
                                <p className="text-gray-600 leading-loose text-sm">
                                    大切な遺骨を海外へ送るケースが多いため、<br />
                                    輸送中の事故や紛失に対する補償や、<br />
                                    追跡可能な配送方法がとられているかを確認する必要があります。
                                </p>
                            </div>
                            <div className="bg-white border-l-4 border-secondary p-6 shadow-sm">
                                <h3 className="font-bold text-lg text-primary-dark mb-2">4. キャンセルポリシー</h3>
                                <p className="text-gray-600 leading-loose text-sm">
                                    オーダーメイド品であるため、製作開始後のキャンセルは基本的にできません。<br />
                                    どの時点までならキャンセル可能か、返金規定はどうなっているか、<br />
                                    契約書や約款を事前によく読み込みましょう。
                                </p>
                            </div>
                        </div>
                    </section>


                    {/* H2: メリットと注意点 */}
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
                                            お墓や納骨堂のような維持管理費がかからず、<br />
                                            場所にも縛られません。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-secondary mr-2">●</span>
                                        <span>
                                            美しい宝石として身につけることができ、<br />
                                            常に故人とのつながりを感じられます。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-secondary mr-2">●</span>
                                        <span>
                                            散骨や樹木葬など、<br />
                                            他の自然葬と組み合わせて行うのに適しています。
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
                                            一般的なお墓や樹木葬と比較しても、<br />
                                            費用が高額になる傾向があります。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">●</span>
                                        <span>
                                            完成までに長い時間がかかるため、<br />
                                            四十九日などの法要には間に合いません。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">●</span>
                                        <span>
                                            「遺骨を加工する」ことに対して抵抗感を持つ親族もいるため、<br />
                                            事前の理解と合意形成が必要です。
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* H2: 診断で遺骨ダイヤモンドが候補に出た方へ */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Calculator className="w-6 h-6 mr-3 text-secondary" />
                            診断で「遺骨ダイヤモンド」が候補に出た方へ
                        </h2>
                        <div className="bg-primary/5 p-8 rounded-xl">
                            <p className="text-gray-700 leading-loose mb-4">
                                <Link href="/choices/diagnosis" className="text-primary font-bold hover:underline">供養の選択肢診断</Link>で遺骨ダイヤモンドがおすすめされた場合、<br />
                                あなたは大切な方を亡くされた喪失感が強く、<br />
                                「何らかの形で手元に残したい」「離れたくない」という想いが強い可能性があります。
                            </p>
                            <p className="text-gray-700 leading-loose mb-0">
                                ダイヤモンドにすることは、悲しみを美しい思い出に変えるグリーフケア（心のケア）の一つでもあります。<br />
                                決して安い選択ではありませんが、<br />
                                「心の拠り所」としての価値は、金額だけでは測れないものかもしれません。
                            </p>
                        </div>
                    </section>

                    {/* H2: 迷った場合の次の行動 (CTA) */}
                    <section className="text-center">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-10 inline-block px-12">
                            迷った場合の次の行動
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            {/* Temoto Kuyou Hub */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-gray-100 rounded-full mb-3">
                                        <BookOpen className="w-8 h-8 text-gray-500" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">自宅供養全体を整理する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
                                    ダイヤモンド以外にも、骨箱やペンダントなど、<br />
                                    手元に残す方法は他にもあります。
                                </p>
                                <Link href="/choices/temoto-kuyou" className="w-full">
                                    <Button variant="primary" className="w-full font-bold">
                                        自宅供養の解説へ戻る
                                    </Button>
                                </Link>
                            </div>

                            {/* Choices */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-primary/10 rounded-full mb-3">
                                        <Search className="w-8 h-8 text-primary" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">他の供養方法も比較する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
                                    手元に残すだけでなく、<br />
                                    最終的な納骨先もあわせて検討したい方へ。
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
                                    ダイヤモンドの信頼できる業者は？など<br />
                                    個別のご質問にお答えします。<br />
                                    もちろん、無理に依頼する必要はありません。
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
                                { q: "遺骨はどれくらい必要？", a: "製作するダイヤモンドのサイズ（カラット）によりますが、\n一般的には70g〜300g程度の遺骨（粉骨後の状態）が必要とされています。\n全量ではなく、一部のみを使用することがほとんどです。" },
                                { q: "製作期間はどれくらい？", a: "海外の施設で生成・加工を行うケースが多いため、\n申し込みから完成まで、平均して6ヶ月〜1年程度の期間を要します。" },
                                { q: "証明書はつく？", a: "信頼できるメーカーであれば、成分分析表や生成証明書、\nGIA（米国宝石学会）などの第三者機関による鑑定書が付帯します。" },
                                { q: "途中キャンセルはできる？", a: "工程が進んでしまうと基本的にキャンセルはできません。\n特に炭素抽出の工程に入った後は不可となるケースが大半ですので、\n契約時の約款確認が非常に重要です。" },
                                { q: "分骨して作れる？", a: "可能です。\n遺骨の一部を使ってダイヤモンドを作り、\n残りを散骨や納骨にするという組み合わせが多く選ばれています。" }
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
