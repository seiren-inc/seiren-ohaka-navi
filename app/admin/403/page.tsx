import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/app/components/ui/Button";

export default function ForbiddenPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                    <ShieldAlert className="w-8 h-8 text-red-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">アクセス権限がありません</h1>
                <p className="text-gray-600 mb-8">
                    ログインしたアカウントは管理者リストに含まれていません。<br />
                    正しいアカウントでログインし直してください。
                </p>
                <div className="space-y-4">
                    <Link href="/api/auth/logout" className="block w-full">
                        <Button variant="outline" className="w-full">
                            ログアウトして戻る
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
