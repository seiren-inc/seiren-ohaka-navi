import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // 本番ドメイン: https://www.ohakanavi.jp
  async redirects() {
    return [
      // non-www → www 正規化（SEO対策: ドメイン統一）
      {
        source: "/:path*",
        has: [{ type: "host", value: "ohakanavi.jp" }],
        destination: "https://www.ohakanavi.jp/:path*",
        permanent: true,
      },
      // Vercel自動ドメインから本番ドメインへ301リダイレクト
      {
        source: "/:path*",
        has: [{ type: "host", value: "seiren-ohaka-navi.vercel.app" }],
        destination: "https://www.ohakanavi.jp/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
