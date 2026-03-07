export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ContractApplyForm } from "../../ContractApplyForm";

export default async function ContractApplyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const temple = await prisma.temple.findUnique({
        where: { id },
        select: { id: true, name: true },
    });
    if (!temple) notFound();

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">掲載申込</h1>
                <p className="text-sm text-gray-500 mt-1">{temple.name} の掲載サービス利用規約に基づく契約を申し込みます。</p>
            </div>
            <ContractApplyForm templeId={temple.id} templeName={temple.name} />
        </div>
    );
}
