import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { Metadata } from "next";
import { CheckCircle, AlertCircle, HelpCircle, BookOpen, Info, Calculator, Search, Phone, ArrowRight, Building } from "lucide-react";

export const metadata: Metadata = {
    title: "納骨堂とは｜仕組み・費用・メリットを中立に解説｜清蓮",
    description: "納骨堂とは何か。屋内型の供養方法について、仕組みや費用の考え方、メリットと注意点を中立の立場で解説します。",
};

export default function NoukotsudouPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "BEYOND GRAVE", "item": "https://beyond-grave.com/" },
                    { "@type": "ListItem", "position": 2, "name": "Choices", "item": "https://beyond-grave.com/choices" },
                    { "@type": "ListItem", "position": 3, "name": "納骨堂", "item": "https://beyond-grave.com/choices/noukotsudou" }
                ]
            },
            {
                "@type": "Article",
                "headline": "納骨堂とは｜屋内型の供養方法を中立に解説",
                "description": "納骨堂の仕組み、費用、メリット・デメリットについて中立的な視点で解説します。",
                "author": { "@type": "Organization", "name": "清蓮" }
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "納骨堂は永代供養になる？",
                        "acceptedAnswer": { "@type": "Answer", "text": "多くの施設で、契約期間終了後の「永代供養（合祀）」がセットになっています。\nただし、家族代々承継できるタイプもあるため、契約形態の確認は必須です。" }
                    },
                    {
                        "@type": "Question",
                        "name": "管理費は毎年かかる？",
                        "acceptedAnswer": { "@type": "Answer", "text": "はい、多くの納骨堂では年間管理費がかかります。\n建物の維持管理や空調、セキュリティ費用に充てられます。" }
                    },
                    {
                        "@type": "Question",
                        "name": "契約期間が終わった後は？",
                        "acceptedAnswer": { "@type": "Answer", "text": "一般的には、施設内の永代供養墓（合祀墓）へ遺骨が移されます。\n期限が来ても更新できる場合や、最初から永代使用できるプランもあります。" }
                    },
                    {
                        "@type": "Question",
                        "name": "宗教宗派の制限はある？",
                        "acceptedAnswer": { "@type": "Answer", "text": "「宗教不問」の施設が増えていますが、寺院の中にある納骨堂の場合、\n在来仏教のみ可、あるいは檀家になることが条件の場合もあります。" }
                    },
                    {
                        "@type": "Question",
                        "name": "家族で参拝できる？",
                        "acceptedAnswer": { "@type": "Answer", "text": "もちろん可能です。\nただし、自動搬送型などは参拝ブースの数に限りがあるため、\nお盆やお彼岸などの混雑時には予約や待ち時間が必要なことがあります。" }
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
                            Ossuary / Charnel House
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-seiren-navy mb-6 leading-relaxed">
                            納骨堂とは<br />
                            <span className="text-lg md:text-2xl mt-2 block opacity-80">屋内型の供養方法を中立に解説</span>
                        </h1>

                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 text-left max-w-3xl mx-auto mt-8">
                            <p className="text-gray-700 leading-loose">
                                天候を気にせずにお参りができ、駅に近い立地も多い「納骨堂」。<br />
                                都市部を中心に、現実的な選択肢として定着してきました。<br />
                                <br />
                                便利で快適なイメージが強い一方で、<br />
                                「思ったより費用がかさんだ」「建物の老朽化が気になる」など、<br />
                                利便性だけで決めてしまうと後悔するケースもゼロではありません。<br />
                                <br />
                                このページでは、納骨堂の仕組みや種類、<br />
                                メリットと注意点を冷静に比較できるよう整理しました。
                            </p>
                        </div>
                    </div>

                    {/* H2: 納骨堂とは何か */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-8 flex items-center">
                            <Building className="w-6 h-6 mr-3 text-secondary" />
                            納骨堂とは何か
                        </h2>
                        <div className="prose max-w-none text-gray-600 leading-loose">
                            <p className="mb-6">
                                納骨堂（のうこつどう）とは、<br />
                                建物の中に設けられた棚やスペースに遺骨を収蔵する施設のことです。<br />
                                <br />
                                もともとは「お墓が建つまでの一時的な保管場所」でしたが、<br />
                                現在では恒久的な供養の場として利用されています。<br />
                                <br />
                                形式としては「永代供養」の一種として扱われることが多く、<br />
                                一定期間後に合祀されるプランが一般的ですが、<br />
                                代々継承して使い続けられるタイプも存在します。
                            </p>
                        </div>
                    </section>

                    {/* H2: 納骨堂が選ばれる理由 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-8 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-3 text-secondary" />
                            納骨堂が選ばれる理由
                        </h2>
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-seiren-navy mb-3">参拝環境の快適さ</h4>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        屋内にあるため、雨風や暑さ寒さを気にする必要がありません。<br />
                                        ご高齢の方でも身体的な負担が少なく、<br />
                                        気軽に会いに行ける点が支持されています。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-seiren-navy mb-3">アクセスの良い立地</h4>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        多くの納骨堂は駅の近くや市街地に建設されています。<br />
                                        「思い立った時にすぐ行ける」距離感は、<br />
                                        供養を続ける上で重要なポイントです。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-seiren-navy mb-3">管理の手間が少ない</h4>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        墓石の掃除や草むしりをする必要がありません。<br />
                                        掃除用具を持っていく必要もなく、<br />
                                        手ぶらでお参りできる利便性があります。
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-seiren-navy mb-3">継承の柔軟性</h4>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        後継ぎ不要のプランから、家族で使えるプランまで幅広く、<br />
                                        「子供に負担をかけたくない」<br />
                                        「でも自分たちだけの場所は欲しい」という両方のニーズに応えます。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* H2: 納骨堂の主な種類 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-8 flex items-center">
                            <Info className="w-6 h-6 mr-3 text-secondary" />
                            納骨堂の主な種類
                        </h2>
                        <div className="space-y-8">
                            <div className="border-l-4 border-secondary pl-6 py-2">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">1. 自動搬送型（マンション型）</h3>
                                <p className="text-gray-600 leading-loose mb-3">
                                    ICカードをかざすと、バックヤードから参拝ブースまで<br />
                                    遺骨が自動で運ばれてくる最新式のタイプです。<br />
                                    都心部のビル型納骨堂に多く、セキュリティ面でも安心感があります。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人：利便性と設備の綺麗さを最優先する方</p>
                            </div>

                            <div className="border-l-4 border-secondary pl-6 py-2">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">2. ロッカー型</h3>
                                <p className="text-gray-600 leading-loose mb-3">
                                    コインロッカーのような扉付きの棚に遺骨を収めるタイプです。<br />
                                    シンプルで無駄のない造りになっており、<br />
                                    納骨堂の中では比較的費用を抑えやすい形式です。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人：費用を抑えつつ、個別のスペースを確保したい方</p>
                            </div>

                            <div className="border-l-4 border-secondary pl-6 py-2">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">3. 仏壇型</h3>
                                <p className="text-gray-600 leading-loose mb-3">
                                    上段に仏壇（位牌などを置くスペース）、下段に遺骨を納めるスペースがあるタイプです。<br />
                                    屋内にありながら、家のお仏壇や一般墓に近い感覚で<br />
                                    家族ごとにお参りができます。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人：伝統的な供養の形も大切にしたい方</p>
                            </div>
                        </div>
                    </section>

                    {/* H2: 費用の考え方 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-8 flex items-center">
                            <Calculator className="w-6 h-6 mr-3 text-secondary" />
                            費用の考え方
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-xl p-8">
                            <p className="text-gray-600 leading-loose mb-6">
                                納骨堂の費用は、建物の立地や設備のグレードによって大きく変動します。<br />
                                一般的なお墓より安い傾向にありますが、高級な施設では同等以上になることもあります。
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gray-50 p-4 rounded text-center">
                                    <span className="block text-sm font-bold text-gray-500 mb-2">ロッカー型</span>
                                    <span className="block text-xl font-bold text-primary-dark">20万円 〜 80万円</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded text-center">
                                    <span className="block text-sm font-bold text-gray-500 mb-2">自動搬送型</span>
                                    <span className="block text-xl font-bold text-primary-dark">50万円 〜 150万円</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded text-center">
                                    <span className="block text-sm font-bold text-gray-500 mb-2">仏壇型</span>
                                    <span className="block text-xl font-bold text-primary-dark">100万円 〜 250万円</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-seiren-navy">費用のポイント</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 leading-loose">
                                    <li>初期費用のほかに、年間管理費（1〜3万円程度）がかかるのが一般的です。</li>
                                    <li>契約期間（33年など）が終了した後は、追加費用なしで合祀されることが多いですが確認が必要です。</li>
                                    <li>夫婦や家族で入る場合、追加の登録料がかかることがあります。</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* H2: 納骨堂のメリットと注意点 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-8 flex items-center">
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
                                            天候や季節に関わらず、<br />
                                            いつでも快適にお参りできます。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-secondary mr-2">●</span>
                                        <span>
                                            セキュリティがしっかりしており、<br />
                                            防犯面や荒らされる心配がありません。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-secondary mr-2">●</span>
                                        <span>
                                            都市部に多く、仕事帰りや買い物のついでなど、<br />
                                            生活圏内で供養を続けることができます。
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
                                            建物の老朽化や、運営母体の経営状況など、<br />
                                            「施設そのもの」の存続リスクを考える必要があります。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">●</span>
                                        <span>
                                            お盆やお彼岸などの混雑時には、<br />
                                            参拝ブースの利用に待ち時間が発生することがあります。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">●</span>
                                        <span>
                                            線香やロウソクなど、火気の使用が制限されている施設が多く、<br />
                                            従来通りのお参りができない場合があります。
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* H2: 他の供養方法との違い */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-8 flex items-center">
                            <Search className="w-6 h-6 mr-3 text-secondary" />
                            他の供養方法との違い
                        </h2>
                        <p className="text-gray-600 leading-loose mb-6">
                            納骨堂は「利便性」が最大の特徴ですが、<br />
                            他の選択肢と比較する際は「供養に求めるもの」を明確にすることが大切です。
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-seiren-navy mb-2">永代供養墓（屋外）との違い</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    <Link href="/choices/eitai-kuyou" className="text-primary font-bold hover:underline">永代供養墓</Link>は屋外にあるため、空の下で開放的にお参りできます。<br />
                                    「土や自然の近くが良い」か「空調の効いた快適な室内が良い」か、<br />
                                    環境の好みが大きな判断基準となります。
                                </p>
                            </div>
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-seiren-navy mb-2">樹木葬との違い</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    <Link href="/choices/jumokusou" className="text-primary font-bold hover:underline">樹木葬</Link>は自然に還ることを主眼としていますが、<br />
                                    納骨堂は「遺骨をしっかり守る・保管する」場所です。<br />
                                    骨壺のまま綺麗に残したい場合は納骨堂が適しています。
                                </p>
                            </div>
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-seiren-navy mb-2">海洋散骨・自宅供養との違い</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    <Link href="/choices/ctas" className="text-primary font-bold hover:underline">海洋散骨</Link>や<Link href="/choices/temoto-kuyou" className="text-primary font-bold hover:underline">自宅供養</Link>は、遺骨を「施設に預けない」方法です。<br />
                                    「どこかに出向いてお参りする場所」が必要かどうか、<br />
                                    という点が根本的な違いとなります。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* H2: 診断で納骨堂が候補に出た方へ */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-8 flex items-center">
                            <Calculator className="w-6 h-6 mr-3 text-secondary" />
                            診断で「納骨堂」が候補に出た方へ
                        </h2>
                        <div className="bg-primary/5 p-8 rounded-xl">
                            <p className="text-gray-700 leading-loose mb-4">
                                <Link href="/choices/diagnosis" className="text-primary font-bold hover:underline">供養の選択肢診断</Link>で納骨堂がおすすめされた場合、<br />
                                あなたは「アクセスの良さ」や「管理の手軽さ」を<br />
                                重視されている可能性が高いです。
                            </p>
                            <p className="text-gray-700 leading-loose mb-0">
                                納骨堂は現代のライフスタイルに非常にマッチした選択肢ですが、<br />
                                一方で「機械的な感じがして寂しい」と感じる方もいらっしゃいます。<br />
                                <br />
                                文字情報だけでなく、実際に施設を見学し、<br />
                                「ここなら落ち着いて故人と向き合えるか」を肌で感じてみてください。
                            </p>
                        </div>
                    </section>

                    {/* H2: 迷った場合の次の行動 (CTA) */}
                    <section className="text-center">
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-10 inline-block px-12">
                            迷った場合の次の行動
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            {/* Search */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-gray-100 rounded-full mb-3">
                                        <Search className="w-8 h-8 text-gray-500" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">納骨堂を探してみる</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
                                    ご希望のエリアや予算条件から、<br />
                                    実際の納骨堂を検索できます。
                                </p>
                                <Link href="/search?type=ossuary" className="w-full">
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
                                    やっぱり自然の近くがいいかも？など<br />
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
                                <p className="text-sm text-gray-500 text-center mb-6 flex-grow">
                                    決めきれなくて全く問題ありません。<br />
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
                        <h2 className="font-serif text-2xl font-bold text-seiren-navy border-b pb-4 mb-8 flex items-center">
                            <HelpCircle className="w-6 h-6 mr-3 text-secondary" />
                            よくある質問（FAQ）
                        </h2>
                        <div className="space-y-6">
                            {[
                                { q: "納骨堂は永代供養になる？", a: "多くの施設で、契約期間終了後の「永代供養（合祀）」がセットになっています。\nただし、家族代々承継できるタイプもあるため、契約形態の確認は必須です。" },
                                { q: "管理費は毎年かかる？", a: "はい、多くの納骨堂では年間管理費がかかります。\n建物の維持管理や空調、セキュリティ費用に充てられます。" },
                                { q: "契約期間が終わった後は？", a: "一般的には、施設内の永代供養墓（合祀墓）へ遺骨が移されます。\n期限が来ても更新できる場合や、最初から永代使用できるプランもあります。" },
                                { q: "宗教宗派の制限はある？", a: "「宗教不問」の施設が増えていますが、寺院の中にある納骨堂の場合、\n在来仏教のみ可、あるいは檀家になることが条件の場合もあります。" },
                                { q: "家族で参拝できる？", a: "もちろん可能です。\nただし、自動搬送型などは参拝ブースの数に限りがあるため、\nお盆やお彼岸などの混雑時には予約や待ち時間が必要なことがあります。" }
                            ].map((item, i) => (
                                <div key={i} className="bg-gray-50 rounded-lg p-5">
                                    <h4 className="font-bold text-seiren-navy mb-2 flex flex-row items-center">
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
