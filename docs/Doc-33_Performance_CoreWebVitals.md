# Doc-33 Performance & Core Web Vitals Optimization Blueprint

## Project: お墓探しナビ（ohakanavi.jp）

**Version:** v1.0

## 目的

Apple公式サイト水準の体感速度を実現する。
SEO・GEOに直結するCore Web Vitalsを最適化し、検索上位維持を技術面から支える。

## 1. 目標指標（本番基準）

- LCP 2.0秒以内
- CLS 0.05以下
- INP 200ms以内
- TTFB 500ms以内
- Lighthouse Performance 90以上

## 2. LCP最適化

Hero画像は:

- `next/image`
- `priority`設定
- `sizes`明示
- webp優先
  ※画像サイズ: 100kb以下目標

## 3. JS最適化

- Client Component最小化
- 不要な `useEffect` 禁止
- 大型ライブラリ禁止

## 4. CSS最適化

- Tailwind purge必須
- 未使用CSS削除

## 5. フォント最適化

- display swap
- プリロード最小限

## 6. 画像最適化

- 自動圧縮
- responsive sizes
- lazy loading

## 7. API最適化

- キャッシュ制御
- ISR活用
- revalidate設定

## 8. サーバー設計

- Vercel Edge利用
- リージョン最適化

## 9. 検索ページ最適化

- SSR禁止
- CSR軽量実装

## 10. データ取得最適化

- select必要カラムのみ
- N+1禁止

## 11. モバイル最優先設計

- Mobile LCP優先
- JS削減

## 12. アニメーション制限

- GPU transformのみ
- opacity中心

## 13. 画像枚数制限

- 1ページ最大6枚

## 14. キャッシュ設計

- 市区町村ページ: 静的生成
- 墓地詳細: ISR

## 15. 測定体制

- Lighthouse CI
- Vercel Analytics
- Search Console

## 16. 受け入れ基準

- LCP 2秒以内
- CLS 0.05以内
- JSバンドル縮小
- 体感軽量
