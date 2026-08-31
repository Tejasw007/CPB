import { prisma } from "@/lib/db";
import { logAuditEvent } from "@/lib/audit";
import { TransactionType, TransactionCategory, TransferMode, TransactionStatus, Prisma } from "@prisma/client";

export interface AccountTransferParams {
  sourceAccountId: string;
  destinationAccountNumber: string;
  amount: number;
  description: string;
  category?: TransactionCategory;
  transferMode?: TransferMode;
  idempotencyKey?: string;
  actorId?: string;
  actorName?: string;
  actorRole?: string;
  ipAddress?: string;
}

export interface ExternalTransferParams {
  sourceAccountId: string;
  destinationAccountNumber: string;
  destinationBankName: string;
  destinationIfsc: string;
  destinationAccountName: string;
  amount: number;
  description: string;
  transferMode: TransferMode;
  idempotencyKey?: string;
  actorId?: string;
  actorName?: string;
  actorRole?: string;
  ipAddress?: string;
}

export interface CounterDepositParams {
  targetAccountNumber: string;
  amount: number;
  tellerUserId: string;
  tellerName: string;
  depositorName: string;
  remarks?: string;
  branchCode: string;
}

export interface ReversalParams {
  originalTransactionReferenceId: string;
  reason: string;
  initiatedByUserId: string;
  initiatedByName: string;
  approvedByUserId?: string;
  approvedByName?: string;
}

function generateTxnRef(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `CPB-TXN-${dateStr}-${randomSuffix}`;
}

