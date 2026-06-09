import { OG_SIZE, renderBrandOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "墓じまい・改葬の無料相談 | 清蓮（Seiren）お墓探しナビ";

export default async function Image() {
    return renderBrandOgImage({
        title: "墓じまい・改葬の無料相談",
        subtitle: "改葬先探しから手続きまで、専門スタッフがサポート",
    });
}
