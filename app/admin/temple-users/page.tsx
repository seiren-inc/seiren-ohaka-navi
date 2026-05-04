"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, Plus, CheckCircle2, ShieldAlert, Loader2, Key, Search } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/app/components/admin/Toast";

interface TempleUser {
    id: string;
    templeId: string;
    email: string;
    supabaseUid: string | null;
    name: string;
    title: string | null;
    status: string;
    lastLoginAt: string | null;
    createdAt: string;
    temple: { name: string };
}

export default function TempleUsersPage() {
    const [users, setUsers] = useState<TempleUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const { toast } = useToast();

    const fetchUsers = useCallback(() => {
        setLoading(true);
        fetch("/api/admin/temple-users")
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => {
                toast("アカウントの取得に失敗しました", "error");
                setLoading(false);
            });
    }, [toast]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const filteredUsers = users.filter(u =>
        u.name.includes(search) || u.email.includes(search) || u.temple.name.includes(search)
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Users className="w-6 h-6 text-primary" /> 寺院アカウント
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">施設向けポータルへログインするためのアカウント管理</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary-dark transition-colors"
                >
                    <Plus className="w-4 h-4" /> アカウント発行
                </button>
            </div>

            {/* Filter */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="氏名・メール・施設名で検索"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b flex items-center justify-between">
                    <h2 className="font-bold text-gray-800">アカウント一覧</h2>
                    <span className="text-xs text-gray-400">{filteredUsers.length}件</span>
                </div>
                {loading ? (
                    <div className="py-12 flex justify-center"><Loader2 className="w-6 h-6 text-gray-400 animate-spin" /></div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b text-gray-500 text-xs uppercase">
                            <tr>
                                <th className="p-4 font-medium">氏名 / 役職</th>
                                <th className="p-4 font-medium">対象施設</th>
                                <th className="p-4 font-medium">Email (ログインID)</th>
                                <th className="p-4 font-medium">Supabase Auth</th>
                                <th className="p-4 font-medium">作成日 / 最終ログイン</th>
                                <th className="p-4 font-medium">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-gray-400">データがありません</td>
                                </tr>
                            ) : (
                                filteredUsers.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="p-4">
                                            <p className="font-bold text-gray-800">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.title || "役職なし"}</p>
                                        </td>
                                        <td className="p-4 font-bold text-primary">
                                            <Link href={`/admin/temples/${user.templeId}/edit`} className="hover:underline">
                                                {user.temple.name}
                                            </Link>
                                        </td>
                                        <td className="p-4 text-gray-600">{user.email}</td>
                                        <td className="p-4">
                                            {user.supabaseUid ? (
                                                <span className="inline-flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded font-bold">
                                                    <CheckCircle2 className="w-3 h-3" /> 連携済
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded font-bold">
                                                    <ShieldAlert className="w-3 h-3" /> 未連携
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-xs text-gray-500">
                                            <p>作: {new Date(user.createdAt).toLocaleDateString("ja-JP")}</p>
                                            <p>ロ: {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString("ja-JP") : "未ログイン"}</p>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-xs text-primary font-bold hover:underline">編集</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* 新規作成モーダル（簡易実装） */}
            {showModal && (
                <CreateUserModal
                    onClose={() => setShowModal(false)}
                    onSuccess={() => {
                        setShowModal(false);
                        fetchUsers();
                    }}
                />
            )}
        </div>
    );
}

function CreateUserModal({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
    const [form, setForm] = useState({ templeId: "", name: "", email: "", title: "" });
    const [loading, setLoading] = useState(false);
    const [temples, setTemples] = useState<{ id: string, name: string }[]>([]);
    const [result, setResult] = useState<{ email: string, password: string } | null>(null);

    useEffect(() => {
        // 対象の寺院を選択するためのリスト取得
        fetch("/api/admin/temples?limit=100") // 簡易的に100件取得
            .then(res => res.json())
            .then(data => setTemples(data.data || []));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/admin/temple-users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "エラーが発生しました");
            
            // パスワードを画面に表示するため保持
            setResult({ email: form.email, password: data.initialPassword });
        } catch (err) {
            alert(err instanceof Error ? err.message : 'エラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

    if (result) {
        return (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h2 className="text-xl font-bold text-center text-gray-800 mb-2">アカウント発行完了</h2>
                    <p className="text-sm text-gray-500 mb-6 text-center">以下の情報を施設担当者にお伝えください。このパスワードは二度と表示されません。</p>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 font-mono text-sm mb-6">
                        <div>
                            <span className="text-gray-400 text-xs">ログインURL</span>
                            <div className="font-bold text-primary">https://seiren-ohaka-navi.vercel.app/portal/login</div>
                        </div>
                        <div>
                            <span className="text-gray-400 text-xs">Email (ID)</span>
                            <div className="font-bold">{result.email}</div>
                        </div>
                        <div>
                            <span className="text-gray-400 text-xs">初期パスワード</span>
                            <div className="flex items-center gap-2">
                                <Key className="w-4 h-4 text-emerald-600" />
                                <span className="font-bold text-lg tracking-wider text-emerald-700">{result.password}</span>
                            </div>
                        </div>
                    </div>

                    <button onClick={onSuccess} className="w-full bg-primary text-white py-2.5 rounded-lg font-bold hover:bg-primary-dark">
                        閉じる
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="font-bold text-gray-800">寺院アカウント発行</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">対象の施設</label>
                        <select
                            required
                            value={form.templeId}
                            onChange={e => setForm({ ...form, templeId: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                        >
                            <option value="">選択してください</option>
                            {temples.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">担当者氏名</label>
                        <input
                            required
                            type="text"
                            placeholder="山田 太郎"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">役職</label>
                        <input
                            type="text"
                            placeholder="住職"
                            value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">ログイン用メールアドレス</label>
                        <input
                            required
                            type="email"
                            placeholder="temple@example.com"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 border border-gray-300 py-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50">キャンセル</button>
                        <button type="submit" disabled={loading} className="flex-[2] bg-primary text-white py-2 rounded-lg text-sm font-bold hover:bg-primary-dark disabled:opacity-50">
                            {loading ? "発行中..." : "アカウントを発行する"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
