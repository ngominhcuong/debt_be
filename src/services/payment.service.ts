import { Prisma } from "../generated/prisma";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";
import { writeVoucherLog } from "./voucher-audit-log.service";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CreatePaymentLine {
  debitAccountId: string; // 331* AP account
  creditAccountId: string; // 111/112 cash/bank account
  amount: number;
  description: string;
}

export interface CreatePaymentInput {
  supplierId: string;
  paymentDate: string; // ISO date yyyy-mm-dd
  accountingDate: string; // ISO date yyyy-mm-dd
  recipient?: string; // Người nhận
  reason?: string;
  notes?: string;
  lines: CreatePaymentLine[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

type TxClient = Omit<
  typeof prisma,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

async function generatePaymentNumber(tx: TxClient): Promise<string> {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const prefix = `PC${yy}-`;

  const last = await tx.payment.findFirst({
    where: { paymentNumber: { startsWith: prefix } },
    orderBy: { paymentNumber: "desc" },
    select: { paymentNumber: true },
  });

  let seq = 1;
  if (last) {
    const parts = last.paymentNumber.split("-");
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

export async function getPaymentDefaultAccounts(supplierId: string): Promise<{
  cashAccounts: { id: string; code: string; name: string }[];
  allAccounts: { id: string; code: string; name: string }[];
  defaultDebitAccountId: string | null;
}> {
  // Cash/bank accounts: 111*, 112* (for TK Có)
  const cashAccounts = await prisma.account.findMany({
    where: {
      OR: [{ code: { startsWith: "111" } }, { code: { startsWith: "112" } }],
      isActive: true,
      isPosting: true,
    },
    select: { id: true, code: true, name: true },
    orderBy: { code: "asc" },
  });

  // All active posting accounts (for TK Nợ — accountant chooses freely)
  const allAccounts = await prisma.account.findMany({
    where: { isActive: true, isPosting: true },
    select: { id: true, code: true, name: true },
    orderBy: { code: "asc" },
  });

  // Find the most-recently-used 331* account for this supplier as default debit
  const lastUsed = await prisma.journalEntryLine.findFirst({
    where: {
      partnerId: supplierId,
      account: { code: { startsWith: "331" } },
    },
    select: { accountId: true },
    orderBy: { id: "desc" },
  });

  const defaultDebitAccountId =
    lastUsed?.accountId ??
    allAccounts.find((a) => a.code.startsWith("331"))?.id ??
    null;

  return { cashAccounts, allAccounts, defaultDebitAccountId };
}

// ── Create payment ────────────────────────────────────────────────────────────

export async function createPayment(
  input: CreatePaymentInput,
  userId: string,
  userEmail: string,
): Promise<{ id: string; paymentNumber: string }> {
  if (!input.lines.length)
    throw new ApiError(400, "Phiếu chi cần ít nhất 1 dòng hạch toán");

  const totalAmount = input.lines.reduce((s, l) => s + l.amount, 0);
  if (totalAmount <= 0) throw new ApiError(400, "Tổng số tiền phải lớn hơn 0");

  const supplier = await prisma.partner.findUnique({
    where: { id: input.supplierId },
    select: { id: true, code: true, name: true },
  });
  if (!supplier) throw new ApiError(404, "Nhà cung cấp không tồn tại");

  return await prisma
    .$transaction(async (tx) => {
      const paymentNumber = await generatePaymentNumber(tx);
      const entryNumber = await generateEntryNumber(tx);

      const paymentDate = new Date(input.paymentDate);
      const accountingDate = new Date(input.accountingDate);

      // Create journal entry
      // Payment (AP): debit 331* (AP account, with partnerId=supplierId), credit 111/112 (cash/bank)
      const journalEntry = await tx.journalEntry.create({
        data: {
          entryNumber,
          accountingDate,
          description: input.reason ?? `Chi tiền cho ${supplier.name}`,
          refType: "PAYMENT",
          refId: supplier.id, // will be updated after payment creation
          isReversed: false,
          createdById: userId,
          lines: {
            create: input.lines.flatMap((line, i) => [
              {
                accountId: line.debitAccountId, // 331* AP account
                debitAmount: new Prisma.Decimal(line.amount),
                creditAmount: new Prisma.Decimal(0),
                description: line.description,
                partnerId: input.supplierId, // supplier on debit side
                sortOrder: i * 2,
              },
              {
                accountId: line.creditAccountId, // 111/112 cash/bank
                debitAmount: new Prisma.Decimal(0),
                creditAmount: new Prisma.Decimal(line.amount),
                description: line.description,
                partnerId: null,
                sortOrder: i * 2 + 1,
              },
            ]),
          },
        },
        select: { id: true },
      });

      // Create payment record
      const payment = await tx.payment.create({
        data: {
          paymentNumber,
          paymentDate,
          accountingDate,
          supplierId: input.supplierId,
          recipient: input.recipient ?? null,
          reason: input.reason ?? null,
          notes: input.notes ?? null,
          totalAmount: new Prisma.Decimal(totalAmount),
          journalEntryId: journalEntry.id,
          createdById: userId,
        },
        select: { id: true, paymentNumber: true },
      });

      // Update journal entry refId to payment id
      await tx.journalEntry.update({
        where: { id: journalEntry.id },
        data: { refId: payment.id },
      });

      return payment;
    })
    .then(async (payment) => {
      await writeVoucherLog({
        userId,
        userEmail,
        action: "CREATE_PAYMENT",
        entityId: payment.id,
        entityRef: payment.paymentNumber,
        detail: `Lập phiếu chi ${payment.paymentNumber} — ${supplier.name} — ${totalAmount.toLocaleString("vi-VN")} VNĐ`,
      }).catch(() => undefined);
      return payment;
    });
}
