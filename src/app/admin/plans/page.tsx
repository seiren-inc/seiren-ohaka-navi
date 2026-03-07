import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { DollarSign, CheckCircle2, AlertTriangle, XCircle, PauseCircle } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function PlansPage() {
    const plans = await prisma.plan.findMany({
        orderBy: [{ templeId: 'asc' }, { order: 'asc' }],
        include: { temple: { select: { id: true, name: true } } },
    });

    const availabilityLabel: Record<string, string> = {
        available: '空きあり',
        limited:   '残り僅か',
        full:      '満員',
        suspended: '募集停止',
    };
    const availabilityColor: Record<string, string> = {
        available: 'bg-green-100 text-green-700',
        limited:   'bg-yellow-100 text-yellow-700',
        full:      'bg-red-100 text-red-700',
        suspended: 'bg-gray-100 text-gray-500',
    };

    // 在庫サマリー集計
    const summary = {
        available: plans.filter(p => p.availability === 'available').length,
        limited:   plans.filter(p => p.availability === 'limited').length,
        full:      plans.filter(p => p.availability === 'full').length,
        suspended: plans.filter(p => p.availability === 'suspended').length,
    };

    const summaryCards = [
        { key: 'available', label: '空きあり',  count: summary.available, icon: CheckCircle2,  color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-100' },
        { key: 'limited',   label: '残り僅か',  count: summary.limited,   icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
        { key: 'full',      label: '満員',      count: summary.full,      icon: XCircle,       color: 'text-red-500',    bg: 'bg-red-50',    border: 'border-red-100' },
        { key: 'suspended', label: '募集停止',  count: summary.suspended,  icon: PauseCircle,   color: 'text-gray-400',   bg: 'bg-gray-50',   border: 'border-gray-100' },
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-primary" /> プラン管理
                </h2>
                <span className="text-sm text-gray-400">{plans.length}件</span>
            </div>

            {/* 在庫サマリー */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {summaryCards.map(card => (
                    <div key={card.key} className={`rounded-xl border ${card.border} ${card.bg} p-4 flex items-center gap-3`}>
                        <div className={`w-9 h-9 rounded-lg bg-white/80 flex items-center justify-center shadow-sm`}>
                            <card.icon className={`w-5 h-5 ${card.color}`} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">{card.label}</p>
                            <p className={`text-2xl font-bold ${card.color}`}>{card.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 満員・募集停止のアラート */}
            {(summary.full > 0 || summary.limited > 0) && (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                    <span>
                        {summary.full > 0 && <><b>満員 {summary.full}件</b> — 早急に在庫ステータスの更新または追加プランの登録を検討してください。 </>}
                        {summary.limited > 0 && <><b>残り僅か {summary.limited}件</b> — 追加区画の手配またはステータス更新を確認してください。</>}
                    </span>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {plans.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm py-12">プランが登録されていません</p>
                ) : (
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b text-gray-500 text-xs uppercase">
                                <th className="p-4 font-medium">寺院名</th>
                                <th className="p-4 font-medium">プラン名</th>
                                <th className="p-4 font-medium">カテゴリ</th>
                                <th className="p-4 font-medium">価格</th>
                                <th className="p-4 font-medium">管理費</th>
                                <th className="p-4 font-medium">在庫状況</th>
                                <th className="p-4 font-medium">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {plans.map(plan => (
                                <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-bold text-primary">
                                        <Link href={`/admin/temples/${plan.temple.id}/edit`} className="hover:underline">
                                            {plan.temple.name}
                                        </Link>
                                    </td>
                                    <td className="p-4 font-medium text-gray-800">{plan.name}</td>
                                    <td className="p-4 text-gray-500">{plan.category}</td>
                                    <td className="p-4 font-bold text-gray-800">{plan.price.toLocaleString()}円</td>
                                    <td className="p-4 text-gray-500">{plan.managementFee > 0 ? `${plan.managementFee.toLocaleString()}円/年` : '—'}</td>
                                    <td className="p-4">
                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${availabilityColor[plan.availability] || 'bg-gray-100 text-gray-500'}`}>
                                            {availabilityLabel[plan.availability] || plan.availability}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <Link href={`/admin/temples/${plan.temple.id}/edit?tab=plans`} className="text-xs text-primary font-bold hover:underline">
                                            編集
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
