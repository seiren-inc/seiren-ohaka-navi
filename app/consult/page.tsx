import Link from "next/link";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function ConsultHubPage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg">
            <Navbar />
            <main className="flex-grow pt-32 pb-20 px-[--content-px] max-w-7xl mx-auto w-full">
                <div className="text-center mb-14">
                    <span className="text-secondary font-medium tracking-[0.2em] text-xs uppercase mb-4 block">
                        Consultation
                    </span>
                    <h1 className="font-serif text-2xl md:text-3xl text-primary-dark mb-4">無料相談・お問い合わせ</h1>
                    <p className="text-text-muted text-sm leading-relaxed">
                        ご相談内容に合わせて、専門の担当者がご案内いたします。<br />
                        まずは下記よりご希望のメニューをお選びください。
                    </p>
                </div>

                {/* CTA: Diagnosis */}
                <div className="bg-white border border-border rounded-[--radius-lg] p-7 mb-14 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-base font-medium text-primary-dark mb-2">まだ具体的な希望が決まっていない方へ</h3>
                        <p className="text-sm text-text-muted">
                            「何から相談すればいいかわからない」という場合は、まず診断チャートでご自身の希望を整理してみることをおすすめします。
                        </p>
                    </div>
                    <Link href="/choices/diagnosis" className="flex-shrink-0">
                        <span className="inline-block bg-primary text-white px-6 py-3 rounded-[--radius-md] text-sm hover:bg-primary-dark transition-colors">
                            供養の選択肢診断を試す →
                        </span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    <Link href="/consult/grave-search" className="block p-8 lg:p-10 bg-white border border-border rounded-[--radius-lg] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[--shadow-md] hover:border-primary/20">
                        <h2 className="text-lg font-medium text-primary-dark mb-2">お墓を探す</h2>
                        <p className="text-sm text-text-muted">永代供養、樹木葬、納骨堂など</p>
                    </Link>
                    <Link href="/consult/grave-closure" className="block p-8 lg:p-10 bg-white border border-border rounded-[--radius-lg] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[--shadow-md] hover:border-primary/20">
                        <h2 className="text-lg font-medium text-primary-dark mb-2">お墓じまいする</h2>
                        <p className="text-sm text-text-muted">墓じまい、改葬、各種手続き</p>
                    </Link>
                    <Link href="/consult/ikotsu-service" className="block p-8 lg:p-10 bg-white border border-border rounded-[--radius-lg] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[--shadow-md] hover:border-primary/20">
                        <h2 className="text-lg font-medium text-primary-dark mb-2">遺骨の供養・整理</h2>
                        <p className="text-sm text-text-muted">粉骨、洗骨、手元供養など</p>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
