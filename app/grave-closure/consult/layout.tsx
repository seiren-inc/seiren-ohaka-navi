import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "お墓じまい無料相談のお申し込み｜清蓮",
    description: "お墓じまい・改葬の手続きや費用について、清蓮の専門スタッフが無料でご相談をお受けします。",
    alternates: { canonical: "https://www.ohakanavi.jp/grave-closure/consult" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
