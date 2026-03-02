import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const templeId = searchParams.get('templeId')

    const plans = await prisma.plan.findMany({
      where: templeId ? { templeId } : {},
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(plans)
  } catch (error) {
    console.error('[API/plans GET]', error)
    return NextResponse.json({ error: 'Failed to fetch plans' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id: _id, templeId, ...planData } = body

    const plan = await prisma.plan.create({
      data: { ...planData, templeId },
    })
    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error('[API/plans POST]', error)
    return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 })
  }
}
