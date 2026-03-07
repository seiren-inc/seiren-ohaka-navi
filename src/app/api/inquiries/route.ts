import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
