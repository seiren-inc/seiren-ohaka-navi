"use client";

import { Button } from "../../ui/Button";
import { FileText, CalendarCheck } from "lucide-react";
import Link from "next/link";
import { Temple } from "@/lib/store";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface StickyCTAProps {
    temple: Temple;
}

export function StickyCTA({ temple }: StickyCTAProps) {
    const [currentUrl, setCurrentUrl] = useState("");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => { if (typeof window !== 'undefined') setCurrentUrl(window.location.href); }, []);

    // Default context is just the temple. Plan context is handled by PlanList specific buttons.
    const requestUrl = `/consult/request-material?templeId=${temple.id}&templeName=${encodeURIComponent(temple.name)}&ref=sticky&refUrl=${encodeURIComponent(currentUrl)}`;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] z-50 md:hidden pb-6">
            <div className="flex gap-3 max-w-lg mx-auto">
                {/* Secondary: Visit */}
                <Link href={requestUrl} className="flex-1">
                    <Button variant="outline" className="w-full h-12 border-primary text-primary font-bold text-xs px-1">
                        <CalendarCheck className="w-4 h-4 mr-1" /> 見学・相談
                    </Button>
                </Link>

                {/* Primary: Request Material */}
                <Link href={requestUrl} className="flex-[2]">
                    <Button className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md">
                        <FileText className="w-4 h-4 mr-1" /> 資料請求（無料）
                    </Button>
                </Link>
            </div>
        </div>
    );
}
