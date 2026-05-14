 
import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { Metadata } from "next";
import { CheckCircle, AlertCircle, HelpCircle, BookOpen, Calculator, Search, Phone, Ship, Waves } from "lucide-react";

export const metadata: Metadata = {
    title: "海洋散骨とは｜方法・費用・注意点を中立に解説｜清蓮",
    description: "海洋散骨とは何か。実施方法の違い（チャーター・合同・代行）、費用の考え方、注意点（法律・粉骨・マナー）を中立の立場で解説します。",
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.ohakanavi.jp";

export default function SankotsuPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "清蓮（Seiren）", "item": BASE_URL },
                    { "@type": "ListItem", "position": 2, "name": "Choices", "item": `${BASE_URL}/choices` },
                    { "@type": "ListItem", "position": 3, "name": "海洋散骨", "item": `${BASE_URL}/choices/sankotsu` }
                ]
            },
            {
                "@type": "Article",
                "headline": "海洋散骨とは｜仕組みと注意点を中立に解説",
                "description": "海洋散骨の仕組み、方法別の費用、実施時の法的注意点について中立的な視点で解説します。",
                "author": { "@type": "Organization", "name": "清蓮" }
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": "海洋散骨は法律的に問題ない？",
                        "acceptedAnswer": { "@type": "Answer", "text": "現在の日本の法律では、散骨を直接禁止する規定はありません。\n法務省も「節度を持って行われる限り違法性はない」という見解を示しています。\nただし、自治体によっては条例で規制されている場合があるため確認が必要です。" }
                    },
                    {
                        "@type": "Question",
                        "name": "粉骨（ふんこつ）は必要？",
                        "acceptedAnswer": { "@type": "Answer", "text": "はい、必須です。\n遺骨と分からない状態（パウダー状）になるまで細かく砕くことが、マナーおよびルールの観点から求められています。" }
                    },
                    {
                        "@type": "Question",
                        "name": "家族の同意が必要？",
                        "acceptedAnswer": { "@type": "Answer", "text": "非常に重要です。\nお墓という「場所」がなくなるため、後から親族間でトラブルになるケースがあります。\n必ず事前に話し合い、合意を得ておくことを強く推奨します。" }
                    },
                    {
                        "@type": "Question",
                        "name": "合同とチャーターの違いは？",
                        "acceptedAnswer": { "@type": "Answer", "text": "「合同散骨」は複数の家族が同じ船に乗り合わせる乗り合い形式です。\n「チャーター散骨」は一家族で船を貸し切り、プライベートな時間を持てる形式です。" }
                    },
                    {
                        "@type": "Question",
                        "name": "証明書は出る？",
                        "acceptedAnswer": { "@type": "Answer", "text": "多くの専門業者では、実施後に「散骨証明書」を発行しています。\n緯度経度や日時が記載されており、実施した記録として手元に残すことができます。" }
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
                            Marine Scattering
                        </span>
                        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-6 leading-relaxed">
                            海洋散骨とは<br />
                            <span className="text-lg md:text-2xl mt-2 block opacity-80">仕組みと注意点を中立に解説</span>
                        </h1>

                        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8 text-left max-w-3xl mx-auto mt-8">
                            <p className="text-gray-700 leading-loose">
                                お墓を持たず、海へ還る「海洋散骨」。<br />
                                自然志向の高まりや、後継ぎ不足を背景に<br />
                                新しい供養の選択肢として一般化しつつあります。<br />
                                <br />
                                しかし、形あるお墓を残さない選択だからこそ、<br />
                                「親族の理解が得られるか」「法的に問題ないか」<br />
                                「どのように実施するのか」など、不安を感じる点も多いはずです。<br />
                                <br />
                                このページでは、海洋散骨の仕組みや種類、<br />
                                後悔しないために事前に知っておくべき注意点を整理しました。
                            </p>
                        </div>
                    </div>

                    {/* H2: 海洋散骨とは何か */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Waves className="w-6 h-6 mr-3 text-secondary" />
                            海洋散骨とは何か
                        </h2>
                        <div className="prose max-w-none text-gray-600 leading-loose">
                            <p className="mb-6">
                                海洋散骨（かいようさんこつ）とは、<br />
                                火葬後の遺骨をパウダー状（粉骨）にし、海へ撒く供養方法です。<br />
                                <br />
                                「お墓」という特定の場所を作らず、大自然のサイクルに還す考え方に基づきます。<br />
                                法律で禁止されているわけではありませんが、<br />
                                「節度をもって行う」ことが求められており、<br />
                                通常は専門業者のサポートのもと、漁場や航路を避けた沖合で行われます。
                            </p>
                        </div>
                    </section>

                    {/* H2: 海洋散骨が向きやすいケース */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-3 text-secondary" />
                            海洋散骨が向きやすいケース
                        </h2>
                        <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-bold text-lg text-primary-dark mb-2">場所に縛られない供養を希望する</h3>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        海は世界中とつながっています。<br />
                                        特定の土地や墓地に縛られず、自由な形で眠りたいと願う方や、<br />
                                        海が好きだった故人の意志を汲みたい場合に適しています。
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary-dark mb-2">維持管理を持たない形を選びたい</h3>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        お墓を建てると、その後の掃除や管理費の支払い、継承が発生します。<br />
                                        散骨は実施した時点で供養が完結するため、<br />
                                        将来の負担を一切残したくないという考え方にマッチします。
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-primary-dark mb-2">遠方の墓を整理した後（墓じまい）</h3>
                                    <p className="text-sm text-gray-600 leading-loose">
                                        田舎のお墓を片付けた（墓じまいした）後、<br />
                                        新しいお墓を建てずに散骨を選ぶケースも増えています。<br />
                                        物理的な遺骨をすべて手放せるため、最終的な整理の方法として選ばれます。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* H2: 向かない可能性があるケース */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <AlertCircle className="w-6 h-6 mr-3 text-gray-500" />
                            向かない可能性があるケース
                        </h2>
                        <div className="bg-gray-50 rounded-xl p-8">
                            <ul className="space-y-6">
                                <li className="flex items-start">
                                    <span className="text-gray-400 mr-3 shrink-0 mt-1">●</span>
                                    <div>
                                        <h3 className="font-bold text-gray-700 mb-1">手を合わせる「場所」が必要な場合</h3>
                                        <p className="text-sm text-gray-600 leading-loose">
                                            散骨をすると、お盆やお彼岸にお参りする特定の場所がなくなります。<br />
                                            「何もないと寂しい」「どこに向かって手を合わせればいいか分からない」<br />
                                            と後悔するリスクがある場合は、避けるか、一部を分骨して手元に残すことを検討すべきです。
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gray-400 mr-3 shrink-0 mt-1">●</span>
                                    <div>
                                        <h3 className="font-bold text-gray-700 mb-1">親族間の合意形成が難しい場合</h3>
                                        <p className="text-sm text-gray-600 leading-loose">
                                            「お墓参り」を大切にする親族がいる場合、<br />
                                            すべて海に撒いてしまうことに対して強い抵抗感を持たれることがあります。<br />
                                            強行すると、永続的な関係の悪化を招く恐れがあります。
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-gray-400 mr-3 shrink-0 mt-1">●</span>
                                    <div>
                                        <h3 className="font-bold text-gray-700 mb-1">後から遺骨を取り出したくなる可能性がある場合</h3>
                                        <p className="text-sm text-gray-600 leading-loose">
                                            一度海へ撒いてしまうと、二度と回収することはできません。<br />
                                            少しでも迷いがある場合は、全量散骨ではなく、<br />
                                            一部だけを散骨するなどの柔軟な方法を選ぶのが賢明です。
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* H2: 実施方法の種類 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Ship className="w-6 h-6 mr-3 text-secondary" />
                            実施方法の種類
                        </h2>
                        <div className="space-y-8">
                            <div className="border-l-4 border-secondary pl-6 py-2">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">1. チャーター散骨（個別）</h3>
                                <p className="text-gray-600 leading-loose mb-3">
                                    一家族で船を貸し切り、プライベートな空間で散骨を行う形式です。<br />
                                    周囲に気兼ねなく、ゆっくりとお別れの時間を過ごせます。<br />
                                    船内での食事や、思い出の曲を流すなどの演出が可能な場合が多いです。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人：水入らずでゆっくりお見送りしたい方、人数が多い場合</p>
                            </div>

                            <div className="border-l-4 border-secondary pl-6 py-2">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">2. 合同散骨（乗り合い）</h3>
                                <p className="text-gray-600 leading-loose mb-3">
                                    複数の家族が同じ船に乗り合わせ、順番に散骨を行う形式です。<br />
                                    チャーターよりも費用を抑えられますが、時間や演出には制限があります。<br />
                                    互いの空気を読み合う配慮が必要になる場合があります。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人：ご自身の手で撒きたいが、費用も抑えたい方</p>
                            </div>

                            <div className="border-l-4 border-secondary pl-6 py-2">
                                <h3 className="font-bold text-lg text-primary-dark mb-3">3. 委託散骨（代行）</h3>
                                <p className="text-gray-600 leading-loose mb-3">
                                    家族は乗船せず、業者に遺骨を託して散骨してもらう形式です。<br />
                                    高齢で船に乗るのが難しい、遠方で現地に行けないといった理由で選ばれます。<br />
                                    実施中の写真や証明書が後日送られてくるのが一般的です。
                                </p>
                                <p className="text-xs text-secondary font-bold">向いている人：現地へ行くのが難しい方、とにかく費用を抑えたい方</p>
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
                                散骨にかかる費用は、「船を貸し切るかどうか」「自分たちが乗船するかどうか」によって大きく異なります。
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-gray-50 p-4 rounded text-center">
                                    <span className="block text-sm font-bold text-gray-500 mb-2">委託散骨（代行）</span>
                                    <span className="block text-xl font-bold text-primary-dark">5万円 〜 15万円</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded text-center">
                                    <span className="block text-sm font-bold text-gray-500 mb-2">合同散骨（乗船）</span>
                                    <span className="block text-xl font-bold text-primary-dark">10万円 〜 25万円</span>
                                </div>
                                <div className="bg-gray-50 p-4 rounded text-center">
                                    <span className="block text-sm font-bold text-gray-500 mb-2">チャーター散骨</span>
                                    <span className="block text-xl font-bold text-primary-dark">20万円 〜 50万円</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-bold text-primary">価格差が出る主な要因</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 leading-loose">
                                    <li>使用するクルーザーの大きさやグレード</li>
                                    <li>乗船人数（人数が増えると追加料金がかかる場合がある）</li>
                                    <li>献花・献酒の量や、セレモニーの内容</li>
                                    <li>粉骨費用が含まれているかどうか（別途3〜5万円程度かかるケースが多い）</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* H2: 注意点と確認事項 */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <AlertCircle className="w-6 h-6 mr-3 text-secondary" />
                            注意点と確認事項
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-bold text-primary mb-3">粉骨（ふんこつ）の必要性</h3>
                                <p className="text-sm text-gray-600 leading-loose mb-4">
                                    遺骨をそのままの形で撒くことは、「遺骨遺棄」と誤解される恐れがあるため厳禁です。<br />
                                    必ずパウダー状（2mm以下）に粉骨する必要があります。<br />
                                    多くの場合は散骨業者に一括で依頼できますが、自分で行うのは精神的にも難易度が高いため、専門業者に任せるのが一般的です。
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-3">法令とマナーの遵守</h3>
                                <p className="text-sm text-gray-600 leading-loose mb-4">
                                    海水浴場の近くや漁場の近くでの散骨は、風評被害を防ぐために避けなければなりません。<br />
                                    「陸地から〇km以上離れる」といった業界のガイドラインや、<br />
                                    地域の条例（特に熱海市など）を守って実施する必要があります。
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-3">服装への配慮</h3>
                                <p className="text-sm text-gray-600 leading-loose mb-4">
                                    乗船場所（桟橋）までは公共の場を通るため、<br />
                                    喪服ではなく「平服（動きやすい服装）」での参加を推奨する業者が多いです。<br />
                                    周囲の人々に不要な不安を与えないための配慮です。
                                </p>
                            </div>
                            <div>
                                <h3 className="font-bold text-primary mb-3">家族・親族の合意</h3>
                                <p className="text-sm text-gray-600 leading-loose mb-4">
                                    最もトラブルになりやすい点です。<br />
                                    たとえ故人の遺言であっても、残された家族が納得していないと、後のしこりになります。<br />
                                    「一部だけお墓に残す（分骨）」という折衷案も含めて検討しましょう。
                                </p>
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
                            海洋散骨は「形を残さない」という点で、他の多くの供養方法と正反対の性質を持ちます。<br />
                            比較する際は「場所（シンボル）の有無」が最大のポイントになります。
                        </p>

                        <div className="space-y-6">
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-primary mb-2">樹木葬との違い</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    <Link href="/choices/jumokusou" className="text-primary font-bold hover:underline">樹木葬</Link>も自然志向ですが、手を合わせる場所（木や花）があります。<br />
                                    「自然に還したいが、お参りに行く場所も欲しい」という場合は樹木葬、<br />
                                    「場所そのものから解放されたい」場合は散骨が向いています。
                                </p>
                            </div>
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-primary mb-2">永代供養墓・納骨堂との違い</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    <Link href="/choices/eitai-kuyou" className="text-primary font-bold hover:underline">永代供養墓</Link>や<Link href="/choices/noukotsudou" className="text-primary font-bold hover:underline">納骨堂</Link>は、遺骨を「保管・管理」する場所です。<br />
                                    散骨は「撤去・完了」させる行為に近いため、<br />
                                    供養に対する考え方の方向性が異なります。
                                </p>
                            </div>
                            <div className="bg-white border border-gray-100 p-6 rounded-lg shadow-sm">
                                <h3 className="font-bold text-primary mb-2">自宅供養（手元供養）との関係</h3>
                                <p className="text-sm text-gray-600 leading-loose">
                                    多くのケースで、散骨と<Link href="/choices/temoto-kuyou" className="text-primary font-bold hover:underline">自宅供養</Link>はセットで検討されます。<br />
                                    遺骨の大部分は散骨し、少しだけ手元に残す。<br />
                                    これが「場所もいらないが、寂しくもない」というバランスの良い選択になります。
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* H2: 診断で海洋散骨が候補に出た方へ */}
                    <section className="mb-20">
                        <h2 className="font-serif text-2xl font-bold text-primary border-b pb-4 mb-8 flex items-center">
                            <Calculator className="w-6 h-6 mr-3 text-secondary" />
                            診断で「海洋散骨」が候補に出た方へ
                        </h2>
                        <div className="bg-primary/5 p-8 rounded-xl">
                            <p className="text-gray-700 leading-loose mb-4">
                                <Link href="/choices/diagnosis" className="text-primary font-bold hover:underline">供養の選択肢診断</Link>で海洋散骨がおすすめされた場合、<br />
                                あなたは「形式にとらわれない自由な価値観」や、<br />
                                「子供に負担を一切残したくない」という強い想いをお持ちの傾向があります。
                            </p>
                            <p className="text-gray-700 leading-loose mb-0">
                                診断結果はあくまで一つの目安です。<br />
                                散骨はやり直しがきかない選択肢ですので、<br />
                                ご自身だけでなく、周りのご家族とも時間をかけて話し合うことが大切です。<br />
                                迷われた場合は、まずは「手元供養」と併用する形を検討してみてはいかがでしょうか。
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
                                    <h3 className="font-bold text-lg text-primary-dark">散骨業者を探してみる</h3>
                                </div>
                                <p className="text-sm text-gray-500 text-center mb-6 grow">
                                    信頼できる海洋散骨の専門業者や、<br />
                                    実施プランを検索できます。
                                </p>
                                <Link href="/search?type=scattering" className="w-full">
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
                                    やっぱりお墓があったほうがいいかも？など<br />
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
                                    家族の説得に迷っている、粉骨だけ頼める？など<br />
                                    個別の事情に合わせて専門家がアドバイスします。
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
                                { q: "海洋散骨は法律的に問題ない？", a: "現在の日本の法律では、散骨を直接禁止する規定はありません。\n法務省も「節度を持って行われる限り違法性はない」という見解を示しています。\nただし、自治体によっては条例で規制されている場合があるため確認が必要です。" },
                                { q: "粉骨（ふんこつ）は必要？", a: "はい、必須です。\n遺骨と分からない状態（パウダー状）になるまで細かく砕くことが、マナーおよびルールの観点から求められています。" },
                                { q: "家族の同意が必要？", a: "非常に重要です。\nお墓という「場所」がなくなるため、後から親族間でトラブルになるケースがあります。\n必ず事前に話し合い、合意を得ておくことを強く推奨します。" },
                                { q: "合同とチャーターの違いは？", a: "「合同散骨」は複数の家族が同じ船に乗り合わせる乗り合い形式です。\n「チャーター散骨」は一家族で船を貸し切り、プライベートな時間を持てる形式です。" },
                                { q: "証明書は出る？", a: "多くの専門業者では、実施後に「散骨証明書」を発行しています。\n緯度経度や日時が記載されており、実施した記録として手元に残すことができます。" }
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
