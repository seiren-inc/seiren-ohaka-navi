import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const prefecture = searchParams.get('prefecture')
    const status = searchParams.get('status')

    const temples = await prisma.temple.findMany({
      where: {
        ...(prefecture ? { prefecture } : {}),
        ...(status ? { status } : {}),
      },
      include: { plans: true },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(temples)
  } catch (error) {
    console.error('[API/temples GET]', error)
    return NextResponse.json({ error: 'Failed to fetch temples' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { plans, ...templeData } = body

    const temple = await prisma.temple.create({
      data: {
        ...templeData,
        plans: plans
          ? {
              create: plans.map((p: Record<string, unknown>) => {
                const { id: _id, templeId: _templeId, ...planData } = p
                return planData
              }),
            }
          : undefined,
      },
      include: { plans: true },
    })
    return NextResponse.json(temple, { status: 201 })
  } catch (error) {
    console.error('[API/temples POST]', error)
    return NextResponse.json({ error: 'Failed to create temple' }, { status: 500 })
  }
}
