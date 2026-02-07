import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";

export default function GuideEitaiKuyouPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-32 px-4 max-w-7xl mx-auto w-full">
                <h1 className="text-3xl font-bold text-primary-dark mb-4">永代供養について</h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    少子化や核家族化が進む現代で注目される「永代供養」。<br />
                    寺院や霊園が家族に代わって管理・供養してくれる仕組みについて詳しく解説します。
                </p>

                <div className="mt-8">
                    <Link href="/consult/grave-search">
                        <Button variant="outline">永代供養墓を探す相談をする</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
