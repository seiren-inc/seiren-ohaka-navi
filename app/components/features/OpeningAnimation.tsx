"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { clsx } from "clsx";

export function OpeningAnimation() {
    const [stage, setStage] = useState<"start" | "feed-in" | "fade-out" | "bg-out" | "hidden">("start");

    useEffect(() => {
        // Logic to determine if animation should play
        const shouldPlayAnimation = () => {
            // 1. Get Navigation Type
            // @ts-expect-error - performance.getEntriesByType is valid but TS might complain about types
            const navEntries = typeof performance !== 'undefined' ? performance.getEntriesByType("navigation") : [];
            // @ts-expect-error - navEntries type lacks 'type' property in TS defs
            const navType = navEntries.length > 0 ? navEntries[0].type : "navigate";

            // 2. Check External Referrer
            let isExternal = false;
            if (typeof document !== 'undefined' && document.referrer) {
                try {
                    // Check if referrer origin is different from current origin
                    isExternal = new URL(document.referrer).origin !== window.location.origin;
                } catch (e) {
                    // Ignore URL parsing errors
                }
            } else if (typeof document !== 'undefined' && !document.referrer) {
                // No referrer usually means direct entry (often treated as external/new session)
                isExternal = true;
            }

            // 3. Check Session Storage
            const seen = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem("seiren_opening_seen") === "1" : false;

            // 4. Decision
            // Play if:
            // - Reload
            // - OR (Right navigation type AND External flow AND Not seen yet)
            if (navType === "reload") return true;
            if (navType === "navigate" && isExternal && !seen) return true;

            // Allow direct access (no referrer) to play once per session
            if (navType === "navigate" && !document.referrer && !seen) return true;

            return false;
        };

        if (!shouldPlayAnimation()) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStage("hidden");
            return;
        }

        // Mark as seen for this session
        if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem("seiren_opening_seen", "1");
        }

        // Play Animation Sequence
        const timer1 = setTimeout(() => setStage("feed-in"), 100);
        const timer2 = setTimeout(() => setStage("fade-out"), 2400);
        const timer3 = setTimeout(() => setStage("bg-out"), 3900);
        const timer4 = setTimeout(() => setStage("hidden"), 5000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, []);

    if (stage === "hidden") return null;

    return (
        <div
            className={clsx(
                "fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-1000 ease-in-out pointer-events-none",
                stage === "bg-out" ? "opacity-0" : "opacity-100"
            )}
        >
            <div
                className={clsx(
                    "relative transition-opacity duration-[1500ms] ease-in-out",
                    stage === "feed-in" ? "opacity-100" : "opacity-0"
                )}
            >
                <Image
                    src="/logo.png"
                    alt="Seiren Logo"
                    width={180}
                    height={72}
                    className="h-auto w-auto object-contain"
                    priority
                />
            </div>
        </div>
    );
}
