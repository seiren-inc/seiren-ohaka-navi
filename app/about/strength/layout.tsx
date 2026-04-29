import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "清蓮の強み｜中立・比較・伴走の3つの約束",
  description:
    "清蓮の3つの強み：中立・比較・伴走。特定の霊園に偏らない公平なアドバイスで、後悔のない供養選びをサポートします。お墓探しから墓じまい・改葬まで、ワンストップで対応。",
  openGraph: {
    title: "清蓮の強み｜中立・比較・伴走の3つの約束",
    description:
      "特定の霊園に偏らない公平なアドバイスで、後悔のない供養選びをサポート。お墓探しから墓じまい・改葬まで対応。",
  },
};

export default function StrengthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
