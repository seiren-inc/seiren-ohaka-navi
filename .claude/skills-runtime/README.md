# Skills Runtime Shelf — seiren-ohaka-navi

This directory is the runtime (task-scoped) skill staging area.
The always-on core shelf is `.claude/skills/` — 7 skills only.

## Runtime Skill Groups

| Task Type | Skills to load |
|-----------|---------------|
| Animation sprint | `gsap-core`, `gsap-react`, `gsap-scrolltrigger` |
| SEO / schema markup | `schema-markup`, `seo-audit`, `seo-checklist` |
| Performance sprint | `vercel-performance-optimizer`, `next-cache-components` |
| Design implementation | `figma`, `figma-implement-design` |
| Security review | `security-audit`, `security-best-practices` |
| Test sprint | `playwright`, `test-driven-development` |
| Code review | `code-review-automation`, `lint-and-validate` |
| PR / GitHub CI | `pull-request-manager`, `gh-fix-ci` |
| PDF generation | (workspace vault — `@react-pdf/renderer` related) |
| Storage / Supabase | `supabase-storage-manager`, `supabase-realtime-handler` |

Note: `db-safe-update` is always-on for this repo. `schema-markup` is runtime here.

## Context Budget

Core shelf: 7 skills (always on)
Runtime addition: max 3 per task
