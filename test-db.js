const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.temple.findMany({ select: { id: true, name: true, createdAt: true } }).then(console.log).finally(() => prisma.$disconnect());
