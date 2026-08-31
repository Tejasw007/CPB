import { prisma } from "./db";
import crypto from "crypto";

export async function appendBlockchainEvent(eventType: string, payload: any) {
  // Use Prisma transaction to ensure atomicity when reading the last block and appending the new one.
  return await prisma.$transaction(async (tx) => {
    // 1. Get the most recent block to get its hash
    const lastBlock = await tx.blockchainEvent.findFirst({
      orderBy: { timestamp: 'desc' },
    });

    const previousHash = lastBlock ? lastBlock.currentHash : "GENESIS_BLOCK_0000000000000000000000000000";

    // 2. Prepare current payload string and timestamp
    const payloadString = JSON.stringify(payload);
    const timestamp = new Date();

    // 3. Calculate current Hash: SHA-256(previousHash + payloadString + timestamp)
    const dataToHash = `${previousHash}|${payloadString}|${timestamp.toISOString()}`;
    const currentHash = crypto.createHash("sha256").update(dataToHash).digest("hex");

    // 4. Create the new block
    const newBlock = await tx.blockchainEvent.create({
      data: {
        previousHash,
        currentHash,
        eventType,
        payload: payloadString,
        timestamp,
      }
    });

    return newBlock;
  });
}
