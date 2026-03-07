'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, TentTree, MessageSquare, DollarSign, ImageIcon, LucideIcon
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
    LayoutDashboard,
    TentTree,
    MessageSquare,
    DollarSign,
    ImageIcon,
};

export type NavItemDef = {
    href: string;
    iconName: string;
    label: string;
    badge?: number;
};

export function NavItem({ href, iconName, label, badge }: NavItemDef) {
    const pathname = usePathname();
    const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
    const Icon = ICON_MAP[iconName] ?? LayoutDashboard;

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-150 font-medium text-sm relative group ${
                isActive
                    ? 'bg-white text-primary shadow-sm font-bold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
        >
            <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : ''}`} />
            <span className="flex-1">{label}</span>
            {badge !== undefined && badge > 0 && (
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                    isActive ? 'bg-red-100 text-red-600' : 'bg-red-500 text-white'
                }`}>
                    {badge > 99 ? '99+' : badge}
                </span>
            )}
        </Link>
    );
}
