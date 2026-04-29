"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

/**
 * Premium Opening Animation
 * 
 * Sequence:
 *   0ms   → 白背景で待機
 *   200ms → ロゴが scale + opacity でふわっと登場
 *   1600ms → サブテキスト（キャッチコピー）がスライドアップで登場
 *   3200ms → ロゴ＋テキストがフェードアウト
 *   4200ms → 白背景が上方向にスライドして退場（カーテンオープン風）
 *   5200ms → DOM完全削除
 */
export function OpeningAnimation() {
    const [stage, setStage] = useState<
        "wait" | "logo-in" | "text-in" | "content-out" | "curtain-up" | "hidden"
    >("wait");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const shouldPlayAnimation = () => {
            if (typeof window === "undefined") return false;
            const navEntries = performance.getEntriesByType("navigation");
            // @ts-expect-error - navEntries type lacks 'type' property in TS defs
            const navType = navEntries.length > 0 ? navEntries[0].type : "navigate";

            let isExternal = false;
            if (document.referrer) {
                try {
                    isExternal = new URL(document.referrer).origin !== window.location.origin;
                } catch {
                    // Ignore URL parsing errors
                }
            } else {
                isExternal = true;
            }

            const seen = sessionStorage.getItem("seiren_opening_seen") === "1";

            if (navType === "reload") return true;
            if (navType === "navigate" && isExternal && !seen) return true;
            if (navType === "navigate" && !document.referrer && !seen) return true;

            return false;
        };

        if (!shouldPlayAnimation()) {
            setStage("hidden");
            return;
        }

        sessionStorage.setItem("seiren_opening_seen", "1");

        // Animation timeline
        const timers = [
            setTimeout(() => setStage("logo-in"), 200),
            setTimeout(() => setStage("text-in"), 1600),
            setTimeout(() => setStage("content-out"), 3200),
            setTimeout(() => setStage("curtain-up"), 4200),
            setTimeout(() => setStage("hidden"), 5200),
        ];

        return () => timers.forEach(clearTimeout);
    }, []);

    if (stage === "hidden") return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] pointer-events-none"
            aria-hidden="true"
        >
            {/* White curtain background */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "#ffffff",
                    transition: "transform 1000ms cubic-bezier(0.76, 0, 0.24, 1)",
                    transform: stage === "curtain-up" ? "translateY(-100%)" : "translateY(0)",
                }}
            />

            {/* Center content container */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    opacity: stage === "content-out" || stage === "curtain-up" ? 0 : 1,
                    transition: "opacity 800ms ease-in-out",
                }}
            >
                {/* Logo — scale + fade entrance */}
                <div
                    style={{
                        opacity: stage === "wait" ? 0 : 1,
                        transform: stage === "wait" ? "scale(0.85)" : "scale(1)",
                        transition:
                            "opacity 1200ms cubic-bezier(0.16, 1, 0.3, 1), transform 1200ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <Image
                        src="/seiren-logo-v2.png"
                        alt="Seiren Logo"
                        width={180}
                        height={180}
                        className="h-auto w-auto object-contain"
                        priority
                    />
                </div>

                {/* Subtle tagline — slide up + fade */}
                <div
                    style={{
                        opacity: stage === "text-in" ? 1 : 0,
                        transform:
                            stage === "text-in"
                                ? "translateY(0)"
                                : "translateY(12px)",
                        transition:
                            "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <p
                        style={{
                            fontSize: "13px",
                            letterSpacing: "0.15em",
                            color: "#999999",
                            fontWeight: 400,
                            margin: 0,
                        }}
                    >
                        理想の供養を、一緒に見つける。
                    </p>
                </div>

                {/* Decorative line — width grow animation */}
                <div
                    style={{
                        width: stage === "text-in" ? "60px" : "0px",
                        height: "1px",
                        backgroundColor: "#d4cfc7",
                        transition: "width 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
                        transitionDelay: "200ms",
                    }}
                />
            </div>
        </div>
    );
}
