import { TrendingUp, BarChart2, AlertCircle } from "lucide-react";

interface DataItem {
    label: string;
    value: string;
    note?: string;
}

interface PrimaryDataStatsProps {
    title: string;
    source: string;
    items: DataItem[];
}

export function PrimaryDataStats({ title, source, items }: PrimaryDataStatsProps) {
    return (
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 my-12">
            <div className="flex items-start gap-3 mb-6">
                <BarChart2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                    <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        出典：{source}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                        <p className="text-2xl font-bold text-primary font-serif">{item.value}</p>
                        {item.note && <p className="text-xs text-gray-500 mt-1">{item.note}</p>}
                    </div>
                ))}
            </div>
            <p className="text-xs text-gray-400 mt-4 text-right flex items-center justify-end gap-1">
                <TrendingUp className="w-3 h-3" />
                清蓮の相談実績データに基づく（参考値）
            </p>
        </div>
    );
}
