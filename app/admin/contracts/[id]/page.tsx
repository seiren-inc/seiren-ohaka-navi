import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
    FileText, CheckCircle2, XCircle, ArrowLeft,
    User, Mail, Calendar, Shield, Hash, Building
} from "lucide-react";
import { ContractStatusBadge } from "../ContractStatusBadge";

export const dynamic = "force-dynamic";

const PLAN_LABELS: Record<string, { label: string; color: string; monthly: string }> = {
    free:     { label: "無料（Free）",          color: "bg-gray-100 text-gray-600",     monthly: "0円" },
    standard: { label: "標準（Standard）",       color: "bg-emerald-100 text-emerald-700", monthly: "30,000円/月" },
    sponsor:  { label: "PR枠（Sponsor）",        color: "bg-amber-100 text-amber-700",   monthly: "100,000円/月" },
};

export default async function ContractDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const contract = await prisma.contract.findUnique({
        where: { id },
        include: { temple: { select: { id: true, name: true, prefecture: true } } },
    });

    if (!contract) return notFound();

    const plan = PLAN_LABELS[contract.planType] ?? { label: contract.planType, color: "bg-gray-100 text-gray-600", monthly: "---" };

    const fields = [
        { icon: Building, label: "施設名",       value: contract.temple?.name || contract.templeId },
        { icon: User,     label: "担当者",       value: `${contract.representativeName}（${contract.representativeTitle}）` },
        { icon: Mail,     label: "連絡先",       value: contract.contactEmail },
        { icon: Calendar, label: "契約締結日",   value: contract.agreedAt.toLocaleString("ja-JP") },
        { icon: Shield,   label: "IPアドレス",   value: contract.agreedIp },
        { icon: Hash,     label: "契約バージョン", value: contract.contractVersion },
        { icon: Hash,     label: "契約ハッシュ(SHA-256)", value: contract.contractHash },
    ];

    if (contract.terminatedAt) {
        fields.push({ icon: XCircle, label: "解約日", value: contract.terminatedAt.toLocaleString("ja-JP") });
    }

    return (
        <div className="space-y-6 max-w-3xl">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/admin/contracts"
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> 契約一覧に戻る
                </Link>
            </div>
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-primary" /> 契約詳細
                    </h1>
                    <p className="text-xs text-gray-400 font-mono mt-1">{contract.id}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <ContractStatusBadge status={contract.status} contractId={contract.id} />
                    {contract.temple && (
                        <Link
                            href={`/admin/temples/${contract.temple.id}/edit`}
                            className="text-xs text-primary hover:underline"
                        >
                            施設編集ページを開く →
                        </Link>
                    )}
                </div>
            </div>

            {/* Plan Card */}
            <div className={`rounded-xl border-2 p-5 flex items-center gap-5 ${contract.planType === "sponsor" ? "border-amber-300 bg-amber-50" : contract.planType === "standard" ? "border-emerald-300 bg-emerald-50" : "border-gray-200 bg-gray-50"}`}>
                <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">適用プラン</p>
                    <span className={`inline-block text-sm font-bold px-3 py-1 rounded-full ${plan.color}`}>
                        {plan.label}
                    </span>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400">月額</p>
                    <p className="text-xl font-bold text-gray-800">{plan.monthly}</p>
                </div>
            </div>

            {/* Fields */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-100">
                {fields.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4 px-6 py-4">
                        <Icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                            <p className={`text-sm font-medium text-gray-800 ${label.includes("ハッシュ") ? "font-mono text-xs break-all" : ""}`}>
                                {value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Integrity Note */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-700 leading-relaxed">
                <p className="font-bold mb-1 flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> 電子契約の完全性について</p>
                契約締結時の内容は SHA-256 ハッシュで記録されています。原本の改ざんがないことを検証できます。
                締結時の IP アドレスは電子署名の証跡として保管されます。
            </div>

            {/* Action: 解約済の場合は再有効化不可メモ */}
            {contract.status === "terminated" && (
                <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <XCircle className="w-4 h-4 shrink-0" />
                    この契約は解約済みです。再有効化が必要な場合は新規申込が必要です。
                </div>
            )}
            {contract.status === "active" && (
                <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    有効な契約です。ステータス変更は一覧画面の「解約」ボタンから行えます。
                </div>
            )}
        </div>
    );
}
