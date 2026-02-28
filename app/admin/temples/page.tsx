
import Link from "next/link";
import { Button } from "../../components/ui/Button";
import { Store } from "../../../lib/store";
import { Pencil } from "lucide-react";

export default function TempleList() {
    const temples = Store.getTemples();

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">登録寺院一覧</h2>
                <Link href="/admin/temples/new">
                    <Button className="font-bold">＋ 新規登録</Button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                            <th className="p-4 font-medium">ID</th>
                            <th className="p-4 font-medium">寺院名</th>
                            <th className="p-4 font-medium">電話番号</th>
                            <th className="p-4 font-medium">定休日</th>
                            <th className="p-4 font-medium">アクション</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {temples.map(t => (
                            <tr key={t.id} className="hover:bg-gray-50">
                                <td className="p-4 text-xs text-gray-400 font-mono">{t.id}</td>
                                <td className="p-4 font-bold text-primary">{t.name}</td>
                                <td className="p-4 text-sm">{t.phone}</td>
                                <td className="p-4 text-sm">
                                    {t.calendar?.availableWeekdays.length === 7 ? "なし" :
                                        `週${7 - (t.calendar?.availableWeekdays.length || 0)}日休`
                                    }
                                </td>
                                <td className="p-4">
                                    <Link href={`/admin/temples/${t.id}/edit`}>
                                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                                            <Pencil className="w-4 h-4" /> 編集
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
