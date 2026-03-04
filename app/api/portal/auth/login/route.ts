import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "メールアドレスとパスワードを入力してください。" }, { status: 400 });
        }

        // Supabase Auth でサインイン
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError || !authData.user) {
            return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません。" }, { status: 401 });
        }

        // TempleUser の存在確認
        const templeUser = await prisma.templeUser.findUnique({ where: { email } });
        if (!templeUser) {
            return NextResponse.json({ error: "このアカウントは施設ポータルにアクセスできません。" }, { status: 403 });
        }

        // 最終ログイン日時を更新
        await prisma.templeUser.update({
            where: { id: templeUser.id },
            data: { lastLoginAt: new Date() },
        });

        // セッション Cookie を設定（簡易実装：本番では Supabase Auth セッションを使用）
        const res = NextResponse.json({ success: true });
        const cookieStore = await cookies();
        cookieStore.set("portal_session", email, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 7, // 7日
            path: "/",
            sameSite: "lax",
        });

        return res;
    } catch (err) {
        console.error("[portal/auth/login]", err);
        return NextResponse.json({ error: "ログイン処理中にエラーが発生しました。" }, { status: 500 });
    }
}
