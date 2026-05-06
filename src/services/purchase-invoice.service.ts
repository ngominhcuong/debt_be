import { Prisma } from "../../src/generated/prisma/index";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";
import { writeVoucherLog } from "./voucher-audit-log.service";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CreatePurchaseInvoiceDetailInput {
  itemId: string;
  warehouseId?: string;
  description?: string;
  qty: number;
  unitPrice: number;
  vatRate: number;
  apAccountId?: string;
  expAccountId?: string;
  sortOrder?: number;
}

export interface CreatePurchaseInvoiceInput {
  voucherDate: string;
  accountingDate: string;
  supplierId: string;
  description?: string;
  isPosted: boolean;
  invoiceNumber?: string;
  invoiceSeries?: string;
  invoiceDate?: string;
  contactPerson?: string;
  reference?: string;
  paymentTermDays?: number;
  dueDate?: string;
  notes?: string;
  details: CreatePurchaseInvoiceDetailInput[];
}

export interface UpdatePurchaseInvoiceInput {
  voucherDate?: string;
  accountingDate?: string;
  supplierId?: string;
  description?: string;
  invoiceNumber?: string;
  invoiceSeries?: string;
  invoiceDate?: string;
  contactPerson?: string;
  reference?: string;
  paymentTermDays?: number;
  dueDate?: string;
  notes?: string;
  details?: CreatePurchaseInvoiceDetailInput[];
}

// ─── TxClient helper type ─────────────────────────────────────────────────────

type TxClient = Omit<
  typeof prisma,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function generateVoucherNumber(tx: TxClient): Promise<string> {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const prefix = `MH${yyyy}${mm}${dd}`;
  const count = await tx.purchaseInvoice.count({
    where: { voucherNumber: { startsWith: prefix } },
  });
  return `${prefix}${String(count + 1).padStart(4, "0")}`;
}

async function generateEntryNumber(tx: TxClient): Promise<string> {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const prefix = `BT${yyyy}${mm}${dd}`;
  const count = await tx.journalEntry.count({
    where: { entryNumber: { startsWith: prefix } },
  });
  return `${prefix}${String(count + 1).padStart(4, "0")}`;
}

// ─── Build details & totals ───────────────────────────────────────────────────

async function buildDetailsAndTotals(
  tx: TxClient,
  invoiceId: string,
  details: CreatePurchaseInvoiceDetailInput[],
): Promise<{ totalAmount: Prisma.Decimal; vatAmount: Prisma.Decimal }> {
  let totalAmount = new Prisma.Decimal(0);
  let vatAmount = new Prisma.Decimal(0);

  for (const d of details) {
    const item = await tx.item.findUnique({ where: { id: d.itemId } });
    if (!item) throw new ApiError(400, `Mặt hàng không tồn tại: ${d.itemId}`);

    const qty = new Prisma.Decimal(d.qty);
    const unitPrice = new Prisma.Decimal(d.unitPrice);
    const vatRate = new Prisma.Decimal(d.vatRate);
    const lineAmount = qty.times(unitPrice);
    const lineVat = lineAmount.times(vatRate).div(100);

    totalAmount = totalAmount.plus(lineAmount);
    vatAmount = vatAmount.plus(lineVat);

    await tx.purchaseInvoiceDetail.create({
      data: {
        invoiceId,
        itemId: d.itemId,
        warehouseId: d.warehouseId ?? null,
        description: d.description ?? null,
        qty: qty,
        unitPrice: unitPrice,
        vatRate: vatRate,
        amount: lineAmount,
        apAccountId: d.apAccountId ?? null,
        expAccountId: d.expAccountId ?? null,
        sortOrder: d.sortOrder ?? 0,
      },
    });
  }

  return { totalAmount, vatAmount };
}

// ─── Post journal – Mua hàng ──────────────────────────────────────────────────
// Kế toán chuẩn:
//   Nợ TK 156/152/641/… (chi phí/hàng tồn kho)  = totalAmount
//   Nợ TK 1331          (thuế GTGT đầu vào)       = vatAmount
//   Có TK 331           (phải trả NCC)             = grandTotal
// ─────────────────────────────────────────────────────────────────────────────

