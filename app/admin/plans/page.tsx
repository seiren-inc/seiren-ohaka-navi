import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronLeft, DollarSign } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function PlansPage() {
    const plans = await prisma.plan.findMany({
        orderBy: [{ templeId: 'asc' }, { order: 'asc' }],
        include: { temple: { select: { id: true, name: true } } },
    });

    const availabilityLabel: Record<string, string> = {
        available: '空きあり',
        limited: '残り僅か',
        full: '満員',
        suspended: '募集停止',
    };
    const availabilityColor: Record<string, string> = {
        available: 'bg-green-100 text-green-700',
        limited: 'bg-yellow-100 text-yellow-700',
        full: 'bg-red-100 text-red-700',
        suspended: 'bg-gray-100 text-gray-500',
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <DollarSign className="w-6 h-6" /> プラン一覧
                </h2>
                <span className="text-sm text-gray-400">{plans.length}件</span>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {plans.length === 0 ? (
                    <p className="text-center text-gray-400 text-sm py-12">プランが登録されていません</p>
                ) : (
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b text-gray-500">
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
                                <tr key={plan.id} className="hover:bg-gray-50">
                                    <td className="p-4 font-bold text-primary">
                                        <Link href={`/admin/temples/${plan.temple.id}/edit`} className="hover:underline">
                                            {plan.temple.name}
                                        </Link>
                                    </td>
                                    <td className="p-4">{plan.name}</td>
                                    <td className="p-4 text-gray-500">{plan.category}</td>
                                    <td className="p-4 font-bold">{plan.price.toLocaleString()}円</td>
                                    <td className="p-4 text-gray-500">{plan.managementFee > 0 ? `${plan.managementFee.toLocaleString()}円/年` : '—'}</td>
                                    <td className="p-4">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${availabilityColor[plan.availability] || 'bg-gray-100 text-gray-500'}`}>
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
