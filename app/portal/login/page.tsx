"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, Eye, EyeOff, Building2 } from "lucide-react";

export default function PortalLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/portal/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "ログインに失敗しました。");
            window.location.href = "/portal/dashboard";
        } catch (err) {
            setError(err instanceof Error ? err.message : "エラーが発生しました。");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">施設管理ポータル</h1>
                    <p className="text-gray-500 text-sm mt-1">清蓮 お墓探しナビ</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">メールアドレス</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                placeholder="登録時のメールアドレス"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">パスワード</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm pr-10 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                    placeholder="パスワード"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{error}</p>
                        )}

                        <button type="submit" disabled={loading}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-lg font-bold hover:bg-primary-dark transition-colors disabled:opacity-50">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                            ログイン
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-100 text-center space-y-2">
                        <Link href="/portal/forgot-password" className="text-xs text-primary hover:underline block">
                            パスワードを忘れた方
                        </Link>
                        <p className="text-xs text-gray-400">
                            まだアカウントをお持ちでない方は{" "}
                            <Link href="/apply" className="text-primary hover:underline font-bold">掲載申込</Link>
                            {"　"}からどうぞ。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
