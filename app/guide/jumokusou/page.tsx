import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";

export default function GuideJumokusouPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-32 px-4 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-primary-dark mb-4">樹木葬について</h1>
                <p className="text-text-secondary mb-8 leading-relaxed">
                    自然に還り、静かに眠る「樹木葬」。<br />
                    墓石の代わりに樹木や草花をシンボルとするこの供養方法の種類や注意点をご紹介します。
                </p>

                <div className="mt-8">
                    <Link href="/consult/grave-search">
                        <Button variant="outline">樹木葬について相談する</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
