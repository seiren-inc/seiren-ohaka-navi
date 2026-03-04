/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { FileText, Users, TrendingUp, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { PlanUpgradeButton } from "./PlanUpgradeButton";

export const dynamic = "force-dynamic";

// ポータルセッション Cookie からメールを取得（Phase B 認証実装後に本格化）
async function getSessionTempleUser() {
    const cookieStore = await cookies();
    const email = cookieStore.get("portal_session")?.value;
    if (!email) return null;
    return prisma.templeUser.findUnique({
        where: { email },
        include: {
            temple: {
                include: {
                    contracts: { orderBy: { createdAt: "desc" }, take: 1 },
                },
            },
        },
    });
}

const PLAN_LABELS: Record<string, string> = {
    free: "無料プラン",
    standard: "標準プラン",
    sponsor: "PR枠プラン",
};

const STATUS_MAP: Record<string, { label: string; color: string; icon: any }> = {
    draft: { label: "審査中", color: "text-amber-600 bg-amber-50 border-amber-200", icon: Clock },
    public: { label: "掲載中", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
    suspended: { label: "停止中", color: "text-red-600 bg-red-50 border-red-200", icon: AlertCircle },
};

export default async function PortalDashboard() {
    const user = await getSessionTempleUser();

    // 未ログイン or Cookie なし → ログインへ
    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <p className="text-gray-500">ログインが必要です。</p>
                <Link href="/portal/login"
                    className="px-6 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-dark">
                    ログインページへ
                </Link>
            </div>
        );
    }

    const temple = user.temple;
    const contract = temple.contracts[0];
    const statusInfo = STATUS_MAP[temple.status] || STATUS_MAP.draft;

    // リード数（問い合わせ数）を取得
    const leadCount = await prisma.inquiry.count({ where: { templeId: temple.id } });

    return (
        <div className="space-y-6 max-w-4xl">
            {/* Welcome */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">ダッシュボード</h1>
                <p className="text-gray-500 text-sm mt-1">{temple.name} の掲載状況</p>
            </div>

            {/* 掲載ステータス */}
            <div className={`flex items-center gap-3 border px-5 py-4 rounded-xl ${statusInfo.color}`}>
                <statusInfo.icon className="w-5 h-5" />
                <div>
                    <p className="font-bold text-sm">{statusInfo.label}</p>
                    {temple.status === "draft" && (
                        <p className="text-xs opacity-80">審査完了後、掲載が開始されます（通常2〜3営業日）</p>
                    )}
                </div>
            </div>

            {/* KPI カード */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "累計リード数", value: leadCount, icon: Users, color: "text-primary", bg: "bg-primary/5" },
                    { label: "現在のプラン", value: PLAN_LABELS[temple.planType] || temple.planType, icon: FileText, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "契約ステータス", value: contract?.status === "active" ? "有効" : "未契約", icon: CheckCircle2, color: "text-gray-600", bg: "bg-gray-50" },
                ].map(card => (
                    <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                            <card.icon className={`w-5 h-5 ${card.color}`} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">{card.label}</p>
                            <p className="text-lg font-bold text-gray-800">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* クイックリンク */}
            <div className="grid grid-cols-2 gap-4">
                <Link href="/portal/profile"
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary hover:bg-primary/5 transition-colors group">
                    <p className="font-bold text-gray-800 group-hover:text-primary text-sm">施設情報を編集する</p>
                    <p className="text-xs text-gray-400 mt-1">写真・区画プラン・営業時間などの編集</p>
                </Link>
                <Link href="/portal/leads"
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary hover:bg-primary/5 transition-colors group">
                    <p className="font-bold text-gray-800 group-hover:text-primary text-sm">
                        リードを確認する <span className="text-primary">{leadCount}件</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">問い合わせ・資料請求の一覧</p>
                </Link>
                <Link href="/portal/contract"
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary hover:bg-primary/5 transition-colors group">
                    <p className="font-bold text-gray-800 group-hover:text-primary text-sm">契約を確認する</p>
                    <p className="text-xs text-gray-400 mt-1">契約書・プランの確認</p>
                </Link>
                <Link href="/portal/settings"
                    className="bg-white border border-gray-200 rounded-xl p-5 hover:border-primary hover:bg-primary/5 transition-colors group">
                    <p className="font-bold text-gray-800 group-hover:text-primary text-sm">アカウント設定</p>
                    <p className="text-xs text-gray-400 mt-1">担当者情報・パスワード変更</p>
                </Link>
            </div>

            {/* プランアップグレード / 請求管理 */}
            <PlanUpgradeButton
                planType={temple.planType}
                hasStripeCustomer={!!user.stripeCustomerId}
            />

            {/* 成長トレンド（プレースホルダー） */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-800 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" /> 月別リード推移
                    </h2>
                    <span className="text-xs text-gray-400">過去3ヶ月</span>
                </div>
                <p className="text-gray-400 text-sm text-center py-8">
                    掲載開始後にリードデータが表示されます
                </p>
            </div>
        </div>
    );
}
