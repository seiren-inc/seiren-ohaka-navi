"use client";
import { useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export function ContractStatusBadge({ status, contractId }: { status: string; contractId: string }) {
    const [current, setCurrent] = useState(status);
    const [loading, setLoading] = useState(false);

    const terminate = async () => {
        if (!confirm("この契約を解約済みにしますか？")) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/contracts/${contractId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "terminated" }),
            });
            if (res.ok) setCurrent("terminated");
            else alert("更新に失敗しました。");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader2 className="w-4 h-4 animate-spin text-gray-400 mx-auto" />;

    if (current === "active") {
        return (
            <div className="flex flex-col items-center gap-1">
                <span className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">
                    <CheckCircle2 className="w-3 h-3" /> 有効
                </span>
                <button onClick={terminate} className="text-xs text-gray-400 hover:text-red-500 underline">解約</button>
            </div>
        );
    }

    return (
        <span className="flex items-center gap-1 bg-gray-100 text-gray-400 px-2 py-0.5 rounded text-xs font-bold">
            <XCircle className="w-3 h-3" /> 解約済
        </span>
    );
}
