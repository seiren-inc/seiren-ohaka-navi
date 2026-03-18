/**
 * ポータル認証ヘルパー
 * Supabase Auth の代替として Cookie セッションで施設ユーザーを管理する
 */

import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

const COOKIE_NAME = 'portal_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7日

/** Cookie からログイン中の TempleUser を取得する */
export async function getPortalUser() {
    const cookieStore = await cookies()
    const email = cookieStore.get(COOKIE_NAME)?.value

    if (!email) return null

    return prisma.templeUser.findUnique({
        where: { email },
        include: { temple: { select: { id: true, name: true, address: true } } },
    })
}

/** Cookie にセッションを設定する */
export async function setPortalSession(email: string) {
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: COOKIE_MAX_AGE,
        path: '/',
        sameSite: 'lax',
    })
}

/** Cookie セッションを削除する */
export async function clearPortalSession() {
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_NAME)
}

/** リクエストオブジェクト（middleware 用）から Cookie を読む */
export function getEmailFromCookie(cookieHeader: string | null): string | null {
    if (!cookieHeader) return null
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`))
    return match ? decodeURIComponent(match[1]) : null
}
