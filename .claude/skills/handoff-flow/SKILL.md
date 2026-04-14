---
name: handoff-flow
description: Use when ending a session, switching between agents, or handing off work. Produces a structured handoff note that enables the next agent to resume without re-reading everything.
---

# Handoff Flow

## When to Use

Use at the end of a work session, when switching between Claude Code and Antigravity, or when a task spans multiple sessions.

## Handoff Note Format

```markdown
## Session Handoff — [date]

### Completed
- [item 1]

### Files Modified
- /full/path/to/file1.ts

### Current State
- Build: PASSING / FAILING
- Uncommitted changes: yes/no
- Pending migrations: yes/no

### Next Steps
1. [first thing to do]

### Skills Used This Session
- [skill-name]: [brief note]

### Open Questions
- [question requiring input]
```

## Re-entry Protocol

1. Read handoff note in full
2. Run `pnpm typecheck && pnpm lint`
3. Check `git status`
4. Load relevant `.claude/skills/` for next task
