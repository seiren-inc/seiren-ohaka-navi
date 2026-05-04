# お墓探しナビ 配色切替 指示書 — GEMINI CLI 用

> 作成: Antigravity（2026-05-04）
> 対象プロジェクト: seiren-ohaka-navi
> 参照: DESIGN.md（配色ルール + 競合分析）
> 完了条件: pnpm run build がエラー0で通ること

---

## 背景

DESIGN.md に新しい配色パレットが決定した。
現在の globals.css には旧パレット（Doc-31: #F4F0E4 / #44A194 / #537D96 / #EC8F8D）が設定されている。
これを新パレットに切り替える。

## 新パレット（DESIGN.md より）

| トークン名 | HEX |
|-----------|------|
| FEATHER | #77C9D4 |
| MARINE | #57BC90 |
| FOREST | #015249 |
| SLEEK GREY | #A5A5AF |

---

## タスク1: globals.css のカラー変数を差し替え

対象ファイル: `app/globals.css`

L3〜L35 の `@theme { ... }` 内のカラー定義を以下に差し替える:

```css
@theme {
  /* =========================================
     DESIGN.md Color System (2026-05-04)
     Palette: FEATHER / MARINE / FOREST / SLEEK GREY
     ========================================= */
  --color-feather: #77C9D4;
  --color-marine: #57BC90;
  --color-forest: #015249;
  --color-sleek-grey: #A5A5AF;

  --color-primary: #57BC90;
  --color-primary-hover: #4AA87F;

  --color-bg: #FFFFFF;
  --color-bg-muted: #F7FAFA;

  --color-text: #1A1A1A;
  --color-text-muted: #A5A5AF;
  --color-border: rgba(165, 165, 175, 0.3);
  --color-danger: #B00020;

  --color-footer-bg: #015249;
  --color-footer-text: #D1E8E4;

  /* Legacy Variable Mapping (Backward Compatibility) */
  --color-seiren-navy: var(--color-forest);
  --color-primary-dark: var(--color-forest);
  --color-secondary: var(--color-feather);
  --color-accent: var(--color-marine);
  --color-accent-green: var(--color-marine);
  --color-accent-pink: var(--color-feather);
  --color-warm-gold: var(--color-feather);
  --color-safe-green: var(--color-marine);
  --color-tint: var(--color-feather);
  --color-primary-soft: var(--color-feather);
  --color-white-smoke: var(--color-bg-muted);
  --color-surface: var(--color-bg-muted);
  --color-dark-grey: var(--color-text);
```

L78〜L81 の `:root` も差し替える:

```css
:root {
  --background: #FFFFFF;
  --foreground: #1A1A1A;
}
```

**他の部分（Typography, Animation, Media Query 等）は一切変更しない。**

---

## タスク2: 配色変更の影響確認

タスク1 完了後、以下を実行:

```bash
pnpm run build
```

ビルドエラーがあれば修正する。

次に以下のコマンドでハードコードされた旧カラーコードを検索:

```bash
grep -rn "#F4F0E4\|#44A194\|#537D96\|#EC8F8D\|#EAE6DA\|#D8D4CA" app/ src/ lib/ --include="*.tsx" --include="*.ts" --include="*.css"
```

ヒットしたファイルがあれば、新パレットの対応色に置き換える:

| 旧カラー | 新カラー | 理由 |
|---------|---------|------|
| #F4F0E4 (旧bg) | #FFFFFF | 白ベースに変更 |
| #EAE6DA (旧bg-muted) | #F7FAFA | FEATHER の極薄版 |
| #44A194 (旧teal) | #57BC90 (MARINE) | プライマリカラー |
| #537D96 (旧navy) | #015249 (FOREST) | ダークアクセント |
| #EC8F8D (旧pink) | #77C9D4 (FEATHER) | ライトアクセント |
| #D8D4CA (旧border) | rgba(165,165,175,0.3) | ボーダー色 |

**注意: JSON-LD、meta タグ、OGP 画像パス等の SEO 関連は変更しないこと。**

---

## タスク3: 最終ビルド確認

```bash
pnpm run build
```

エラー0で通ったら完了。PLANS.md の Progress Log に完了エントリを追記すること。
