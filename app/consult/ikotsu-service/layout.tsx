import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "遺骨サービス相談｜清蓮 お墓探しナビ",
    description: "粉骨・洗骨・海洋散骨・手元供養など、遺骨に関するサービスについて無料でご相談いただけます。",
    alternates: { canonical: "https://www.ohakanavi.jp/consult/ikotsu-service" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
