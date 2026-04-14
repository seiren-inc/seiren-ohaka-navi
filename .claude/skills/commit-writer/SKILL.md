---
name: commit-writer
description: Use for any commit task. Creates conventional commits with correct type, scope, subject, body, and AI attribution. Checks branch safety before committing.
---

# Commit Writer

## When to Use

Use whenever creating a git commit. Always apply before running `git commit`.

## Workflow

**Step 1 — Check branch**
```bash
git branch --show-current
```
If on `main`, create a feature branch first unless explicitly told otherwise.

**Step 2 — Verify before committing**
```bash
pnpm typecheck
pnpm lint
```

**Step 3 — Stage changes**
Stage only relevant files. Avoid `git add -A` unless scope is intentionally broad.

**Step 4 — Write commit message**
```
<type>(<scope>): <subject>

<body — why, not what>

Co-Authored-By: Claude <noreply@anthropic.com>
```
Types: `feat`, `fix`, `ref`, `perf`, `docs`, `test`, `build`, `ci`, `chore`
Subject: ≤72 chars, imperative mood, no period.

**Step 5 — Commit and confirm**
```bash
git status && git commit -m "..." && git log -1
```

## Do / Don't
✅ Always verify before committing
✅ Always check branch first
❌ Never commit to `main` without explicit instruction
❌ Never use `--no-verify`
