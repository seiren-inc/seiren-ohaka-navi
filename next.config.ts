import type { NextConfig } from "next";
// #region agent log
fetch("http://127.0.0.1:7735/ingest/1edceb2c-fc8c-4fc3-98ee-97ab22c9bda4", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "14b563" }, body: JSON.stringify({ sessionId: "14b563", runId: "deploy-context-trace", hypothesisId: "H6", location: "next.config.ts:4", message: "Deployment commit context", data: { nodeEnv: process.env.NODE_ENV ?? null, vercelEnv: process.env.VERCEL ?? null, vercelGitCommitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? null, vercelGitCommitRef: process.env.VERCEL_GIT_COMMIT_REF ?? null, vercelUrl: process.env.VERCEL_URL ?? null }, timestamp: Date.now() }) }).catch(() => {});
// #endregion

const nextConfig: NextConfig = {
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

