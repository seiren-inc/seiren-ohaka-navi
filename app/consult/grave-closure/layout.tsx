import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "お墓じまい無料相談｜清蓮 お墓探しナビ",
    description: "お墓じまいの手続き・費用・改葬先について、専門スタッフが無料でご相談をお受けします。",
    alternates: { canonical: "https://www.ohakanavi.jp/consult/grave-closure" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
