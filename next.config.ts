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
  // 本番ドメイン: https://ohakanavi.jp
  async redirects() {
    return [
      // www → non-www 正規化（SEO対策: ドメイン統一）
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ohakanavi.jp" }],
        destination: "https://ohakanavi.jp/:path*",
        permanent: true,
      },
      // Vercel自動ドメインから本番ドメインへ301リダイレクト
      {
        source: "/:path*",
        has: [{ type: "host", value: "seiren-ohaka-navi.vercel.app" }],
        destination: "https://ohakanavi.jp/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
