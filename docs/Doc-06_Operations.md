# 運用設計書 — seiren-ohaka-navi

> 最終更新: 2026-02-24
> ステータス: 運用中

---

## 1. Git運用ルール

### 基本方針
- 開発は必ずローカル環境で行う
- 変更は都度 GitHub に push して保存する
- `main` ブランチへの直接コミットは禁止
- 必ず作業ブランチを切って開発する

### ブランチ命名規則

| プレフィックス | 用途 |
|---|---|
| `feature/〇〇` | 新機能 |
| `fix/〇〇` | バグ修正 |
| `refactor/〇〇` | 構造整理 |
| `chore/〇〇` | 設定変更など |

---

## 2. 標準作業フロー

```bash
# 1. main を最新にする
git checkout main
git fetch origin
git pull --ff-only origin main

# 2. 作業ブランチを作成する
git checkout -b feature/<topic>

# 3. 実装または修正

# 4. 変更確認
git status
git diff

# 5. ステージング（ファイル指定のみ。git add -A 禁止）
git add path/to/file1 path/to/file2

# 6. コミット
git commit -m "<type>: <short>"

# 7. push
git push -u origin feature/<topic>

# 8. PR作成
# GitHub で Compare and pull request を作成し、main へマージ
```

### コミットメッセージ規則

| プレフィックス | 用途 |
|---|---|
| `feat:` | 新機能追加 |
| `fix:` | バグ修正 |
| `refactor:` | リファクタリング |
| `chore:` | 設定・依存関係など |
| `docs:` | ドキュメント変更 |
| `style:` | コードスタイル修正（動作変更なし）|

---

## 3. ドキュメント管理ルール

- `docs/` 配下のドキュメントが正本
- 仕様変更時はコードと同一 PR に docs の変更を含める
- 「未確定」「未実装」は明示してからマージする

---

## 4. 禁止事項

- `main` への直接 push
- `git add -A` による一括 add（差分確認ができないため）
- `.env` / `.env.local` のコミット
- ローカルのみで完結する作業
- 未保存のまま長時間作業すること

---

## 5. 破壊的変更時のバックアップ手順

```bash
# バックアップブランチを作成してpush
git checkout -b backup/before-<作業名>
git push origin backup/before-<作業名>
git checkout main  # または作業ブランチへ戻る
```

---

## 6. GitHub リポジトリ情報

| 項目 | 値 |
|------|----|
| 組織 | seiren-inc |
| リポジトリ | seiren-ohaka-navi |
| remote URL | `git@github.com:seiren-inc/seiren-ohaka-navi.git` |
| デフォルトブランチ | `main` |

---

## 7. ローカル開発環境

```bash
# 依存パッケージインストール
npm install

# 開発サーバー起動（デフォルト: http://localhost:3000）
npm run dev
```

---

## 8. 本番デプロイ（未確定）

| 項目 | 現状 |
|------|------|
| ホスティング | 未定 |
| CI/CD | 未設定 |
| 環境変数管理 | 未設定 |

> 本番デプロイが確定次第、このセクションを更新すること。
