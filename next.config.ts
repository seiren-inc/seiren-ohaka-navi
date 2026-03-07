import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 本番ドメイン: https://ohakanavi.jp
  // DNS反映後に以下のコメントアウトを解除する
  // async redirects() {
  //   return [
  //     // Vercel自動ドメインから本番ドメインへ301リダイレクト
  //     {
  //       source: "/:path*",
  //       has: [{ type: "host", value: "seiren-ohaka-navi.vercel.app" }],
  //       destination: "https://ohakanavi.jp/:path*",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;

