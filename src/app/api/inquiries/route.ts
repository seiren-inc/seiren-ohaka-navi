import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { invalidParamResponse, validateJsonObjectBody, validateQueryParam } from '@/lib/api/validation'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const parsedStatus = validateQueryParam(searchParams, 'status')
    const parsedKind = validateQueryParam(searchParams, 'kind')
    if (!parsedStatus.ok || !parsedKind.ok) {
      return invalidParamResponse(parsedStatus.ok ? parsedKind.field : parsedStatus.field)
    }
    const status = parsedStatus.value
    const kind = parsedKind.value

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
    const rawBody = await request.json()
    const parsedBody = validateJsonObjectBody(rawBody)
    if (!parsedBody.ok) {
      return invalidParamResponse(parsedBody.field)
    }
    const { id: _id, ...rest } = parsedBody.value

    const receiptNumber = `R-${Date.now().toString().slice(-6)}`

    const inquiry = await prisma.inquiry.create({
      data: {
        ...rest,
        receiptNumber: parsedBody.value.receiptNumber ?? receiptNumber,
        status: parsedBody.value.status ?? 'new',
      },
    })

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
