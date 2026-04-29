# AGENTS.md — seiren-ohaka-navi

## Execution Flow
Analysis → Plan → Explicit Approval → Execution → Verification
Execution requires explicit approval.

## Non-Negotiables
- Do not break existing SEO structure
- Do not modify routing, metadata, JSON-LD without approval
- No DB schema / Supabase changes without approval
- No unsafe API exposure
- Type safety required (no `any`)

## UI Protection
- Do not change layout, spacing, typography, or component structure without explicit request

## Data / Security
- Never expose secrets or internal endpoints
- Validate all external data before use
- No PII in logs or external APIs

## SEO Protection
- Preserve all structured data (JSON-LD)
- Do not alter canonical, sitemap, robots behavior
- Do not remove existing indexed content
- Maintain slug consistency (no breaking URL changes)
- Do not change `url` / `pdfUrl` / `linkStatus` data structure without approval

## Git Safety
- No direct commits to `main`
- Use conventional commits

## Validation
- Build must pass
- No SEO regression (metadata / structured data must remain valid)

## Stop Conditions
- Unclear requirements
- SEO impact uncertainty
- DB or data integrity risk
- Cross-page or routing side effects
