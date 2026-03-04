import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(req: NextRequest) {
    try {
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
