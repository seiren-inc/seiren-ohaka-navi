# Doc-37 Antigravity Implementation Prompt for AI Diagnosis

## Project: お墓探しナビ（ohakanavi.jp）

**Version:** v1.0

Antigravity 実行用完全版プロンプト。
Doc-36「AI Diagnosis Logic & Recommendation System Specification v1.0」を実装する。

## 前提

- YMYL配慮として断定表現は禁止
- ロジックはルールベースで透明化
- 個人情報はログに保存しない
- 既存デザインと設計書（Doc-19, Doc-31〜35）に準拠
- ロゴ配色トークンを遵守（Primary Blue / Soft Teal / Light Green / Lotus Pink）

## 禁止事項

- `main`直接push禁止
- `git add -A` 禁止
- 既存データ破壊禁止
- 既存UIの無関係改変禁止
- 診断結果を単一断定する表現禁止

---

## 0. 事前確認

1. 既存ブランチ状態確認 (`git status`, `git branch --show-current`)
2. Node/依存確認 (`node -v`, `pnpm -v`, `pnpm -w -v`)

## 1. ブランチ作成

- main最新化
- 作業ブランチ: `git checkout -b feature/ai-diagnosis-v1`

## 2. 実装範囲

**新規ページ**

- `/diagnosis`
- `/diagnosis/result`

**新規ロジック**

- `lib/diagnosis/`
  - `rules.ts`
  - `types.ts`
  - `score.ts`
  - `explain.ts`

**新規UIコンポーネント**

- `components/diagnosis/`
  - `DiagnosisWizard.tsx`
  - `Step.tsx`
  - `Progress.tsx`
  - `ResultSummary.tsx`
  - `ResultTypeCard.tsx`
  - `RecommendedCemeteries.tsx`
  - `ReasonList.tsx`
  - `Disclaimer.tsx`

**イベント計測**

- `lib/analytics/events.ts` にevent追加、診断ページで発火

## 3. データモデル前提

Doc-20に準拠し、Cemeteryデータから以下を取得できる前提で実装する。
**必須**: `prefecture`, `city`, `price_min`, `price_max`, `categories`, `is_sect_free`, `maintenance_fee_min/max`（存在すれば）

> 取得関数は既存構成に合わせて最小差分で追加する。DBスキーマ破壊的変更は禁止。

## 4. 診断質問（最大7問）

1. 地域（必須）
2. 予算感（必須）
3. 宗教条件（必須）
4. お参り頻度（任意）
5. 維持管理の不安（必須）
6. 埋葬人数（任意）
7. 自然志向（任意）
   > 入力方式はラジオ中心。自由記述は導入しない。

## 5. ルールベーススコアリング実装

- `types.ts`: 供養タイプ定義
- `rules.ts`: 質問回答ごとの加点表をJSON風に定義
- `score.ts`: 合計スコア算出、0〜100へ正規化
- `explain.ts`: 推薦理由生成（重視点上位3、タイプ別理由、注意点生成）
- 結果画面に透明性要件を必須表示。断定禁止。

## 6. 候補墓地レコメンド実装

- 手順：上位2タイプ取得 → 地域絞り込み → categories優先 → 予算優先 → is_sect_free優先
- 上位3件を表示。「この条件に近い候補」として表示し、詳細ページへ遷移可能にする。

## 7. UI要件（Doc-31〜35準拠）

- 背景は白 or Soft Background
- 強調Primary Blue、補助Soft Teal、注意Lotus Pink、余白はDoc-27準拠。
- Wizard UI、Result UIともに要件を満たすこと。
- 免責コンポーネント（Disclaimer）必須表示。

## 8. 解析イベント

- `diagnosis_start`, `diagnosis_step_complete`, `diagnosis_complete`, `diagnosis_result_type`, `diagnosis_result_click_cemetery`, `diagnosis_consult_click`
  ※個人情報は含めない

## 9. ルーティング・SEO

- `/diagnosis` は index 可能
- `/result` は noindex 推奨
- OGPは診断ページのみ設定。

## 10. テスト・11. ローカル実行確認

- ブラウザ確認は非推奨。実行ログとビルド結果を重視。
- `pnpm lint`, `pnpm typecheck`, `pnpm build`等で確認。

## 12.〜16. Git作法とPR作成

- 変更確認後、ファイルを個別に `git add`
- `feat: add AI diagnosis wizard v1` 等の規約ベースのコミットメッセージとExtended description
- `feature/ai-diagnosis-v1` へpush、mainへPR作成

## 17. 最終報告フォーマット

1. 実行したコマンド一覧
2. 変更ファイル一覧
3. コミットメッセージ
4. Extended description
5. ビルド結果（成功/失敗ログ）
6. 既存デザインへの影響有無
7. 懸念点があれば列挙
