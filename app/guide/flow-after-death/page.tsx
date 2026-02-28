import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { SeoSummary } from "../../components/ui/SeoSummary";

export default function GuideFlowAfterDeathPage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg-muted">
            <Navbar />
            <main className="grow pt-32 px-4 max-w-4xl mx-auto w-full pb-20">
                <div className="bg-white p-8 md:p-12 rounded-[12px] border border-border shadow-sm">
                    <h1 className="text-3xl font-bold font-serif text-gray-800 mb-6">没後の手続きフロー</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    大切な方が亡くなられた後、ご遺族には多くの手続きが待っています。<br />
                    死亡届の提出から相続、納骨まで、時系列でやるべきことを整理しました。
                </p>


                    <div className="mt-10">
                        <Link href="/consult">
                            <Button variant="primary" size="lg" className="bg-primary hover:bg-primary-hover">専門家に相談する</Button>
                        </Link>
                    </div>

                    <div className="mt-16">
                        <SeoSummary
                            title="没後の手続きフロー"
                            description="大切な方が亡くなられた直後の死亡届の提出から、葬儀の手配、年金・保険・相続などの行政手続き、四十九日法要や納骨まで、ご遺族が行うべき一連のフローを時系列で網羅的に解説しています。"
                            regions={["全国対応"]}
                            priceRange="手続き自体の大半は無料（専門家等への依頼料や葬儀等の実費は別途発生）"
                            lastUpdated="2024-03-01"
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
