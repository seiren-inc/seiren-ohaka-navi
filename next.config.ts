import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 本番ドメイン: https://ohakanavi.jp
  async redirects() {
    return [
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

