const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const events = await prisma.blockchainEvent.findMany({
    orderBy: { timestamp: 'desc' },
    take: 10
  });
  console.log("BlockchainEvents:", JSON.stringify(events, null, 2));

  const sessions = await prisma.sessionDevice.findMany({
    orderBy: { loginAt: 'desc' },
    take: 5
  });
  console.log("Sessions:", JSON.stringify(sessions, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
