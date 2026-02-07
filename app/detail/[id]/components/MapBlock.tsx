import { MapPin } from "lucide-react";

interface MapBlockProps {
    address: string;
}

export function MapBlock({ address }: MapBlockProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="aspect-video w-full bg-gray-100 relative flex items-center justify-center">
                <p className="text-gray-400 font-bold">Google Map Placeholder</p>
                {/* 
                   In real implementation, use iframe or Google Maps API here.
                   <iframe src={`https://www.google.com/maps/embed/v1/place?key=API_KEY&q=${address}`} ... />
                */}
            </div>
            <div className="p-4 flex items-start">
                <MapPin className="w-5 h-5 text-warm-gold mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 font-bold">{address}</p>
            </div>
            <div className="px-4 pb-4">
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 text-xs font-bold text-seiren-navy border border-seiren-navy rounded hover:bg-seiren-navy hover:text-white transition-colors"
                >
                    Googleマップで開く
                </a>
            </div>
        </div>
    );
}
