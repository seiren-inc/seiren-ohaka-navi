import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "お墓探し無料相談｜清蓮 お墓探しナビ",
    description: "希望条件に合うお墓・霊園・納骨堂探しを、専門スタッフが無料でサポートします。",
    alternates: { canonical: "https://www.ohakanavi.jp/consult/grave-search" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
