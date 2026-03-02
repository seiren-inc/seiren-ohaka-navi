import Link from "next/link";
import { Button } from "../../components/ui/Button";
import { prisma } from "../../../lib/prisma";
import { Pencil } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function TempleList() {
    const temples = await prisma.temple.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            name: true,
            phone: true,
            status: true,
            prefecture: true,
            calendar: true,
        }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">登録寺院一覧</h2>
                <Link href="/admin/temples/new">
                    <Button className="font-bold">＋ 新規登録</Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {temples.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <p className="font-bold text-lg mb-2">まだ寺院が登録されていません</p>
                        <p className="text-sm mb-6">「＋ 新規登録」から最初の寺院を追加してください。</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                                <th className="p-4 font-medium">施設名</th>
                                <th className="p-4 font-medium">都道府県</th>
                                <th className="p-4 font-medium">電話番号</th>
                                <th className="p-4 font-medium">ステータス</th>
                                <th className="p-4 font-medium">アクション</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {temples.map(t => {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const cal = t.calendar as any;
                                const closedDays = cal?.availableWeekdays
                                    ? 7 - (cal.availableWeekdays as number[]).length
                                    : null;
                                return (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="p-4 font-bold text-primary">{t.name}</td>
                                        <td className="p-4 text-sm">{t.prefecture}</td>
                                        <td className="p-4 text-sm">{t.phone ?? '—'}</td>
                                        <td className="p-4 text-sm">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                t.status === 'public' ? 'bg-green-100 text-green-700' :
                                                t.status === 'draft' ? 'bg-gray-100 text-gray-600' :
                                                'bg-red-100 text-red-600'
                                            }`}>
                                                {t.status === 'public' ? '公開' : t.status === 'draft' ? '準備中' : '非公開'}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                {closedDays !== null && (
                                                    <span>{closedDays === 0 ? '無休' : `週${closedDays}日休`}</span>
                                                )}
                                                <Link href={`/admin/temples/${t.id}/edit`}>
                                                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                                                        <Pencil className="w-4 h-4" /> 編集
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
