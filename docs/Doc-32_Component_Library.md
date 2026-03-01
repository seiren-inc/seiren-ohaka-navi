# Doc-32 Component Library Specification

## Project: お墓探しナビ（ohakanavi.jp）

**Version:** v1.0

## 目的

UIをページ単位ではなく、再利用可能なコンポーネント単位で定義する。
Antigravity実装のブレを防ぎ、全ページ統一品質を担保する。

## 1. 設計思想

- Atomic Design準拠
- 再利用前提
- 状態バリエーション定義必須
- 単一責任

## 2. 基本コンポーネント分類

**Atoms**

- Button, Tag, Input, Icon, Label, Badge
  **Molecules**
- Card, SearchBar, PriceBox, FeatureList, FAQItem
  **Organisms**
- Header, Footer, HeroSection, CemeteryCardGrid, PlanSection, ConsultCTA, RelatedServicesSection

## 3. Button仕様

**Variants**: Primary, Secondary, Text
**States**: default, hover, active, disabled, loading
**サイズ**: large 48px, medium 44px, small 36px

## 4. Tag仕様

**Types**: 供養タイプ, 設備, 宗教条件
**角丸**: 999px

## 5. CemeteryCard仕様

**必須要素**:

- 画像, 名称, 所在地, 価格レンジ, タグ3つ, 詳細ボタン
  **hover**: `translateY -2px`

## 6. HeroSection仕様

**Props**: title, subtitle, priceHighlight, imageUrl, ctaText

## 7. FAQItem仕様

- accordion型
- 開閉アニメ0.3秒

## 8. FormInput仕様

- label常時表示
- errorメッセージ下部表示
- focus ring必須

## 9. Header仕様

- ロゴ左、ナビ中央、CTA右
- scroll時高さ縮小可

## 10. Footer仕様

- 3カラム (会社情報 / 主要リンク / 関連サービス)

## 11. Grid仕様

- `CemeteryCardGrid`: Desktop 3列, Tablet 2列, Mobile 1列

## 12. PriceBox仕様

- 価格大表示, 管理費小表示

## 13. ConsultCTA仕様

- 背景 Light, 中央配置, ボタン1つ

## 14. RelatedServicesSection

- カード横並び, 外部リンクは別アイコン表示

## 15. コンポーネント命名規則

- PascalCase
- 例: `CemeteryCard.tsx`, `ConsultCTA.tsx`

## 16. 状態管理ルール

- ローカル状態優先, グローバル最小

## 17. 禁止事項

- ページ固有デザイン
- 直書きスタイル
- インラインCSS多用

## 18. テスト要件

- 全コンポーネント単体表示可能
- Storybook導入推奨

## 19. 受け入れ基準

- 再利用可能
- デザイン統一
- レスポンシブ対応
- アクセシビリティ対応
