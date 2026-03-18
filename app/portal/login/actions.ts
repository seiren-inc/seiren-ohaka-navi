'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { setPortalSession } from '@/lib/portal-auth'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'メールアドレスとパスワードを入力してください' }
    }

    // TempleUser を email で検索
    const templeUser = await prisma.templeUser.findUnique({ where: { email } })

    if (!templeUser) {
        return { error: 'メールアドレスまたはパスワードが正しくありません' }
    }

    // 新方式: passwordHash で検証
    if (templeUser.passwordHash) {
        const valid = await bcrypt.compare(password, templeUser.passwordHash)
        if (!valid) {
            return { error: 'メールアドレスまたはパスワードが正しくありません' }
        }
    } else {
        // passwordHash 未設定のユーザーは初回設定を促す
        return {
            error: 'パスワードが設定されていません。管理者にお問い合わせください（admin@seiren.ne.jp）'
        }
    }

    // Cookie セッションを設定
    await setPortalSession(email)

    // 最終ログイン日時を更新
    try {
        await prisma.templeUser.update({
            where: { email },
            data: { lastLoginAt: new Date() }
        })
    } catch (err) {
        console.error('Failed to update last login:', err)
    }

    revalidatePath('/portal')
    redirect('/portal')
}
