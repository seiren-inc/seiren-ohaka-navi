import { OG_SIZE, renderBrandOgImage } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "都道府県の墓地・霊園・永代供養を探す | 清蓮（Seiren）お墓探しナビ";

export default async function Image(props: {
    params: Promise<{ prefecture: string }>;
}) {
    const { prefecture } = await props.params;
    const decoded = decodeURIComponent(prefecture);

    return renderBrandOgImage({
        title: `${decoded}の墓地・霊園・永代供養`,
        subtitle: "樹木葬・納骨堂も。専門スタッフが中立な立場でご提案",
    });
}
