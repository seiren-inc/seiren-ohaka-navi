import { LayoutDashboard, TentTree, MessageSquare, LogOut, User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // 1. Redirect to login if not authenticated
    if (!user) {
        redirect("/admin/login");
    }

    // 2. Check Whitelist
    const allowlist = (process.env.ADMIN_ALLOWLIST || "").split(",").map(e => e.trim());
    if (!allowlist.includes(user.email || "")) {
        // Redir to 403 or logout then 403. Let's redirect to 403 which has logout button.
        // We avoid loop by checking if we are already at 403 or login (handled by file structure if we wrap children)
        // But layout is applied to subroutes.
        redirect("/admin/403");
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-seiren-navy text-white flex-shrink-0">
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

                <div className="absolute bottom-0 w-full p-4 border-t border-navy-700 bg-navy-800">
                    <div className="flex items-center gap-3 px-2 py-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-white truncate">{user.email}</p>
                            <p className="text-[10px] text-white/40">Administrator</p>
                        </div>
                    </div>
                    <Link href="/api/auth/logout" className="flex items-center gap-3 px-4 py-2 rounded text-red-400 hover:bg-red-500/10 transition-colors text-sm font-bold">
                        <LogOut className="w-4 h-4" />
                        ログアウト
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-8">
                {children}
            </main>
        </div>
    );
}
