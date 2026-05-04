import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "提携・掲載のお問い合わせ｜清蓮",
    description: "清蓮への掲載・提携希望の寺院・事業者様向けお問い合わせフォームです。",
    alternates: { canonical: "https://www.ohakanavi.jp/partner/contact" },
    robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
