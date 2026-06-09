import { OG_SIZE, renderBrandOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "供養の選択肢比較 | 清蓮（Seiren）お墓探しナビ";

export default async function Image() {
    return renderBrandOgImage({
        title: "供養の選択肢を比較する",
        subtitle: "永代供養・樹木葬・納骨堂・散骨をわかりやすく整理",
    });
}
