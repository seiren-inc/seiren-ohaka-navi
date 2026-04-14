---
name: implementation-flow
description: Use for any feature implementation, component creation, or code addition. Enforces Analysis → Plan → Approval → Execution → Verification. Ensures safe, scope-locked implementation.
---

# Implementation Flow

## When to Use

Use for: new features, new components, new routes, new Server Actions, any substantive code addition. Do not start coding before approval.

## Workflow

**Phase 1 — Analysis**
Read all relevant existing files before proposing changes.

**Phase 2 — Implementation Plan**
```
## Implementation Plan

### Files to modify
- src/components/features/X.tsx — [reason]

### Files to create
- src/actions/x.ts — [reason]

### Changes
1. [Step 1]
2. [Step 2]

### Skills to use
- [skill-name] — [reason]

### Out of scope
- [anything explicitly not changing]
```

**Phase 3 — Wait for approval**
Valid: "Proceed", "OK", "Go ahead", "承認", "実行して", "進めて"

**Phase 4 — Execution**
- Server Components by default; `"use client"` only when required
- No `any` types; explicit return types
- Use `@/*` path aliases
- All DB changes go through `db-safe-update` skill

**Phase 5 — Verification**
```bash
pnpm typecheck && pnpm lint && pnpm build
```
