import { getPortalUser } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Activity, Mail, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function PortalDashboard() {
    const templeUser = await getPortalUser()

    if (!templeUser) redirect('/portal/login')

    // 今月の最初の日
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    // リード（問い合わせ）の集計
    const [monthlyLeads, totalLeads, recentLeads, activeContract] = await Promise.all([
        prisma.inquiry.count({
            where: {
                templeId: templeUser.templeId,
                createdAt: { gte: startOfMonth }
            }
        }),
        prisma.inquiry.count({
            where: { templeId: templeUser.templeId }
        }),
        prisma.inquiry.findMany({
            where: { templeId: templeUser.templeId },
            orderBy: { createdAt: 'desc' },
            take: 5
        }),
        prisma.contract.findFirst({
            where: { templeId: templeUser.templeId, status: 'active' },
            orderBy: { createdAt: 'desc' }
        })
    ])

    const planNameMap: Record<string, string> = {
        free: '無料プラン',
        standard: 'スタンダードプラン',
        sponsor: 'スポンサープラン'
    }

    const currentPlan = planNameMap[(templeUser.temple as any).planType] || '無料プラン'

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-gray-800">ダッシュボード</h1>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500 mb-1">今月のリード数</p>
                        <p className="text-3xl font-black text-gray-800">{monthlyLeads}<span className="text-base font-normal text-gray-500 ml-1">件</span></p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-500 mb-1">累計リード数</p>
                        <p className="text-3xl font-black text-gray-800">{totalLeads}<span className="text-base font-normal text-gray-500 ml-1">件</span></p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-50 rounded-full z-0" />
                    <div className="relative z-10 flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                            <FileText className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 mb-1">ご契約プラン</p>
                            <p className="text-xl font-black text-gray-800">{currentPlan}</p>
                            {activeContract && (
                                <p className="text-xs text-gray-500 mt-1">
                                    契約日: {new Date(activeContract.agreedAt).toLocaleDateString("ja-JP")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Leads */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b flex items-center justify-between">
                    <h2 className="font-bold text-gray-800">最新のリード情報</h2>
                    <Link href="/portal/leads" className="text-sm font-bold text-[#007B55] flex items-center gap-1 hover:underline">
                        すべて見る <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
                {recentLeads.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        まだリード（資料請求・見学予約）はありません。
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="px-6 border-b py-3 font-medium">日時</th>
                                <th className="px-6 border-b py-3 font-medium">種別</th>
                                <th className="px-6 border-b py-3 font-medium">お名前</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {recentLeads.map(lead => {
                                const leadType = lead.type || lead.kind || '';
                                const u = (lead.user && typeof lead.user === 'object' && !Array.isArray(lead.user)) ? lead.user as Record<string, unknown> : {};
                                const name = u.lastName ? `${u.lastName} ${u.firstName || ''}`.toString().trim() : '名称未設定';

                                return (
                                    <tr key={lead.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                            {new Date(lead.createdAt).toLocaleString("ja-JP")}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                                                leadType === 'document' ? 'bg-blue-50 text-blue-700' : 
                                                leadType === 'tour' ? 'bg-emerald-50 text-emerald-700' : 
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {leadType === 'document' ? '資料請求' : leadType === 'tour' ? '見学予約' : 'お問い合わせ'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            {name} 様
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
