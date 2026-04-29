import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PREFECTURES } from "@/app/lib/prefectures";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://ohakanavi.jp";

const INDEX_NOW_KEY = "41257e53d7b74ba8b78cc7e08d40f182";
const KEY_LOCATION = `${BASE_URL}/${INDEX_NOW_KEY}.txt`;

// Static URLs（sitemap.ts と同期させること）
const STATIC_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/search`,
  `${BASE_URL}/choices`,
  `${BASE_URL}/choices/eitai-kuyou`,
  `${BASE_URL}/choices/jumokusou`,
  `${BASE_URL}/choices/noukotsudou`,
  `${BASE_URL}/choices/general`,
  `${BASE_URL}/choices/temoto-kuyou`,
  `${BASE_URL}/choices/ikotsu-diamond`,
  `${BASE_URL}/choices/sankotsu`,
  `${BASE_URL}/grave-closure`,
  `${BASE_URL}/grave-closure/what`,
  `${BASE_URL}/grave-closure/flow`,
  `${BASE_URL}/grave-closure/cost`,
  `${BASE_URL}/grave-closure/faq`,
  `${BASE_URL}/guide`,
  `${BASE_URL}/guide/eitai-kuyou`,
  `${BASE_URL}/guide/jumokusou`,
  `${BASE_URL}/guide/noukotsudou`,
  `${BASE_URL}/guide/grave-basics`,
  `${BASE_URL}/guide/grave-closure`,
  `${BASE_URL}/kaisou`,
  `${BASE_URL}/consult`,
  `${BASE_URL}/consult/grave-search`,
  `${BASE_URL}/consult/grave-closure`,
  `${BASE_URL}/consult/ikotsu-service`,
  `${BASE_URL}/about`,
  `${BASE_URL}/about/company`,
  `${BASE_URL}/about/strength`,
  `${BASE_URL}/faq`,
];

/**
 * POST /api/indexnow
 * IndexNow に全 URL を一括送信する管理用エンドポイント。
 * Authorization ヘッダーに INDEXNOW_SECRET 環境変数の値が必要。
 *
 * 例: curl -X POST https://ohakanavi.jp/api/indexnow \
 *          -H "Authorization: Bearer <INDEXNOW_SECRET>"
 */
export async function POST(request: Request) {
  // 簡易認証（環境変数 INDEXNOW_SECRET を設定すること）
  // 簡易認証（環境変数 INDEXNOW_SECRET を設定すること）
  const secret = process.env.INDEXNOW_SECRET;
  if (secret) {
    const authHeader = request.headers.get("Authorization");
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // 都道府県 URL
  const allPrefectures = PREFECTURES.flatMap((r) => r.items);
  const areaUrls = allPrefectures.map(
    (pref) => `${BASE_URL}/area/${encodeURIComponent(pref)}`
  );

  // 霊園詳細 URL
  let templeUrls: string[] = [];
  try {
    const temples = await prisma.temple.findMany({
      where: { status: "public", listedInSearch: true },
      select: { id: true },
    });
    templeUrls = temples.map((t) => `${BASE_URL}/detail/${t.id}`);
  } catch (e) {
    console.error("[indexnow] Failed to fetch temples:", e);
  }

  const urlList = [...STATIC_URLS, ...areaUrls, ...templeUrls];

  // IndexNow API に送信（Bing）
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(BASE_URL).hostname,
      key: INDEX_NOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  const status = res.status;
  const text = await res.text().catch(() => "");

  // 200: OK / 202: Accepted（非同期処理中）どちらも成功
  if (status === 200 || status === 202) {
    return NextResponse.json({ success: true, submitted: urlList.length, status });
  }

  return NextResponse.json(
    { success: false, status, detail: text },
    { status: 500 }
  );
}
