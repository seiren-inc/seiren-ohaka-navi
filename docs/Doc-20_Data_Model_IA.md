# Doc-20 Data Model & Information Architecture Specification

## Project: お墓探しナビ（ohakanavi.jp）

**Version:** v1.0

## 目的

検索ポータルとして十分な情報深度を持ち、
SEO・GEO・生成AIに正確に理解されるための
完全データ構造を定義する。

単なる表示用データではなく、
構造化・拡張性・検索最適化を前提とした設計とする。

## 1. データ設計思想

**原則**

- 表示データとSEOデータは分離可能構造
- 価格は数値型で保持（文字列禁止）
- 改葬関連情報は別エンティティで保持
- 更新日を必ず持つ
- 全墓地は都道府県・市区町村とリレーション

## 2. エンティティ一覧

1. Cemetery（墓地）
2. Plan（区画・供養プラン）
3. Location（都道府県・市区町村）
4. Category（永代供養・納骨堂など）
5. FAQ
6. Article（供養の知識）
7. Review（将来拡張）
8. Inquiry
9. SEO_Metadata
10. Related_Service_Link

## 3. Cemetery テーブル仕様

- id
- name
- slug
- prefecture_id
- city_id
- address
- postal_code
- latitude
- longitude
- access_text
- religion_type
- is_sect_free（宗旨不問）
- parking_available
- barrier_free
- established_year
- operator_name
- operator_type（寺院・民営・公営）
- price_min
- price_max
- maintenance_fee_min
- maintenance_fee_max
- image_main
- image_gallery[]
- summary
- description_long
- updated_at
- created_at
- is_published
- seo_id

## 4. Plan テーブル仕様

- id
- cemetery_id
- plan_name
- category_id
- price
- maintenance_fee
- is_perpetual
- includes_grave_stone
- includes_memorial_service
- capacity
- remarks
- is_active

## 5. Category テーブル

- id
- name
- slug
- description
- color_token
  (例: 永代供養, 納骨堂, 樹木葬, 一般墓, 改葬)

## 6. Location テーブル

- id
- prefecture
- city
- slug
- population
- meta_description
- seo_id

## 7. Article（供養の知識）

- id
- title
- slug
- category
- summary
- body
- author
- publish_date
- updated_at
- structured_data_json
- seo_id

## 8. FAQ

- id
- question
- answer
- related_category
- priority
- seo_id

## 9. SEO_Metadata

- id
- title
- description
- og_title
- og_description
- og_image
- canonical_url
- robots
- schema_json
- faq_schema_json

## 10. Inquiry

- id
- name
- email
- phone
- prefecture
- interest_category
- message
- status
- created_at

## 11. Related_Service_Link

- id
- service_name
- url
- is_external
- badge_type
- priority

## 12. 検索要件

**必須検索軸**

- 都道府県
- 市区町村
- 供養タイプ
- 価格帯
- 宗旨不問
- 駐車場
- バリアフリー

**拡張検索**

- アクセス条件
- 宗教条件
- 年間管理費有無

## 13. SEO / GEO対策構造

全墓地ページに:

- 構造化データ（Cemetery JSON-LD）
- FAQスキーマ
- BreadcrumbList
- Organization
- Review（将来）

Articleページ:
HowTo / FAQ / Article schema

## 14. AIクロール最適化

各墓地ページに明示的に自然言語で記載:

- 価格レンジ
- 所在地
- 特徴箇条書き
- 改葬可否
- 更新日
- 運営主体

## 15. データ品質基準

- 価格未入力禁止
- 所在地曖昧表現禁止
- 更新日必須
- 宗教条件必須
- 最低3枚画像

## 16. 将来拡張

- 口コミ機能
- ランキングロジック
- スコアリング
- AIおすすめ
- 保存機能

## 17. 受け入れ基準

- 全墓地データが数値管理されている
- SEOスキーマ自動生成可能
- 検索条件追加に耐えられる
- 市区町村単位ページ自動生成可能
