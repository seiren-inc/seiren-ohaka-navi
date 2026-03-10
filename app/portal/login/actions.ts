'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'メールアドレスとパスワードを入力してください' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    if (error.message.includes('Invalid login credentials')) {
      return { error: 'メールアドレスまたはパスワードが正しくありません' }
    }
    return { error: 'ログインエラーが発生しました' }
  }

  // TempleUser の最終ログイン日時を更新
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await prisma.templeUser.updateMany({
        where: { supabaseUid: user.id },
        data: { lastLoginAt: new Date() }
      })
    }
  } catch (err) {
    console.error('Failed to update last login:', err)
  }

  revalidatePath('/portal')
  redirect('/portal')
}
