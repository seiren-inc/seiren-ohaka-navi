import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { invalidParamResponse, validateJsonObjectBody, validateQueryParam } from '@/lib/api/validation'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const parsedTempleId = validateQueryParam(searchParams, 'templeId')
    if (!parsedTempleId.ok) {
      return invalidParamResponse(parsedTempleId.field)
    }
    const templeId = parsedTempleId.value

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
    const rawBody = await request.json()
    const parsedBody = validateJsonObjectBody(rawBody)
    if (!parsedBody.ok) {
      return invalidParamResponse(parsedBody.field)
    }
    const { id: _id, templeId, ...planData } = parsedBody.value

    const plan = await prisma.plan.create({
      data: { ...planData, templeId },
    })
    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error('[API/plans POST]', error)
    return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 })
  }
}
