"use client";

import { useState } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import Link from "next/link";
import { CheckCircle, ShieldCheck, HeartHandshake, ArrowRight, ChevronDown, ChevronUp, MapPin, Bone, Home } from "lucide-react";
import { Button } from "../../components/ui/Button";

// FAQ Data
const FAQS = [
    {
        q: "相談だけでも大丈夫ですか？",
        a: "はい、もちろんです。具体的な検討の前段階でも、お気軽にご相談ください。無理な勧誘は一切いたしません。"
    },
    {
        q: "どれくらい費用がかかりますか？",
        a: "ご希望のお墓の種類（一般墓、樹木葬、納骨堂など）やエリアによって大きく異なります。まずは予算感をお伝えいただければ、その範囲内で最適なプランをご提案します。"
    },
    {
        q: "宗派や檀家の関係が心配です。",
        a: "清蓮でご紹介する多くの霊園は「宗教不問」または「檀家義務なし」です。特定のお寺の檀家になる必要がない場所を中心にご紹介しますのでご安心ください。"
    },
    {
        q: "遠方でも対応できますか？",
        a: "はい、全国対応可能です（一部離島などを除く）。お住まいの近くの霊園探しはもちろん、遠方にある実家のお墓じまいなどもサポートいたします。"
    },
    {
        q: "資料請求と相談の違いは何ですか？",
        a: "「資料請求」はパンフレット等の送付のみですが、「無料相談」では専門スタッフが個別のご事情を伺い、条件整理や見学予約の代行までトータルでサポートいたします。"
    }
];

// Flow Data
const FLOW_STEPS = [
    {
        step: "01",
        title: "状況整理",
        desc: "まずは「何から始めればいいかわからない」という状態のままご相談ください。専任スタッフがご希望や不安を整理します。"
    },
    {
        step: "02",
        title: "選択肢の比較",
        desc: "費用、エリア、承継の有無など、様々な条件から複数の候補をピックアップ。メリットだけでなくデメリットも比較します。"
    },
    {
        step: "03",
        title: "見学・確認",
        desc: "気になる霊園があれば、実際の現地見学の手配も代行します。現地の雰囲気やアクセスの便をご自身の目で確かめられます。"
    },
    {
        step: "04",
        title: "実行支援",
        desc: "最終的なお申し込み手続きや、お墓じまいに必要な行政手続きのサポートまで、最後まで伴走いたします。"
    }
];

