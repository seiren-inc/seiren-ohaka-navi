# 07 — Reporting and Delivery Rules

> Repo: seiren-ohaka-navi | Applies to: Claude Code, Codex, Antigravity

## Completion Report Format

Every task completion must follow this structure:

```
### Files Modified
- /full/path/to/file1.ts

### Diff
[actual before/after or patch output — not a summary]

### Verification
Commands run:
$ pnpm typecheck
$ pnpm lint
$ pnpm build

Output: [actual output]

### Scope Confirmation
Changes were limited to the approved scope: [yes/no + explanation]

### Skill Usage Report
Used: [skill-name] — reason
Not used: [skill-name] — reason (if considered and rejected)
```

Free-form summaries without this structure are not valid completion reports.

## Skill Usage Report

Every task completion must include a Skill Usage Report. Omitting it is a completion failure.

## Structured Data Reporting

After any JSON-LD change:
- Schema type used and reason
- Validation result (PASS/FAIL from Rich Results Test)
- Unresolved items or known mismatches

## PR / Commit Description

- What changed (concise)
- Why (motivation)
- How to verify (what to run or check)
