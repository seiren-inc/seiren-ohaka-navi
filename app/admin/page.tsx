export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Building2, MessageSquare, Eye, FileText, Plus, ChevronRight, TrendingUp, BarChart2 } from "lucide-react";

export default async function AdminDashboard() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [
        newInquiriesCount,
        totalTemplesCount,
        publishedTemplesCount,
        draftTemplesCount,
        thisMonthInquiries,
        recentInquiries,
        dailyInquiries,
    ] = await Promise.all([
        prisma.inquiry.count({ where: { status: 'new' } }),
        prisma.temple.count(),
        prisma.temple.count({ where: { status: 'public' } }),
        prisma.temple.count({ where: { status: 'draft' } }),
        prisma.inquiry.count({ where: { createdAt: { gte: startOfMonth } } }),
        prisma.inquiry.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
        }),
        prisma.inquiry.findMany({
            where: { createdAt: { gte: sevenDaysAgo } },
            select: { createdAt: true },
        }),
    ]);

    // 7日分の日別集計
    const days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(sevenDaysAgo);
        d.setDate(d.getDate() + i);
        return d;
    });
    const dayCounts = days.map(d => ({
        label: `${d.getMonth() + 1}/${d.getDate()}`,
        count: dailyInquiries.filter(inq => {
            const inqDate = new Date(inq.createdAt);
            return inqDate.getFullYear() === d.getFullYear()
                && inqDate.getMonth() === d.getMonth()
                && inqDate.getDate() === d.getDate();
        }).length,
    }));
    const maxCount = Math.max(...dayCounts.map(d => d.count), 1);


    const statusColor: Record<string, string> = {
        new: 'bg-red-100 text-red-700',
        inProgress: 'bg-yellow-100 text-yellow-700',
        done: 'bg-green-100 text-green-700',
    };
    const statusLabel: Record<string, string> = {
        new: '新着',
        inProgress: '対応中',
        done: '完了',
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">ダッシュボード</h2>
                <Link href="/admin/temples/new" className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">
                    <Plus className="w-4 h-4" /> 新規寺院登録
                </Link>
            </div>

            {/* KPIカード */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: '未対応問い合わせ', value: newInquiriesCount, unit: '件', icon: MessageSquare, color: 'text-red-500', bg: 'bg-red-50', href: '/admin/inquiries' },
                    { label: '今月の問い合わせ', value: thisMonthInquiries, unit: '件', icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-50', href: '/admin/inquiries' },
                    { label: '公開中の寺院', value: publishedTemplesCount, unit: '件', icon: Eye, color: 'text-green-500', bg: 'bg-green-50', href: '/admin/temples' },
                    { label: '下書き', value: draftTemplesCount, unit: '件', icon: FileText, color: 'text-gray-500', bg: 'bg-gray-50', href: '/admin/temples' },
                ].map(card => (
                    <Link key={card.label} href={card.href} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center mb-3`}>
                            <card.icon className={`w-5 h-5 ${card.color}`} />
                        </div>
                        <p className="text-xs text-gray-500 mb-1">{card.label}</p>
                        <p className="text-3xl font-bold text-gray-800">
                            {card.value}
                            <span className="text-sm font-normal text-gray-500 ml-1">{card.unit}</span>
                        </p>
                    </Link>
                ))}
            </div>

            {/* 最近の問い合わせ + グラフ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 最近の問い合わせ */}
                <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                        <h3 className="font-bold text-gray-800">最近の問い合わせ</h3>
                        <Link href="/admin/inquiries" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                            すべて見る <ChevronRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="divide-y">
                        {recentInquiries.length === 0 ? (
                            <p className="text-center text-gray-400 text-sm py-8">問い合わせはありません</p>
                        ) : recentInquiries.map(inq => (
                            <Link key={inq.id} href={`/admin/inquiries/${inq.id}`} className="flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors">
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{inq.templeNameSnapshot || '(寺院未指定)'}</p>
                                    <p className="text-xs text-gray-400">{inq.receiptNumber || `R-${inq.id.slice(0, 6)}`} · {new Date(inq.createdAt).toLocaleDateString('ja-JP')}</p>
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColor[inq.status] || 'bg-gray-100 text-gray-600'}`}>
                                    {statusLabel[inq.status] || inq.status}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* クイックアクション */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b">
                        <h3 className="font-bold text-gray-800">クイックアクション</h3>
                    </div>
                    <div className="p-4 space-y-2">
                        {[
                            { label: '新規寺院を登録', href: '/admin/temples/new', icon: Building2 },
                            { label: '寺院一覧を見る', href: '/admin/temples', icon: Building2 },
                            { label: '問い合わせ一覧', href: '/admin/inquiries', icon: MessageSquare },
                        ].map(action => (
                            <Link key={action.href} href={action.href} className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-primary/30 transition-all">
                                <action.icon className="w-4 h-4 text-primary" />
                                <span className="text-sm font-bold text-gray-700">{action.label}</span>
                                <ChevronRight className="w-4 h-4 text-gray-400 ml-auto" />
                            </Link>
                        ))}
                    </div>
                    <div className="px-4 pb-4">
                        <p className="text-xs text-gray-400 text-center">登録寺院数: <span className="font-bold text-gray-600">{totalTemplesCount}</span> 件</p>
                    </div>
                </div>
            </div>

            {/* 過去7日グラフ */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-primary" /> 過去7日間の問い合わせ推移
                    </h3>
                    <span className="text-xs text-gray-400">今日: {dayCounts[6].count}件</span>
                </div>
                <div className="flex items-end gap-3 h-32 px-2">
                    {dayCounts.map((d, i) => {
                        const heightPct = (d.count / maxCount) * 100;
                        const isToday = i === 6;
                        return (
                            <div key={d.label} className="flex-1 flex flex-col items-center gap-1">
                                <span className="text-xs text-gray-500 font-bold min-h-4">{d.count > 0 ? d.count : ''}</span>
                                <div className="w-full flex items-end" style={{ height: '72px' }}>
                                    <div
                                        className={`w-full rounded-t-lg transition-all duration-500 ${isToday ? 'bg-primary' : 'bg-primary/25'}`}
                                        style={{ height: `${Math.max(d.count > 0 ? heightPct : 2, 2)}%` }}
                                    />
                                </div>
                                <span className={`text-[10px] whitespace-nowrap ${isToday ? 'font-bold text-primary' : 'text-gray-400'}`}>{d.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}
