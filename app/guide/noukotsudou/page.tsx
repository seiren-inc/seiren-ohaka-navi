import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";

export default function GuideNoukotsudouPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-32 px-4 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-primary-dark mb-4">納骨堂について</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    天候に左右されず、アクセスの良い場所が多い「納骨堂」。<br />
                    ロッカー式や自動搬送式など、多様化する納骨堂のタイプと選び方を解説します。
                </p>

                <div className="mt-8">
                    <Link href="/consult/grave-search">
                        <Button variant="outline">納骨堂の空き状況を相談する</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