async function postJournal(
  tx: TxClient,
  params: {
    invoiceId: string;
    voucherNumber: string;
    accountingDate: string;
    supplierId: string;
    userId: string;
    totalAmount: Prisma.Decimal;
    vatAmount: Prisma.Decimal;
    grandTotal: Prisma.Decimal;
    details: CreatePurchaseInvoiceDetailInput[];
  },
): Promise<void> {
  const ZERO = new Prisma.Decimal(0);

  // Load required accounts
  const [acc331, acc1331] = await Promise.all([
    tx.account.findFirst({
      where: { code: { startsWith: "331" }, isPosting: true, isActive: true },
      orderBy: { code: "asc" },
    }),
    tx.account.findFirst({
      where: { code: { startsWith: "1331" }, isPosting: true, isActive: true },
      orderBy: { code: "asc" },
    }),
  ]);

  if (!acc331) throw new ApiError(500, "Không tìm thấy TK 331 (Phải trả NCC)");

  const entryNumber = await generateEntryNumber(tx);
  const entry = await tx.journalEntry.create({
    data: {
      entryNumber,
      accountingDate: new Date(params.accountingDate),
      description: `Mua hàng ${params.voucherNumber}`,
      refType: "PURCHASE_INVOICE",
      refId: params.invoiceId,
      purchaseInvoiceId: params.invoiceId,
      createdById: params.userId,
    },
  });

  const lines: Prisma.JournalEntryLineCreateManyInput[] = [];
  let sortOrder = 0;

  // --- Nợ TK 156/exp per detail line ---
  // Group details by expAccountId to build the debit lines per expense account
  const detailsWithAccounts = await tx.purchaseInvoiceDetail.findMany({
    where: { invoiceId: params.invoiceId },
    include: {
      item: { include: { inventoryAccount: true } },
      expAccount: true,
    },
  });

  for (const detail of detailsWithAccounts) {
    // Use expAccount if specified, else fall back to item's inventoryAccount, else skip (lump in one line)
    const debitAccountId =
      detail.expAccountId ?? detail.item.inventoryAccount?.id ?? null;

    if (debitAccountId) {
      lines.push({
        journalEntryId: entry.id,
        accountId: debitAccountId,
        debitAmount: detail.amount,
        creditAmount: ZERO,
        description: `Nợ hàng mua ${detail.item.name} (${params.voucherNumber})`,
        partnerId: params.supplierId,
        sortOrder: sortOrder++,
      });
    } else {
      // Fallback: use a generic 156 account if no specific account found
      const acc156 = await tx.account.findFirst({
        where: { code: { startsWith: "156" }, isPosting: true, isActive: true },
        orderBy: { code: "asc" },
      });
      if (acc156) {
        lines.push({
          journalEntryId: entry.id,
          accountId: acc156.id,
          debitAmount: detail.amount,
          creditAmount: ZERO,
          description: `Nợ hàng mua ${detail.item.name} (${params.voucherNumber})`,
          partnerId: params.supplierId,
          sortOrder: sortOrder++,
        });
      }
    }
  }

  // Nợ TK 1331 nếu có thuế
  if (params.vatAmount.greaterThan(0) && acc1331) {
    lines.push({
      journalEntryId: entry.id,
      accountId: acc1331.id,
      debitAmount: params.vatAmount,
      creditAmount: ZERO,
      description: `Nợ 1331 - Thuế GTGT đầu vào (${params.voucherNumber})`,
      sortOrder: sortOrder++,
    });
  }

  // Có TK 331
  lines.push({
    journalEntryId: entry.id,
    accountId: acc331.id,
    debitAmount: ZERO,
    creditAmount: params.grandTotal,
    description: `Có 331 - Phải trả NCC (${params.voucherNumber})`,
    partnerId: params.supplierId,
    sortOrder: sortOrder++,
  });

  await tx.journalEntryLine.createMany({ data: lines });
}

// ─── List ─────────────────────────────────────────────────────────────────────

