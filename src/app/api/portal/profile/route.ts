import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getTempleUserFromSession() {
    const cookieStore = await cookies();
    const email = cookieStore.get("portal_session")?.value;
    if (!email) return null;
    return (prisma as any).templeUser.findUnique({ where: { email }, include: { temple: true } });
}

// GET: 施設情報取得
export async function GET() {
    const user = await getTempleUserFromSession();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

     
    const temple: any = user.temple;
    return NextResponse.json({
        id: temple.id,
        name: temple.name,
        pref: temple.prefecture || "",
        city: temple.cityName || "",
        addressLine: temple.addressLine || "",
        phone: temple.phone || "",
        description: temple.overview || "",
        transportation: temple.access || "",
        parkingInfo: temple.parking || "",
        officeHours: temple.officeHours || "",
    });
}

// PATCH: 施設情報更新（自分の施設のみ）
export async function PATCH(req: NextRequest) {
    const user = await getTempleUserFromSession();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { name, pref, city, addressLine, phone, description, transportation, parkingInfo, officeHours } = body;

     
    const updated = await (prisma as any).temple.update({
        where: { id: (user as any).templeId },
        data: {
            name: name || undefined,
            prefecture: pref || undefined,
            cityName: city || undefined,
            addressLine: addressLine ?? undefined,
            phone: phone ?? undefined,
            overview: description ?? undefined,
            access: transportation ?? undefined,
            parking: parkingInfo ?? undefined,
            officeHours: officeHours ?? undefined,
            address: pref && city ? `${pref}${city}${addressLine || ""}` : undefined,
        },
    });

    return NextResponse.json({ success: true, temple: updated });
}
