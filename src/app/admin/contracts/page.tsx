/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { FileText, CheckCircle2, XCircle, Download, Clock } from "lucide-react";
import Link from "next/link";
import { ContractStatusBadge } from "./ContractStatusBadge";

export const dynamic = "force-dynamic";

const PLAN_LABELS: Record<string, string> = {
    free: "無料 (Free)",
    standard: "標準 (Standard)",
    sponsor: "PR枠 (Sponsor)",
};

export default async function ContractsPage() {
    const contracts = await prisma.contract.findMany({
        orderBy: { createdAt: "desc" },
        include: { temple: { select: { name: true } } },
    });

    const summary = {
        total: contracts.length,
        active: contracts.filter(c => c.status === "active").length,
        terminated: contracts.filter(c => c.status === "terminated").length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FileText className="w-6 h-6 text-primary" /> 掲載契約管理
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">施設との掲載契約の締結状況・ステータス管理</p>
                </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "総契約数", value: summary.total, icon: FileText, color: "text-primary", bg: "bg-primary/5" },
                    { label: "有効", value: summary.active, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
                    { label: "解約済", value: summary.terminated, icon: XCircle, color: "text-gray-400", bg: "bg-gray-50" },
                ].map(card => (
                    <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                            <card.icon className={`w-5 h-5 ${card.color}`} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500">{card.label}</p>
                            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b flex items-center justify-between">
                    <h2 className="font-bold text-gray-800">契約一覧</h2>
                    <span className="text-xs text-gray-400">{contracts.length}件</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                            <tr>
                                <th className="px-5 py-3 text-left">施設名</th>
                                <th className="px-4 py-3 text-left">担当者</th>
                                <th className="px-4 py-3 text-left">プラン</th>
                                <th className="px-4 py-3 text-left">締結日</th>
                                <th className="px-4 py-3 text-center">ステータス</th>
                                <th className="px-4 py-3 text-left">連絡先</th>
                                <th className="px-4 py-3" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {contracts.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-gray-400">
                                        まだ契約はありません。
                                    </td>
                                </tr>
                            ) : (
                                contracts.map(contract => (
                                    <tr key={contract.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-3.5 font-bold text-gray-800">
                                            {(contract as any).temple?.name || contract.templeId}
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <p className="font-medium">{contract.representativeName}</p>
                                            <p className="text-xs text-gray-400">{contract.representativeTitle}</p>
                                        </td>
                                        <td className="px-4 py-3.5">
                                            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">
                                                {PLAN_LABELS[contract.planType] || contract.planType}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3.5 text-gray-600 text-xs">
                                            {contract.agreedAt.toLocaleDateString("ja-JP")}
                                        </td>
                                        <td className="px-4 py-3.5 text-center">
                                            <ContractStatusBadge status={contract.status} contractId={contract.id} />
                                        </td>
                                        <td className="px-4 py-3.5 text-xs text-gray-500">
                                            {contract.contactEmail}
                                        </td>
                                        <td className="px-4 py-3.5 text-right">
                                            <Link
                                                href={`/admin/contracts/${contract.id}`}
                                                className="text-primary hover:underline text-xs font-bold"
                                            >
                                                詳細
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
