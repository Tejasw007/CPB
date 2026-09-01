import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function check() {
  const events = await prisma.blockchainEvent.findMany({
    take: 5,
    orderBy: { timestamp: "desc" }
  });
  console.log("SOC Events:", JSON.stringify(events, null, 2));
  
  const txns = await prisma.transaction.findMany({
    take: 5,
    orderBy: { createdAt: "desc" }
  });
  console.log("Transactions:", JSON.stringify(txns, null, 2));
}

check().finally(() => prisma.$disconnect());
