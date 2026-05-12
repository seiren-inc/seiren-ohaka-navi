import type { Metadata } from "next";
import StrengthPageClient from "./StrengthPageClient";

export const metadata: Metadata = {
  title: "清蓮の強み｜中立・比較・伴走の3つの約束",
  description: "清蓮が大切にする「中立」「比較」「伴走」3つの約束。特定の霊園に偏らず、メリットもデメリットも正直にお伝えします。お墓探しから墓じまいまでトータルサポート。",
};

export default function StrengthPage() {
  return <StrengthPageClient />;
}
