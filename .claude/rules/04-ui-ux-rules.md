# 04 — UI/UX Rules

> Repo: seiren-ohaka-navi | Applies to: Claude Code, Codex, Antigravity
> UI stack: Tailwind CSS v4, Framer Motion v12, GSAP 3, Lenis, Three.js

## Design System

### Typography
- Use `clamp()` for all heading sizes
- Enforce `max-width` on text containers
- H1 appears once per page; H1 → H2 → H3 hierarchy is strict

### Spacing
- 8px base scale: 8, 16, 24, 32, 48, 64, 96...
- Consistent vertical rhythm between sections

### Buttons and CTAs
- Minimum height: 48px
- CTA text must be action-driven
- Limit primary buttons to 1 per section
- CTA required in: hero, mid-section, footer

### Mobile First
- 375px viewport as baseline
- All tap targets ≥ 48px
- No horizontal overflow

## Animation Rules

- Framer Motion: always `"use client"` + `key` on `AnimatePresence`
- GSAP: initialize in `useEffect` with cleanup (`revert()` or `kill()`)
- Lenis: configure in dedicated SmoothScroll component only
- Three.js: `dynamic import + ssr: false + <Suspense>`
- Respect `prefers-reduced-motion`

## Prohibited

- Typography without `clamp()` or `max-width`
- Multiple conflicting CTAs on the same screen
- Inconsistent spacing (arbitrary pixel values without justification)
- Animations that ignore `prefers-reduced-motion`
