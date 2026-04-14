import { Prisma } from "../generated/prisma";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";
import { writeVoucherLog } from "./voucher-audit-log.service";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CreateReceiptLine {
  debitAccountId: string;
  creditAccountId: string;
  amount: number;
  description: string;
}

export interface CreateReceiptInput {
  customerId: string;
  receiptDate: string; // ISO date yyyy-mm-dd
  accountingDate: string; // ISO date yyyy-mm-dd
  submitter?: string;
  reason?: string;
  notes?: string;
  lines: CreateReceiptLine[];
}

export interface ReceiptFull {
  id: string;
  receiptNumber: string;
  receiptDate: string;
  accountingDate: string;
  totalAmount: string;
  submitter: string | null;
  reason: string | null;
  notes: string | null;
  customer: {
    id: string;
    code: string;
    name: string;
    taxCode: string | null;
    address: string | null;
  };
  lines: {
    id: string;
    debitAccount: { id: string; code: string; name: string };
    creditAccount: { id: string; code: string; name: string };
    amount: string;
    description: string;
  }[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

type TxClient = Omit<
  typeof prisma,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

async function generateReceiptNumber(tx: TxClient): Promise<string> {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const prefix = `PT${yy}-`;

  const last = await tx.receipt.findFirst({
    where: { receiptNumber: { startsWith: prefix } },
    orderBy: { receiptNumber: "desc" },
    select: { receiptNumber: true },
  });

  let seq = 1;
  if (last) {
    const parts = last.receiptNumber.split("-");
    const lastSeq = Number.parseInt(parts[parts.length - 1] ?? "0", 10);
    if (!Number.isNaN(lastSeq)) seq = lastSeq + 1;
  }

  return `${prefix}${mm}${String(seq).padStart(4, "0")}`;
}

async function generateEntryNumber(tx: TxClient): Promise<string> {
  const now = new Date();
  const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const prefix = `BT${dateStr}`;

  const count = await tx.journalEntry.count({
    where: { entryNumber: { startsWith: prefix } },
  });

  return `${prefix}${String(count + 1).padStart(4, "0")}`;
}

// ── Get default accounts ──────────────────────────────────────────────────────

export async function getReceiptDefaultAccounts(customerId: string): Promise<{
  cashAccounts: { id: string; code: string; name: string }[];
  arAccounts: { id: string; code: string; name: string }[];
  defaultArAccountId: string | null;
}> {
  // Cash/bank accounts: 111, 112
  const cashAccounts = await prisma.account.findMany({
    where: {
      OR: [{ code: { startsWith: "111" } }, { code: { startsWith: "112" } }],
      isActive: true,
      isPosting: true,
    },
    select: { id: true, code: true, name: true },
    orderBy: { code: "asc" },
  });

  // All AR accounts (131*)
  const arAccounts = await prisma.account.findMany({
    where: { code: { startsWith: "131" }, isActive: true, isPosting: true },
    select: { id: true, code: true, name: true },
    orderBy: { code: "asc" },
  });

  // Find the most-recently-used 131* account for this customer as default
  const lastUsed = await prisma.journalEntryLine.findFirst({
    where: {
      partnerId: customerId,
      account: { code: { startsWith: "131" } },
    },
    select: { accountId: true },
    orderBy: { id: "desc" },
  });

  const defaultArAccountId = lastUsed?.accountId ?? arAccounts[0]?.id ?? null;

  return { cashAccounts, arAccounts, defaultArAccountId };
}

// ── Create receipt ────────────────────────────────────────────────────────────

export async function createReceipt(
  input: CreateReceiptInput,
  userId: string,
  userEmail: string,
): Promise<{ id: string; receiptNumber: string }> {
  if (!input.lines.length)
    throw new ApiError(400, "Phiếu thu cần ít nhất 1 dòng hạch toán");

  const totalAmount = input.lines.reduce((s, l) => s + l.amount, 0);
  if (totalAmount <= 0) throw new ApiError(400, "Tổng số tiền phải lớn hơn 0");

  const customer = await prisma.partner.findUnique({
    where: { id: input.customerId },
    select: { id: true, code: true, name: true },
  });
  if (!customer) throw new ApiError(404, "Khách hàng không tồn tại");

  return await prisma
    .$transaction(async (tx) => {
      const receiptNumber = await generateReceiptNumber(tx);
      const entryNumber = await generateEntryNumber(tx);

      const receiptDate = new Date(input.receiptDate);
      const accountingDate = new Date(input.accountingDate);

      // Create journal entry
      const journalEntry = await tx.journalEntry.create({
        data: {
          entryNumber,
          accountingDate,
          description: input.reason ?? `Thu tiền của ${customer.name}`,
          refType: "RECEIPT",
          refId: customer.id, // will be updated after receipt creation
          isReversed: false,
          createdById: userId,
          lines: {
            create: input.lines.flatMap((line, i) => [
              {
                accountId: line.debitAccountId,
                debitAmount: new Prisma.Decimal(line.amount),
                creditAmount: new Prisma.Decimal(0),
                description: line.description,
                partnerId: null,
                sortOrder: i * 2,
              },
              {
                accountId: line.creditAccountId,
                debitAmount: new Prisma.Decimal(0),
                creditAmount: new Prisma.Decimal(line.amount),
                description: line.description,
                partnerId: input.customerId,
                sortOrder: i * 2 + 1,
              },
            ]),
          },
        },
        select: { id: true },
      });

      // Create receipt record
      const receipt = await tx.receipt.create({
        data: {
          receiptNumber,
          receiptDate,
          accountingDate,
          customerId: input.customerId,
          submitter: input.submitter ?? null,
          reason: input.reason ?? null,
          notes: input.notes ?? null,
          totalAmount: new Prisma.Decimal(totalAmount),
          journalEntryId: journalEntry.id,
          createdById: userId,
        },
        select: { id: true, receiptNumber: true },
      });

      // Update journal entry refId to receipt id
      await tx.journalEntry.update({
        where: { id: journalEntry.id },
        data: { refId: receipt.id },
      });

      return receipt;
    })
    .then(async (receipt) => {
      await writeVoucherLog({
        userId,
        userEmail,
        action: "CREATE_RECEIPT",
        entityId: receipt.id,
        entityRef: receipt.receiptNumber,
        detail: `Lập phiếu thu ${receipt.receiptNumber} — ${customer.name} — ${totalAmount.toLocaleString("vi-VN")} VNĐ`,
      }).catch(() => undefined);
      return receipt;
    });
}
