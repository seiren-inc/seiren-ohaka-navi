import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { SeoSummary } from "../../components/ui/SeoSummary";

export default function GuideNoukotsudouPage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg-muted">
            <Navbar />
            <main className="grow pt-32 px-4 max-w-4xl mx-auto w-full pb-20">
                <div className="bg-white p-8 md:p-12 rounded-[12px] border border-border shadow-sm">
                    <h1 className="text-3xl font-bold font-serif text-gray-800 mb-6">納骨堂について</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    天候に左右されず、アクセスの良い場所が多い「納骨堂」。<br />
                    ロッカー式や自動搬送式など、多様化する納骨堂のタイプと選び方を解説します。
                </p>


                    <div className="mt-10">
                        <Link href="/consult/grave-search">
                            <Button variant="primary" size="lg" className="bg-primary hover:bg-primary-hover">納骨堂の空き状況を相談する</Button>
                        </Link>
                    </div>

                    <div className="mt-16">
                        <SeoSummary
                            title="納骨堂について"
                            description="天候に左右されずアクセスが良い「納骨堂」の選び方を解説しています。ロッカー式や自動搬送式など多様化する納骨堂のタイプと、メリット・費用感をご確認いただけます。"
                            regions={["全国対応（主に都市部）"]}
                            priceRange="30万円〜200万円（形式や立地により大きく変動）"
                            lastUpdated="2024-03-01"
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
