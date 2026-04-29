import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { invalidParamResponse, validateQueryParam } from '@/lib/api/validation';

// Types
type TempleMaster = {
    id: string;
    name: string;
    nameNormalized: string;
    sect?: string;
    zip: string;
    pref: string;
    city: string;
    addressLine: string;
    fullAddress: string;
};

// Normalize Helper
const normalizeText = (str: string): string => {
    if (!str) return "";
    return str
        .toLowerCase()
        .replace(/\s+/g, '') // Remove spaces
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xFEE0)); // Fullwidth to halfwidth
};

// Load Data once (or reload if needed, here we verify on load)
const loadTemples = (): TempleMaster[] => {
    try {
        const filePath = path.join(process.cwd(), 'data', 'temples_master.json');
        if (!fs.existsSync(filePath)) {
            console.error("[TEMPLES_MASTER_ERROR] File not found:", filePath);
            return [];
        }
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data: TempleMaster[] = JSON.parse(fileContent);

        return data.map(t => ({
            ...t,
            // Ensure normalization key covers robust matching
            nameNormalized: normalizeText([t.name, t.nameNormalized].filter(Boolean).join(""))
        }));
    } catch (e) {
        console.error("[TEMPLES_MASTER_ERROR] Load failed", e);
        return [];
    }
};

// Initial load check
const templesCache = loadTemples();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const parsedQuery = validateQueryParam(searchParams, 'q');
    const parsedPref = validateQueryParam(searchParams, 'pref');
    const parsedCity = validateQueryParam(searchParams, 'city');
    if (!parsedQuery.ok || !parsedPref.ok || !parsedCity.ok) {
        return invalidParamResponse(parsedQuery.ok ? (parsedPref.ok ? parsedCity.field : parsedPref.field) : parsedQuery.field);
    }

    const query = parsedQuery.value || '';
    const pref = parsedPref.value || '';
    const city = parsedCity.value || '';
    const debug = searchParams.get('debug') === '1';

    // Normalize Query
    const normalizedQ = normalizeText(query);

    if (!query && !pref && !city) {
        return NextResponse.json(
            debug
                ? {
                    results: [],
                    debug: {
                        q: query,
                        qNormalized: normalizedQ,
                        total: templesCache.length,
                        sample: templesCache[0],
                        daishojiCheck: templesCache.find(t => t.name.includes("大昭寺"))
                    }
                }
                : { results: [] }
        );
    }

    let results = templesCache;

    if (query) {
        results = results.filter(t => {
            // Priority 1: Name partial match (normalized)
            if (t.nameNormalized.includes(normalizedQ)) return true;
            // Priority 2: Full address partial match
            if (normalizeText(t.fullAddress).includes(normalizedQ)) return true;
            // Priority 3: Raw name match
            if (t.name.includes(query)) return true;

            return false;
        });
    }

    if (pref) {
        results = results.filter(t => t.pref === pref);
    }

    if (city) {
        results = results.filter(t => t.city.includes(city));
    }

    if (debug) {
        console.log(`[TEMPLE_SEARCH] q="${query}" norm="${normalizedQ}" results=${results.length}`);
    }

    // Return top 20
    const response = { results: results.slice(0, 20) };
    if (!debug) {
        return NextResponse.json(response);
    }

    return NextResponse.json({
        ...response,
        debug: {
            q: query,
            qNormalized: normalizedQ,
            total: templesCache.length,
            sample: templesCache[0],
            daishojiCheck: templesCache.find(t => t.name.includes("大昭寺"))
        }
    });
}

// Force dynamic to ensure no weird caching of the route handler itself
export const dynamic = 'force-dynamic';
