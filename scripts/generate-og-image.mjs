// 既定OG画像（public/og-image.jpg）を再生成するスクリプト。
// 動的OG（lib/og-image.tsx）と同一デザイン・正規の 1200x630 JPEG を出力する。
// 実行: node scripts/generate-og-image.mjs
import { ImageResponse } from "next/og.js";
import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import { createRequire } from "node:module";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(join(root, "package.json"));

const title = "お墓探しナビ";
const subtitle = "墓地・永代供養・樹木葬・納骨堂を比較検索";

const fontData = await readFile(join(root, "assets/fonts/noto-sans-jp-700.woff"));

const element = h(
    "div",
    {
        style: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "64px 72px",
            color: "#ffffff",
            backgroundColor: "#015249",
            backgroundImage: "linear-gradient(135deg, #015249 0%, #02735e 100%)",
            fontFamily: "Noto Sans JP",
        },
    },
    h(
        "div",
        { style: { display: "flex", alignItems: "center", gap: 18 } },
        h("div", {
            style: { width: 14, height: 46, backgroundColor: "#57BC90", borderRadius: 7 },
        }),
        h("div", { style: { fontSize: 34 } }, "清蓮（Seiren）")
    ),
    h(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: 24 } },
        h("div", { style: { fontSize: 84, fontWeight: 700, lineHeight: 1.2 } }, title),
        h("div", { style: { fontSize: 32, color: "#bfe9d6" } }, subtitle)
    ),
    h(
        "div",
        {
            style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            },
        },
        h("div", { style: { fontSize: 26, color: "#9fd9bf" } }, "www.ohakanavi.jp"),
        h(
            "div",
            {
                style: {
                    display: "flex",
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#013a33",
                    backgroundColor: "#57BC90",
                    padding: "12px 28px",
                    borderRadius: 999,
                },
            },
            "無料相談受付中"
        )
    )
);

const res = new ImageResponse(element, {
    width: 1200,
    height: 630,
    fonts: [{ name: "Noto Sans JP", data: fontData, weight: 700, style: "normal" }],
});

const png = Buffer.from(await res.arrayBuffer());

// sharp は next が optional dependency として持つものを利用（直接の依存には追加しない）
const nextRequire = createRequire(require.resolve("next/package.json"));
const sharp = nextRequire("sharp");
const jpeg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
await writeFile(join(root, "public/og-image.jpg"), jpeg);
console.log(`public/og-image.jpg written: ${(jpeg.length / 1024).toFixed(0)}KB (1200x630 JPEG)`);
