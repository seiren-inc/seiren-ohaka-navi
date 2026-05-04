import Link from "next/link";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function ConsultHubPage() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />
            <main id="main-content" className="grow pt-32 px-4 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-primary-dark mb-4">無料相談・お問い合わせ</h1>
                <p className="text-gray-600 mb-12">
                    ご相談内容に合わせて、専門の担当者がご案内いたします。<br />
                    まずは下記よりご希望のメニューをお選びください。
                </p>

                {/* CTA: Diagnosis */}
                <div className="bg-white border-2 border-primary/10 rounded-xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                    <div>
                        <h3 className="text-lg font-bold text-primary mb-2">まだ具体的な希望が決まっていない方へ</h3>
                        <p className="text-sm text-gray-600">
                            「何から相談すればいいかわからない」という場合は、まず診断チャートでご自身の希望を整理してみることをおすすめします。
                        </p>
                    </div>
                    <Link href="/choices/diagnosis" className="shrink-0">
                        <span className="inline-block bg-primary text-white font-bold border border-primary px-6 py-3 rounded-full hover:bg-primary/90 hover:shadow-lg transition-all">
                            供養の選択肢診断を試す →
                        </span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/consult/grave-search" className="block p-8 bg-white border-2 border-blue-100 rounded-xl shadow-sm hover:shadow-xl hover:border-blue-300 transition-all hover:-translate-y-1">
                        <h2 className="text-xl font-bold text-primary mb-2">お墓を探す</h2>
                        <p className="text-sm text-gray-500">永代供養、樹木葬、納骨堂など</p>
                    </Link>
                    <Link href="/consult/grave-closure" className="block p-8 bg-white border-2 border-blue-100 rounded-xl shadow-sm hover:shadow-xl hover:border-blue-300 transition-all hover:-translate-y-1">
                        <h2 className="text-xl font-bold text-primary mb-2">お墓じまいする</h2>
                        <p className="text-sm text-gray-500">墓じまい、改葬、各種手続き</p>
                    </Link>
                    <Link href="/consult/ikotsu-service" className="block p-8 bg-white border-2 border-blue-100 rounded-xl shadow-sm hover:shadow-xl hover:border-blue-300 transition-all hover:-translate-y-1">
                        <h2 className="text-xl font-bold text-primary mb-2">遺骨の供養・整理</h2>
                        <p className="text-sm text-gray-500">粉骨、洗骨、手元供養など</p>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
