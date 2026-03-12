import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@seiren.ne.jp";
const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const kind = searchParams.get('kind')

    const inquiries = await prisma.inquiry.findMany({
      where: {
        ...(status ? { status } : {}),
        ...(kind ? { kind } : {}),
      },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(inquiries)
  } catch (error) {
    console.error('[API/inquiries GET]', error)
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id: _id, ...rest } = body

    const receiptNumber = `R-${Date.now().toString().slice(-6)}`

    const inquiry = await prisma.inquiry.create({
      data: {
        ...rest,
        receiptNumber: body.receiptNumber ?? receiptNumber,
        status: body.status ?? 'new',
      },
    })

    console.log('[API/inquiries] 保存成功:', inquiry.id, inquiry.receiptNumber)

    // Send emails if Resend API Key is available
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const userEmail = body.user?.email || body.email;
        const userName = body.user?.name || body.name || "お客様";
        const targetFacility = body.context?.templeName || "お墓探しナビ サポートセンター";
        
        // 1. ユーザーへの控えメール
        if (userEmail) {
           await resend.emails.send({
              from: FROM_EMAIL,
              to: [userEmail],
              subject: `【お墓探しナビ】お問い合わせを受け付けました（${targetFacility}）`,
              html: buildUserEmailHtml(body, receiptNumber),
           });
        }

        // 2. 運営（管理者）への通知メール
        await resend.emails.send({
            from: FROM_EMAIL,
            to: [ADMIN_EMAIL],
            subject: `【新規お問い合わせ】${userName}様より資料請求・相談予約`,
            html: buildAdminEmailHtml(body, receiptNumber),
        });
        
        console.log('[API/inquiries] メール送信完了');
      } catch (emailError) {
        console.error('[API/inquiries] メール送信に失敗しました:', emailError);
        // メール送信エラーは無視して、受付完了自体は返す
      }
    }

    return NextResponse.json({
      success: true,
      message: 'お問い合わせを受け付けました',
      receiptNumber: inquiry.receiptNumber,
      id: inquiry.id,
    }, { status: 201 })
  } catch (error) {
    console.error('[API/inquiries POST]', error)
    return NextResponse.json({ success: false, message: 'サーバーエラーが発生しました' }, { status: 500 })
  }
}

// --- HTML Email Templates ---

function generateDetailsTable(body: any, receiptNumber: string) {
    const u = body.user || body;
    const c = body.context || {};
    
    return `
    <table style="border-collapse: collapse; width: 100%; margin: 20px 0; font-size: 14px;">
      <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; color: #666; width: 140px;">受付番号</td><td style="padding: 10px; font-weight: bold;">${receiptNumber}</td></tr>
      <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; color: #666;">お問い合わせ対象</td><td style="padding: 10px; font-weight: bold;">${c.templeName ? c.templeName : '総合お問い合わせ'} ${c.planName ? '(' + c.planName + ')' : ''}</td></tr>
      <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; color: #666;">お名前</td><td style="padding: 10px;">${u.name || u.lastName + ' ' + u.firstName} 様</td></tr>
      <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; color: #666;">ふりがな</td><td style="padding: 10px;">${u.kana || u.lastNameKana + ' ' + u.firstNameKana}</td></tr>
      <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; color: #666;">電話番号</td><td style="padding: 10px;">${u.phone}</td></tr>
      <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; color: #666;">メールアドレス</td><td style="padding: 10px;">${u.email}</td></tr>
      <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; color: #666;">ご住所</td><td style="padding: 10px;">〒${u.zipCode}<br/>${u.address || (u.prefecture + u.city + u.addressLine + (u.building ? ' ' + u.building : ''))}</td></tr>
      ${body.visitDate ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; color: #666;">見学希望日</td><td style="padding: 10px;">${body.visitDate} ${body.visitTime || ''}</td></tr>` : ''}
      ${body.graveTypes?.length ? `<tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px; color: #666;">検討中のお墓</td><td style="padding: 10px;">${body.graveTypes.join(', ')}</td></tr>` : ''}
      ${body.message ? `<tr><td style="padding: 10px; color: #666;">備考・ご質問</td><td style="padding: 10px; white-space: pre-wrap;">${body.message}</td></tr>` : ''}
    </table>
    `;
}

function buildUserEmailHtml(body: any, receiptNumber: string) {
    const userName = body.user?.name || body.name || body.user?.lastName + ' ' + body.user?.firstName;
    return `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
  <div style="background: #2B5E73; padding: 24px 32px; border-radius: 8px 8px 0 0;">
    <p style="color: white; font-size: 20px; font-weight: bold; margin: 0;">お墓探しナビ</p>
    <p style="color: rgba(255,255,255,0.8); font-size: 13px; margin: 4px 0 0;">お問い合わせ受付完了のお知らせ</p>
  </div>
  <div style="padding: 32px; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px;">
    <p style="font-size: 16px;"><strong>${userName} 様</strong></p>
    <p>このたびは「お墓探しナビ」をご利用いただき、誠にありがとうございます。<br/>以下の内容で資料請求・お問い合わせを受け付けました。</p>
    
    <div style="background: #f9fafb; padding: 16px; border-radius: 6px; margin: 24px 0;">
      <h3 style="margin-top: 0; color: #2B5E73; font-size: 16px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">送信内容のご確認</h3>
      ${generateDetailsTable(body, receiptNumber)}
    </div>

    <p style="font-size: 14px;">資料の発送準備が整い次第、順次郵送にてお届けいたします。<br/>見学のお申し込みやご相談につきましては、担当者より別途ご連絡させていただきます。</p>
    
    <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
    <p style="font-size: 12px; color: #999;">
      ※本メールは送信専用アドレスから自動送信されております。<br/>
      ご不明な点がございましたら、お墓探しナビ サポートセンターまでご連絡ください。<br/><br/>
      株式会社清蓮 / お墓探しナビ<br/>
      Web: https://www.ohakanavi.jp
    </p>
  </div>
</div>`;
}

function buildAdminEmailHtml(body: any, receiptNumber: string) {
    const userName = body.user?.name || body.name || body.user?.lastName + ' ' + body.user?.firstName;
    return `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
  <div style="background: #f1f5f9; padding: 20px 32px; border-radius: 8px 8px 0 0; border: 1px solid #e2e8f0; border-bottom: none;">
    <p style="color: #475569; font-size: 16px; font-weight: bold; margin: 0;">【システム通知】新規お問い合わせ</p>
  </div>
  <div style="padding: 32px; border: 1px solid #e2e8f0; border-radius: 0 0 8px 8px;">
    <p>Webサイト経由で <strong>${userName} 様</strong> より資料請求・お問い合わせがありました。</p>
    
    <h3 style="margin-top: 24px; color: #334155; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">お客様情報・受付内容</h3>
    ${generateDetailsTable(body, receiptNumber)}

    <div style="margin-top: 32px; text-align: center;">
      <a href="https://www.ohakanavi.jp/admin/inquiries" style="display: inline-block; background: #2B5E73; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold;">管理画面で詳細を確認する</a>
    </div>
  </div>
</div>`;
}

