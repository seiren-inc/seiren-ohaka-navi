'use client';
import { useState, useTransition, useMemo } from 'react';
import Link from 'next/link';
import { Pencil, Search, ArrowUpDown, ChevronDown } from 'lucide-react';

type Temple = {
    id: string;
    name: string;
    phone: string | null;
    status: string;
    prefecture: string;
    calendar: unknown;
    updatedAt?: string;
};

const STATUS_OPTIONS = [
    { value: 'public', label: '公開', color: 'bg-green-100 text-green-700' },
    { value: 'draft', label: '準備中', color: 'bg-gray-100 text-gray-600' },
    { value: 'unlisted', label: '非公開', color: 'bg-red-100 text-red-600' },
];

const PREFECTURES = ['すべて', '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'];

export function TempleListClient({ temples: initial }: { temples: Temple[] }) {
    const [temples, setTemples] = useState(initial);
    const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState('');
    const [prefectureFilter, setPrefectureFilter] = useState('すべて');
    const [sortField, setSortField] = useState<'name' | 'updatedAt'>('updatedAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const handleStatusChange = (id: string, newStatus: string) => {
        startTransition(async () => {
            await fetch(`/api/temples/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            setTemples(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
        });
    };

    const toggleSort = (field: 'name' | 'updatedAt') => {
        if (sortField === field) setSortOrder(o => o === 'asc' ? 'desc' : 'asc');
        else { setSortField(field); setSortOrder('asc'); }
    };

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return temples
            .filter(t =>
                (prefectureFilter === 'すべて' || t.prefecture === prefectureFilter) &&
                (t.name.toLowerCase().includes(q) || t.prefecture.includes(q))
            )
            .sort((a, b) => {
                const aval = sortField === 'name' ? a.name : (a.updatedAt ?? '');
                const bval = sortField === 'name' ? b.name : (b.updatedAt ?? '');
                return sortOrder === 'asc' ? aval.localeCompare(bval) : bval.localeCompare(aval);
            });
    }, [temples, search, prefectureFilter, sortField, sortOrder]);

    return (
        <div>
            {/* 検索・フィルターバー */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="relative flex-1 min-w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="施設名・都道府県で検索..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                </div>
                <div className="relative">
                    <select
                        value={prefectureFilter}
                        onChange={e => setPrefectureFilter(e.target.value)}
                        className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                    >
                        {PREFECTURES.map(p => <option key={p}>{p}</option>)}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <span className="text-sm text-gray-500">{filtered.length} 件</span>
            </div>

            <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-opacity ${isPending ? 'opacity-70' : ''}`}>
                {filtered.length === 0 ? (
                    <div className="p-12 text-center text-gray-500">
                        <p className="font-bold text-lg mb-2">
                            {temples.length === 0 ? 'まだ寺院が登録されていません' : '検索結果が見つかりません'}
                        </p>
                        {temples.length === 0 && <p className="text-sm mb-6">「＋ 新規登録」から最初の寺院を追加してください。</p>}
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                                <th className="p-4 font-medium">
                                    <button onClick={() => toggleSort('name')} className="flex items-center gap-1 hover:text-gray-800 transition-colors">
                                        施設名 <ArrowUpDown className="w-3 h-3" />
                                    </button>
                                </th>
                                <th className="p-4 font-medium">都道府県</th>
                                <th className="p-4 font-medium">電話番号</th>
                                <th className="p-4 font-medium">ステータス</th>
                                <th className="p-4 font-medium">アクション</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map(t => {
                                const current = STATUS_OPTIONS.find(s => s.value === t.status) || STATUS_OPTIONS[1];
                                return (
                                    <tr key={t.id} className="hover:bg-gray-50">
                                        <td className="p-4 font-bold text-primary">{t.name}</td>
                                        <td className="p-4 text-sm">{t.prefecture}</td>
                                        <td className="p-4 text-sm">{t.phone ?? '—'}</td>
                                        <td className="p-4">
                                            <div className="relative inline-block">
                                                <select
                                                    value={t.status}
                                                    onChange={e => handleStatusChange(t.id, e.target.value)}
                                                    className={`appearance-none pl-3 pr-7 py-1 rounded-full text-xs font-bold cursor-pointer border-0 outline-none ${current.color}`}
                                                >
                                                    {STATUS_OPTIONS.map(s => (
                                                        <option key={s.value} value={s.value}>{s.label}</option>
                                                    ))}
                                                </select>
                                                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs">▾</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Link href={`/admin/temples/${t.id}/edit`}>
                                                <button className="flex items-center gap-1.5 text-xs font-bold border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <Pencil className="w-3 h-3" /> 編集
                                                </button>
                                            </Link>
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
