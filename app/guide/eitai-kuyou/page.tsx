import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { SeoSummary } from "../../components/ui/SeoSummary";

export default function GuideEitaiKuyouPage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg-muted">
            <Navbar />
            <main className="grow pt-32 px-4 max-w-4xl mx-auto w-full pb-20">
                <div className="bg-white p-8 md:p-12 rounded-[12px] border border-border shadow-sm">
                    <h1 className="text-3xl font-bold font-serif text-gray-800 mb-6">永代供養について</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    少子化や核家族化が進む現代で注目される「永代供養」。<br />
                    寺院や霊園が家族に代わって管理・供養してくれる仕組みについて詳しく解説します。
                </p>


                    <div className="mt-10">
                        <Link href="/consult/grave-search">
                            <Button variant="primary" size="lg" className="bg-primary hover:bg-primary-hover">永代供養墓を探す相談をする</Button>
                        </Link>
                    </div>

                    <div className="mt-16">
                        <SeoSummary
                            title="永代供養について"
                            description="承継者不要で寺院や霊園が永続的に供養を代行する「永代供養」の仕組みと費用相場について解説したページです。"
                            regions={["全国対応"]}
                            priceRange="10万円〜150万円（合祀墓から個別安置型まで形式により変動）"
                            lastUpdated="2024-03-01"
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
