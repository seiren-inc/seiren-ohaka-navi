import { Metadata } from "next";
import { GuideContent } from "./GuideContent";

export const metadata: Metadata = {
    title: "供養の知識まとめ｜墓地・永代供養・樹木葬を中立解説｜清蓮",
    description: "墓地・永代供養・樹木葬・納骨堂・墓じまいについて、供養の専門家が中立の立場でわかりやすく解説。迷っている方のための供養ガイド。",
};

export default function GuideHubPage() {
    return <GuideContent />;
}
