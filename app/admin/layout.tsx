import { prisma } from "@/lib/prisma";
import { ToastProvider } from "../components/admin/Toast";
import { NavItem } from "../components/admin/NavItem";
import { AdminMobileNav } from "../components/admin/AdminMobileNav";
import { Breadcrumb } from "../components/admin/Breadcrumb";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const newInquiriesCount = await prisma.inquiry.count({ where: { status: 'new' } });

    const navItems = [
        { href: '/admin', iconName: 'LayoutDashboard', label: 'ダッシュボード' },
        { href: '/admin/temples', iconName: 'TentTree', label: '寺院管理' },
        { href: '/admin/plans', iconName: 'DollarSign', label: 'プラン管理' },
        { href: '/admin/inquiries', iconName: 'MessageSquare', label: '問い合わせ管理', badge: newInquiriesCount },
        { href: '/admin/leads', iconName: 'BarChart2', label: 'リード集計' },
        { href: '/admin/contracts', iconName: 'FileText', label: '契約管理' },
        { href: '/admin/images', iconName: 'ImageIcon', label: '画像管理' },
    ];


    return (
        <ToastProvider>
            <div className="flex h-screen bg-gray-50 font-sans">
                {/* Sidebar – Desktop */}
                <aside className="hidden md:flex w-64 bg-primary flex-shrink-0 flex-col">
                    {/* Logo */}
                    <div className="px-6 py-6 border-b border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <span className="text-white font-black text-sm">S</span>
                            </div>
                            <div>
                                <p className="text-white font-black text-base tracking-wider leading-none">SEIREN</p>
                                <p className="text-white/60 text-xs mt-0.5">Admin System</p>
                            </div>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                        {navItems.map(item => (
                            <NavItem key={item.href} {...item} />
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="px-5 py-4 border-t border-white/10">
                        <p className="text-white/40 text-xs">© 2025 Seiren Inc.</p>
                    </div>
                </aside>

                {/* Right Content */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    {/* Top Header */}
                    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-3 flex items-center gap-4 shrink-0">
                        {/* Mobile: Hamburger */}
                        <AdminMobileNav navItems={navItems} />

                        {/* Breadcrumb */}
                        <div className="flex-1 min-w-0">
                            <Breadcrumb />
                        </div>

                        {/* Admin badge */}
                        <div className="hidden md:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                <span className="text-white text-xs font-bold">A</span>
                            </div>
                            <span className="text-xs font-bold text-gray-700">管理者</span>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-1 overflow-auto p-4 md:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </ToastProvider>
    );
}
