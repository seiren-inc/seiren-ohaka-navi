import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

export const metadata: Metadata = {
    title: "ページが見つかりません",
    description:
        "お探しのページは見つかりませんでした。お墓探し・永代供養・墓じまいに関する情報は清蓮（Seiren）の各ページからご覧いただけます。",
    robots: { index: false, follow: true },
};

const SUGGESTED_LINKS = [
    { href: "/", label: "ホーム", desc: "清蓮トップページ" },
    { href: "/search", label: "墓地・霊園をさがす", desc: "条件から最適な供養先を検索" },
    { href: "/choices", label: "供養のカタチ", desc: "永代供養・樹木葬・納骨堂を比較" },
    { href: "/guide", label: "供養の知識コラム", desc: "費用・手順をわかりやすく解説" },
    { href: "/grave-closure", label: "墓じまい・改葬", desc: "墓じまいの流れと費用" },
    { href: "/consult", label: "無料相談", desc: "専門スタッフに無料で相談" },
];

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-bg text-text">
            <Navbar />
            <main id="main-content" className="grow pt-section-tablet">
                <div className="mx-auto max-w-3xl px-4 py-16 md:py-24 text-center">
                    <p className="text-sm font-bold tracking-widest text-primary">404 NOT FOUND</p>
                    <h1 className="mt-4 text-2xl md:text-3xl font-bold text-forest">
                        ページが見つかりませんでした
                    </h1>
                    <p className="mt-4 text-text-muted leading-relaxed">
                        お探しのページは移動・削除されたか、URLが正しくない可能性があります。
                        <br className="hidden md:block" />
                        以下のページから、お墓探しや供養の情報をご覧ください。
                    </p>

                    <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                        {SUGGESTED_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="block rounded-xl border border-border bg-bg-muted px-5 py-4 transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-card-hover"
                                >
                                    <span className="block font-bold text-forest">{link.label}</span>
                                    <span className="mt-1 block text-sm text-text-muted">{link.desc}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-base font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg"
                        >
                            トップページへ戻る
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
