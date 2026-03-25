# UI/UX Global Rules Violation Report

- Project: seiren-ohaka-navi
- Generated: 2026-03-20T00:13:16.269Z
- Scope: UI files (278 files)
- Method: static analysis (regex-based heuristic)

## Critical

- なし

## High

1. absolute指定の過多
- 判定理由: absolute系記述が 156 件。重なり/改行崩れ/保守性低下の高リスク。
- 根拠:
- seiren-ohaka-navi/app/about/company/CompanyContactCTA.tsx:14 `<div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-20" />`
- seiren-ohaka-navi/app/about/strength/page.tsx:219 `<div className="text-4xl font-serif text-gray-100 font-bold mb-4 absolute top-4 right-4">`
- seiren-ohaka-navi/app/admin/images/ImageManagerClient.tsx:37 `className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow"`
- seiren-ohaka-navi/app/admin/temple-users/page.tsx:71 `<Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />`
- seiren-ohaka-navi/app/admin/temples/TempleListClient.tsx:67 `<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />`
- seiren-ohaka-navi/app/admin/temples/TempleListClient.tsx:84 `<ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />`
- seiren-ohaka-navi/app/admin/temples/TempleListClient.tsx:131 `<span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs">▾</span>`
- seiren-ohaka-navi/app/admin/temples/[id]/edit/page.tsx:892 `<div><label className="block text-sm font-bold text-gray-700 mb-2">構造化データ出力</label><div className="flex items-center gap-3"><button type="button" onClick={() => updateSeo({ structu`

## Medium

1. 行間不足の疑い
- 判定理由: line-height が詰まる指定を 7 件検出。可読性低下の可能性。
- 根拠:
- seiren-ohaka-navi/app/globals.css:140 `line-height: 1.7;`
- seiren-ohaka-navi/app/globals.css:197 `line-height: 1.4;`
- seiren-ohaka-navi/app/globals.css:235 `line-height: 1.45 !important;`
- seiren-ohaka-navi/app/globals.css:245 `line-height: 1.45 !important;`
- seiren-ohaka-navi/src/app/globals.css:87 `line-height: 1.7;`
- seiren-ohaka-navi/src/app/globals.css:119 `line-height: 1.45 !important;`
- seiren-ohaka-navi/src/app/globals.css:129 `line-height: 1.45 !important;`

## Low

- なし

## Notes

- このレポートは静的解析ベースのため、最終判断は実機表示（1920/1440/1024/768/430/390/375）で確認すること。
- Fixed要素・重なり・改行崩れは、実際のDOM/表示幅で再検証すること。
