import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Building2, FileText, BarChart2, Settings, LogOut } from "lucide-react";

export const metadata: Metadata = {
    title: "施設ポータル | 清蓮 お墓探しナビ",
    robots: { index: false },
};

const navItems = [
    { href: "/portal/dashboard", icon: LayoutDashboard, label: "ダッシュボード" },
    { href: "/portal/profile", icon: Building2, label: "施設情報の管理" },
    { href: "/portal/contract", icon: FileText, label: "契約・プラン" },
    { href: "/portal/leads", icon: BarChart2, label: "リード管理" },
    { href: "/portal/settings", icon: Settings, label: "アカウント設定" },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-60 bg-white border-r border-gray-200 fixed inset-y-0 left-0 flex flex-col z-10">
                <div className="px-6 py-5 border-b border-gray-100">
                    <p className="font-black text-primary text-sm">SEIREN</p>
                    <p className="text-gray-400 text-xs mt-0.5">施設管理ポータル</p>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-primary/5 hover:text-primary transition-colors">
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="px-3 py-4 border-t border-gray-100">
                    <Link href="/portal/logout"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                        <LogOut className="w-4 h-4" />
                        ログアウト
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <div className="pl-60 flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
                    <div className="text-sm text-gray-400">施設管理ポータル</div>
                    <div className="text-xs text-gray-400">掲載審査中は一部機能が制限されます</div>
                </header>
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
