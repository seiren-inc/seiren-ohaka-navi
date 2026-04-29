import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { setPortalSession } from "@/lib/portal-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "メールアドレスとパスワードを入力してください。" }, { status: 400 });
        }

        const templeUser = await prisma.templeUser.findUnique({ where: { email } });
        if (!templeUser || !templeUser.passwordHash) {
            return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません。" }, { status: 401 });
        }

        const isValidPassword = await bcrypt.compare(password, templeUser.passwordHash);
        if (!isValidPassword) {
            return NextResponse.json({ error: "メールアドレスまたはパスワードが正しくありません。" }, { status: 401 });
        }

        if (!templeUser.templeId) {
            return NextResponse.json({ error: "このアカウントは施設ポータルにアクセスできません。" }, { status: 403 });
        }

        await setPortalSession(email);

        await prisma.templeUser.update({
            where: { id: templeUser.id },
            data: { lastLoginAt: new Date() },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("[portal/auth/login]", err);
        return NextResponse.json({ error: "ログイン処理中にエラーが発生しました。" }, { status: 500 });
    }
}
