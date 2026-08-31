const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const blocks = await prisma.blockchainEvent.findMany({
    orderBy: { timestamp: 'asc' }
  });
  
  const seen = new Set();
  for (const block of blocks) {
    if (seen.has(block.previousHash)) {
      console.log('Deleting fork block:', block.id);
      await prisma.blockchainEvent.delete({ where: { id: block.id } });
    } else {
      seen.add(block.previousHash);
    }
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
