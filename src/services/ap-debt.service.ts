import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SupplierDebtRow {
  supplierId: string;
  supplierCode: string;
  supplierName: string;
  address: string | null;
  taxCode: string | null;
  email: string | null;
  totalByInvoice: string; // sum grandTotal of posted purchase invoices
  totalPaid: string; // sum debits on AP account (331*) per partner
  remaining: string; // totalByInvoice - totalPaid
  hasOverdue: boolean;
}

export interface ApDebtInvoiceRow {
  invoiceId: string;
  voucherNumber: string;
  invoiceNumber: string | null;
  voucherDate: string;
  dueDate: string | null;
  grandTotal: string;
  overdueDays: number;
}

export interface ListSupplierDebtsInput {
  q?: string;
  dateFrom?: string;
  dateTo?: string;
  overdueOnly?: boolean;
  page?: number;
  limit?: number;
}

export interface ApDebtAgingResult {
  notDue_0_30: number;
  notDue_31_60: number;
  notDue_61_90: number;
  notDue_91_120: number;
  notDue_over120: number;
  notDueNoDueDate: number;
  overdue_1_30: number;
  overdue_31_60: number;
  overdue_61_90: number;
  overdue_91_120: number;
  overdue_over120: number;
  normal: number;
  hardToPay: number;
  critical: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toDecimalStr(val: unknown): string {
  if (val == null) return "0";
  return (val as { toString(): string }).toString();
}

type AgingBuckets = ApDebtAgingResult;

function applyOverdueAging(
  aging: AgingBuckets,
  amount: number,
  days: number,
): void {
  if (days <= 30) aging.overdue_1_30 += amount;
  else if (days <= 60) aging.overdue_31_60 += amount;
  else if (days <= 90) aging.overdue_61_90 += amount;
  else if (days <= 120) aging.overdue_91_120 += amount;
  else aging.overdue_over120 += amount;
  if (days > 360) aging.critical += amount;
  else if (days > 90) aging.hardToPay += amount;
  else aging.normal += amount;
}

function applyNotDueAging(
  aging: AgingBuckets,
  amount: number,
  days: number,
): void {
  if (days <= 30) aging.notDue_0_30 += amount;
  else if (days <= 60) aging.notDue_31_60 += amount;
  else if (days <= 90) aging.notDue_61_90 += amount;
  else if (days <= 120) aging.notDue_91_120 += amount;
  else aging.notDue_over120 += amount;
  aging.normal += amount;
}

// ── List supplier debt summary ────────────────────────────────────────────────

export async function listSupplierDebts(input: ListSupplierDebtsInput) {
  const page = Math.max(1, input.page ?? 1);
  const limit = Math.min(200, Math.max(1, input.limit ?? 20));
  const offset = (page - 1) * limit;

  const dateWhere: { voucherDate?: { gte?: Date; lte?: Date } } = {};
  if (input.dateFrom)
    dateWhere.voucherDate = {
      ...dateWhere.voucherDate,
      gte: new Date(input.dateFrom),
    };
  if (input.dateTo)
    dateWhere.voucherDate = {
      ...dateWhere.voucherDate,
      lte: new Date(input.dateTo),
    };

  // Aggregate by supplier – all posted purchase invoices
  const groups = await prisma.purchaseInvoice.groupBy({
    by: ["supplierId"],
    where: { isPosted: true, ...dateWhere },
    _sum: { grandTotal: true },
  });

  if (groups.length === 0) return { total: 0, page, limit, rows: [] };

  const supplierIds = groups.map((g) => g.supplierId);

  // AP accounts (331*)
  const ap331Accounts = await prisma.account.findMany({
    where: { code: { startsWith: "331" }, isPosting: true },
    select: { id: true },
  });
  const apAccountIds = ap331Accounts.map((a) => a.id);

  // Payments made: debitAmount on 331* per partner (debit on 331 = payment reduces the liability)
  const [partners, jlAggs] = await Promise.all([
    prisma.partner.findMany({
      where: { id: { in: supplierIds } },
      select: {
        id: true,
        code: true,
        name: true,
        address: true,
        taxCode: true,
        email: true,
        reminderEmail: true,
        reminderCcEmails: true,
      },
    }),
    apAccountIds.length > 0
      ? prisma.journalEntryLine.groupBy({
          by: ["partnerId"],
          where: {
            partnerId: { in: supplierIds },
            accountId: { in: apAccountIds },
          },
          _sum: { debitAmount: true },
        })
      : Promise.resolve([]),
  ]);

  const partnerMap = new Map(partners.map((p) => [p.id, p]));
  const paidMap = new Map(
    (jlAggs as { partnerId: string | null; _sum: { debitAmount: unknown } }[])
      .filter((r) => r.partnerId != null)
      .map((r) => [
        r.partnerId as string,
        Number.parseFloat(r._sum.debitAmount?.toString() ?? "0") || 0,
      ]),
  );

  // Overdue check
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueInvoices = await prisma.purchaseInvoice.findMany({
    where: {
      supplierId: { in: supplierIds },
      isPosted: true,
      dueDate: { lt: today },
    },
    select: { supplierId: true },
    distinct: ["supplierId"],
  });
  const overdueMap = new Map(overdueInvoices.map((i) => [i.supplierId, true]));

  let rows: SupplierDebtRow[] = groups.map((g) => {
    const partner = partnerMap.get(g.supplierId);
    const totalByInvoice =
      Number.parseFloat(toDecimalStr(g._sum.grandTotal)) || 0;
    const totalPaid = paidMap.get(g.supplierId) ?? 0;
    const remaining = totalByInvoice - totalPaid;
    return {
      supplierId: g.supplierId,
      supplierCode: partner?.code ?? "",
      supplierName: partner?.name ?? "",
      address: partner?.address ?? null,
      taxCode: partner?.taxCode ?? null,
      email: partner?.email ?? null,
      totalByInvoice: totalByInvoice.toFixed(0),
      totalPaid: Math.max(0, totalPaid).toFixed(0),
      remaining: remaining.toFixed(0),
      hasOverdue: overdueMap.get(g.supplierId) ?? false,
    };
  });

  if (input.q) {
    const q = input.q.toLowerCase();
    rows = rows.filter(
      (r) =>
        r.supplierName.toLowerCase().includes(q) ||
        r.supplierCode.toLowerCase().includes(q) ||
        (r.taxCode ?? "").toLowerCase().includes(q),
    );
  }
  if (input.overdueOnly) rows = rows.filter((r) => r.hasOverdue);

  rows.sort(
    (a, b) => Number.parseFloat(b.remaining) - Number.parseFloat(a.remaining),
  );

  const total = rows.length;
  return { total, page, limit, rows: rows.slice(offset, offset + limit) };
}

// ── Get per-invoice detail for one supplier ───────────────────────────────────

export async function getSupplierDebtDetail(supplierId: string) {
  const partner = await prisma.partner.findUnique({
    where: { id: supplierId },
    select: { id: true, code: true, name: true, taxCode: true, address: true },
  });
  if (!partner) throw new ApiError(404, "Không tìm thấy nhà cung cấp");

  const invoices = await prisma.purchaseInvoice.findMany({
    where: { supplierId, isPosted: true },
    orderBy: { voucherDate: "asc" },
    select: {
      id: true,
      voucherNumber: true,
      invoiceNumber: true,
      voucherDate: true,
      dueDate: true,
      grandTotal: true,
    },
  });

  // AP sub-ledger transactions on 331* for this partner
  const ap331Accounts = await prisma.account.findMany({
    where: { code: { startsWith: "331" }, isPosting: true },
    select: { id: true },
  });
  const apAccountIds = ap331Accounts.map((a) => a.id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const aging: ApDebtAgingResult = {
    notDue_0_30: 0,
    notDue_31_60: 0,
    notDue_61_90: 0,
    notDue_91_120: 0,
    notDue_over120: 0,
    notDueNoDueDate: 0,
    overdue_1_30: 0,
    overdue_31_60: 0,
    overdue_61_90: 0,
    overdue_91_120: 0,
    overdue_over120: 0,
    normal: 0,
    hardToPay: 0,
    critical: 0,
  };

  const rows: ApDebtInvoiceRow[] = invoices.map((inv) => {
    const amount = Number.parseFloat(toDecimalStr(inv.grandTotal)) || 0;
    let overdueDays = 0;

    if (inv.dueDate) {
      const due = new Date(inv.dueDate);
      due.setHours(0, 0, 0, 0);
      const diffMs = today.getTime() - due.getTime();
      const days = Math.floor(diffMs / 86400000);
      overdueDays = days > 0 ? days : 0;

      if (days > 0) {
        applyOverdueAging(aging, amount, days);
      } else {
        applyNotDueAging(aging, amount, -days);
      }
    } else {
      aging.notDueNoDueDate += amount;
      aging.normal += amount;
    }

    return {
      invoiceId: inv.id,
      voucherNumber: inv.voucherNumber,
      invoiceNumber: inv.invoiceNumber,
      voucherDate: inv.voucherDate.toISOString().slice(0, 10),
      dueDate: inv.dueDate ? inv.dueDate.toISOString().slice(0, 10) : null,
      grandTotal: toDecimalStr(inv.grandTotal),
      overdueDays,
    };
  });

  return { supplier: partner, invoices: rows, aging };
}
