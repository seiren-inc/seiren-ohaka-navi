import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

type GenerateType = 'catchphrase' | 'overview' | 'features' | 'seo';

interface TempleContext {
    name: string;
    prefecture?: string;
    cityName?: string;
    type?: string;
    sects?: string[];
    supportedMemorialTypes?: string[];
    tags?: string[];
    access?: string;
}

function buildPrompt(type: GenerateType, ctx: TempleContext): string {
    const base = `
施設名: ${ctx.name}
所在地: ${ctx.prefecture || ''}${ctx.cityName || ''}
施設タイプ: ${ctx.type || ''}
対応宗派: ${(ctx.sects || []).join('、') || 'なし'}
対応供養タイプ: ${(ctx.supportedMemorialTypes || []).join('、') || 'なし'}
アピールタグ: ${(ctx.tags || []).join('、') || 'なし'}
交通アクセス: ${ctx.access || ''}
`.trim();

    switch (type) {
        case 'catchphrase':
            return `${base}

上記の霊園・寺院情報をもとに、ウェブサイト掲載用のキャッチコピーを3案作成してください。
条件：
- 各案は30文字以内
- お参りに来る方の気持ちに寄り添う表現
- 宗教的すぎず、現代人に刺さる言葉
- 番号付きリストで出力（1. 2. 3.）
- 説明文は不要、キャッチコピーのみ出力`;

        case 'overview':
            return `${base}

上記の霊園・寺院情報をもとに、ウェブサイト掲載用の施設概要文を作成してください。
条件：
- 200〜300文字程度
- お参りを検討している方に向けた、温かみのある文章
- 施設の特徴・アクセス・雰囲気を自然に盛り込む
- 段落は2〜3段落
- マークダウン記法なし、プレーンテキストで出力`;

        case 'features':
            return `${base}

上記の霊園・寺院情報をもとに、「施設の3つの特徴」をJSON形式で作成してください。
出力形式（厳守）:
[
  { "icon": "アイコン名（駅近/バリアフリー/ペット可/自然/管理不要/継承者不要/宗教不問/費用抑えめ/屋内/個室のどれか）", "title": "特徴タイトル（15文字以内）", "text": "特徴説明（50文字以内）" },
  { "icon": "...", "title": "...", "text": "..." },
  { "icon": "...", "title": "...", "text": "..." }
]
JSONのみ出力し、他の説明文は不要。`;

        case 'seo':
            return `${base}

上記の霊園・寺院情報をもとに、SEO用のテキストをJSON形式で作成してください。
出力形式（厳守）:
{
  "title": "ページタイトル（32文字以内、施設名+特徴+地域名を含む）",
  "description": "メタディスクリプション（120文字以内、自然な文章で）",
  "primaryKeywords": ["KW1", "KW2", "KW3"],
  "secondaryKeywords": ["KW4", "KW5"]
}
JSONのみ出力し、他の説明文は不要。`;

        default:
            return base;
    }
}

export async function POST(req: NextRequest) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'GEMINI_API_KEY が設定されていません' }, { status: 500 });
    }

    let body: { type: GenerateType; context: TempleContext };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'リクエストの形式が不正です' }, { status: 400 });
    }

    const { type, context } = body;
    if (!type || !context?.name) {
        return NextResponse.json({ error: 'type と context.name は必須です' }, { status: 400 });
    }

    const prompt = buildPrompt(type, context);

    try {
        const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 1024,
                },
            }),
        });

        if (!res.ok) {
            const err = await res.text();
            return NextResponse.json({ error: `Gemini API エラー: ${err}` }, { status: res.status });
        }

        const data = await res.json();
        const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

        // JSON系レスポンスはパースを試みる
        if (type === 'features' || type === 'seo') {
            try {
                // コードブロックを除去
                const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
                const parsed = JSON.parse(cleaned);
                return NextResponse.json({ result: parsed });
            } catch {
                return NextResponse.json({ result: text });
            }
        }

        return NextResponse.json({ result: text });
    } catch (err) {
        return NextResponse.json({ error: `サーバーエラー: ${err}` }, { status: 500 });
    }
}
