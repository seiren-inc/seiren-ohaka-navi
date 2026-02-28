import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";
import { SeoSummary } from "../../components/ui/SeoSummary";

export default function GuideJumokusouPage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg-muted">
            <Navbar />
            <main className="grow pt-32 px-4 max-w-4xl mx-auto w-full pb-20">
                <div className="bg-white p-8 md:p-12 rounded-[12px] border border-border shadow-sm">
                    <h1 className="text-3xl font-bold font-serif text-gray-800 mb-6">樹木葬について</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    自然に還り、静かに眠る「樹木葬」。<br />
                    墓石の代わりに樹木や草花をシンボルとするこの供養方法の種類や注意点をご紹介します。
                </p>


                    <div className="mt-10">
                        <Link href="/consult/grave-search">
                            <Button variant="primary" size="lg" className="bg-primary hover:bg-primary-hover">樹木葬について相談する</Button>
                        </Link>
                    </div>

                    <div className="mt-16">
                        <SeoSummary
                            title="樹木葬について"
                            description="墓石の代わりにシンボルツリーや草花を植える「樹木葬」の特徴や種類、メリット・デメリットと立地・費用について解説したページです。"
                            regions={["全国対応"]}
                            priceRange="20万円〜80万円（合祀型や個別区画などの形式により変動）"
                            lastUpdated="2024-03-01"
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
