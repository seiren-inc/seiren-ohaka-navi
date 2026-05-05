import { Metadata } from "next";

export const metadata: Metadata = {
    title: "寺院ポータル ログイン｜清蓮",
    description: "清蓮 寺院管理ポータルのログインページです。",
    robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
