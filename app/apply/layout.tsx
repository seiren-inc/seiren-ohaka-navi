import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "掲載プランのお申し込み｜清蓮 お墓探しナビ",
    description: "清蓮 お墓探しナビへの掲載プランをお選びいただけます。無料プランから始めて効果を確認できます。",
    alternates: { canonical: "https://www.ohakanavi.jp/apply" },
    robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
