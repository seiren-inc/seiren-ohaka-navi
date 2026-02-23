import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { Prisma } from '@prisma/client';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || '';
        const pref = searchParams.get('pref') || '';
        const city = searchParams.get('city') || '';

        if (!query && !pref && !city) {
            return NextResponse.json({ results: [] });
        }

        const where: Prisma.TempleWhereInput = {};

        if (pref) {
            where.prefecture = pref;
        }

        if (city) {
            where.cityName = { contains: city };
        }

        if (query) {
            where.OR = [
                { name: { contains: query, mode: 'insensitive' } },
                { kana: { contains: query, mode: 'insensitive' } },
                { address: { contains: query, mode: 'insensitive' } },
            ];
        }

        // Search the Registered Temples in Database
        const results = await prisma.temple.findMany({
            where,
            take: 20,
            orderBy: { updatedAt: 'desc' }
        });

        // Map to the format expected by the frontend if necessary
        // The frontend expects: { id, name, fullAddress, pref, city ... }
        // Our Temple model has id, name, address, prefecture, cityName
        const formattedResults = results.map(t => ({
            id: t.id,
            name: t.name,
            pref: t.prefecture,
            city: t.cityName,
            addressLine: t.addressLine,
            fullAddress: t.address
        }));

        console.log(`[TEMPLE_SEARCH_DB] q="${query}" results=${formattedResults.length}`);

        return NextResponse.json({ results: formattedResults });
    } catch (error) {
        console.error('[TEMPLE_SEARCH_API_ERROR]', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';
