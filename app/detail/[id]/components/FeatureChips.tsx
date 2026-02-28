import { CheckCircle2 } from "lucide-react";

interface FeatureChipsProps {
    features: string[];
}

export function FeatureChips({ features }: FeatureChipsProps) {
    return (
        <div className="flex flex-wrap gap-3">
            {features.map((feature, idx) => (
                <div key={idx} className="flex items-center bg-white border border-secondary/20 rounded-full px-4 py-2 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-secondary mr-2" />
                    <span className="text-sm font-bold text-seiren-navy">{feature}</span>
                </div>
            ))}
        </div>
    );
}
