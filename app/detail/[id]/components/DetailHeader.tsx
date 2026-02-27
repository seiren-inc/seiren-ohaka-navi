import { MapPin, Star } from "lucide-react";
import { FacilityDetail } from "../mock";

interface DetailHeaderProps {
    data: FacilityDetail;
}

export function DetailHeader({ data }: DetailHeaderProps) {
    return (
        <div className="bg-white p-4 md:p-6 mb-4">
            {/* Chips */}
            <div className="flex flex-wrap gap-2 mb-3">
                {data.typeBadges.map(badge => (
                    <span key={badge} className="bg-bg text-text-secondary text-xs px-2 py-1 rounded">
                        {badge}
                    </span>
                ))}
            </div>

            {/* Title */}
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
                {data.name}
            </h1>
            {data.ruby && (
                <p className="text-xs text-text-muted mb-3">{data.ruby}</p>
            )}

            {/* Rating & Access */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4 pb-4 border-b border-border">
                <div className="flex items-center">
                    <div className="flex text-warm-gold mr-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < Math.floor(data.rating.score) ? 'fill-current' : 'text-text-muted'}`} />
                        ))}
                    </div>
                    <span className="text-lg font-bold text-primary mr-1">{data.rating.score}</span>
                    <span className="text-xs text-text-muted">({data.rating.count}件)</span>
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                    <MapPin className="w-4 h-4 mr-1 text-text-muted" />
                    {data.access}
                </div>
            </div>

            {/* Price Summary */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                {Object.entries(data.minPrice).map(([type, price]) => (
                    <div key={type} className="flex items-baseline">
                        <span className="text-xs text-text-muted mr-2">{type}</span>
                        <span className="text-lg font-bold text-warm-gold">
                            {price >= 10000 ? `${price / 10000}万円` : `${price.toLocaleString()}円`}
                        </span>
                        <span className="text-xs text-text-muted ml-1">から</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
