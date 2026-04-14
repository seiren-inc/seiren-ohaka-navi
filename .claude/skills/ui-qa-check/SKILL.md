---
name: ui-qa-check
description: Use for any UI change, component addition, or design review. Validates against the design system (typography, spacing, CTAs, mobile-first, animation). Catches violations before review.
---

# UI QA Check

## When to Use

Use after any UI change before marking the task complete.

## Checklist

### Typography
- [ ] All headings use `clamp()` for responsive sizing
- [ ] Text containers have `max-width` applied
- [ ] H1 appears exactly once per page
- [ ] Heading hierarchy H1 → H2 → H3 (no skips)

### Spacing
- [ ] All spacing on 8px scale
- [ ] No arbitrary pixel values without justification
- [ ] Consistent vertical rhythm

### Buttons and CTAs
- [ ] All interactive buttons ≥ 48px tall
- [ ] CTA text is action-driven
- [ ] Max 1 primary button per section
- [ ] CTA in hero, mid-section, and footer

### Mobile (375px viewport)
- [ ] No horizontal overflow
- [ ] All tap targets ≥ 48px
- [ ] Text readable at mobile sizes

### Animation
- [ ] `"use client"` on Framer Motion components
- [ ] `key` prop on `AnimatePresence` children
- [ ] GSAP cleaned up in `useEffect` return
- [ ] Lenis in dedicated SmoothScroll component
- [ ] Three.js uses `dynamic + ssr: false + <Suspense>`
- [ ] `prefers-reduced-motion` respected

## Output

PASS / FAIL per section. List violations with suggested fixes.
