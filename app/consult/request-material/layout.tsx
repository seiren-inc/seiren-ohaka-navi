import { Metadata } from "next";

export const metadata: Metadata = {
  title: "資料請求フォーム｜清蓮",
  description: "気になる霊園・寺院の資料請求フォームです。",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://www.ohakanavi.jp/consult/request-material" },
};

export default function RequestMaterialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
