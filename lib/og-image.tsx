import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// opengraph-image.tsx 共通の推奨サイズ（OGP標準 1.91:1）
export const OG_SIZE = { width: 1200, height: 630 };

type BrandOgImageProps = {
    title: string;
    subtitle?: string;
};

/**
 * ブランド共通の動的OG画像を生成する（M-6: SNS/AI引用時の文脈最適化）。
 * satori は woff2 非対応のため woff（日本語サブセット）を使用する。
 */
export async function renderBrandOgImage({ title, subtitle }: BrandOgImageProps) {
    const notoSansJpBold = await readFile(
        join(process.cwd(), "assets/fonts/noto-sans-jp-700.woff")
    );

    return new ImageResponse(
        (
            <div
                style={{
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
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div
                        style={{
                            width: 14,
                            height: 46,
                            backgroundColor: "#57BC90",
                            borderRadius: 7,
                        }}
                    />
                    <div style={{ fontSize: 34 }}>清蓮（Seiren）お墓探しナビ</div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.25 }}>
                        {title}
                    </div>
                    {subtitle ? (
                        <div style={{ fontSize: 30, color: "#bfe9d6" }}>{subtitle}</div>
                    ) : null}
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <div style={{ fontSize: 26, color: "#9fd9bf" }}>www.ohakanavi.jp</div>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 26,
                            fontWeight: 700,
                            color: "#013a33",
                            backgroundColor: "#57BC90",
                            padding: "12px 28px",
                            borderRadius: 999,
                        }}
                    >
                        無料相談受付中
                    </div>
                </div>
            </div>
        ),
        {
            ...OG_SIZE,
            fonts: [
                {
                    name: "Noto Sans JP",
                    data: notoSansJpBold,
                    weight: 700,
                    style: "normal",
                },
            ],
        }
    );
}
