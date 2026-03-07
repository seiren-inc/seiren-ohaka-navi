import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const temple = await prisma.temple.findUnique({
      where: { id },
      include: { plans: { orderBy: { order: 'asc' } } },
    })
    if (!temple) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(temple)
  } catch (error) {
    console.error('[API/temples/[id] GET]', error)
    return NextResponse.json({ error: 'Failed to fetch temple' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { plans, id: _id, createdAt: _c, updatedAt: _u, ...templeData } = body

    const temple = await prisma.temple.update({
      where: { id },
      data: templeData,
      include: { plans: true },
    })
    return NextResponse.json(temple)
  } catch (error) {
    console.error('[API/temples/[id] PUT]', error)
    return NextResponse.json({ error: 'Failed to update temple' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const temple = await prisma.temple.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(temple)
  } catch (error) {
    console.error('[API/temples/[id] PATCH]', error)
    return NextResponse.json({ error: 'Failed to patch temple' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.temple.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[API/temples/[id] DELETE]', error)
    return NextResponse.json({ error: 'Failed to delete temple' }, { status: 500 })
  }
}
