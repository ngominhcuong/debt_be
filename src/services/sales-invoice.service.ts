import { Prisma } from "../../src/generated/prisma/index";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";
import {
  getActiveInvoiceSetting,
  getAndIncrementNextInvoiceNumber,
} from "./invoice-setting.service";

// ─── Voucher audit log helper ────────────────────────────────────────────────

async function writeVoucherLog(params: {
  userId: string;
  userEmail: string;
  action: string;
  entityId: string;
  entityRef: string;
  detail: string;
}) {
  const profile = await prisma.userProfile.findUnique({
    where: { id: params.userId },
    select: { fullName: true },
  });
  await prisma.voucherAuditLog.create({
    data: {
      userId: params.userId,
      userEmail: params.userEmail,
      userName: profile?.fullName ?? params.userEmail,
      action: params.action,
      entityType: "SALES_INVOICE",
      entityId: params.entityId,
      entityRef: params.entityRef,
      detail: params.detail,
    },
  });
}

// ─── Input Types ─────────────────────────────────────────────────────────────

export interface CreateSalesInvoiceDetailInput {
  itemId: string;
  warehouseId?: string;
  description?: string;
  qty: number;
  unitPrice: number;
  vatRate: number; // percentage, e.g. 10 means 10%
  arAccountId?: string;
  revAccountId?: string;
  sortOrder?: number;
}

export interface CreateSalesInvoiceInput {
  voucherDate: string; // ISO date string
  accountingDate: string; // ISO date string
  customerId: string;
  description?: string;
  isPosted: boolean;
  isDelivered: boolean;
  isInvoiced: boolean;
  invoiceNumber?: string;
  invoiceSeries?: string;
  invoiceDate?: string;
  contactPerson?: string;
  salesPersonName?: string;
  reference?: string;
  paymentTermDays?: number;
  dueDate?: string; // ISO date string
  details: CreateSalesInvoiceDetailInput[];
}

export interface UpdateSalesInvoiceInput {
  voucherDate?: string;
  accountingDate?: string;
  customerId?: string;
  description?: string;
  isDelivered?: boolean;
  isInvoiced?: boolean;
  invoiceNumber?: string;
  invoiceSeries?: string;
  invoiceDate?: string;
  contactPerson?: string;
  salesPersonName?: string;
  reference?: string;
  paymentTermDays?: number;
  dueDate?: string;
  details?: CreateSalesInvoiceDetailInput[];
}

// ─── Internal Types ───────────────────────────────────────────────────────────

interface DetailRecord {
  itemId: string;
  itemType: string;
  cogsAccountId: string | null;
  inventoryAccountId: string | null;
  purchasePrice: Prisma.Decimal | null;
  lineAmount: Prisma.Decimal;
  lineVat: Prisma.Decimal;
}

interface AccountRef {
  id: string;
  code: string;
}

interface JournalLinesContext {
  entryId: string;
  voucherNumber: string;
  customerId: string;
  grandTotal: Prisma.Decimal;
  totalAmount: Prisma.Decimal;
  vatAmount: Prisma.Decimal;
  acc131: AccountRef;
  acc511: AccountRef;
  acc3331: AccountRef | undefined;
  acc632: AccountRef | undefined;
  acc156: AccountRef | undefined;
  isDelivered: boolean;
  details: CreateSalesInvoiceDetailInput[];
  detailRecords: DetailRecord[];
}

