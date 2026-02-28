# Doc-31 Visual Implementation Detail Specification

## Project: お墓探しナビ（ohakanavi.jp）

**Version:** v1.0

## 目的

デザインを「雰囲気」ではなく、実装レベルで再現可能な設計へ落とし込む。。
Antigravityの出力品質を安定化させ、Apple公式サイト水準の精度を担保する。

## 1. カラートークン定義

- Primary Blue: `#1F3A5F`
- Soft Teal: `#4FA7A0`
- Lotus Pink: `#E8CFCF`
- Text Primary: `#111111`
- Text Secondary: `#6B6B6B`
- Background Light: `#F7F8FA`
- Pure White: `#FFFFFF`
  ※グラデーション禁止。単色ベース。

## 2. 影設計

- Shadow 1: `0 4px 16px rgba(0,0,0,0.06)`
- Shadow 2: `0 8px 24px rgba(0,0,0,0.08)`
  ※濃い影禁止。

## 3. ボタン設計

- 高さ: 48px
- 角丸: 10px
- Primary Button: 背景 Primary Blue / 文字 白
- Secondary Button: 枠線 Primary Blue / 背景 透明

## 4. ホバー挙動

- Primary: 明度+5%
- Card: translateY -2px

## 5. フォント指定

- 日本語: Noto Sans JP
- 英数字: Inter

## 6. セクション構成

各セクションは「見出し > サブコピー > 本文 > CTA」の順で統一。

## 7. Hero実装詳細

- 高さ: `min-height 70vh`
- 背景: 白ベース
- 表示: 右側に画像 / 左側テキスト

## 8. カードデザイン

- 背景 白
- 境界線 `1px #ECECEC`

## 9. タグ設計

- 供養タイプタグ: 背景 Soft Teal 20%透明 / 文字 Soft Teal

## 10. フォームUI

- 入力高さ: 44px
- ラベル常時表示
- エラー: Lotus Pink

## 11. スクロール演出

- Intersection Observer使用
- JS最小化

## 12. 画像最適化

- `next/image`使用
- lazy loading
- webp優先

## 13. コンテナ設計

- padding左右 24px
- 最大幅中央固定

## 14. アイコン設計

- 線画
- `2px stroke`
- 色 Text Secondary

## 15. ダークモード

将来対応。現時点実装不要。

## 16. レスポンシブ調整

- Mobile: フォントサイズ -10% / 余白 -20%

## 17. パフォーマンス制約

- アニメーションJS 20kb以内
- CSS分割最適化

## 18. 禁止事項

グラデーション多用 / 背景画像全面使用 / 中央詰めテキスト乱用 / 過度な色数

## 19. QAチェック項目

余白揃っているか / 色ブレなし / フォント崩れなし / ボタンサイズ統一

## 20. 受け入れ基準

高級感維持 / 軽量 / 統一感 / ブレなし
