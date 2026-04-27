import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // #region agent log
  fetch('http://127.0.0.1:7735/ingest/1edceb2c-fc8c-4fc3-98ee-97ab22c9bda4',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c506d5'},body:JSON.stringify({sessionId:'c506d5',runId:'initial',hypothesisId:'H1',location:'lib/prisma.ts:createPrismaClient',message:'Initializing Prisma client',data:{hasDatabaseUrl:Boolean(process.env.DATABASE_URL),nodeEnv:process.env.NODE_ENV ?? 'unknown'},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  })
  const client = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
  // #region agent log
  fetch('http://127.0.0.1:7735/ingest/1edceb2c-fc8c-4fc3-98ee-97ab22c9bda4',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'c506d5'},body:JSON.stringify({sessionId:'c506d5',runId:'initial',hypothesisId:'H1',location:'lib/prisma.ts:createPrismaClient',message:'Prisma client initialized',data:{adapter:'PrismaPg'},timestamp:Date.now()})}).catch(()=>{});
  // #endregion
  return client
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
