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
      // 内部重複の統合: /kaisou を墓じまい・改葬ハブ /grave-closure へ301（H-1）
      {
        source: "/kaisou",
        destination: "/grave-closure",
        permanent: true,
      },
    ];
  },
  // セキュリティ関連レスポンスヘッダ（M-3）
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
