import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const users = await prisma.templeUser.findMany({
        include: {
            temple: { select: { name: true } }
        },
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { templeId, email, name, title } = body;

        if (!templeId || !email || !name) {
            return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
        }

        // 既存チェック
        const existing = await prisma.templeUser.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "このメールアドレスは既に登録されています" }, { status: 400 });
        }

        // 初期パスワード生成 (ランダム8文字)
        const initialPassword = crypto.randomBytes(4).toString('hex');

        // bcrypt でハッシュ化して保存
        const passwordHash = await bcrypt.hash(initialPassword, 12);

        const user = await prisma.templeUser.create({
            data: {
                templeId,
                email,
                name,
                title,
                passwordHash,
                status: "active",
            }
        });

        // パスワードはDBには平文で保存せず、ここでだけ返して画面に表示
        return NextResponse.json({ ...user, initialPassword });
    } catch (err) {
        console.error("[temple-users/post]", err);
        return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
    }
}
