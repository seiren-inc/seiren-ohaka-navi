import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/Button";

export const metadata: Metadata = {
    title: "清蓮について｜私たちは中立的な供養の相談窓口です",
    description: "清蓮（SEIREN）のコンセプトと想いについて。「売る」ためではなく、「納得する」ためのお手伝いをします。",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white text-primary-dark">
            <Navbar />
            <main className="flex-grow pt-24 px-4 pb-20">
                <div className="max-w-4xl mx-auto">

                    {/* Hero / Concept */}
                    <div className="text-center mb-20">
                        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">
                            Concept
                        </span>
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8 leading-relaxed">
                            「売る」ためではなく<br />
                            「納得する」ための<br />
                            お手伝い。
                        </h1>
                        <p className="text-text-secondary leading-loose max-w-2xl mx-auto">
                            お墓選びは、人生の締めくくりを考える大切な時間です。<br />
                            しかし、情報が多すぎたり、専門用語が難しかったりと、<br />
                            多くの方が「何が正解かわからない」という不安を抱えています。
                        </p>
                    </div>

                    {/* Mission */}
                    <section className="mb-20">
                        <div className="bg-bg p-8 md:p-12 rounded-2xl">
                            <h2 className="font-serif text-2xl font-bold text-primary mb-6 text-center">
                                私たちのミッション
                            </h2>
                            <p className="text-text-primary leading-loose mb-6">
                                清蓮（SEIREN）は、特定の霊園や石材店に偏らない「中立」な立場で、
                                供養に関するあらゆる選択肢を整理・提案する相談窓口です。
                            </p>
                            <p className="text-text-primary leading-loose">
                                「お墓を建てること」がゴールではありません。<br />
                                ご本人様とご家族様が、将来にわたって安心できる「心の拠り所」を見つけること。<br />
                                それが、私たちの目指すゴールです。
                            </p>
                        </div>
                    </section>

                    {/* Links */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                        <Link href="/about/strength" className="block group">
                            <div className="border border-border rounded-xl p-8 h-full hover:shadow-lg transition-shadow bg-white text-center">
                                <h3 className="font-bold text-lg text-primary-dark mb-4 group-hover:text-secondary transition-colors">
                                    清蓮の強み
                                </h3>
                                <p className="text-sm text-text-secondary mb-4">
                                    なぜ中立な立場を貫けるのか、<br />その理由をご説明します。
                                </p>
                                <span className="text-xs font-bold text-primary flex items-center justify-center">
                                    詳しく見る <ArrowRight className="w-3 h-3 ml-1" />
                                </span>
                            </div>
                        </Link>

                        <Link href="/about/company" className="block group">
                            <div className="border border-border rounded-xl p-8 h-full hover:shadow-lg transition-shadow bg-white text-center">
                                <h3 className="font-bold text-lg text-primary-dark mb-4 group-hover:text-secondary transition-colors">
                                    運営会社
                                </h3>
                                <p className="text-sm text-text-secondary mb-4">
                                    運営元の情報と<br />事業概要について。
                                </p>
                                <span className="text-xs font-bold text-primary flex items-center justify-center">
                                    詳しく見る <ArrowRight className="w-3 h-3 ml-1" />
                                </span>
                            </div>
                        </Link>

                        <Link href="/about/partner" className="block group">
                            <div className="border border-border rounded-xl p-8 h-full hover:shadow-lg transition-shadow bg-white text-center">
                                <h3 className="font-bold text-lg text-primary-dark mb-4 group-hover:text-secondary transition-colors">
                                    提携をご希望の方へ
                                </h3>
                                <p className="text-sm text-text-secondary mb-4">
                                    寺院様・霊園事業者様の<br />掲載について。
                                </p>
                                <span className="text-xs font-bold text-primary flex items-center justify-center">
                                    詳しく見る <ArrowRight className="w-3 h-3 ml-1" />
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* CTA */}
                    <div className="text-center border-t border-border pt-12">
                        <h2 className="font-serif text-xl font-bold text-primary mb-6">
                            まずは、あなたの状況をお聞かせください
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/choices/diagnosis">
                                <Button variant="outline">
                                    供養方法を診断する
                                </Button>
                            </Link>
                            <Link href="/consult">
                                <Button variant="primary">
                                    専門家に無料相談する
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
