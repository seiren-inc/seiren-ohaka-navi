# Execution Contract

> Local pointer. Full contract: `/Users/takumashinnyo/workspace/projects/docs/ai/execution-contract.md`

## Repo-Specific Additions

### Prisma Safety Gate
Any Prisma migration must be reviewed before applying.
Destructive operations require explicit user approval before `prisma migrate dev` runs.
`pnpm build` includes `prisma generate` — always run it after schema changes.

### Payment Safety Gate
Stripe webhook `constructEvent()` must never be removed or bypassed.
Verify server-side against Stripe test mode before any payment-path deploy.

### Auth Safety Gate
Use `getUser()` not `getSession()`. Test login/logout after any auth change.

### Build Gate
`pnpm typecheck && pnpm lint && pnpm build` must all pass before any PR or deploy.