export async function listPurchaseInvoices(params: {
  q?: string;
  dateFrom?: string;
  dateTo?: string;
  isPosted?: boolean;
  supplierId?: string;
  sortBy?: string;
  sortDir?: string;
  page?: number;
  limit?: number;
}) {
  const page = Math.max(1, params.page ?? 1);
  const limit = Math.min(200, Math.max(1, params.limit ?? 20));
  const skip = (page - 1) * limit;

  const where: Prisma.PurchaseInvoiceWhereInput = {};
  if (params.dateFrom || params.dateTo) {
    where.voucherDate = {};
    if (params.dateFrom) where.voucherDate.gte = new Date(params.dateFrom);
    if (params.dateTo) where.voucherDate.lte = new Date(params.dateTo);
  }
  if (params.isPosted !== undefined) where.isPosted = params.isPosted;
  if (params.supplierId) where.supplierId = params.supplierId;
  if (params.q) {
    where.OR = [
      { voucherNumber: { contains: params.q, mode: "insensitive" } },
      { invoiceNumber: { contains: params.q, mode: "insensitive" } },
      { supplier: { name: { contains: params.q, mode: "insensitive" } } },
      { supplier: { code: { contains: params.q, mode: "insensitive" } } },
    ];
  }

  const validSortFields: Record<string, string> = {
    accountingDate: "accountingDate",
    voucherDate: "voucherDate",
    grandTotal: "grandTotal",
  };
  const sortField = validSortFields[params.sortBy ?? ""] ?? "accountingDate";
  const sortDir: "asc" | "desc" = params.sortDir === "asc" ? "asc" : "desc";
  const orderBy = {
    [sortField]: sortDir,
  } as Prisma.PurchaseInvoiceOrderByWithRelationInput;

  const [total, rows] = await Promise.all([
    prisma.purchaseInvoice.count({ where }),
    prisma.purchaseInvoice.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        supplier: {
          select: {
            id: true,
            code: true,
            name: true,
            address: true,
            taxCode: true,
          },
        },
        postedBy: { select: { id: true, fullName: true, email: true } },
      },
    }),
  ]);

  return { total, page, limit, rows };
}

// ─── Get by ID ────────────────────────────────────────────────────────────────

export async function getPurchaseInvoiceById(id: string) {
  const inv = await prisma.purchaseInvoice.findUnique({
    where: { id },
    include: {
      supplier: {
        select: {
          id: true,
          code: true,
          name: true,
          address: true,
          taxCode: true,
        },
      },
      postedBy: { select: { id: true, fullName: true, email: true } },
      details: {
        orderBy: { sortOrder: "asc" },
        include: {
          item: {
            select: {
              id: true,
              sku: true,
              name: true,
              unit: true,
              itemType: true,
            },
          },
          warehouse: { select: { id: true, code: true, name: true } },
          apAccount: { select: { id: true, code: true, name: true } },
          expAccount: { select: { id: true, code: true, name: true } },
        },
      },
    },
  });
  if (!inv) throw new ApiError(404, "Không tìm thấy chứng từ mua hàng");
  return inv;
}

// ─── Create ───────────────────────────────────────────────────────────────────

export async function createPurchaseInvoice(
  input: CreatePurchaseInvoiceInput,
  userId: string,
  userEmail: string,
) {
  const result = await prisma.$transaction(
    async (tx) => {
      const voucherNumber = await generateVoucherNumber(tx);

      let totalAmount = new Prisma.Decimal(0);
      let vatAmount = new Prisma.Decimal(0);

      // Pre-compute totals for header (detail rows created inside buildDetailsAndTotals)
      for (const d of input.details) {
        const qty = new Prisma.Decimal(d.qty);
        const unitPrice = new Prisma.Decimal(d.unitPrice);
        const vatRate = new Prisma.Decimal(d.vatRate);
        const line = qty.times(unitPrice);
        totalAmount = totalAmount.plus(line);
        vatAmount = vatAmount.plus(line.times(vatRate).div(100));
      }
      const grandTotal = totalAmount.plus(vatAmount);

      const inv = await tx.purchaseInvoice.create({
        data: {
          voucherNumber,
          voucherDate: new Date(input.voucherDate),
          accountingDate: new Date(input.accountingDate),
          supplierId: input.supplierId,
          description: input.description ?? null,
          totalAmount,
          vatAmount,
          grandTotal,
          invoiceNumber: input.invoiceNumber ?? null,
          invoiceSeries: input.invoiceSeries ?? null,
          invoiceDate: input.invoiceDate ? new Date(input.invoiceDate) : null,
          contactPerson: input.contactPerson ?? null,
          reference: input.reference ?? null,
          paymentTermDays: input.paymentTermDays ?? null,
          dueDate: input.dueDate ? new Date(input.dueDate) : null,
          notes: input.notes ?? null,
          isPosted: input.isPosted,
          postedAt: input.isPosted ? new Date() : null,
          postedById: input.isPosted ? userId : null,
        },
      });

      await buildDetailsAndTotals(tx, inv.id, input.details);

      if (input.isPosted) {
        await postJournal(tx, {
          invoiceId: inv.id,
          voucherNumber,
          accountingDate: input.accountingDate,
          supplierId: input.supplierId,
          userId,
          totalAmount,
          vatAmount,
          grandTotal,
          details: input.details,
        });
      }

      return { id: inv.id, voucherNumber };
    },
    { timeout: 15000 },
  );

  await writeVoucherLog({
    userId,
    userEmail,
    action: "CREATE",
    entityType: "purchase_invoice",
    entityId: result.id,
    entityRef: result.voucherNumber,
    detail: `Tạo chứng từ mua hàng ${result.voucherNumber}`,
  }).catch(() => undefined);

  return result;
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updatePurchaseInvoice(
  id: string,
  input: UpdatePurchaseInvoiceInput,
  userId: string,
) {
  const existing = await prisma.purchaseInvoice.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, "Không tìm thấy chứng từ");
  if (existing.isPosted)
    throw new ApiError(400, "Chứng từ đã ghi sổ, không thể sửa");

  return prisma.$transaction(
    async (tx) => {
      // Delete old details if new ones provided
      if (input.details) {
        await tx.purchaseInvoiceDetail.deleteMany({ where: { invoiceId: id } });
      }

      let totalAmount = existing.totalAmount;
      let vatAmount = existing.vatAmount;
      let grandTotal = existing.grandTotal;

      if (input.details) {
        totalAmount = new Prisma.Decimal(0);
        vatAmount = new Prisma.Decimal(0);
        for (const d of input.details) {
          const line = new Prisma.Decimal(d.qty).times(
            new Prisma.Decimal(d.unitPrice),
          );
          totalAmount = totalAmount.plus(line);
          vatAmount = vatAmount.plus(
            line.times(new Prisma.Decimal(d.vatRate)).div(100),
          );
        }
        grandTotal = totalAmount.plus(vatAmount);
      }

      const updated = await tx.purchaseInvoice.update({
        where: { id },
        data: {
          voucherDate: input.voucherDate
            ? new Date(input.voucherDate)
            : undefined,
          accountingDate: input.accountingDate
            ? new Date(input.accountingDate)
            : undefined,
          supplierId: input.supplierId,
          description: input.description,
          totalAmount: input.details ? totalAmount : undefined,
          vatAmount: input.details ? vatAmount : undefined,
          grandTotal: input.details ? grandTotal : undefined,
          invoiceNumber: input.invoiceNumber,
          invoiceSeries: input.invoiceSeries,
          invoiceDate: input.invoiceDate
            ? new Date(input.invoiceDate)
            : undefined,
          contactPerson: input.contactPerson,
          reference: input.reference,
          paymentTermDays: input.paymentTermDays,
          dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
          notes: input.notes,
        },
      });

      if (input.details) {
        await buildDetailsAndTotals(tx, id, input.details);
      }

      return { id: updated.id, voucherNumber: updated.voucherNumber };
    },
    { timeout: 15000 },
  );
}

