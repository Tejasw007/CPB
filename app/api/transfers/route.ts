import { NextRequest, NextResponse } from "next/server";
import { ledger } from "@/lib/ledger";
import { TransferMode } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sourceAccountId,
      destinationAccountNumber,
      amount,
      description,
      transferMode,
      destinationBankName,
      destinationIfsc,
      destinationAccountName,
      actorId,
      actorName,
      actorRole,
    } = body;

    if (!sourceAccountId || !destinationAccountNumber || !amount || amount <= 0) {
      return NextResponse.json({ error: "Missing required transfer fields or invalid amount." }, { status: 400 });
    }

    const ipAddress = request.headers.get("x-forwarded-for") || "127.0.0.1";

    if (transferMode && transferMode !== "INTRA_BANK" && destinationBankName) {
      // External transfer
      const result = await ledger.executeExternalTransfer({
        sourceAccountId,
        destinationAccountNumber,
        destinationBankName,
        destinationIfsc: destinationIfsc || "EXTERNAL",
        destinationAccountName: destinationAccountName || "External Beneficiary",
        amount: Number(amount),
        description: description || `${transferMode} Transfer`,
        transferMode: transferMode as TransferMode,
        actorId,
        actorName,
        actorRole,
        ipAddress,
      });
      return NextResponse.json(result);
    } else {
      // Intra-bank transfer
      const result = await ledger.executeIntraBankTransfer({
        sourceAccountId,
        destinationAccountNumber,
        amount: Number(amount),
        description: description || "Intra-bank CPB Transfer",
        actorId,
        actorName,
        actorRole,
        ipAddress,
      });
      return NextResponse.json(result);
    }
  } catch (err: any) {
    console.error("Transfer error:", err);
    return NextResponse.json({ error: err.message || "Transfer processing failed." }, { status: 400 });
  }
}
