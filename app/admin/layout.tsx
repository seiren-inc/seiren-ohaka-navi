import Link from "next/link";
import { LayoutDashboard, TentTree, MessageSquare, Settings } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "管理画面｜清蓮(Seiren)",
    robots: {
        index: false,
    },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white flex-shrink-0">
                <div className="p-6 border-b border-navy-700">
                    <h1 className="text-xl font-bold tracking-wider">SEIREN<br /><span className="text-sm font-normal opacity-70">Admin System</span></h1>
                </div>
                <nav className="p-4 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/10 transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        ダッシュボード
                    </Link>
                    <Link href="/admin/temples" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/10 transition-colors">
                        <TentTree className="w-5 h-5" />
                        寺院管理
                    </Link>
                    <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-white/10 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                        問い合わせ管理
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                {children}
            </main>
        </div>
    );
}
