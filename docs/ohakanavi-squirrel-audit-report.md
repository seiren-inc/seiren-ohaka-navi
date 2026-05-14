# ohakanavi.jp — Squirrel 監査サマリー（surface + apex 比較）

実行日: 2026-05-03  
CLI: squirrel v0.0.38  
生ログ（LLM XML）:

- [squirrel-audit-www-ohakanavi-surface.llm.txt](./squirrel-audit-www-ohakanavi-surface.llm.txt) — 起点 `https://www.ohakanavi.jp`
- [squirrel-audit-apex-ohakanavi-surface.llm.txt](./squirrel-audit-apex-ohakanavi-surface.llm.txt) — 起点 `https://ohakanavi.jp`

## apex と www の関係（比較監査の結果）

`https://ohakanavi.jp/` は `**https://www.ohakanavi.jp/` へリダイレクト**（ログ: `Following redirect: https://ohakanavi.jp/ → https://www.ohakanavi.jp/`）。2 本目のレポート上の `<site url>` も `https://www.ohakanavi.jp` で、**同一 43 ページ・同一スコア**（クロール実体は www 側）。監査・canonical・JSON-LD の整合を見る際は、このリダイレクトを前提にする。

## 総合スコア（www 起点 surface）


| 指標                         | 値                    |
| -------------------------- | -------------------- |
| Overall                    | **59**（Grade **F**）  |
| ページ数                       | 43（sitemap 82 URL 中） |
| passed / warnings / failed | 3618 / 496 / 67      |


### カテゴリ別スコア（抜粋）


| カテゴリ                                  | スコア     | コメント                                   |
| ------------------------------------- | ------- | -------------------------------------- |
| Structured Data                       | **0**   | 全体スコアを大きく下げる主因                         |
| Accessibility                         | 89      | エラー・警告はフォーム/ランドマーク中心                   |
| Core SEO                              | 80      | 短い title/description、重複、canonical 欠落など |
| Performance                           | 86      | TTFB 遅延・レンダーブロック指摘あり                   |
| Links                                 | 74      | **内部 404** 1 件                         |
| Crawlability                          | 83      | sitemap 乖離、schema と noindex の衝突        |
| Content / Images / Security / E-E-A-T | 74–92 帯 | 下記参照                                   |


## 優先度の高い指摘（エラー中心）

