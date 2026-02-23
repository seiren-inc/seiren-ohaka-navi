import prisma from './lib/prisma';

async function main() {
    console.log('Attempting to connect to Prisma...');
    try {
        await prisma.$connect();
        console.log('Success: Connected to database!');
    } catch (error) {
        console.error('Error: Failed to connect to database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
