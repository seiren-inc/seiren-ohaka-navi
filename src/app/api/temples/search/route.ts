import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

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

        // Daishoji Check
        const daishoji = data.filter(t => t.name.includes("大昭寺"));
        console.log(`[TEMPLES_MASTER_CHECK] count=${data.length} hasDaishoji=${daishoji.length > 0} daishojiRecords=${daishoji.length}`);
        if (daishoji.length > 0) {
            console.log("[TEMPLES_MASTER_DAISHOJI]", JSON.stringify(daishoji[0]));
        }

        return data.map(t => ({
            ...t,
            // Ensure normalization key covers robust matching
            nameNormalized: normalizeText(t.nameNormalized || t.name + (t.name !== t.nameNormalized ? t.nameNormalized : ""))
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
    const query = searchParams.get('q') || '';
    const pref = searchParams.get('pref') || '';
    const city = searchParams.get('city') || '';
    const debug = searchParams.get('debug') === '1';

    // Reload for dev if needed, or use cache. 
    // For this debugging task, we'll reload fast to ensure file updates are seen if we were editing it live without restart.
    // But usually imports are cached. We'll use the function to allow fresh read if we wanted, but `templesCache` is static.
    // Given the user instruction "Verification Step 5", we trust file system changes need server restart OR dynamic read if implemented. 
    // Let's rely on cached for perf but log the check.

    // Normalize Query
    const normalizedQ = normalizeText(query);

    if (debug) {
        return NextResponse.json({
            success: true,
            q: query,
            qNormalized: normalizedQ,
            total: templesCache.length,
            sample: templesCache[0],
            daishojiCheck: templesCache.find(t => t.name.includes("大昭寺"))
        });
    }

    if (!query && !pref && !city) {
        return NextResponse.json({ results: [] });
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

    // Logging search result count for debug
    console.log(`[TEMPLE_SEARCH] q="${query}" norm="${normalizedQ}" results=${results.length}`);

    // Return top 20
    return NextResponse.json({ results: results.slice(0, 20) });
}

// Force dynamic to ensure no weird caching of the route handler itself
export const dynamic = 'force-dynamic';
