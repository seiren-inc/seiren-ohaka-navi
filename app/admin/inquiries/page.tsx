
import { InquiryStatus, Inquiry } from "../../../lib/store";
import { InquiryDB } from "../../../lib/inquiry-db";
import { CheckCircle2, Circle, Clock, ChevronRight, Filter } from "lucide-react";
import Link from "next/link";

export default async function InquiryList(props: { searchParams: Promise<{ category?: string }> }) {
    const searchParams = await props.searchParams;
    const categoryFilter = searchParams.category || 'all';

    // Determine Environment: Server Component can read DB directly
    let inquiries = InquiryDB.getAll();

    // Filter by Category
    if (categoryFilter !== 'all') {
        if (categoryFilter === 'business') {
            inquiries = inquiries.filter(i => i.kind === 'business');
        } else if (categoryFilter === 'other') {
            inquiries = inquiries.filter(i => !['grave_search', 'grave_closure', 'ikotsu_service'].includes(i.category || '') && i.kind !== 'business');
        } else {
            inquiries = inquiries.filter(i => i.category === categoryFilter);
        }
    }

    const getStatusBadge = (status: InquiryStatus) => {
        switch (status) {
            case 'new': return <span className="flex items-center gap-1 bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold"><Circle className="w-3 h-3 fill-current" /> 新着</span>;
            case 'contacted': return <span className="flex items-center gap-1 bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-bold"><Clock className="w-3 h-3" /> 対応中</span>;
            case 'done': return <span className="flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold"><CheckCircle2 className="w-3 h-3" /> 完了</span>;
        }
    };

    const getCategoryBadge = (inquiry: Inquiry) => {
        if (inquiry.kind === 'business') {
            return <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-1 rounded text-xs font-bold">事業者</span>;
        }
        const cat = inquiry.category;
        switch (cat) {
            case 'grave_search': return <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs font-bold">お墓探し</span>;
            case 'grave_closure': return <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs font-bold">墓じまい</span>;
            case 'ikotsu_service': return <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">遺骨供養</span>;
            default: return <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">その他</span>;
        }
    }

    return (
        <div>
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">問い合わせ一覧</h2>
                    <p className="text-sm text-gray-500 mt-1">全 {inquiries.length} 件</p>
                </div>

                {/* Filter UI */}
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    {/* Fallback to simple links for now */}
                    <div className="flex bg-gray-100 rounded-lg p-1">
                        {[
                            { id: 'all', label: 'すべて' },
                            { id: 'grave_search', label: 'お墓探' },
                            { id: 'grave_closure', label: '墓じまい' },
                            { id: 'ikotsu_service', label: '遺骨' },
                            { id: 'business', label: '事業者' },
                        ].map(f => (
                            <Link
                                key={f.id}
                                href={f.id === 'all' ? '/admin/inquiries' : `/admin/inquiries?category=${f.id}`}
                                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors ${categoryFilter === f.id
                                    ? 'bg-white text-gray-800 shadow-sm'
                                    : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {f.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500">
                            <th className="p-4 font-medium">日時/種別</th>
                            <th className="p-4 font-medium">ステータス</th>
                            <th className="p-4 font-medium">対象</th>
                            <th className="p-4 font-medium">流入元</th>
                            <th className="p-4 font-medium">顧客名</th>
                            <th className="p-4 font-medium">内容</th>
                            <th className="p-4 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {inquiries.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-400">問い合わせはまだありません</td>
                            </tr>
                        )}
                        {inquiries.map(i => (
                            <tr key={i.id} className="hover:bg-gray-50 text-sm group">
                                <td className="p-4 text-gray-500 whitespace-nowrap">
                                    <Link href={`/admin/inquiries/${i.id}`} className="block hover:text-blue-600">
                                        <div className="font-bold text-gray-700 mb-1">{getCategoryBadge(i)}</div>
                                        <div className="text-xs">{new Date(i.createdAt).toLocaleString('ja-JP')}</div>
                                        <div className="text-[10px] text-gray-300 font-mono mt-0.5">ID: {i.id.slice(-4)}</div>
                                    </Link>
                                </td>
                                <td className="p-4">{getStatusBadge(i.status)}</td>
                                <td className="p-4">
                                    {i.kind === 'business' ? (
                                        <div className="font-bold text-gray-700">
                                            <div className="text-xs text-gray-400 mb-0.5">会社/寺院名</div>
                                            {i.organizationName || '未指定'}
                                        </div>
                                    ) : (
                                        <>
                                            {i.category === 'grave_closure' ? (
                                                <div className="mb-2">
                                                    <div className="text-xs text-amber-600 font-bold mb-0.5">現在のお墓</div>
                                                    <div className="font-bold text-gray-800">
                                                        {i.graveTempleName || '未指定'}
                                                    </div>
                                                    {i.graveTemplePref && (
                                                        <span className="text-xs text-gray-500">({i.graveTemplePref})</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="font-bold text-gray-700">
                                                    <div className="text-xs text-gray-400 mb-0.5">希望墓地</div>
                                                    {i.context?.templeName || i.desiredTempleName || i.templeNameSnapshot || '未指定'}
                                                </div>
                                            )}

                                            <div className="mt-2">
                                                <div className="text-xs text-gray-400 mb-0.5">
                                                    {i.category === 'grave_closure' ? '次の供養先' : '希望プラン'}
                                                </div>
                                                {i.context?.planName || i.desiredPlanName || String(i.additionalFields?.hasNextPlace || '') ? (
                                                    <span className="text-sm text-primary bg-blue-50 px-2 py-1 rounded">
                                                        {i.context?.planName || i.desiredPlanName || String(i.additionalFields?.hasNextPlace || '')}
                                                    </span>
                                                ) : (
                                                    <span className="text-sm text-gray-400">未指定</span>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </td>
                                <td className="p-4 text-xs max-w-[150px]">
                                    <div className="font-bold text-gray-600">{i.context?.sourceLabel || i.context?.source || '-'}</div>
                                    <div className="text-gray-400 truncate">{i.context?.sourcePath || i.ref || '-'}</div>
                                </td>
                                <td className="p-4 text-gray-700">
                                    <div className="font-bold">{i.user?.name || i.contactName || (i as any).name || '不明'}</div>
                                    <div className="text-gray-500 text-xs">{i.user?.phone || (i as any).phone || '-'}</div>
                                </td>
                                <td className="p-4 max-w-[200px]">
                                    {i.kind === 'business' ? (
                                        <div className="text-xs">
                                            <span className="font-bold text-gray-500">種別:</span> {i.inquiryType}
                                        </div>
                                    ) : (
                                        <div className="mb-1 text-xs text-gray-400">
                                            希望: {(i.additionalFields?.visitHope as string) || (i.additionalFields?.timing as string) || i.preferredDateTime || '-'}
                                        </div>
                                    )}
                                    <div className="truncate text-gray-600 mt-1" title={i.message}>{i.message}</div>
                                </td>
                                <td className="p-4 text-right">
                                    <Link href={`/admin/inquiries/${i.id}`} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold text-xs bg-blue-50 px-3 py-2 rounded-full transition-colors">
                                        詳細 <ChevronRight className="w-3 h-3 ml-1" />
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
