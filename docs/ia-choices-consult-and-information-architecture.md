# 情報設計メモ: `/choices` と `/consult`、および周辺 IA

目的: Squirrel 監査で出た **重複メタ・薄い本文警告・導線・404** を踏まえ、**コードのルート定義**に沿って「何をどこに置くか」を整理する。ルーティング変更や canonical の変更は別途 [AGENTS.md](../AGENTS.md) の承認が必要。

---

## 1. 現状の役割分担（推奨する読み方）

| ゾーン | URL プレフィックス | ユーザー意図 | 主な実装（`app/`） |
|--------|-------------------|--------------|---------------------|
| **比較・理解（検討の材料）** | `/choices` | 供養の種類を**比較・理解**し、必要なら診断で整理する | ハブ [`app/choices/page.tsx`](../app/choices/page.tsx)、各法 [`eitai-kuyou`, `jumokusou`, `noukotsudou`, `sankotsu`, `temoto-kuyou`, `ikotsu-diamond`, `general`], 診断 [`diagnosis`](../app/choices/diagnosis/page.tsx) |
| **相談・手続き入口（行動）** | `/consult` | **相談・依頼・検索**など具体的な次アクション | [`app/consult/page.tsx`](../app/consult/page.tsx) ハブ → `grave-search`, `grave-closure`, `ikotsu-service`, `request-material` |
| **読み物（深掘り）** | `/guide` | 用語・費用・流れなど**長文ガイド** | Nav の「供養の知識コラム」で `/guide` へ |
| **墓じまい特化** | `/grave-closure`（＋外部 ohakajimai） | 墓じまい・改葬の**別プロダクト線** | Nav は外部リンク。サイト内には [`app/grave-closure/`](../app/grave-closure/) と [`app/grave-closure/consult/`](../app/grave-closure/consult/page.tsx) など |

この分け方に立つと:

- **「知る・比べる」** → `/choices`（＋必要に応じて `/guide`）
- **「頼む・探す・送る」** → `/consult` および `request-material` 等

が一貫したメンタルモデルになる。

---

## 2. `/choices` 配下のルート一覧（`app/choices`）

| パス | 内容の想定 |
|------|------------|
| `/choices` | 比較ハブ + 診断 CTA |
| `/choices/eitai-kuyou` | 永代供養墓 |
| `/choices/jumokusou` | 樹木葬 |
| `/choices/noukotsudou` | 納骨堂 |
| `/choices/sankotsu` | **海洋散骨**（旧誤リンク `/choices/ctas` はここへ統一済み） |
| `/choices/temoto-kuyou` | 手元供養 |
| `/choices/ikotsu-diamond` | 遺骨ダイヤモンド |
| `/choices/general` | 一般墓（墓石） |
| `/choices/diagnosis` | 診断ウィザード |

**Nav とのギャップ:** [`navbarData.tsx`](../app/components/layout/navbarData.tsx) の「供養のカタチ」は各子ページと `/guide` に直リンクしており、**比較ハブ `/choices` 自体への導線はメニューに無い**。オーファン対策として、ドロップダウン先頭に「供養の選択肢一覧（比較トップ）」を足す案は **文言＋リンク追加のみ**で効きやすい（レイアウト大幅変更は不要）。

---

## 3. `/consult` 配下と墓じまい周辺

| パス | 内容 |
|------|------|
| `/consult` | 相談ハブ（お墓を探す / 墓じまい / 遺骨の整理 の 3 カード） |
| `/consult/grave-search` | 墓地検索系 |
| `/consult/grave-closure` | 墓じまい相談フォーム系 |
| `/consult/ikotsu-service` | 遺骨サービス |
| `/consult/request-material` | 資料請求（layout で canonical あり） |

**重複注意:** [`app/grave-closure/consult/`](../app/grave-closure/consult/page.tsx) は URL が `/grave-closure/consult` で、`/consult` とは別階層。ユーザーから見ると「どちらも相談」に見えるため、**文言で役割差**（サイト内墓じまいフロー vs 総合相談）を揃えるか、将来の統合は承認付きで検討。

---

## 4. ドメイン（www / apex）

[`next.config.ts`](../next.config.ts) の `redirects` では **`www.ohakanavi.jp` → `https://ohakanavi.jp`**（apex）へ恒久的に寄せている。監査や外部ツールで www を起点にするとリダイレクト後の同一サイトとして評価される。メタデータの `metadataBase` / canonical は apex 前提で揃えるのがコード側の意図。

---

## 5. 技術的負債: `app/` と `src/app/` の二重ツリー

同一ドメイン相当のページが **`app/choices/...`** と **`src/app/choices/...`** に併存している。Next の実際の解決ルートはビルド設定次第で、**意図しない片方デッドコード**や **メタ修正の取りこぼし**の原因になる。中期では **単一の `app` ルートに統合**するのが安全（要承認・要リグレッション確認）。

---

## 6. redesign-existing-projects スキルとの対応（このタスクの範囲）

スキルの **Scan / Diagnose** に相当する観点で、**IA・セマンティクス・リンク健全性**に絞った backlog:

| スキル観点 | 本リポジトリでの位置づけ | 備考 |
|------------|-------------------------|------|
| Dead links | `/choices/ctas` → `/choices/sankotsu` に修正済み | ルート追加ではなく既存正 URL への修正 |
| Semantic HTML / skip link | 監査で `main` 欠如等 | **マークアップ改善**は別バッチ（a11y 承認） |
| Typography / Color / Motion の「Fix 優先順位」 | AGENTS の **UI Protection** に抵触しうる | **明示依頼・承認なしでは実施しない** |

---

## 7. 承認後に検討する「構造」チケット例（メタ・JSON-LD は別承認）

1. Nav に **「供養の選択肢一覧」→ `/choices`** を追加し、ハブへの内部リンクを増やす（オーファン・重複 title の緩和に寄与しうる）。
2. `src/app` vs `app` の統一方針の決定と移行計画。
3. `/consult` と `/grave-closure/consult` のユーザー向け説明の整理（URL 統合は大きいので最後）。
4. title/description の **ページ単位**テンプレート設計（SEO 承認下）。

---

## 8. 参照

- [ohakanavi-squirrel-audit-report.md](./ohakanavi-squirrel-audit-report.md)
