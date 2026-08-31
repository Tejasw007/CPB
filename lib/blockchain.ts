import { prisma } from "./db";
import crypto from "crypto";

export async function appendBlockchainEvent(eventType: string, payload: any) {
  let createdBlock = null;
  let attempt = 0;
  const maxRetries = 5;

  while (attempt < maxRetries) {
    try {
      // Use Prisma transaction to ensure atomicity when reading the last block and appending the new one.
      createdBlock = await prisma.$transaction(async (tx) => {
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
        return await tx.blockchainEvent.create({
          data: {
            previousHash,
            currentHash,
            eventType,
            payload: payloadString,
            timestamp,
          }
        });
      });
      break; // Success, exit retry loop
    } catch (error: any) {
      if (error.code === 'P2002' && error.meta?.target?.includes('previousHash')) {
        attempt++;
        if (attempt >= maxRetries) throw new Error("Blockchain append failed after max retries due to concurrent forks.");
        // Wait a random small amount of time (exponential backoff) before retrying
        await new Promise(res => setTimeout(res, 50 * Math.pow(2, attempt) + Math.random() * 50));
        continue;
      }
      throw error;
    }
  }

  if (!createdBlock) return null;

  // Asynchronously stream the block to the SOC platform
  try {
    const severity = ["CARD_STATUS_TOGGLE", "SERVICE_CHARGE_EXECUTION"].includes(eventType) ? "HIGH" : "INFO";
    const socPayload = {
      event_id: createdBlock.currentHash,
      soc_id: "SOC-BANK-01",
      timestamp: createdBlock.timestamp.toISOString(),
      event_type: "BLOCKCHAIN_EVENT",
      source: "CoreBankingLedger",
      severity: severity,
      description: `Blockchain ledger entry: ${eventType}`,
      metadata: {
        action: eventType,
        block_hash: createdBlock.currentHash,
        previous_hash: createdBlock.previousHash,
        payload: createdBlock.payload
      }
    };

    fetch("https://webhook.site/23a1bcd3-0ef0-49d0-a09e-738161f1f5f6", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "p5kq3qYcl3JeKW-tioyp9b5AFQH1-2PJh1bQOsjOicQ",
        "X-Webhook-Secret": "1YnzBEYOEJqxZ-nb4OFLSNhM8ldG3iuvY54YN-JkJJ8"
      },
      body: JSON.stringify(socPayload)
    }).catch((err) => console.error("Failed to stream block to SOC:", err));
  } catch (error) {
    console.error("SOC streaming preparation failed:", error);
  }

  return createdBlock;
}
