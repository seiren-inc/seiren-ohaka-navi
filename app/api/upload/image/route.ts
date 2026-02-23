import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
    try {
        const supabase = await createClient()

        // 1. Auth Check
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 2. Parsed Whitelist Check
        const allowlist = (process.env.ADMIN_ALLOWLIST || "").split(",").map(e => e.trim());
        if (!allowlist.includes(user.email || "")) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // 3. Get Form Data
        const formData = await request.formData()
        const file = formData.get('file') as File
        const folder = formData.get('folder') as string || 'misc'

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        // 4. Validate File
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({
                success: false,
                error: { code: 'INVALID_FILE_TYPE', message: 'JPEG, PNG, WEBP のみアップロード可能です。' }
            }, { status: 400 })
        }

        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            return NextResponse.json({
                success: false,
                error: { code: 'FILE_TOO_LARGE', message: 'ファイルサイズは5MB以下にしてください。' }
            }, { status: 400 })
        }

        // 5. Generate Path
        const ext = file.name.split('.').pop()
        const filename = `${uuidv4()}.${ext}`
        const path = `${folder}/${filename}`

        // 6. Upload
        const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(path, file)

        if (uploadError) {
            console.error('[UPLOAD_FAIL]', uploadError)
            return NextResponse.json({
                success: false,
                error: { code: 'STORAGE_ERROR', message: 'ストレージへのアップロードに失敗しました。' }
            }, { status: 500 })
        }

        // 7. Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(path)

        console.log(`[UPLOAD_OK] user=${user.email} path=${path}`)

        return NextResponse.json({
            success: true,
            url: publicUrl,
            path: path,
            filename: filename
        })
    } catch (error) {
        console.error('[UPLOAD_FAIL] Internal Error:', error)
        return NextResponse.json({
            success: false,
            error: { code: 'INTERNAL_ERROR', message: 'サーバーエラーが発生しました。' }
        }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return NextResponse.json({
            success: false,
            error: { code: 'UNAUTHORIZED', message: '認証が必要です。' }
        }, { status: 401 })

        const { path } = await request.json()
        if (!path) return NextResponse.json({
            success: false,
            error: { code: 'MISSING_PATH', message: 'パスが必要です。' }
        }, { status: 400 })

        const { error } = await supabase.storage.from('media').remove([path])
        if (error) {
            console.error('[UPLOAD_ROLLBACK_FAIL]', error)
            return NextResponse.json({
                success: false,
                error: { code: 'STORAGE_DELETE_ERROR', message: 'ファイル削除に失敗しました。' }
            }, { status: 500 })
        }

        console.log(`[UPLOAD_ROLLBACK_OK] user=${user.email} path=${path}`)
        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({
            success: false,
            error: { code: 'INTERNAL_ERROR', message: 'サーバーエラーが発生しました。' }
        }, { status: 500 })
    }
}
