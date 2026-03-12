import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Settings, User, Building2, Mail } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PortalSettings() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/portal/login')

    const templeUser = await prisma.templeUser.findUnique({
        where: { supabaseUid: user.id },
        include: { temple: true }
    })

    if (!templeUser) return <div>Auth Error</div>

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-[#007B55]" />
                    アカウント設定
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                    施設向けポータルのアカウント情報の確認
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="font-bold text-gray-800">登録情報</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex flex-col items-center justify-center shrink-0 mt-1">
                            <Building2 className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 mb-1">対象施設</p>
                            <p className="text-base font-bold text-gray-800">{templeUser.temple.name}</p>
                            <p className="text-sm text-gray-500 mt-1">{templeUser.temple.address}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex flex-col items-center justify-center shrink-0 mt-1">
                            <User className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 mb-1">担当者情報</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-base font-bold text-gray-800">{templeUser.name}</p>
                                <span className="text-sm text-gray-500">{templeUser.title || '役職未設定'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex flex-col items-center justify-center shrink-0 mt-1">
                            <Mail className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-500 mb-1">ログイン・通知用メールアドレス</p>
                            <p className="text-base font-medium text-gray-800">{templeUser.email}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-800 text-sm">
                <h3 className="font-bold mb-2">情報の変更について</h3>
                <p>
                    担当者名やログイン用メールアドレスの変更をご希望の場合は、<br className="hidden md:block" />
                    お手数ですが清蓮 運営事務局（admin@seiren.ne.jp）までご連絡ください。
                </p>
            </div>
        </div>
    )
}
