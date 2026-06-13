import { OG_SIZE, renderBrandOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "市区町村の墓地・霊園・永代供養を探す | 清蓮（Seiren）お墓探しナビ";

export default async function Image(props: {
    params: Promise<{ prefecture: string; city: string }>;
}) {
    const { prefecture, city } = await props.params;
    const decodedPrefecture = decodeURIComponent(prefecture);
    const decodedCity = decodeURIComponent(city);

    return renderBrandOgImage({
        title: `${decodedCity}の墓地・霊園・永代供養`,
        subtitle: `${decodedPrefecture}${decodedCity}の供養施設を無料でご案内`,
    });
}
