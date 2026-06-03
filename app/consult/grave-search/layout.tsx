import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "お墓探し無料相談｜永代供養・樹木葬・納骨堂を一緒に探します",
    description: "希望条件に合うお墓・霊園・納骨堂探しを、専門スタッフが無料でサポートします。",
    alternates: { canonical: "https://www.ohakanavi.jp/consult/grave-search" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <h1 className="sr-only">お墓探しの無料相談</h1>
            {children}
        </>
    );
}
