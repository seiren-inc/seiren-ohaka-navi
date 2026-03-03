'use client';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { NavItem, NavItemDef } from './NavItem';

export function AdminMobileNav({ navItems }: { navItems: NavItemDef[] }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* ハンバーガーボタン */}
            <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setOpen(true)}
            >
                <Menu className="w-5 h-5 text-gray-700" />
            </button>

            {/* Overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Drawer */}
            <aside className={`fixed top-0 left-0 h-full w-72 bg-primary z-50 flex flex-col transition-transform duration-300 md:hidden ${open ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                            <span className="text-white font-black text-sm">S</span>
                        </div>
                        <div>
                            <p className="text-white font-black text-base">SEIREN</p>
                            <p className="text-white/50 text-xs">Admin System</p>
                        </div>
                    </div>
                    <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                    {navItems.map(item => (
                        <div key={item.href} onClick={() => setOpen(false)}>
                            <NavItem {...item} />
                        </div>
                    ))}
                </nav>
                <div className="px-5 py-4 border-t border-white/10">
                    <p className="text-white/40 text-xs">© 2025 Seiren Inc.</p>
                </div>
            </aside>
        </>
    );
}
