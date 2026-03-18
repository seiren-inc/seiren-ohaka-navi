'use client'

import { useState } from 'react'
import { login } from './actions'
import { Loader2, AlertCircle } from 'lucide-react'

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState<string | null>(null)

    // FormData を受け取る Server Action を onClick ではなく form アクションとして使う
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center flex-col items-center">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center rounded-xl shadow-sm mb-4">
                        <span className="text-white font-black text-xl">S</span>
                    </div>
                    <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                        清蓮 お墓探しナビ
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 font-bold tracking-widest">
                        施設向けポータル
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-2xl sm:px-10 border border-gray-100">
                    <form 
                        action={async (formData) => {
                            setLoading(true)
                            setErrorMsg(null)
                            try {
                                const res = await login(formData)
                                if (res?.error) {
                                    setErrorMsg(res.error)
                                }
                            } catch (err) {
                                setErrorMsg('システムエラーが発生しました')
                            } finally {
                                setLoading(false)
                            }
                        }} 
                        className="space-y-6"
                    >
                        {errorMsg && (
                            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm flex items-start gap-2">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                <span>{errorMsg}</span>
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                ログインID (Email)
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2.5 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                    placeholder="temple@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700">
                                パスワード
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2.5 placeholder-gray-400 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center items-center gap-2 rounded-lg border border-transparent bg-primary py-2.5 px-4 text-sm font-bold text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 transition-colors"
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {loading ? 'ログイン中...' : 'ログイン'}
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">お困りの場合</span>
                            </div>
                        </div>
                        <div className="mt-6 text-center text-sm">
                            <p className="text-gray-500">
                                パスワードを忘れた場合やログインできない場合は、<br />
                                運営事務局までお問い合わせください。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
