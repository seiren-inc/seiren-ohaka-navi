import Link from "next/link";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { Button } from "../../components/ui/Button";

export default function GuideEitaiKuyouPage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg">
            <Navbar />
            <main className="flex-grow pt-32 pb-20 px-[--content-px] max-w-4xl mx-auto w-full">
                <span className="text-secondary font-medium tracking-[0.2em] text-xs uppercase mb-4 block">
                    Guide
                </span>
                <h1 className="font-serif text-2xl md:text-3xl text-primary-dark mb-6">永代供養について</h1>
                <p className="text-text-secondary mb-10 leading-[1.9] text-sm md:text-base">
                    少子化や核家族化が進む現代で注目される「永代供養」。<br />
                    寺院や霊園が家族に代わって管理・供養してくれる仕組みについて詳しく解説します。
                </p>

                <div className="mt-10">
                    <Link href="/consult/grave-search">
                        <Button variant="outline">永代供養墓を探す相談をする</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