export const ledger = {
  /**
   * Execute atomic intra-bank transfer between two CPB accounts
   */
  async executeIntraBankTransfer(params: AccountTransferParams) {
    const { sourceAccountId, destinationAccountNumber, amount, description, idempotencyKey } = params;

    if (amount <= 0) {
      throw new Error("Transfer amount must be greater than zero.");
    }

    return await prisma.$transaction(async (tx) => {
      // 1. Idempotency check
      if (idempotencyKey) {
        const existingTxn = await tx.transaction.findUnique({
          where: { idempotencyKey },
        });
        if (existingTxn) {
          return { success: true, transaction: existingTxn, replayed: true };
        }
      }

      // 2. Fetch and lock source account
      const sourceAccount = await tx.account.findUnique({
        where: { id: sourceAccountId },
        include: { user: true },
      });

      if (!sourceAccount) {
        throw new Error("Source account not found.");
      }

      if (sourceAccount.status !== "ACTIVE") {
        throw new Error(`Source account is ${sourceAccount.status.toLowerCase()}. Transfers are not allowed.`);
      }

      const sourceBalanceNum = Number(sourceAccount.balance);
      if (sourceBalanceNum < amount) {
        throw new Error(`Insufficient funds. Current balance: ₹${sourceBalanceNum.toLocaleString('en-IN')}, Requested: ₹${amount.toLocaleString('en-IN')}`);
      }

      // 3. Fetch destination account
      const destAccount = await tx.account.findUnique({
        where: { accountNumber: destinationAccountNumber },
        include: { user: true },
      });

      if (!destAccount) {
        throw new Error(`Destination account number ${destinationAccountNumber} not found in Code Paglu Bank.`);
      }

      if (destAccount.id === sourceAccount.id) {
        throw new Error("Source and destination accounts cannot be the same.");
      }

      if (destAccount.status !== "ACTIVE") {
        throw new Error(`Destination account is ${destAccount.status.toLowerCase()}.`);
      }

      // 4. Calculate new balances
      const newSourceBalance = new Prisma.Decimal(sourceBalanceNum - amount);
      const destBalanceNum = Number(destAccount.balance);
      const newDestBalance = new Prisma.Decimal(destBalanceNum + amount);

      // 5. Update Source Account
      await tx.account.update({
        where: { id: sourceAccount.id },
        data: { balance: newSourceBalance },
      });

      // 6. Update Destination Account
      await tx.account.update({
        where: { id: destAccount.id },
        data: { balance: newDestBalance },
      });

      // 7. Create Debit Record for Sender
      const senderRef = generateTxnRef();
      const debitTxn = await tx.transaction.create({
        data: {
          accountId: sourceAccount.id,
          type: TransactionType.DEBIT,
          amount: new Prisma.Decimal(amount),
          balanceAfter: newSourceBalance,
          description: description || `Transfer to ${destAccount.user.name} (${destAccount.accountNumber})`,
          category: params.category || TransactionCategory.TRANSFER,
          referenceId: senderRef,
          counterpartyAccount: destAccount.accountNumber,
          counterpartyName: destAccount.user.name,
          counterpartyBank: "Code Paglu Bank",
          transferMode: params.transferMode || TransferMode.INTRA_BANK,
          status: TransactionStatus.COMPLETED,
          idempotencyKey: idempotencyKey || undefined,
        },
      });

      // 8. Create Credit Record for Recipient
      const receiverRef = generateTxnRef();
      await tx.transaction.create({
        data: {
          accountId: destAccount.id,
          type: TransactionType.CREDIT,
          amount: new Prisma.Decimal(amount),
          balanceAfter: newDestBalance,
          description: `Transfer from ${sourceAccount.user.name} (${sourceAccount.accountNumber}) - ${description}`,
          category: params.category || TransactionCategory.TRANSFER,
          referenceId: receiverRef,
          counterpartyAccount: sourceAccount.accountNumber,
          counterpartyName: sourceAccount.user.name,
          counterpartyBank: "Code Paglu Bank",
          transferMode: params.transferMode || TransferMode.INTRA_BANK,
          status: TransactionStatus.COMPLETED,
        },
      });

      // 9. Audit event
      await logAuditEvent({
        actorId: params.actorId || sourceAccount.userId,
        actorName: params.actorName || sourceAccount.user.name,
        actorRole: params.actorRole || "CUSTOMER",
        action: "TRANSFER_INTRA_BANK",
        targetType: "ACCOUNT",
        targetId: sourceAccount.id,
        ipAddress: params.ipAddress,
        metadata: {
          amount,
          sourceAccount: sourceAccount.accountNumber,
          destinationAccount: destAccount.accountNumber,
          referenceId: senderRef,
        },
        severity: amount >= 200000 ? "WARN" : "INFO",
      });

      return {
        success: true,
        referenceId: senderRef,
        transaction: debitTxn,
        balanceAfter: Number(newSourceBalance),
      };
    });
  },

  /**
   * Execute external inter-bank transfer (NEFT / RTGS / IMPS)
   */
  async executeExternalTransfer(params: ExternalTransferParams) {
    const { sourceAccountId, destinationAccountNumber, destinationBankName, destinationIfsc, destinationAccountName, amount, description, transferMode, idempotencyKey } = params;

    if (amount <= 0) {
      throw new Error("Transfer amount must be greater than zero.");
    }

    return await prisma.$transaction(async (tx) => {
      if (idempotencyKey) {
        const existingTxn = await tx.transaction.findUnique({
          where: { idempotencyKey },
        });
        if (existingTxn) {
          return { success: true, transaction: existingTxn, replayed: true };
        }
      }

      const sourceAccount = await tx.account.findUnique({
        where: { id: sourceAccountId },
        include: { user: true },
      });

      if (!sourceAccount) {
        throw new Error("Source account not found.");
      }

      if (sourceAccount.status !== "ACTIVE") {
        throw new Error(`Source account is ${sourceAccount.status.toLowerCase()}.`);
      }

      const sourceBalanceNum = Number(sourceAccount.balance);
      if (sourceBalanceNum < amount) {
        throw new Error(`Insufficient funds. Current balance: ₹${sourceBalanceNum.toLocaleString('en-IN')}, Requested: ₹${amount.toLocaleString('en-IN')}`);
      }

      const newSourceBalance = new Prisma.Decimal(sourceBalanceNum - amount);

      await tx.account.update({
        where: { id: sourceAccount.id },
        data: { balance: newSourceBalance },
      });

      const refId = generateTxnRef();
      const debitTxn = await tx.transaction.create({
        data: {
          accountId: sourceAccount.id,
          type: TransactionType.DEBIT,
          amount: new Prisma.Decimal(amount),
          balanceAfter: newSourceBalance,
          description: description || `${transferMode} Transfer to ${destinationAccountName} (${destinationBankName})`,
          category: TransactionCategory.TRANSFER,
          referenceId: refId,
          counterpartyAccount: destinationAccountNumber,
          counterpartyName: destinationAccountName,
          counterpartyBank: destinationBankName,
          transferMode,
          status: TransactionStatus.COMPLETED,
          idempotencyKey: idempotencyKey || undefined,
          metadata: JSON.stringify({ ifsc: destinationIfsc }),
        },
      });

      await logAuditEvent({
        actorId: params.actorId || sourceAccount.userId,
        actorName: params.actorName || sourceAccount.user.name,
        actorRole: params.actorRole || "CUSTOMER",
        action: `TRANSFER_EXTERNAL_${transferMode}`,
        targetType: "ACCOUNT",
        targetId: sourceAccount.id,
        ipAddress: params.ipAddress,
        metadata: {
          amount,
          sourceAccount: sourceAccount.accountNumber,
          destinationBank: destinationBankName,
          destinationIfsc,
          referenceId: refId,
        },
        severity: amount >= 200000 ? "WARN" : "INFO",
      });

      return {
        success: true,
        referenceId: refId,
        transaction: debitTxn,
        balanceAfter: Number(newSourceBalance),
      };
    });
  },

  /**
   * Counter Cash Deposit by Staff Teller
   */
  async executeCounterDeposit(params: CounterDepositParams) {
    const { targetAccountNumber, amount, tellerUserId, tellerName, depositorName, remarks } = params;

    if (amount <= 0) {
      throw new Error("Deposit amount must be positive.");
    }

    return await prisma.$transaction(async (tx) => {
      const account = await tx.account.findUnique({
        where: { accountNumber: targetAccountNumber },
        include: { user: true },
      });

      if (!account) {
        throw new Error(`Account ${targetAccountNumber} not found.`);
      }

      if (account.status !== "ACTIVE") {
        throw new Error(`Account is ${account.status.toLowerCase()}. Deposits cannot be posted.`);
      }

      const balanceNum = Number(account.balance);
      const newBalance = new Prisma.Decimal(balanceNum + amount);

      await tx.account.update({
        where: { id: account.id },
        data: { balance: newBalance },
      });

      const refId = generateTxnRef();
      const creditTxn = await tx.transaction.create({
        data: {
          accountId: account.id,
          type: TransactionType.CREDIT,
          amount: new Prisma.Decimal(amount),
          balanceAfter: newBalance,
          description: `Cash Deposit by ${depositorName} (Teller: ${tellerName}) ${remarks ? `— ${remarks}` : ""}`,
          category: TransactionCategory.CASH_DEPOSIT,
          referenceId: refId,
          counterpartyName: depositorName,
          counterpartyBank: "Code Paglu Bank Branch Counter",
          status: TransactionStatus.COMPLETED,
        },
      });

      await logAuditEvent({
        actorId: tellerUserId,
        actorName: tellerName,
        actorRole: "STAFF",
        action: "COUNTER_CASH_DEPOSIT",
        targetType: "ACCOUNT",
        targetId: account.id,
        metadata: {
          amount,
          accountNumber: targetAccountNumber,
          depositorName,
          referenceId: refId,
        },
        severity: amount >= 200000 ? "WARN" : "INFO",
      });

      return {
        success: true,
        referenceId: refId,
        balanceAfter: Number(newBalance),
        accountHolderName: account.user.name,
      };
    });
  },

  /**
   * Transaction Reversal with Maker-Checker Authorization
   */
  async executeReversal(params: ReversalParams) {
    const { originalTransactionReferenceId, reason, initiatedByUserId, initiatedByName, approvedByUserId, approvedByName } = params;

    return await prisma.$transaction(async (tx) => {
      const origTxn = await tx.transaction.findUnique({
        where: { referenceId: originalTransactionReferenceId },
        include: { account: { include: { user: true } } },
      });

      if (!origTxn) {
        throw new Error(`Original transaction ${originalTransactionReferenceId} not found.`);
      }

      if (origTxn.status === "REVERSED") {
        throw new Error("This transaction has already been reversed.");
      }

      const amountNum = Number(origTxn.amount);
      const currentBalance = Number(origTxn.account.balance);

      let newBalance: Prisma.Decimal;
      let reversalType: TransactionType;

      if (origTxn.type === TransactionType.DEBIT) {
        // Debit reversal -> Credit back to account
        newBalance = new Prisma.Decimal(currentBalance + amountNum);
        reversalType = TransactionType.CREDIT;
      } else {
        // Credit reversal -> Debit from account
        if (currentBalance < amountNum) {
          throw new Error("Cannot reverse credit: Account has insufficient balance.");
        }
        newBalance = new Prisma.Decimal(currentBalance - amountNum);
        reversalType = TransactionType.DEBIT;
      }

      // Update account balance
      await tx.account.update({
        where: { id: origTxn.accountId },
        data: { balance: newBalance },
      });

      // Mark original transaction as REVERSED
      await tx.transaction.update({
        where: { id: origTxn.id },
        data: { status: TransactionStatus.REVERSED },
      });

      // Create Reversal Transaction record
      const refId = generateTxnRef();
      const revTxn = await tx.transaction.create({
        data: {
          accountId: origTxn.accountId,
          type: reversalType,
          amount: origTxn.amount,
          balanceAfter: newBalance,
          description: `REVERSAL of ${origTxn.referenceId} — Reason: ${reason} (Authorized by ${approvedByName || initiatedByName})`,
          category: TransactionCategory.REVERSAL,
          referenceId: refId,
          counterpartyAccount: origTxn.counterpartyAccount,
          counterpartyName: origTxn.counterpartyName,
          counterpartyBank: "Code Paglu Bank",
          status: TransactionStatus.COMPLETED,
        },
      });

      await logAuditEvent({
        actorId: approvedByUserId || initiatedByUserId,
        actorName: approvedByName || initiatedByName,
        actorRole: "STAFF",
        action: "TRANSACTION_REVERSAL",
        targetType: "TRANSACTION",
        targetId: origTxn.id,
        metadata: {
          originalReferenceId: origTxn.referenceId,
          reversalReferenceId: refId,
          amount: amountNum,
          reason,
          maker: initiatedByName,
          checker: approvedByName || "Self (under threshold)",
        },
        severity: "WARN",
      });

      return {
        success: true,
        reversalReferenceId: refId,
        balanceAfter: Number(newBalance),
        transaction: revTxn,
      };
    });
  },
};
