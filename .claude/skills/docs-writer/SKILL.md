---
name: docs-writer
description: Use for writing or updating technical documentation, architecture notes, decision logs, or component documentation. Produces clear, agent-friendly, human-readable documentation.
---

# Docs Writer

## When to Use

Use for: `docs/ai/` files, architecture decision records, README sections, inline comments on complex logic.
Do not use for comments on self-evident code.

## Rules

1. Write documentation that will still be accurate in 3 months.
2. Focus on non-obvious decisions and constraints.
3. For `docs/ai/decision-log.md`, always record the WHY, not just the WHAT.
4. All `docs/ai/` files must be in English.

## Decision Record Format

```markdown
### Decision: [short title]
**Date**: YYYY-MM-DD
**Context**: [what problem prompted this]
**Decision**: [what was decided]
**Rationale**: [why this over alternatives]
**Consequences**: [known trade-offs]
```

## Output

Clear, accurate documentation appropriate for both human developers and AI agents.
