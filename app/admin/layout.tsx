import Link from "next/link";
import { LayoutDashboard, TentTree, MessageSquare } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-bg font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-primary-dark text-white flex-shrink-0">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-base font-medium tracking-wider">SEIREN<br /><span className="text-xs font-normal text-white/50">Admin System</span></h1>
                </div>
                <nav className="p-4 space-y-1">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-[--radius-md] text-white/70 hover:bg-white/8 hover:text-white transition-colors text-sm">
                        <LayoutDashboard className="w-5 h-5" />
                        ダッシュボード
                    </Link>
                    <Link href="/admin/temples" className="flex items-center gap-3 px-4 py-3 rounded-[--radius-md] text-white/70 hover:bg-white/8 hover:text-white transition-colors text-sm">
                        <TentTree className="w-5 h-5" />
                        寺院管理
                    </Link>
                    <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 rounded-[--radius-md] text-white/70 hover:bg-white/8 hover:text-white transition-colors text-sm">
                        <MessageSquare className="w-5 h-5" />
                        問い合わせ管理
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8 lg:p-10">
                {children}
            </main>
        </div>
    );
}
