# Doc-27 Global Layout & Grid System Specification

## Project: お墓探しナビ（ohakanavi.jp）

**Version:** v1.0

## 目的

Apple公式サイト水準の整然としたレイアウトを実現する。
余白・グリッド・整列を数値で定義し、実装のブレをゼロにする。

## 1. レイアウト思想

- 余白が高級感を作る。
- 詰め込み禁止。
- 横幅を広げすぎない。

## 2. 最大コンテンツ幅

- Desktop: `max-width 1200px`
- Large display: `max-width 1320px`
- 中央寄せ固定。

## 3. 余白基準

**セクション上下余白**

- Desktop: 96px
- Tablet: 72px
- Mobile: 56px

**コンテンツ内部余白**

- 24px以上

## 4. グリッド設計

- Desktop: 12カラム
- Tablet: 8カラム
- Mobile: 4カラム
- ガター: 24px

## 5. カード設計

- `border-radius 12px`
- `shadow subtle`
- `padding 24px`

## 6. タイポグラフィ階層

- H1: 40px
- H2: 32px
- H3: 24px
- Body: 16px
- Caption: 14px
- 行間: 1.5〜1.7

## 7. 画像比率

- Hero: 16:9
- カード: 4:3
  ※正方形禁止

## 8. フッター設計

- 3カラム構成 (会社情報 / 主要リンク / 関連サービス)

## 9. ヘッダー高さ

- Desktop: 72px
- Mobile: 64px

## 10. レスポンシブブレークポイント

- `≥1280`
- `≥1024`
- `≥768`
- `≤480`

## 11. 視線誘導

- Z字型構造
- CTAは右下寄せ傾向

## 12. デザイン禁止事項

- 中央詰め文章多用
- 細かい文字多用
- アイコン過剰

## 13. 受け入れ基準

- ズレなし
- 均一余白
- 統一感あり
- 高級感保持
