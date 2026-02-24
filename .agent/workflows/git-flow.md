---
description: Git 開発フロー（ブランチ運用・PR必須）
---

# Git 開発フロー（厳守）

## 禁止事項
- `main` への直接 push
- ローカルのみで完結する作業
- 未保存のまま長時間作業すること

---

## ステップ 1: main を最新にする

```bash
git checkout main
git pull origin main
```

---

## ステップ 2: 作業ブランチを作成する

```bash
git checkout -b feature/内容名
```

### ブランチ命名規則

| プレフィックス | 用途 |
|---|---|
| `feature/〇〇` | 新機能 |
| `fix/〇〇` | バグ修正 |
| `refactor/〇〇` | 構造整理 |
| `chore/〇〇` | 設定変更など |

---

## ステップ 3: 開発 → コミット

```bash
git add .
git commit -m "feat: 内容"
```

### コミットメッセージ規則（Conventional Commits 準拠）

| プレフィックス | 用途 |
|---|---|
| `feat:` | 新機能追加 |
| `fix:` | バグ修正 |
| `refactor:` | リファクタリング |
| `chore:` | 設定・依存関係など |
| `docs:` | ドキュメント変更 |
| `style:` | コードスタイル修正（動作変更なし） |

---

## ステップ 4: GitHub へ push

```bash
git push -u origin feature/内容名
```

---

## ステップ 5: Pull Request を作成

- GitHub 上で `main` 向けの PR を作成する
- 差分を確認し、問題なければマージ
- セルフレビューでも必ず PR 経由でマージすること
