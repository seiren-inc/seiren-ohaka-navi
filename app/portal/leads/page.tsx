import { getPortalUser } from '@/lib/portal-auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { MessageSquare, Phone, MapPin } from 'lucide-react'

export const dynamic = 'force-dynamic'

// user JSON フィールドから特定キーを安全に取り出す
function fromUser(user: unknown, key: string): string {
    if (user && typeof user === 'object' && !Array.isArray(user)) {
        const val = (user as Record<string, unknown>)[key]
        return typeof val === 'string' ? val : ''
    }
    return ''
}

export default async function PortalLeads() {
    const templeUser = await getPortalUser()

    if (!templeUser) redirect('/portal/login')

    const leads = await prisma.inquiry.findMany({
        where: { templeId: templeUser.templeId },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-[#007B55]" />
                    問い合わせ・資料請求
                </h1>
                <p className="text-sm text-gray-500 mt-1">当施設宛てに届いたリード情報の一覧です。お客様へのご連絡をお願いいたします。</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b flex items-center justify-between">
                    <h2 className="font-bold text-gray-800">リード一覧</h2>
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                        全 {leads.length} 件
                    </span>
                </div>
                {leads.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center">
                        <MessageSquare className="w-12 h-12 text-gray-200 mb-4" />
                        <p>まだリード情報はありません。</p>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="p-4 font-medium w-32">受付日時</th>
                                <th className="p-4 font-medium w-24">種別</th>
                                <th className="p-4 font-medium w-48">お客様名 / ご連絡先</th>
                                <th className="p-4 font-medium">希望内容・備考</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.map(lead => {
                                const leadType = lead.type || lead.kind || ''
                                const lastName = fromUser(lead.user, 'lastName')
                                const firstName = fromUser(lead.user, 'firstName')
                                const phone = fromUser(lead.user, 'phone')
                                const email = fromUser(lead.user, 'email')
                                const prefecture = fromUser(lead.user, 'prefecture')
                                const city = fromUser(lead.user, 'city')
                                const addressDetail = fromUser(lead.user, 'addressDetail')
                                const fullName = lastName ? `${lastName} ${firstName}`.trim() : '名称未設定'

                                return (
                                    <tr key={lead.id} className="hover:bg-gray-50">
                                        <td className="p-4 whitespace-nowrap text-gray-600 align-top">
                                            {new Date(lead.createdAt).toLocaleDateString("ja-JP")}
                                            <br />
                                            {new Date(lead.createdAt).toLocaleTimeString("ja-JP", { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="p-4 align-top">
                                            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                                                leadType === 'document' ? 'bg-blue-50 border border-blue-200 text-blue-700' : 
                                                leadType === 'tour' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 
                                                'bg-gray-50 border border-gray-200 text-gray-700'
                                            }`}>
                                                {leadType === 'document' ? '資料請求' : leadType === 'tour' ? '見学予約' : 'お問い合わせ'}
                                            </span>
                                        </td>
                                        <td className="p-4 align-top">
                                            <p className="font-bold text-gray-800 text-base mb-1">
                                                {fullName} 様
                                            </p>
                                            <div className="space-y-1 text-xs text-gray-600">
                                                {phone && (
                                                    <p className="flex items-center gap-1">
                                                        <Phone className="w-3 h-3 text-gray-400" />
                                                        {phone}
                                                    </p>
                                                )}
                                                {addressDetail && (
                                                    <p className="flex items-start gap-1">
                                                        <MapPin className="w-3 h-3 text-gray-400 mt-0.5 shrink-0" />
                                                        <span className="line-clamp-2">{prefecture + city + addressDetail}</span>
                                                    </p>
                                                )}
                                                {email && (
                                                    <p className="text-gray-500">{email}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 align-top">
                                            {lead.planName && (
                                                <p className="text-sm font-bold text-gray-800 mb-2">
                                                    検討プラン: <span className="text-[#007B55]">{lead.planName}</span>
                                                </p>
                                            )}
                                            {lead.preferredDateTime && (
                                                <p className="text-xs text-gray-600 mb-2 bg-emerald-50 px-2 py-1 rounded inline-block">
                                                    <span className="font-bold text-emerald-800">希望日時:</span> {lead.preferredDateTime}
                                                </p>
                                            )}
                                            {lead.message ? (
                                                <p className="text-sm text-gray-600 line-clamp-3 bg-white p-2 rounded border border-gray-100 italic">
                                                    &quot;{lead.message}&quot;
                                                </p>
                                            ) : (
                                                <p className="text-xs text-gray-400">備考なし</p>
                                            )}
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
