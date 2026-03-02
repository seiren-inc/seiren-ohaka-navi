import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
    })
    if (!inquiry) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(inquiry)
  } catch (error) {
    console.error('[API/inquiries/[id] GET]', error)
    return NextResponse.json({ error: 'Failed to fetch inquiry' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { id: _id, createdAt: _c, updatedAt: _u, temple: _t, ...data } = body

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data,
    })
    return NextResponse.json(inquiry)
  } catch (error) {
    console.error('[API/inquiries/[id] PUT]', error)
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 })
  }
}