// ─── Post (Ghi sổ) ────────────────────────────────────────────────────────────

export async function postPurchaseInvoice(id: string, userId: string) {
  const inv = await prisma.purchaseInvoice.findUnique({
    where: { id },
    include: { details: true },
  });
  if (!inv) throw new ApiError(404, "Không tìm thấy chứng từ");
  if (inv.isPosted) throw new ApiError(400, "Chứng từ đã ghi sổ");

  await prisma.$transaction(
    async (tx) => {
      await tx.purchaseInvoice.update({
        where: { id },
        data: { isPosted: true, postedAt: new Date(), postedById: userId },
      });

      const detailInputs: CreatePurchaseInvoiceDetailInput[] = inv.details.map(
        (d) => ({
          itemId: d.itemId,
          warehouseId: d.warehouseId ?? undefined,
          qty: Number.parseFloat(d.qty.toString()),
          unitPrice: Number.parseFloat(d.unitPrice.toString()),
          vatRate: Number.parseFloat(d.vatRate.toString()),
          apAccountId: d.apAccountId ?? undefined,
          expAccountId: d.expAccountId ?? undefined,
        }),
      );

      await postJournal(tx, {
        invoiceId: id,
        voucherNumber: inv.voucherNumber,
        accountingDate: inv.accountingDate.toISOString().slice(0, 10),
        supplierId: inv.supplierId,
        userId,
        totalAmount: inv.totalAmount,
        vatAmount: inv.vatAmount,
        grandTotal: inv.grandTotal,
        details: detailInputs,
      });
    },
    { timeout: 15000 },
  );

  return {
    id,
    voucherNumber: (
      await prisma.purchaseInvoice.findUnique({
        where: { id },
        select: { voucherNumber: true },
      })
    )?.voucherNumber,
  };
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deletePurchaseInvoice(id: string) {
  const existing = await prisma.purchaseInvoice.findUnique({ where: { id } });
  if (!existing) throw new ApiError(404, "Không tìm thấy chứng từ");
  if (existing.isPosted)
    throw new ApiError(400, "Chứng từ đã ghi sổ, không thể xóa");
  await prisma.purchaseInvoice.delete({ where: { id } });
}
