export const dynamic = 'force-dynamic'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { LayoutDashboard, MessageSquare, Settings, LogOut, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function PortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/portal/login')
    }

    // TempleUserから寺院情報を取得
    const templeUser = await prisma.templeUser.findUnique({
        where: { supabaseUid: user.id },
        include: { temple: { select: { name: true } } }
    })

    if (!templeUser) {
        // UIDが紐付いていない異常状態
        return (
            <div className="flex h-screen items-center justify-center p-6 text-center text-sm text-gray-500">
                アカウントの紐付けが完了していません。管理者にお問い合わせください。
            </div>
        )
    }

    async function signOut() {
        'use server'
        const sb = await createClient()
        await sb.auth.signOut()
        revalidatePath('/portal/login')
        redirect('/portal/login')
    }

    const navItems = [
        { href: '/portal', icon: LayoutDashboard, label: 'ダッシュボード' },
        { href: '/portal/leads', icon: MessageSquare, label: '問い合わせ・資料請求' },
        { href: '/portal/settings', icon: Settings, label: 'アカウント設定' },
    ]

    return (
        <div className="flex h-screen bg-gray-50 font-sans">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex w-64 bg-[#007B55] shrink-0 flex-col text-white shadow-xl shadow-[#007B55]/10 z-10">
                <div className="p-6 border-b border-white/10 flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                        <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <p className="text-white/60 text-xs font-bold tracking-widest mb-1 text-center">施設向けポータル</p>
                    <p className="text-white font-bold text-sm text-center leading-snug w-full px-2" style={{ wordBreak: 'auto-phrase' }}>
                        {templeUser.temple?.name || '施設名未設定'}
                    </p>
                </div>
                
                <nav className="flex-1 px-4 py-6 space-y-1">
                    {navItems.map(item => (
                        <Link 
                            key={item.href} 
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors text-sm font-bold"
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="px-5 py-4 border-t border-white/10">
                    <form action={signOut}>
                        <button type="submit" className="flex items-center justify-center gap-2 text-white/60 hover:text-white text-sm font-bold w-full bg-white/5 hover:bg-white/10 rounded-lg py-2.5 transition-colors">
                            <LogOut className="w-4 h-4" /> ログアウト
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between md:hidden shadow-sm z-10">
                    <p className="font-bold text-[#007B55] truncate text-sm">
                        {templeUser.temple?.name}
                    </p>
                </header>
                <div className="flex-1 overflow-y-auto p-6 md:p-10">
                    {children}
                </div>
            </main>
        </div>
    )
}
