import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const plan = await prisma.plan.findUnique({ where: { id } })
    if (!plan) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(plan)
  } catch (error) {
    console.error('[API/plans/[id] GET]', error)
    return NextResponse.json({ error: 'Failed to fetch plan' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { id: _id, templeId: _t, createdAt: _c, updatedAt: _u, version, ...planData } = body

    if (version === undefined) {
      return NextResponse.json({ error: 'Version is required' }, { status: 400 })
    }

    const plan = await prisma.plan.update({
      where: { id, version },
      data: { ...planData, version: { increment: 1 } },
    })
    return NextResponse.json(plan)
  } catch (error: any) {
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Conflict' }, { status: 409 })
    }
    console.error('[API/plans/[id] PUT]', error)
    return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.plan.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API/plans/[id] DELETE]', error)
    return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 })
  }
}
