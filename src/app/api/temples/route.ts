import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { invalidParamResponse, validateJsonObjectBody, validateQueryParam } from '@/lib/api/validation'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const parsedPrefecture = validateQueryParam(searchParams, 'prefecture')
    const parsedStatus = validateQueryParam(searchParams, 'status')
    if (!parsedPrefecture.ok || !parsedStatus.ok) {
      return invalidParamResponse(parsedPrefecture.ok ? parsedStatus.field : parsedPrefecture.field)
    }
    const prefecture = parsedPrefecture.value
    const status = parsedStatus.value

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
    const rawBody = await request.json()
    const parsedBody = validateJsonObjectBody(rawBody)
    if (!parsedBody.ok) {
      return invalidParamResponse(parsedBody.field)
    }
    const { plans, ...templeData } = parsedBody.value

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
