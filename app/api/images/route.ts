import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

/**
 * 画像削除 API
 * seiren-platform の Supabase Storage を使用します。
 * NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY 環境変数は
 * seiren-platform を指す値に設定してください。
 */
export async function DELETE(req: NextRequest) {
    try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const { path, bucket } = await req.json() as { path: string; bucket: string };
        if (!path || !bucket) {
            return NextResponse.json({ error: 'path と bucket は必須です' }, { status: 400 });
        }
        const { error } = await supabase.storage.from(bucket).remove([path]);
        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: String(e) }, { status: 500 });
    }
}
