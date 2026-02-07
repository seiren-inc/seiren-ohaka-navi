export function JapanMap({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 800 600" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Simplified Map Silhouette - not geographically perfect but recognizable */}
            <path
                d="M600,50 L650,20 L720,50 L700,100 L650,120 L620,100 Z"
                fill="#AAD0D6"
                stroke="white"
                strokeWidth="2"
                className="hover:fill-primary transition-colors cursor-pointer"
            /> {/* Hokkaido */}

            <path
                d="M610,130 L660,130 L660,250 L610,250 Z"
                fill="#AAD0D6"
                stroke="white"
                strokeWidth="2"
                className="hover:fill-primary transition-colors cursor-pointer"
            /> {/* Tohoku */}

            <path
                d="M550,250 L610,250 L630,350 L570,350 Z"
                fill="#AAD0D6"
                stroke="white"
                strokeWidth="2"
                className="hover:fill-primary transition-colors cursor-pointer"
            /> {/* Kanto */}

            <path
                d="M480,240 L550,240 L570,340 L500,340 Z"
                fill="#AAD0D6"
                stroke="white"
                strokeWidth="2"
                className="hover:fill-primary transition-colors cursor-pointer"
            /> {/* Chubu */}

            <path
                d="M420,280 L480,280 L480,350 L420,350 Z"
                fill="#AAD0D6"
                stroke="white"
                strokeWidth="2"
                className="hover:fill-primary transition-colors cursor-pointer"
            /> {/* Kinki */}

            <path
                d="M340,280 L420,280 L410,330 L350,310 Z"
                fill="#AAD0D6"
                stroke="white"
                strokeWidth="2"
                className="hover:fill-primary transition-colors cursor-pointer"
            /> {/* Chugoku */}

            <path
                d="M360,330 L430,330 L420,370 L370,370 Z"
                fill="#AAD0D6"
                stroke="white"
                strokeWidth="2"
                className="hover:fill-primary transition-colors cursor-pointer"
            /> {/* Shikoku */}

            <path
                d="M250,330 L340,330 L340,420 L270,410 Z"
                fill="#AAD0D6"
                stroke="white"
                strokeWidth="2"
                className="hover:fill-primary transition-colors cursor-pointer"
            /> {/* Kyushu */}

            <circle cx="200" cy="500" r="10" fill="#AAD0D6" className="hover:fill-primary transition-colors cursor-pointer" /> {/* Okinawa */}
        </svg>
    );
}
