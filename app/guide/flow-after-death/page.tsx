import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";

export default function GuideFlowAfterDeathPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-32 px-4 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-primary-dark mb-4">没後の手続きフロー</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    大切な方が亡くなられた後、ご遺族には多くの手続きが待っています。<br />
                    死亡届の提出から相続、納骨まで、時系列でやるべきことを整理しました。
                </p>

                <div className="mt-8">
                    <Link href="/consult">
                        <Button variant="outline">専門家に相談する</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
