import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getEmailFromCookie } from '@/lib/portal-auth'

export async function updateSession(request: NextRequest) {
    const isPortalPage = request.nextUrl.pathname.startsWith('/portal')
    const isLoginPage = request.nextUrl.pathname === '/portal/login'

    if (!isPortalPage) {
        return NextResponse.next({ request })
    }

    // Cookie ベースのセッション確認
    const email = getEmailFromCookie(request.headers.get('cookie'))

    if (!email && !isLoginPage) {
        const url = request.nextUrl.clone()
        url.pathname = '/portal/login'
        return NextResponse.redirect(url)
    }

    if (email && isLoginPage) {
        const url = request.nextUrl.clone()
        url.pathname = '/portal'
        return NextResponse.redirect(url)
    }

    return NextResponse.next({ request })
}