interface PostJournalParams {
  invoiceId: string;
  voucherNumber: string;
  accountingDate: string;
  customerId: string;
  userId: string;
  totalAmount: Prisma.Decimal;
  vatAmount: Prisma.Decimal;
  grandTotal: Prisma.Decimal;
  isDelivered: boolean;
  details: CreateSalesInvoiceDetailInput[];
  detailRecords: DetailRecord[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

type TxClient = Omit<
  typeof prisma,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

async function generateVoucherNumber(tx: TxClient): Promise<string> {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const dateStr = `${yyyy}${mm}${dd}`;
  const prefix = `BH${dateStr}`;

  const count = await tx.salesInvoice.count({
    where: { voucherNumber: { startsWith: prefix } },
  });

  const seq = String(count + 1).padStart(4, "0");
  return `${prefix}${seq}`;
}

async function generateEntryNumber(tx: TxClient): Promise<string> {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const dateStr = `${yyyy}${mm}${dd}`;
  const prefix = `BT${dateStr}`;

  const count = await tx.journalEntry.count({
    where: { entryNumber: { startsWith: prefix } },
  });

  const seq = String(count + 1).padStart(4, "0");
  return `${prefix}${seq}`;
}

function computeCogsTotal(
  details: CreateSalesInvoiceDetailInput[],
  detailRecords: DetailRecord[],
): Prisma.Decimal {
  let cogsTotal = new Prisma.Decimal(0);
  for (const d of details) {
    const det = detailRecords.find((r) => r.itemId === d.itemId);
    if (det?.itemType === "GOODS" && det.purchasePrice?.greaterThan(0)) {
      cogsTotal = cogsTotal.plus(
        det.purchasePrice.times(new Prisma.Decimal(d.qty)),
      );
    }
  }
  return cogsTotal;
}

function buildJournalLines(
  ctx: JournalLinesContext,
): Prisma.JournalEntryLineCreateManyInput[] {
  const ZERO = new Prisma.Decimal(0);
  const lines: Prisma.JournalEntryLineCreateManyInput[] = [];
  let sortOrder = 0;

  // Nợ TK 131 / Có TK 511 — Phải thu KH / Doanh thu
  lines.push(
    {
      journalEntryId: ctx.entryId,
      accountId: ctx.acc131.id,
      debitAmount: ctx.grandTotal,
      creditAmount: ZERO,
      description: `Nợ 131 - Phải thu KH (${ctx.voucherNumber})`,
      partnerId: ctx.customerId,
      sortOrder: sortOrder++,
    },
    {
      journalEntryId: ctx.entryId,
      accountId: ctx.acc511.id,
      debitAmount: ZERO,
      creditAmount: ctx.totalAmount,
      description: `Có 511 - Doanh thu bán hàng (${ctx.voucherNumber})`,
      sortOrder: sortOrder++,
    },
  );

  // Có TK 3331 — Thuế GTGT đầu ra
  if (ctx.vatAmount.greaterThan(0) && ctx.acc3331) {
    lines.push({
      journalEntryId: ctx.entryId,
      accountId: ctx.acc3331.id,
      debitAmount: ZERO,
      creditAmount: ctx.vatAmount,
      description: `Có 3331 - Thuế GTGT đầu ra (${ctx.voucherNumber})`,
      sortOrder: sortOrder++,
    });
  }

  // Nợ TK 632 / Có TK 156 — Giá vốn hàng bán (khi kiêm phiếu xuất)
  if (ctx.isDelivered && ctx.acc632 && ctx.acc156) {
    const cogsTotal = computeCogsTotal(ctx.details, ctx.detailRecords);
    if (cogsTotal.greaterThan(0)) {
      lines.push(
        {
          journalEntryId: ctx.entryId,
          accountId: ctx.acc632.id,
          debitAmount: cogsTotal,
          creditAmount: ZERO,
          description: `Nợ 632 - Giá vốn hàng bán (${ctx.voucherNumber})`,
          sortOrder: sortOrder++,
        },
        {
          journalEntryId: ctx.entryId,
          accountId: ctx.acc156.id,
          debitAmount: ZERO,
          creditAmount: cogsTotal,
          description: `Có 156 - Hàng hóa xuất kho (${ctx.voucherNumber})`,
          sortOrder: sortOrder++,
        },
      );
    }
  }

  return lines;
}

async function buildDetailsAndTotals(
  tx: TxClient,
  invoiceId: string,
  details: CreateSalesInvoiceDetailInput[],
): Promise<{
  totalAmount: Prisma.Decimal;
  vatAmount: Prisma.Decimal;
  detailRecords: DetailRecord[];
}> {
  let totalAmount = new Prisma.Decimal(0);
  let vatAmount = new Prisma.Decimal(0);
  const detailRecords: DetailRecord[] = [];

  for (const d of details) {
    const item = await tx.item.findUnique({
      where: { id: d.itemId },
      select: {
        id: true,
        itemType: true,
        cogsAccountId: true,
        inventoryAccountId: true,
        purchasePrice: true,
      },
    });

    if (!item) {
      throw new ApiError(400, `Item not found: ${d.itemId}`);
    }

    const qty = new Prisma.Decimal(d.qty);
    const unitPrice = new Prisma.Decimal(d.unitPrice);
    const vatRate = new Prisma.Decimal(d.vatRate);
    const lineAmount = qty.times(unitPrice);
    const lineVat = lineAmount.times(vatRate).div(100);

    totalAmount = totalAmount.plus(lineAmount);
    vatAmount = vatAmount.plus(lineVat);

    await tx.salesInvoiceDetail.create({
      data: {
        invoiceId,
        itemId: d.itemId,
        warehouseId: d.warehouseId,
        description: d.description,
        qty,
        unitPrice,
        vatRate,
        amount: lineAmount,
        arAccountId: d.arAccountId,
        revAccountId: d.revAccountId,
        sortOrder: d.sortOrder ?? 0,
      },
    });

    detailRecords.push({
      itemId: d.itemId,
      itemType: item.itemType,
      cogsAccountId: item.cogsAccountId,
      inventoryAccountId: item.inventoryAccountId,
      purchasePrice: item.purchasePrice,
      lineAmount,
      lineVat,
    });
  }

  return { totalAmount, vatAmount, detailRecords };
}

async function postJournalEntries(
  tx: TxClient,
  params: PostJournalParams,
): Promise<void> {
  const requiredCodes = ["131", "511", "3331", "632", "156"];
  const accounts = await tx.account.findMany({
    where: { code: { in: requiredCodes }, isActive: true },
    select: { id: true, code: true },
  });
  const byCode = new Map(accounts.map((a) => [a.code, a]));

  const acc131 = byCode.get("131");
  const acc511 = byCode.get("511");

  if (!acc131 || !acc511) {
    throw new ApiError(
      500,
      "Required accounts 131 and 511 not found. Please seed chart of accounts.",
    );
  }

  const entryNumber = await generateEntryNumber(tx);

  const entry = await tx.journalEntry.create({
    data: {
      entryNumber,
      accountingDate: new Date(params.accountingDate),
      description: `Ghi sổ chứng từ bán hàng ${params.voucherNumber}`,
      refType: "SALES_INVOICE",
      refId: params.invoiceId,
      salesInvoiceId: params.invoiceId,
      createdById: params.userId,
    },
  });

  const lines = buildJournalLines({
    entryId: entry.id,
    voucherNumber: params.voucherNumber,
    customerId: params.customerId,
    grandTotal: params.grandTotal,
    totalAmount: params.totalAmount,
    vatAmount: params.vatAmount,
    acc131,
    acc511,
    acc3331: byCode.get("3331"),
    acc632: byCode.get("632"),
    acc156: byCode.get("156"),
    isDelivered: params.isDelivered,
    details: params.details,
    detailRecords: params.detailRecords,
  });

  await tx.journalEntryLine.createMany({ data: lines });

  await tx.salesInvoice.update({
    where: { id: params.invoiceId },
    data: { isPosted: true, postedAt: new Date(), postedById: params.userId },
  });
}

// ─── Main Service Function ────────────────────────────────────────────────────

export async function getNextInvoiceNumber(): Promise<string> {
  // Peek at active setting's next number without incrementing
  const setting = await getActiveInvoiceSetting();
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const seq = String(setting.currentNumber + 1).padStart(7, "0");
  return `HĐ/${yyyy}/${mm}/${seq}`;
}

export async function createSalesInvoice(
  input: CreateSalesInvoiceInput,
  userId: string,
  userEmail: string,
): Promise<{ id: string; voucherNumber: string }> {
  if (!input.details || input.details.length === 0) {
    throw new ApiError(400, "Sales invoice must have at least one detail line");
  }

  const result = await prisma.$transaction(
    async (tx) => {
      // ── Step 1a: Generate voucher number ────────────────────────────────────
      const voucherNumber = await generateVoucherNumber(tx);

      // ── Step 1b: Create header ───────────────────────────────────────────────
      const invoice = await tx.salesInvoice.create({
        data: {
          voucherNumber,
          voucherDate: new Date(input.voucherDate),
          accountingDate: new Date(input.accountingDate),
          customerId: input.customerId,
          description: input.description,
          isPosted: false,
          isDelivered: input.isDelivered,
          isInvoiced: input.isInvoiced,
          invoiceNumber: input.isInvoiced ? input.invoiceNumber : undefined,
          invoiceSeries: input.isInvoiced ? input.invoiceSeries : undefined,
          invoiceDate:
            input.isInvoiced && input.invoiceDate
              ? new Date(input.invoiceDate)
              : undefined,
          invoiceStatus: "DRAFT",
          contactPerson: input.contactPerson,
          salesPersonName: input.salesPersonName,
          reference: input.reference,
          paymentTermDays: input.paymentTermDays,
          dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
          totalAmount: new Prisma.Decimal(0),
          vatAmount: new Prisma.Decimal(0),
          grandTotal: new Prisma.Decimal(0),
        },
      });

      // ── Step 1c: Create details + tally totals ───────────────────────────────
      const { totalAmount, vatAmount, detailRecords } =
        await buildDetailsAndTotals(tx, invoice.id, input.details);

      const grandTotal = totalAmount.plus(vatAmount);

      await tx.salesInvoice.update({
        where: { id: invoice.id },
        data: { totalAmount, vatAmount, grandTotal },
      });

      // ── Step 2: Journal entries ──────────────────────────────────────────────
      if (input.isPosted) {
        await postJournalEntries(tx, {
          invoiceId: invoice.id,
          voucherNumber,
          accountingDate: input.accountingDate,
          customerId: input.customerId,
          userId,
          totalAmount,
          vatAmount,
          grandTotal,
          isDelivered: input.isDelivered,
          details: input.details,
          detailRecords,
        });
      }

      // ── Step 3: Warehouse exit note ──────────────────────────────────────────
      // is_delivered flag persisted on invoice; 632/156 journal lines handle cost.
      // Full stock_movements sub-module added in a later migration.

      // ── Step 4: Audit log ────────────────────────────────────────────────────
      const parts: string[] = [`tạo chứng từ bán hàng số ${voucherNumber}`];
      if (input.isPosted) parts.push("kèm hạch toán tự động");
      if (input.isDelivered) parts.push("xuất kho");
      if (input.isInvoiced) parts.push("lập hóa đơn");

      await tx.authAuditLog.create({
        data: {
          userId,
          email: userEmail,
          action: "CREATE_SALES_INVOICE",
          success: true,
          message: `Kế toán ${userEmail} đã ${parts.join(", ")}.`,
        },
      });

      return { id: invoice.id, voucherNumber, _logDetail: parts.join(", ") };
    },
    { timeout: 15000 },
  );

  // ── Voucher audit log — called AFTER transaction commits to avoid P2028 ─────
  await writeVoucherLog({
    userId,
    userEmail,
    action: "CREATE",
    entityId: result.id,
    entityRef: result.voucherNumber,
    detail: result._logDetail,
  }).catch(() => undefined);

  return { id: result.id, voucherNumber: result.voucherNumber };
}

// ─── List / Get ────────────────────────────────────────────────────────────────

export interface ListSalesInvoicesInput {
  q?: string;
  dateFrom?: string; // YYYY-MM-DD
  dateTo?: string; // YYYY-MM-DD
  isPosted?: boolean;
  isInvoiced?: boolean;
  invoiceStatus?: string; // DRAFT | ISSUED | CANCELLED
  isDelivered?: boolean;
  sortBy?: "accountingDate" | "grandTotal";
  sortDir?: "asc" | "desc";
  page?: number;
  limit?: number;
}

const INVOICE_LIST_SELECT = {
  id: true,
  voucherNumber: true,
  voucherDate: true,
  accountingDate: true,
  description: true,
  totalAmount: true,
  vatAmount: true,
  grandTotal: true,
  invoiceNumber: true,
  invoiceSeries: true,
  invoiceStatus: true,
  isPosted: true,
  isDelivered: true,
  isInvoiced: true,
  contactPerson: true,
  salesPersonName: true,
  reference: true,
  paymentTermDays: true,
  dueDate: true,
  createdAt: true,
  customer: {
    select: { id: true, code: true, name: true, address: true, taxCode: true },
  },
  postedBy: {
    select: { id: true, fullName: true, email: true },
  },
} as const;

export async function listSalesInvoices(input: ListSalesInvoicesInput) {
  const page = Math.max(1, input.page ?? 1);
  const limit = Math.min(100, Math.max(1, input.limit ?? 50));
  const skip = (page - 1) * limit;

  const where: Prisma.SalesInvoiceWhereInput = {};

  if (input.q) {
    where.OR = [
      { voucherNumber: { contains: input.q, mode: "insensitive" } },
      { customer: { name: { contains: input.q, mode: "insensitive" } } },
      { invoiceNumber: { contains: input.q, mode: "insensitive" } },
    ];
  }

  if (input.dateFrom ?? input.dateTo) {
    where.accountingDate = {};
    if (input.dateFrom) where.accountingDate.gte = new Date(input.dateFrom);
    if (input.dateTo) {
      const to = new Date(input.dateTo);
      to.setDate(to.getDate() + 1);
      where.accountingDate.lt = to;
    }
  }

  if (input.isPosted !== undefined) where.isPosted = input.isPosted;
  if (input.isInvoiced !== undefined) where.isInvoiced = input.isInvoiced;
  if (input.isDelivered !== undefined) where.isDelivered = input.isDelivered;
  if (input.invoiceStatus)
    where.invoiceStatus = input.invoiceStatus as
      | "DRAFT"
      | "ISSUED"
      | "CANCELLED";

  const sortField = input.sortBy ?? "accountingDate";
  const sortDir = input.sortDir ?? "desc";
  const orderBy: Prisma.SalesInvoiceOrderByWithRelationInput[] =
    sortField === "grandTotal"
      ? [{ grandTotal: sortDir }, { createdAt: "desc" }]
      : [{ accountingDate: sortDir }, { createdAt: "desc" }];

  const [total, rows] = await Promise.all([
    prisma.salesInvoice.count({ where }),
    prisma.salesInvoice.findMany({
      where,
      select: INVOICE_LIST_SELECT,
      orderBy,
      skip,
      take: limit,
    }),
  ]);

  return { total, page, limit, rows };
}

const INVOICE_DETAIL_SELECT = {
  ...INVOICE_LIST_SELECT,
  invoiceDate: true,
  details: {
    select: {
      id: true,
      sortOrder: true,
      description: true,
      qty: true,
      unitPrice: true,
      vatRate: true,
      amount: true,
      item: {
        select: { id: true, sku: true, name: true, unit: true, itemType: true },
      },
      warehouse: { select: { id: true, code: true, name: true } },
      arAccount: { select: { id: true, code: true, name: true } },
      revAccount: { select: { id: true, code: true, name: true } },
    },
    orderBy: { sortOrder: "asc" as const },
  },
} as const;

export async function getSalesInvoiceById(id: string) {
  const invoice = await prisma.salesInvoice.findUnique({
    where: { id },
    select: INVOICE_DETAIL_SELECT,
  });

  if (!invoice) throw new ApiError(404, "Chứng từ không tồn tại");
  return invoice;
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateSalesInvoice(
  id: string,
  input: UpdateSalesInvoiceInput,
  userId: string,
  userEmail: string,
): Promise<{ id: string; voucherNumber: string }> {
  const result = await prisma.$transaction(
    async (tx) => {
      const existing = await tx.salesInvoice.findUnique({
        where: { id },
        select: {
          id: true,
          voucherNumber: true,
          invoiceStatus: true,
          isPosted: true,
        },
      });

      if (!existing) throw new ApiError(404, "Chứng từ không tồn tại");
      if (existing.isPosted)
        throw new ApiError(400, "Không thể sửa chứng từ đã ghi sổ");
      if (existing.invoiceStatus !== "DRAFT") {
        throw new ApiError(400, "Chỉ có thể sửa chứng từ ở trạng thái nháp");
      }

      // Update header
      await tx.salesInvoice.update({
        where: { id },
        data: {
          ...(input.voucherDate && {
            voucherDate: new Date(input.voucherDate),
          }),
          ...(input.accountingDate && {
            accountingDate: new Date(input.accountingDate),
          }),
          ...(input.customerId && { customerId: input.customerId }),
          description: input.description,
          isDelivered: input.isDelivered,
          isInvoiced: input.isInvoiced,
          invoiceNumber: input.isInvoiced ? input.invoiceNumber : null,
          invoiceSeries: input.isInvoiced ? input.invoiceSeries : null,
          invoiceDate:
            input.isInvoiced && input.invoiceDate
              ? new Date(input.invoiceDate)
              : null,
          contactPerson: input.contactPerson,
          salesPersonName: input.salesPersonName,
          reference: input.reference,
          paymentTermDays: input.paymentTermDays,
          dueDate: input.dueDate ? new Date(input.dueDate) : null,
        },
      });

      // If details provided, replace them
      if (input.details && input.details.length > 0) {
        await tx.salesInvoiceDetail.deleteMany({ where: { invoiceId: id } });
        const { totalAmount, vatAmount } = await buildDetailsAndTotals(
          tx,
          id,
          input.details,
        );
        const grandTotal = totalAmount.plus(vatAmount);
        await tx.salesInvoice.update({
          where: { id },
          data: { totalAmount, vatAmount, grandTotal },
        });
      }

      await tx.authAuditLog.create({
        data: {
          userId,
          email: userEmail,
          action: "UPDATE_SALES_INVOICE",
          success: true,
          message: `Kế toán ${userEmail} đã sửa chứng từ bán hàng ${existing.voucherNumber}.`,
        },
      });

      return { id, voucherNumber: existing.voucherNumber };
    },
    { timeout: 15000 },
  );

  // Voucher audit log — called AFTER transaction commits to avoid P2028
  await writeVoucherLog({
    userId,
    userEmail,
    action: "UPDATE",
    entityId: result.id,
    entityRef: result.voucherNumber,
    detail: `Sửa chứng từ bán hàng ${result.voucherNumber}`,
  }).catch(() => undefined);

  return result;
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteSalesInvoice(
  id: string,
  userId: string,
  userEmail: string,
): Promise<void> {
  const voucherNumber = await prisma.$transaction(
    async (tx) => {
      const existing = await tx.salesInvoice.findUnique({
        where: { id },
        select: {
          id: true,
          voucherNumber: true,
          invoiceStatus: true,
          isPosted: true,
        },
      });

      if (!existing) throw new ApiError(404, "Chứng từ không tồn tại");
      if (existing.isPosted)
        throw new ApiError(400, "Không thể xóa chứng từ đã ghi sổ");
      if (existing.invoiceStatus !== "DRAFT") {
        throw new ApiError(400, "Chỉ có thể xóa chứng từ ở trạng thái nháp");
      }

      await tx.salesInvoice.delete({ where: { id } });

      await tx.authAuditLog.create({
        data: {
          userId,
          email: userEmail,
          action: "DELETE_SALES_INVOICE",
          success: true,
          message: `Kế toán ${userEmail} đã xóa chứng từ bán hàng ${existing.voucherNumber}.`,
        },
      });

      return existing.voucherNumber;
    },
    { timeout: 15000 },
  );

  // Voucher audit log — called AFTER transaction commits to avoid P2028
  await writeVoucherLog({
    userId,
    userEmail,
    action: "DELETE",
    entityId: id,
    entityRef: voucherNumber,
    detail: `Xóa chứng từ bán hàng ${voucherNumber}`,
  }).catch(() => undefined);
}

// ─── Issue Invoice ────────────────────────────────────────────────────────────

export async function issueInvoice(
  id: string,
  userId: string,
  userEmail: string,
): Promise<{
  id: string;
  voucherNumber: string;
  invoiceNumber: string;
  symbol: string;
}> {
  // Step 1: find active setting and auto-increment OUTSIDE the main transaction
  // (so the number is reserved even if subsequent steps fail)
  const activeSetting = await getActiveInvoiceSetting();
  const invoiceData = await getAndIncrementNextInvoiceNumber(activeSetting.id);

  const txResult = await prisma.$transaction(
    async (tx) => {
      const existing = await tx.salesInvoice.findUnique({
        where: { id },
        select: { id: true, voucherNumber: true, invoiceStatus: true },
      });

      if (!existing) throw new ApiError(404, "Chứng từ không tồn tại");
      if (existing.invoiceStatus === "ISSUED") {
        throw new ApiError(400, "Hóa đơn đã được phát hành");
      }
      if (existing.invoiceStatus === "CANCELLED") {
        throw new ApiError(400, "Hóa đơn đã bị hủy, không thể phát hành");
      }

      await tx.salesInvoice.update({
        where: { id },
        data: {
          invoiceStatus: "ISSUED",
          invoiceNumber: invoiceData.fullInvoiceNumber,
          invoiceSeries: invoiceData.symbol,
          invoiceDate: new Date(),
        },
      });

      await tx.authAuditLog.create({
        data: {
          userId,
          email: userEmail,
          action: "ISSUE_SALES_INVOICE",
          success: true,
          message: `Kế toán ${userEmail} đã phát hành hóa đơn ${invoiceData.symbol}${invoiceData.fullInvoiceNumber} cho chứng từ ${existing.voucherNumber}.`,
        },
      });

      return {
        id,
        voucherNumber: existing.voucherNumber,
        invoiceNumber: invoiceData.fullInvoiceNumber,
        symbol: invoiceData.symbol,
      };
    },
    { timeout: 15000 },
  );

  // Voucher audit log — called AFTER transaction commits to avoid P2028
  await writeVoucherLog({
    userId,
    userEmail,
    action: "ISSUE",
    entityId: id,
    entityRef: txResult.voucherNumber,
    detail: `Phát hành hóa đơn ${txResult.symbol}${txResult.invoiceNumber}`,
  }).catch(() => undefined);

  return txResult;
}
