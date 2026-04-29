# Speed And SEO Index Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve Lighthouse/PageSpeed outcomes on key landing pages and close sitemap/indexing gaps so valuable public pages are consistently discoverable in Search Console.

**Architecture:** Treat this as two connected tracks. First, reduce mobile performance drag on the homepage and shared layout by shrinking image weight, cutting client-side work, and deferring non-critical UI. Second, align the public route inventory with sitemap, robots, and page-level metadata so only pages with search value are indexed.

**Tech Stack:** Next.js App Router, TypeScript, Next Image, Metadata API, Prisma, Google Search Console, PageSpeed Insights

---

### Task 1: Establish Baseline And Route Inventory

**Files:**
- Inspect: `app/page.tsx`
- Inspect: `app/layout.tsx`
- Inspect: `app/sitemap.ts`
- Inspect: `app/robots.ts`
- Inspect: `app/**/page.tsx`
- Output: `docs/superpowers/plans/2026-04-18-speed-seo-index-plan.md`

- [ ] Capture current build output and note top-level route sizes.
- [ ] Export the list of all public `app/**/page.tsx` routes and classify each as:
  - index
  - noindex
  - gated/private
- [ ] Record the current sitemap omissions and suspected low-value pages.
- [ ] Save a short baseline section in this plan before code changes begin.

Run:
```bash
pnpm build
find app -name 'page.tsx' | sort
```

Expected:
- Build succeeds
- Public route inventory is complete
- Missing sitemap entries are explicitly listed

### Task 2: Fix Homepage LCP Inputs

**Files:**
- Modify: `app/page.tsx`
- Modify: `public/images/*` (replace oversized hero assets with lighter variants)

- [ ] Replace the homepage hero asset with an optimized WebP/AVIF-friendly image set sized for mobile-first delivery.
- [ ] Keep the hero image as the only above-the-fold `priority` image on the homepage.
- [ ] Remove any duplicate or unused hero assets that are no longer referenced.
- [ ] Verify that the rendered hero keeps visual quality on mobile and desktop.

Run:
```bash
find public/images -type f -exec du -h {} + | sort -hr | head
pnpm build
```

Expected:
- Main hero image weight is materially lower than the current ~1 MB source assets
- Homepage still renders correctly

### Task 3: Reduce First-Load Client Work

**Files:**
- Modify: `app/components/features/OpeningAnimation.tsx`
- Modify: `app/components/layout/Navbar.tsx`
- Modify: `app/components/layout/FixedCTA.tsx`
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`

- [ ] Make the opening animation opt-in, shorter, or disabled on mobile/first paint critical paths.
- [ ] Split favorites count logic away from the global navbar if it forces unnecessary client hydration on every page.
- [ ] Review whether `FixedCTA` must mount globally or can be injected only on marketing pages.
- [ ] Audit `afterInteractive` scripts and keep only analytics that are required for initial rollout.
- [ ] Prefer server components for homepage sections that do not need interaction.

Run:
```bash
pnpm build
```

Expected:
- Shared JS decreases from the current baseline where possible
- Homepage and major landing pages still function

### Task 4: Normalize Indexing Policy

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `app/robots.ts`
- Modify: selected `app/**/page.tsx` metadata blocks
- Add if needed: shared SEO helper under `app/components/seo/` or `app/lib/`

- [ ] Add valuable public pages currently omitted from `sitemap.ts`.
- [ ] Explicitly mark low-value transactional pages as `noindex, follow`.
- [ ] Ensure private routes remain blocked via robots and page metadata.
- [ ] Keep detail pages indexable only when the underlying temple SEO setting allows it.

Index candidates to include:
- `/contact`
- `/terms`
- `/about/partner`
- `/guide/flow-after-death`
- `/grave-closure/consult` if the page is intended as an acquisition landing page
- `/partner/contact` only if partner acquisition via search is intentional

Candidates to exclude with `noindex, follow`:
- `/consult/request-material`
- `/partner/contact/thanks`
- `/favorites`
- `/apply` unless B2B acquisition is an active SEO target
- `/choices/diagnosis` unless content depth is expanded beyond the interactive tool

Run:
```bash
pnpm build
```

Expected:
- Sitemap covers all agreed public SEO pages
- Conversion-only and user-state pages are noindexed

### Task 5: Harden Sitemap Data Generation

**Files:**
- Modify: `app/sitemap.ts`
- Inspect: `lib/prisma/*`

- [ ] Remove silent data loss risk when DB lookup fails during sitemap generation.
- [ ] Decide whether sitemap should:
  - fail closed in CI
  - degrade with static routes only
  - use cached/generated route snapshots
- [ ] Add logging that clearly distinguishes DB/network failures from empty result sets.

Run:
```bash
pnpm build
```

Expected:
- Sitemap generation behavior is intentional and documented
- Search engines do not receive a partial sitemap unexpectedly

### Task 6: Re-Measure And Submit

**Files:**
- Update if needed: `docs/superpowers/plans/2026-04-18-speed-seo-index-plan.md`

- [ ] Re-run PageSpeed on homepage and at least one guide page and one detail page.
- [ ] Compare LCP, INP, CLS, and unused JS against the baseline.
- [ ] Re-submit updated sitemap in Search Console.
- [ ] Inspect the URL Inspection result for the newly added index candidates.
- [ ] Record which pages remain intentionally excluded.

Run:
```bash
pnpm lint
pnpm typecheck
pnpm build
```

Expected:
- Verification commands pass
- Search Console submission targets are clear
- Final index/noindex list is documented
