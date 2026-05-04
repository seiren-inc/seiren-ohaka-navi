import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 保護対象パス
// /admin/* : 管理画面UI（Basic認証）
// /api/inquiries GET・PATCH・DELETE : 問い合わせ管理API
// /api/temples PATCH : ステータス変更API
// /api/inquiries/export : CSVエクスポート
// /api/images DELETE : 画像削除

const ADMIN_API_PATTERNS = [
    /^\/api\/inquiries(\/|$)/,
    /^\/api\/temples\/[^/]+$/,
    /^\/api\/images$/,
];

function isAdminApi(pathname: string) {
    return ADMIN_API_PATTERNS.some(p => p.test(pathname));
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // /portal 配下 - Cookie セッションチェック（インライン）
    if (pathname.startsWith('/portal')) {
        const requestHeaders = new Headers(req.headers)
        requestHeaders.set('x-pathname', pathname)

        if (!pathname.startsWith('/portal/login')) {
            const session = req.cookies.get('portal_session');
            if (!session?.value) {
                const loginUrl = new URL('/portal/login', req.url);
                return NextResponse.redirect(loginUrl);
            }
        }
        return NextResponse.next({ request: { headers: requestHeaders } });
    }

    // 公開フォームからの問い合わせ POST は認証不要
    if (pathname === '/api/inquiries' && req.method === 'POST') {
        return NextResponse.next();
    }

    const isAdminPage = pathname.startsWith('/admin');
    const isProtectedApi = isAdminApi(pathname);

    if (isAdminPage || isProtectedApi) {
        const basicAuth = req.headers.get('authorization');

        const adminUser = process.env.ADMIN_USER;
        const adminPwd = process.env.ADMIN_PASSWORD;

        if (basicAuth && adminUser && adminPwd) {
            try {
                const authValue = basicAuth.split(' ')[1];
                const [user, pwd] = atob(authValue).split(':');
                if (user === adminUser && pwd === adminPwd) {
                    return NextResponse.next();
                }
            } catch {
                // invalid base64
            }
        }

        return new NextResponse('Auth Required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Seiren Admin"',
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/portal/:path*',
        '/admin/:path*',
        '/api/inquiries/:path*',
        '/api/inquiries',
        '/api/temples/:path*',
        '/api/images',
    ],
};