1. **Structured Data — `schema/json-ld-valid`**
  - 例: `Organization.logo` がバリデータ期待と不一致、`Article` に `image` / `datePublished` 不足など。  
  - ドキュメント: [https://docs.squirrelscan.com/rules/schema/json-ld-valid](https://docs.squirrelscan.com/rules/schema/json-ld-valid)  
  - **注意:** 本リポジトリ [AGENTS.md](../AGENTS.md) では JSON-LD / metadata の変更は明示承認が必要。
2. **Crawlability — `crawl/schema-noindex-conflict`**
  - リッチスキーマがあるがインデックス不可のページが 2 件。  
  - [https://docs.squirrelscan.com/rules/crawl/schema-noindex-conflict](https://docs.squirrelscan.com/rules/crawl/schema-noindex-conflict)
3. **Core SEO — `core/h1`（No H1）**
  - 例: `/favorites`, `/consult/grave-search`, `/consult/request-material`, `/grave-closure/consult` など。  
  - [https://docs.squirrelscan.com/rules/core/h1](https://docs.squirrelscan.com/rules/core/h1)
4. **Links — `links/broken-links`**（監査時点の記録）
  - `/choices/ctas` → **404**（参照元: `/choices/noukotsudou`）。**リポジトリでは `/choices/sankotsu` へリンク修正済み**（本番反映後に `--refresh` で再確認）。  
  - [https://docs.squirrelscan.com/rules/links/broken-links](https://docs.squirrelscan.com/rules/links/broken-links)
5. **Accessibility（複数ルール fail）**
  - `a11y/form-labels`, `a11y/select-name`, `a11y/aria-input-field-name`: ホーム・フォーム系でラベル/名前不足。  
  - `a11y/link-text`: SVG のみのリンクに accessible text なし（`/faq`, `/choices/eitai-kuyou`）。  
  - `a11y/landmark-one-main` / `a11y/skip-link`: 墓じまい系フローで `<main>` やスキップリンクなし。  
  - ドキュメント例: [https://docs.squirrelscan.com/rules/a11y/form-labels](https://docs.squirrelscan.com/rules/a11y/form-labels)
6. **Performance — `perf/ttfb`**
  - 一部ページで TTFB が高め（数百 ms〜1002ms 級の記載あり）。観測値は実行時ネットワーク依存。

## 警告レベルで計画に沿ってレビューしたい項目

- `**core/canonical**`: 複数ページで canonical 欠落の警告（www での取得結果）。apex canonical 方針との突合は別タスクでよい。  
- `**crawl/sitemap-coverage**`: インデックス可能だが sitemap に無い URL、未クロールの sitemap URL。  
- `**core/title-unique` / `content/duplicate-***`: 同一 title/description が複数ページ。  
- `**content/word-count**`: トップ等で「薄いコンテンツ」警告（クライアント描画主体のページでは誤検知になりうるため人間判断）。  
- **Security**: CSP / X-Frame-Options 欠如、フォーム CAPTCHA 警告（Turnstile 等の有無はコード側で要確認）。

---

## UX 観点の短評（実装しない — 方針提案のみ）

bencium-controlled-ux-designer の前提（**事前合意なしに配色・タイポ・レイアウトを変えない**）に従い、**観察と改善の論点**のみ記載する。

1. **フォームと信頼感**
  監査上、複数ページで **ラベル付けされていない select/input** が検出されている。視覚デザイン以前に、**スクリーンリーダーとキーボード利用者への説明**（`<label>` / `aria-labelledby` / 明示テキスト）を揃えると、コンバージョン導線の一貫性にも直結する。
2. **情報の階層**
  **H1 欠落**・**見出しレベルのスキップ**が複数ある。デザインを変えずとも、**セマンティクスをページごとに 1 本のストーリー**（1 H1 → 論理的な H2…）に揃えると、スクロール長い LP でも迷子になりにくい。
3. **ナビゲーションと一貫性**
  **同一文言・別 URL**（「永代供養墓」「詳しく見る」など）の警告あり。意図的な多入口ならよいが、ユーザーが「同じボタンだと思ったのに違う行き先」になると認知負荷が上がる。**文言かリンク先のどちらかを揃える**方針の整理が有効。
4. **墓じまいフロー**
  `<main>` 欠如・スキップリンクなしのページが集中。長いフォームウィザードでは **ランドマーク + スキップ** が特に効く。配色変更なしで対応可能な範囲。
5. **パフォーマンス体感**
  LCP 候補の preload 指摘・above-the-fold の lazy 指摘あり。**モーション**（Framer 等）を増やす場合は `prefers-reduced-motion` との両立を、実装フェーズで別途合意して検証するのがよい。

---

## 修正バッチ（fix-batch）

**実施済み（低リスク）:** `/choices/ctas` 404 リンクを `/choices/sankotsu` に修正。ナビ「供養のカタチ」に `**/choices` 比較ハブ**への導線を追加（[ia-choices-consult-and-information-architecture.md](./ia-choices-consult-and-information-architecture.md) 参照）。

**承認待ち:** metadata / JSON-LD / routing の本変更は [AGENTS.md](../AGENTS.md) の **明示承認** 後にバッチ化。推奨順序の一例:

1. ~~内部 404（`/choices/ctas`）~~（上記で対応）
2. JSON-LD スキーマのバリデーション適合（承認付き）
3. フォームのアクセシビリティ（ラベル・名前）
4. title/description/canonical の重複解消（承認付き）

再監査: 修正後に `squirrel audit https://www.ohakanavi.jp -C surface --format llm --refresh` を推奨。