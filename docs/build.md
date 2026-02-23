# ビルド・依存管理 恒久方針

> 最終確認: 2026-02-23 /担当: テックリード

---

## 1. ランタイム・ツールバージョン固定方針

| 項目 | 固定値 | 変更条件 |
|------|--------|---------|
| Node.js | **v22.22.0** | LTSバージョンアップ時に staging で検証後に移行 |
| pnpm | **10.30.1** | セキュリティ修正が出たら随時更新（breaking change確認必須） |
| Next.js | **16.1.6（暫定）** | ↓ 下記参照 |

### Next.js バージョンに関する注記

**現在: next@16.1.6 が package.json に記録されているが、実際の動作確認はこのバージョンで行っている。**

過去の経緯:
- next@16.1.6 + Node v22 の組み合わせで、内部バンドル（`comment-json`, `recursive-readdir`）が  
  Node v22 の strict module resolution に非対応で `ERR_INVALID_PACKAGE_CONFIG` が発生した。
- `pnpm install --force` + `onlyBuiltDependencies` 追記によってビルドが安定した。
- next@15.5.9 へのダウングレードは **試みたが pnpm キャッシュ破損で中断し、適用されていない**。

**恒久方針:**
- 現バージョン（next@16.1.6）のまま継続。
- next@16 系の修正が出たら `pnpm add next@{新バージョン}` して staging でビルド連続3回確認後に移行。
- Node を v20 LTS に下げることは **非推奨**（Prisma v7 が Node v20+ を要求するため問題なし）。

---

## 2. Node バージョン固定ファイル

`.nvmrc` を使ってバージョンを固定することを推奨:

```
22.22.0
```

`nvm use` または `fnm use` で自動切り替え可能。

---

## 3. pnpm ビルドスクリプト承認ポリシー

### 現在の承認リスト（package.json `pnpm.onlyBuiltDependencies`）

```json
{
  "pnpm": {
    "onlyBuiltDependencies": [
      "@prisma/engines",
      "prisma",
      "sharp",
      "unrs-resolver"
    ]
  }
}
```

### 新規依存追加時のルール

1. `pnpm add {package}` でインストール後、`pnpm install` 警告を確認する。
2. `Ignored build scripts: {package}` が出たら、**そのパッケージが postinstall を必要とする理由**を確認。
3. 問題なければ `package.json` の `pnpm.onlyBuiltDependencies` にそのパッケージ名を追記する。
4. `pnpm install --force` を再実行して postinstall の完了を確認する。
5. `pnpm run build` を実行してビルド成功を確認する。

---

## 4. node_modules 再構築手順（破損時）

```bash
# 1. pnpm store のキャッシュを全削除
pnpm store prune

# 2. node_modules を強制再インストール（全キャッシュ無効化）
pnpm install --force

# 3. .next キャッシュをクリア
find .next -type f -delete 2>/dev/null
find .next -type d -empty -delete 2>/dev/null

# 4. ビルド確認（3回連続成功を目標）
pnpm run build
```

---

## 5. フェーズ0 根治の背景（2026-02-23）

| ステップ | 内容 | 結果 |
|---------|------|------|
| `pnpm store prune` | 破損キャッシュ 545pkg / 38,486ファイルを削除 | ✅ |
| `pnpm.onlyBuiltDependencies` 追記 | prisma/sharp の postinstall を承認 | ✅ |
| `pnpm install --force` | 全609パッケージをフレッシュ再インストール | ✅ |
| `.next` クリア | `find .next -type f -delete` で完全削除 | ✅ |
| `pnpm run build` × 3 | 51ページ生成、全回 EXIT:0 | ✅ |
