'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

const PATH_LABELS: Record<string, string> = {
    admin: 'ダッシュボード',
    temples: '寺院管理',
    plans: 'プラン管理',
    inquiries: '問い合わせ管理',
    images: '画像管理',
    new: '新規登録',
    edit: '編集',
};

export function Breadcrumb() {
    const pathname = usePathname();
    // /admin/temples/abc123/edit → ['admin', 'temples', 'abc123', 'edit']
    const segments = pathname.split('/').filter(Boolean);

    const crumbs = segments.map((seg, i) => {
        const href = '/' + segments.slice(0, i + 1).join('/');
        // IDっぽいセグメント（英数字24文字など）はスキップまたは「詳細」表示
        const label = PATH_LABELS[seg] || (seg.length > 10 ? '詳細' : seg);
        return { href, label, isLast: i === segments.length - 1 };
    });

    if (crumbs.length <= 1) return null;

    return (
        <nav className="flex items-center gap-1 text-sm">
            <Link href="/admin" className="text-gray-400 hover:text-primary transition-colors">
                <Home className="w-3.5 h-3.5" />
            </Link>
            {crumbs.slice(1).map((crumb) => (
                <span key={crumb.href} className="flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-gray-300" />
                    {crumb.isLast ? (
                        <span className="font-bold text-gray-700">{crumb.label}</span>
                    ) : (
                        <Link href={crumb.href} className="text-gray-400 hover:text-primary transition-colors">
                            {crumb.label}
                        </Link>
                    )}
                </span>
            ))}
        </nav>
    );
}
