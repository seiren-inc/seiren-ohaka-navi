/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { Metadata } from "next";
import { CheckCircle, AlertCircle, HelpCircle, BookOpen, Info, Calculator, Search, Phone, Home, Gem, Box, HandHeart, Wallet, ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "自宅供養とは｜骨箱・手元供養・遺骨ダイヤモンドを中立に解説｜清蓮",
    description: "自宅供養とは何か。骨箱での自宅安置、遺骨ペンダントなどの手元供養、遺骨ダイヤモンドなど、手元に遺骨を残す供養方法を中立に解説します。",
};

export default function TemotoKuyouPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "清蓮（Seiren）", "item": "https://seiren-ohaka-navi.vercel.app" },
                    { "@type": "ListItem", "position": 2, "name": "Choices", "item": "https://seiren-ohaka-navi.vercel.app/choices" },
                    { "@type": "ListItem", "position": 3, "name": "自宅供養", "item": "https://seiren-ohaka-navi.vercel.app/choices/temoto-kuyou" }
                ]
            },
            {
                "@type": "Article",
                "headline": "自宅供養とは｜手元に遺骨を残す供養の考え方",
                "description": "自宅供養（手元供養）の仕組み、種類、メリット・デメリットについて中立的な視点で解説します。",
                "author": { "@type": "Organization", "name": "清蓮" }
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "自宅供養は法律的に問題ない？",
                        "acceptedAnswer": { "@type": "Answer", "text": "全く問題ありません。\n墓地や納骨堂以外に埋葬することは禁止されていますが、\n遺骨を自宅で「保管」すること自体は法律で規制されていません。" }
                    },
                    {
                        "@type": "Question",
                        "name": "ずっと自宅に置いてもいい？",
                        "acceptedAnswer": { "@type": "Answer", "text": "期限はありませんので、ご自身が納得するまで置いておけます。\nただし、ご自身が亡くなった後など、最終的にその遺骨をどう管理するかという\n「出口戦略」は考えておく必要があります。" }
                    },
                    {
                        "@type": "Question",
                        "name": "後から納骨できる？",
                        "acceptedAnswer": { "@type": "Answer", "text": "はい、いつでも可能です。\n埋葬許可証（火葬許可証）を大切に保管しておけば、\n時期が来た際にお墓や永代供養墓へ納骨することができます。" }
                    },
                    {
                        "@type": "Question",
                        "name": "分骨（ぶんこつ）は可能？",
                        "acceptedAnswer": { "@type": "Answer", "text": "可能です。\n火葬場であらかじめ分骨証明書をもらっておくか、\n後から一部を取り分けて手元に残すことができます。" }
                    },
                    {
                        "@type": "Question",
                        "name": "家族の同意は必要？",
                        "acceptedAnswer": { "@type": "Answer", "text": "同意を得ておくことが望ましいです。\n「遺骨は早くお墓に入れるべきだ」と考える親族がいる場合、\n説明不足が原因でトラブルになることがあります。" }
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
                    <div className="text-center mb-16">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Home Memorial
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6 leading-relaxed">
                            自宅供養とは<br />
                            <span className="text-lg md:text-2xl mt-2 block opacity-80">手元に遺骨を残す供養の考え方</span>
                        </h1>

                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 text-left max-w-3xl mx-auto mt-8">
                            <p className="text-gray-700 leading-loose">
                                最愛の人を亡くした後、<br />
                                「すぐに納骨して離れ離れになるのが辛い」<br />
                                「まだお墓のことを考えられない」<br />
                                と感じるのは、とても自然なことです。<br />
                                <br />
                                自宅供養（手元供養）は、そうした気持ちの整理がつくまで、<br />
                                あるいは故人をより身近に感じるために選ばれる供養の形です。<br />
                                <br />
                                一時的な選択としても、長期的な供養としても有効ですが、<br />
                                将来を見据えたときに知っておくべき点もあります。<br />
                                このページでは、自宅供養の考え方と具体的な方法を整理しました。
                            </p>
                        </div>
                    </div>

                    {/* H2: 自宅供養とは何か */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Home className="w-6 h-6 mr-3 text-secondary" />
                            自宅供養とは何か
                        </h2>
                        <div className="prose max-w-none text-gray-600 leading-loose">
                            <p className="mb-6">
                                自宅供養とは、遺骨をお墓や納骨堂ではなく、<br />
                                自宅などの身近な場所で保管・供養することを指します。<br />
                                法律的には「自宅での保管」は禁止されていないため、自由に行えます。<br />
                                <br />
                                全ての遺骨を自宅に置くケースと、<br />
                                納骨や散骨を行った上で、一部だけを手元に残す（分骨する）ケースがあります。<br />
                                <br />
                                恒久的な安置場所としてではなく、<br />
                                「気持ちの整理がつくまでの期間」や「自分が生きている間」<br />
                                という時間軸で捉えられることが多いのも特徴です。
                            </p>
                        </div>
                    </section>

                    {/* H2: 自宅供養が向きやすいケース */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-3 text-secondary" />
                            自宅供養が向きやすいケース
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <h3 className="font-bold text-primary mb-3">すぐに納骨先を決められない</h3>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        四十九日などの期限に追われて無理に決める必要はありません。<br />
                                        納得いくまで自宅でゆっくりと供養先を検討したい場合に適しています。
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary mb-3">気持ちの整理に時間が必要</h3>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        突然の別れで心の準備ができていない場合、<br />
                                        そばに置いて語りかける時間を持つことで、<br />
                                        少しずつ悲しみを癒していくことができます。
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary mb-3">将来別の供養を予定している</h3>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        いずれは散骨や永代供養を考えているが、<br />
                                        今はまだその時期ではないと判断した場合の<br />
                                        「現在の選択肢」として有効です。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* H2: 主な自宅供養の方法 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Info className="w-6 h-6 mr-3 text-secondary" />
                            主な自宅供養の方法
                        </h2>
                        <div className="space-y-8">
                            {/* 骨箱・自宅安置 */}
                            <div className="flex flex-col md:flex-row gap-6 bg-gray-50 p-6 rounded-xl">
                                <div className="shrink-0 flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm text-secondary">
                                    <Box className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary-dark mb-2">骨箱・自宅安置</h3>
                                    <p className="text-gray-600 leading-loose text-sm mb-4">
                                        火葬場から持ち帰った骨箱のまま、あるいは<br />
                                        デザイン性の高い「ミニ骨壺」などに移し替えて安置する方法です。<br />
                                        仏壇の中や、リビングの棚など、日常の風景に馴染む形で置く方が増えています。
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                        <div><span className="font-bold text-secondary">向いている人:</span> まだ納骨したくない、すべて手元に置きたい</div>
                                        <div><span className="font-bold text-gray-500">注意点:</span> 湿気によるカビ対策が必要</div>
                                    </div>
                                </div>
                            </div>

                            {/* 手元供養（分骨・アクセサリー等） */}
                            <div className="flex flex-col md:flex-row gap-6 bg-gray-50 p-6 rounded-xl">
                                <div className="shrink-0 flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm text-secondary">
                                    <HeartIcon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary-dark mb-2">手元供養（分骨・アクセサリー）</h3>
                                    <p className="text-gray-600 leading-loose text-sm mb-4">
                                        遺骨のごく一部をペンダントやリングに納めたり、<br />
                                        小さなケースに入れて持ち歩いたりする方法です。<br />
                                        「いつも一緒にいたい」という想いを、最も身近な形で叶えられます。
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                                        <div><span className="font-bold text-secondary">向いている人:</span> 肌身離さず持っていたい、納骨後も一部残したい</div>
                                        <div><span className="font-bold text-gray-500">注意点:</span> 小さいため紛失に注意</div>
                                    </div>
                                </div>
                            </div>

                            {/* 遺骨ダイヤモンド */}
                            <div className="flex flex-col md:flex-row gap-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                                <div className="shrink-0 flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm text-secondary">
                                    <Gem className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary-dark mb-2">遺骨ダイヤモンド</h3>
                                    <p className="text-gray-600 leading-loose text-sm mb-4">
                                        遺骨から炭素を抽出し、人工的に合成ダイヤモンドを生成する技術です。<br />
                                        美しい宝石として、世代を超えて受け継ぐことができます。<br />
                                        究極の形見（メモリアルダイヤモンド）として注目されています。
                                    </p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-3">
                                        <div><span className="font-bold text-secondary">向いている人:</span> 美しい形で残したい、形見として継承したい</div>
                                        <div><span className="font-bold text-gray-500">注意点:</span> 製作に時間と費用がかかる</div>
                                    </div>
                                    <Link href="/choices/ikotsu-diamond" className="text-primary font-bold text-sm hover:underline flex items-center">
                                        遺骨ダイヤモンドの詳細を見る <ArrowRight className="w-4 h-4 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* H2: 自宅供養のメリットと注意点 */}
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
                                            故人と離れずに済むため、<br />
                                            気持ちの整理を優先しながら、ゆっくりとお別れができます。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-secondary mr-2">●</span>
                                        <span>
                                            お墓の場所や費用に縛られず、<br />
                                            自分の生活環境に合わせて供養を続けられます。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-secondary mr-2">●</span>
                                        <span>
                                            他の供養方法（納骨や散骨）と併用しやすく、<br />
                                            柔軟な選択が可能です。
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
                                            ご自身が亡くなった後、その遺骨をどうするかという<br />
                                            将来の行き先を考えておく必要があります。<br />
                                            （残された家族が困らないようにするため）
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">●</span>
                                        <span>
                                            自宅での長期保管は、湿気によるカビのリスクがあるため、<br />
                                            定期的な確認や調湿が必要です。
                                        </span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-gray-400 mr-2">●</span>
                                        <span>
                                            「成仏できないのでは？」と心配する親族がいる場合、<br />
                                            丁寧に説明し、理解を得る必要があります。
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* H2: 他の供養方法との関係 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Search className="w-6 h-6 mr-3 text-secondary" />
                            他の供養方法との関係
                        </h2>
                        <p className="text-gray-600 leading-loose mb-6">
                            自宅供養は「単独で完結する」場合もあれば、<br />
                            「他の供養と組み合わせる」場合もあります。<br />
                            それぞれの関係性を整理します。
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-primary mb-2">海洋散骨との組み合わせ</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    <Link href="/choices/sankotsu" className="text-primary font-bold hover:underline">海洋散骨</Link>を行う方の多くが、遺骨の一部を手元に残す選択をされます。<br />
                                    「大部分は海へ還し、少しだけ手元で供養する」ことで、<br />
                                    寂しさを感じずに自然葬を行うことができます。
                                </p>
                            </div>
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-primary mb-2">永代供養・樹木葬・納骨堂へ移行する</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    ご自身の死後や、一定期間が経過した後に、<br />
                                    <Link href="/choices/eitai-kuyou" className="text-primary font-bold hover:underline">永代供養墓</Link>や<Link href="/choices/jumokusou" className="text-primary font-bold hover:underline">樹木葬</Link>、<Link href="/choices/noukotsudou" className="text-primary font-bold hover:underline">納骨堂</Link>へ納骨することも可能です。<br />
                                    自宅供養は「最終決定までの準備期間」としても機能します。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* H2: 診断で自宅供養が候補に出た方へ */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Calculator className="w-6 h-6 mr-3 text-secondary" />
                            診断で「自宅供養」が候補に出た方へ
                        </h2>
                        <div className="bg-primary/5 p-8 rounded-xl">
                            <p className="text-gray-700 leading-loose mb-4">
                                <Link href="/choices/diagnosis" className="text-primary font-bold hover:underline">供養の選択肢診断</Link>で自宅供養がおすすめされた場合、<br />
                                あなたは現在「まだ心を決めかねている」あるいは<br />
                                「形式よりも気持ちを最優先したい」という状態かもしれません。
                            </p>
                            <p className="text-gray-700 leading-loose mb-0">
                                診断はあくまで一つのきっかけです。<br />
                                自宅供養には期限がありません。<br />
                                焦って結論を出そうとせず、まずは手元に置いて<br />
                                ゆっくりと心の整理をしていくのが、今のあなたにとって最良の選択かもしれません。
                            </p>
                        </div>
                    </section>

                    {/* H2: 迷った場合の次の行動 (CTA) */}
                    <section className="text-center">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-10 inline-block px-12">
                            迷った場合の次の行動
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            {/* Search (Other choices) */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-primary/10 rounded-full mb-3">
                                        <BookOpen className="w-8 h-8 text-primary" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">他の供養方法も比較する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    いずれは納骨も考えておきたい。<br />
                                    どのような選択肢があるのか改めて確認する方へ。
                                </p>
                                <Link href="/choices" className="w-full">
                                    <Button variant="outline" className="w-full font-bold">
                                        選択肢一覧に戻る
                                    </Button>
                                </Link>
                            </div>

                            {/* Search (Search) */}
                            <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-gray-100 rounded-full mb-3">
                                        <Search className="w-8 h-8 text-gray-500" />
                                    </span>
                                    <h3 className="font-bold text-lg text-primary-dark">納骨先（出口）を探しておく</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    将来のために、どのような霊園やお墓があるのか、<br />
                                    近隣の情報を調べておきたい方へ。
                                </p>
                                <Link href="/search" className="w-full">
                                    <Button variant="primary" className="w-full font-bold">
                                        お墓を探す
                                    </Button>
                                </Link>
                            </div>

                            {/* Consult */}
                            <div className="flex flex-col bg-secondary/5 border border-secondary/20 rounded-xl p-6 hover:shadow-lg transition-shadow relative overflow-hidden group">
                                <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-bl">
                                    相談無料
                                </div>
                                <div className="mb-4 text-center">
                                    <span className="inline-block p-3 bg-white rounded-full mb-3 shadow-sm group-hover:scale-110 transition-transform">
                                        <Phone className="w-8 h-8 text-secondary" />
                                    </span>
                                    <h3 className="font-bold text-lg text-secondary">状況を整理して相談する</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    「とりあえず自宅に置いているが、これでいいのか不安」<br />
                                    という方は、専門家にご相談ください。
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
                                { q: "自宅供養は法律的に問題ない？", a: "全く問題ありません。\n墓地や納骨堂以外に埋葬することは禁止されていますが、\n遺骨を自宅で「保管」すること自体は法律で規制されていません。" },
                                { q: "ずっと自宅に置いてもいい？", a: "期限はありませんので、ご自身が納得するまで置いておけます。\nただし、ご自身が亡くなった後など、最終的にその遺骨をどう管理するかという\n「出口戦略」は考えておく必要があります。" },
                                { q: "後から納骨できる？", a: "はい、いつでも可能です。\n埋葬許可証（火葬許可証）を大切に保管しておけば、\n時期が来た際にお墓や永代供養墓へ納骨することができます。" },
                                { q: "分骨（ぶんこつ）は可能？", a: "可能です。\n火葬場であらかじめ分骨証明書をもらっておくか、\n後から一部を取り分けて手元に残すことができます。" },
                                { q: "家族の同意は必要？", a: "同意を得ておくことが望ましいです。\n「遺骨は早くお墓に入れるべきだ」と考える親族がいる場合、\n説明不足が原因でトラブルになることがあります。" }
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

// Icon component
function HeartIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
    );
}