export default function StrengthPage() {
    // Simple FAQ Accordion State
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <Navbar />

            <main className="flex-grow">
                {/* Hero */}
                <section className="bg-slate-50 pt-32 pb-20 px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Our Strength
                        </span>
                        <h1 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                            清蓮の強み
                        </h1>
                        <p className="text-xl md:text-2xl font-bold text-gray-700 mb-6">
                            「売る」ではなく「納得」のために。
                        </p>
                        <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                            中立な立場で最適解を一緒に探す、<br />
                            それが私たちの約束です。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/consult">
                                <Button size="lg" className="w-full sm:min-w-[180px] h-14 px-8 shadow-xl">
                                    無料相談予約
                                </Button>
                            </Link>
                            <Link href="/search">
                                <Button size="lg" variant="outline" className="w-full sm:min-w-[180px] h-14 px-8 bg-white">
                                    墓地を探す
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                <div className="max-w-5xl mx-auto px-4 py-20">

                    {/* 3 Promises */}
                    <div className="mb-24">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                                清蓮の3つの約束
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <ShieldCheck className="w-10 h-10 text-primary" />,
                                    title: "中立",
                                    desc: "特定の霊園や石材店に偏らず、公平な視点でアドバイスします。「買わない」という選択肢も提示します。"
                                },
                                {
                                    icon: <CheckCircle className="w-10 h-10 text-primary" />,
                                    title: "比較",
                                    desc: "メリットだけを強調することはしません。価格の裏側や、将来的なリスク（デメリット）も正直に説明します。"
                                },
                                {
                                    icon: <HeartHandshake className="w-10 h-10 text-primary" />,
                                    title: "伴走",
                                    desc: "情報の提供だけでなく、見学予約や契約手続き、行政への申請サポートまで、最後まで親身に寄り添います。"
                                }
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center transform hover:scale-105 transition-transform duration-300">
                                    <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        {item.icon}
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-800 mb-4">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Service Scopes */}
                    <div className="mb-24">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                                私たちができること
                            </h2>
                            <p className="text-gray-500 mt-4">お墓に関するあらゆるお悩みに対応します</p>
                        </div>

                        <div className="space-y-6">
                            {/* Service 1 */}
                            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="bg-white p-6 rounded-full shadow-sm flex-shrink-0">
                                    <MapPin className="w-8 h-8 text-emerald-600" />
                                </div>
                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">お墓探し</h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        永代供養墓、樹木葬、納骨堂、一般墓など、ご希望の条件に合わせて全国の霊園から最適な場所をご提案します。
                                    </p>
                                </div>
                                <Link href="/consult/grave-search" className="flex-shrink-0">
                                    <Button className="bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white min-w-[200px]">
                                        お墓を探す相談
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>

                            {/* Service 2 */}
                            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="bg-white p-6 rounded-full shadow-sm flex-shrink-0">
                                    <Home className="w-8 h-8 text-amber-600" />
                                </div>
                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">墓じまい・改葬</h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        田舎のお墓の撤去（墓じまい）や、近くへの引越し（改葬）。書類手続きから石材店の手配までワンストップで支援。
                                    </p>
                                </div>
                                <Link href="/consult/grave-closure" className="flex-shrink-0">
                                    <Button className="bg-amber-600 hover:bg-amber-700 border-amber-600 text-white min-w-[200px]">
                                        墓じまいの相談
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>

                            {/* Service 3 */}
                            <div className="bg-gray-50 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                                <div className="bg-white p-6 rounded-full shadow-sm flex-shrink-0">
                                    <Bone className="w-8 h-8 text-purple-600" />
                                </div>
                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">遺骨サービス</h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        ご遺骨のパウダー化（粉骨）、洗浄（洗骨）、手元供養品のご案内や、海洋散骨の手配など、供養の形を広げます。
                                    </p>
                                </div>
                                <Link href="/consult/ikotsu-service" className="flex-shrink-0">
                                    <Button className="bg-purple-600 hover:bg-purple-700 border-purple-600 text-white min-w-[200px]">
                                        遺骨サービスの相談
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Flow */}
                    <div className="mb-24">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                                納得までの流れ
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4">
                            {FLOW_STEPS.map((step, i) => (
                                <div key={i} className="relative bg-white border border-gray-200 rounded-xl p-6">
                                    <div className="text-4xl font-serif text-gray-100 font-bold mb-4 absolute top-4 right-4">
                                        {step.step}
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-800 mb-3 relative z-10">{step.title}</h3>
                                    <p className="text-xs text-gray-600 leading-relaxed relative z-10">
                                        {step.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="mb-24 max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                                よくある不安
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {FAQS.map((faq, idx) => (
                                <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                                    <button
                                        className="w-full text-left p-5 bg-white flex justify-between items-center hover:bg-gray-50 transition-colors"
                                        onClick={() => toggleFaq(idx)}
                                    >
                                        <span className="font-bold text-gray-800 pr-4">Q. {faq.q}</span>
                                        {openFaqIndex === idx ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                                    </button>
                                    {openFaqIndex === idx && (
                                        <div className="p-5 bg-gray-50 text-sm text-gray-700 border-t border-gray-100 leading-relaxed">
                                            A. {faq.a}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Final CTA */}
                    <div className="bg-primary text-white rounded-3xl p-10 md:p-16 text-center shadow-xl">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6">
                            迷ったら、まず状況を整理しましょう
                        </h2>
                        <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
                            ご家族だけで悩まず、第三者のプロにご相談ください。<br />
                            知識豊富なスタッフが、あなたのペースに合わせてサポートします。
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/consult">
                                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 border-transparent w-full sm:min-w-[180px] h-14 px-8">
                                    無料相談予約
                                </Button>
                            </Link>
                            <Link href="/search">
                                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary w-full sm:min-w-[180px] h-14 px-8">
                                    墓地を探す
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
