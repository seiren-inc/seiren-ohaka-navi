import { OG_SIZE, renderBrandOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "供養の知識まとめ | 清蓮（Seiren）お墓探しナビ";

export default async function Image() {
    return renderBrandOgImage({
        title: "供養の知識まとめ",
        subtitle: "墓地・永代供養・樹木葬・納骨堂を専門家が中立解説",
    });
}
