import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

const debugRoot = process.cwd();
const navbarPath = path.join(debugRoot, "app/components/layout/Navbar.tsx");
const desktopPath = path.join(debugRoot, "app/components/layout/NavbarDesktop.tsx");
const mobilePath = path.join(debugRoot, "app/components/layout/NavbarMobileMenu.tsx");
const navbarSource = fs.existsSync(navbarPath) ? fs.readFileSync(navbarPath, "utf8") : "";

// #region agent log
fetch("http://127.0.0.1:7735/ingest/1edceb2c-fc8c-4fc3-98ee-97ab22c9bda4", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "14b563" }, body: JSON.stringify({ sessionId: "14b563", runId: "h7-env-trace", hypothesisId: "H7", location: "next.config.ts:11", message: "Build environment context", data: { cwd: debugRoot, nodeEnv: process.env.NODE_ENV ?? null, vercelEnv: process.env.VERCEL_ENV ?? null, vercelCommit: process.env.VERCEL_GIT_COMMIT_SHA ?? null, vercelRef: process.env.VERCEL_GIT_COMMIT_REF ?? null }, timestamp: Date.now() }) }).catch(() => {});
// #endregion
// #region agent log
fetch("http://127.0.0.1:7735/ingest/1edceb2c-fc8c-4fc3-98ee-97ab22c9bda4", { method: "POST", headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "14b563" }, body: JSON.stringify({ sessionId: "14b563", runId: "h8-file-trace", hypothesisId: "H8", location: "next.config.ts:14", message: "Navbar module files and imports", data: { navbarExists: fs.existsSync(navbarPath), desktopExists: fs.existsSync(desktopPath), mobileExists: fs.existsSync(mobilePath), navbarImportsDesktop: navbarSource.includes("./NavbarDesktop"), navbarImportsMobile: navbarSource.includes("./NavbarMobileMenu") }, timestamp: Date.now() }) }).catch(() => {});
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

