import { Metadata } from "next";

export const metadata: Metadata = {
  title: "お気に入りリスト｜清蓮",
  description: "保存した霊園・寺院のお気に入り一覧です。",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://ohakanavi.jp/favorites" },
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
