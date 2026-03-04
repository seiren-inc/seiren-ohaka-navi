/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { FileText, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PLAN_LABELS: Record<string, string> = {
    free: "無料プラン（Free）",
    standard: "標準プラン（Standard）",
    sponsor: "PR枠プラン（Sponsor）",
};

export default async function PortalContractPage() {
    const cookieStore = await cookies();
    const email = cookieStore.get("portal_session")?.value;

    if (!email) {
        return (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
                <p className="text-gray-500">ログインが必要です。</p>
                <Link href="/portal/login" className="px-6 py-2.5 bg-primary text-white rounded-lg font-bold text-sm">
                    ログインページへ
                </Link>
            </div>
        );
    }

    const user = await prisma.templeUser.findUnique({
        where: { email },
        include: {
            temple: {
                include: {
                    contracts: { orderBy: { agreedAt: "desc" } },
                },
            },
        },
    });

    if (!user) return <p className="text-gray-400 py-12 text-center">アカウントが見つかりません。</p>;

    const contracts = user.temple.contracts;

    return (
        <div className="space-y-6 max-w-3xl">
            <div>
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-primary" /> 契約・プラン
                </h1>
                <p className="text-gray-500 text-sm mt-1">現在の契約内容と掲載プランを確認できます</p>
            </div>

            {contracts.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                    <p className="text-gray-400">契約情報がありません。</p>
                    <Link href="/apply" className="mt-4 inline-block text-primary hover:underline text-sm font-bold">
                        掲載申込ページへ
                    </Link>
                </div>
            ) : (
                contracts.map((contract: any) => (
                    <div key={contract.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded border ${contract.status === "active" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-gray-400 bg-gray-50 border-gray-200"}`}>
                                    {contract.status === "active"
                                        ? <><CheckCircle2 className="w-3 h-3" /> 有効</>
                                        : <><Clock className="w-3 h-3" /> 解約済</>
                                    }
                                </span>
                            </div>
                            <span className="text-xs text-gray-400 font-mono">{contract.id}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-y-3 text-sm">
                            {[
                                ["掲載プラン", PLAN_LABELS[contract.planType] || contract.planType],
                                ["契約締結日", new Date(contract.agreedAt).toLocaleDateString("ja-JP")],
                                ["担当者", `${contract.representativeName}（${contract.representativeTitle}）`],
                                ["連絡先", contract.contactEmail],
                                ["契約バージョン", contract.contractVersion],
                            ].map(([label, value]) => (
                                <div key={label}>
                                    <span className="text-xs text-gray-400 block">{label}</span>
                                    <span className="font-medium text-gray-800">{value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-xs text-gray-400">
                                プラン変更・解約のご相談は <a href="mailto:admin@seiren.ne.jp" className="text-primary underline">admin@seiren.ne.jp</a> まで
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
