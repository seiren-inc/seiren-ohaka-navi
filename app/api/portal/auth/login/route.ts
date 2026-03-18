/**
 * このルートは廃止済みです。
 * ポータルログインは app/portal/login/actions.ts (Server Action) で処理されます。
 * bcrypt + Cookie セッション方式に移行済みです。
 */
import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.json(
        { error: "このエンドポイントは廃止されました。/portal/login からログインしてください。" },
        { status: 410 }
    );
}
