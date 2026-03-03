import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();

    const { status } = body;
    if (!["active", "terminated"].includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const updated = await prisma.contract.update({
        where: { id },
        data: {
            status,
            terminatedAt: status === "terminated" ? new Date() : null,
        },
    });

    return NextResponse.json(updated);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const contract = await prisma.contract.findUnique({
        where: { id },
        include: { temple: { select: { name: true } } },
    });
    if (!contract) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(contract);
}
