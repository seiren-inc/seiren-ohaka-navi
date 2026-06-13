"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // 本番では監視サービスへ送信する想定（現状はコンソール出力）
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg text-text px-4">
            <main id="main-content" className="w-full max-w-lg text-center">
                <p className="text-sm font-bold tracking-widest text-primary">ERROR</p>
                <h1 className="mt-4 text-2xl md:text-3xl font-bold text-forest">
                    問題が発生しました
                </h1>
                <p className="mt-4 text-text-muted leading-relaxed">
                    ご不便をおかけして申し訳ございません。
                    時間をおいて再度お試しいただくか、トップページからアクセスしてください。
                </p>

                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={reset}
                        className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-base font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg"
                    >
                        再読み込み
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-xl border-2 border-border px-8 py-3 text-base font-bold text-text transition-all hover:border-primary hover:text-primary"
                    >
                        トップページへ戻る
                    </Link>
                </div>
            </main>
        </div>
    );
}
