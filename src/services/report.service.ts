import { Prisma } from "../generated/prisma";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface LedgerLine {
  id: string;
  accountingDate: string;
  entryNumber: string;
  refType: string;
  docNumber: string | null;
  description: string | null;
  partner: { id: string; code: string; name: string } | null;
  debitAmount: number;
  creditAmount: number;
  runningBalance: number;
}

export interface LedgerResult {
  account: { id: string; code: string; name: string; normalBalance: string };
  openingDebit: number;
  openingCredit: number;
  openingBalance: number;
  lines: LedgerLine[];
  totalDebit: number;
  totalCredit: number;
  closingBalance: number;
  total: number;
}

export interface ReconciliationMovement {
  accountingDate: string;
  accountCode: string;
  accountName: string;
  docNumber: string | null;
  refType: string;
  description: string | null;
  debitAmount: number;
  creditAmount: number;
}

export interface ReconciliationResult {
  partner: {
    id: string;
    code: string;
    name: string;
    taxCode: string | null;
    address: string | null;
    phone: string | null;
  };
  accountCodeFilter: string | null;
  dateFrom: string | null;
  dateTo: string | null;
  openingDebit: number;
  openingCredit: number;
  openingBalance: number;
  movements: ReconciliationMovement[];
  totalDebit: number;
  totalCredit: number;
  closingBalance: number;
}

export interface ManagementRow {
  partnerId: string;
  partnerCode: string;
  partnerName: string;
  taxCode: string | null;
  openingBalance: number;
  periodDebit: number;
  periodCredit: number;
  closingBalance: number;
}

export interface ManagementReportResult {
  rows: ManagementRow[];
  totals: {
    openingBalance: number;
    periodDebit: number;
    periodCredit: number;
    closingBalance: number;
  };
  total: number;
  page: number;
  limit: number;
}

// ── Helper ────────────────────────────────────────────────────────────────────

function getDocNumber(je: {
  refType: string;
  salesInvoice: { voucherNumber: string } | null;
  purchaseInvoice: { voucherNumber: string } | null;
  receipt: { receiptNumber: string } | null;
  payment: { paymentNumber: string } | null;
}): string | null {
  switch (je.refType) {
    case "SALES_INVOICE":
      return je.salesInvoice?.voucherNumber ?? null;
    case "PURCHASE_INVOICE":
      return je.purchaseInvoice?.voucherNumber ?? null;
    case "RECEIPT":
      return je.receipt?.receiptNumber ?? null;
    case "PAYMENT":
      return je.payment?.paymentNumber ?? null;
    default:
      return null;
  }
}

const journalEntrySelect = {
  id: true,
  entryNumber: true,
  accountingDate: true,
  description: true,
  refType: true,
  salesInvoice: { select: { voucherNumber: true } },
  purchaseInvoice: { select: { voucherNumber: true } },
  receipt: { select: { receiptNumber: true } },
  payment: { select: { paymentNumber: true } },
} as const;

// ── Sổ Cái Tài Khoản (General Ledger) ────────────────────────────────────────

export async function getLedger(params: {
  accountId: string;
  dateFrom?: string;
  dateTo?: string;
}): Promise<LedgerResult> {
  const { accountId, dateFrom, dateTo } = params;

  const account = await prisma.account.findUnique({
    where: { id: accountId },
    select: { id: true, code: true, name: true, normalBalance: true },
  });
  if (!account) throw new ApiError(404, "Tài khoản không tồn tại");

  // Opening balance: use stored AccountOpeningBalance as base when available,
  // then sum JELs from that period's start up to (exclusive) dateFrom.
  let openingDebit = 0;
  let openingCredit = 0;
  if (dateFrom) {
    const df = new Date(dateFrom);
    const dfYear = df.getFullYear();
    const dfMonth = df.getMonth() + 1; // 1-indexed

    // Find the most recent stored opening balance at or before dateFrom's year/month
    const storedOpening = await prisma.accountOpeningBalance.findFirst({
      where: {
        accountId,
        OR: [
          { year: { lt: dfYear } },
          { year: dfYear, month: { lte: dfMonth } },
        ],
      },
      orderBy: [{ year: "desc" }, { month: "desc" }],
    });

    if (storedOpening) {
      // Start from that stored balance
      const storedDebit = Number(storedOpening.debitAmount);
      const storedCredit = Number(storedOpening.creditAmount);
      // Then add JELs from start of that stored period to dateFrom (exclusive)
      const storedPeriodStart = new Date(
        storedOpening.year,
        storedOpening.month - 1,
        1,
      );
      if (storedPeriodStart < df) {
        const adj = await prisma.journalEntryLine.aggregate({
          where: {
            accountId,
            journalEntry: {
              accountingDate: { gte: storedPeriodStart, lt: df },
            },
          },
          _sum: { debitAmount: true, creditAmount: true },
        });
        openingDebit = storedDebit + Number(adj._sum.debitAmount ?? 0);
        openingCredit = storedCredit + Number(adj._sum.creditAmount ?? 0);
      } else {
        openingDebit = storedDebit;
        openingCredit = storedCredit;
      }
    } else {
      // Fallback: sum all JELs before dateFrom (original behaviour)
      const agg = await prisma.journalEntryLine.aggregate({
        where: {
          accountId,
          journalEntry: { accountingDate: { lt: df } },
        },
        _sum: { debitAmount: true, creditAmount: true },
      });
      openingDebit = Number(agg._sum.debitAmount ?? 0);
      openingCredit = Number(agg._sum.creditAmount ?? 0);
    }
  }
  const openingBalance = openingDebit - openingCredit;

  // Build period filter
  const journalEntryWhere: Prisma.JournalEntryWhereInput = {};
  if (dateFrom || dateTo) {
    journalEntryWhere.accountingDate = {
      ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
      ...(dateTo ? { lte: new Date(dateTo) } : {}),
    };
  }
  const lineWhere: Prisma.JournalEntryLineWhereInput = {
    accountId,
    ...(Object.keys(journalEntryWhere).length
      ? { journalEntry: journalEntryWhere }
      : {}),
  };

  const total = await prisma.journalEntryLine.count({ where: lineWhere });

  const rawLines = await prisma.journalEntryLine.findMany({
    where: lineWhere,
    include: {
      journalEntry: { select: journalEntrySelect },
      partner: { select: { id: true, code: true, name: true } },
    },
    orderBy: [
      { journalEntry: { accountingDate: "asc" } },
      { journalEntry: { entryNumber: "asc" } },
      { sortOrder: "asc" },
    ],
    take: 1000, // practical cap; filtered by date range
  });

  // Period totals
  const periodAgg = await prisma.journalEntryLine.aggregate({
    where: lineWhere,
    _sum: { debitAmount: true, creditAmount: true },
  });
  const totalDebit = Number(periodAgg._sum.debitAmount ?? 0);
  const totalCredit = Number(periodAgg._sum.creditAmount ?? 0);
  const closingBalance = openingBalance + totalDebit - totalCredit;

  // Build lines with running balance
  let runningBalance = openingBalance;
  const lines: LedgerLine[] = rawLines.map((l) => {
    const debit = Number(l.debitAmount);
    const credit = Number(l.creditAmount);
    runningBalance = runningBalance + debit - credit;
    return {
      id: String(l.id),
      accountingDate: l.journalEntry.accountingDate.toISOString().slice(0, 10),
      entryNumber: l.journalEntry.entryNumber,
      refType: l.journalEntry.refType,
      docNumber: getDocNumber(l.journalEntry),
      description: l.description ?? l.journalEntry.description,
      partner: l.partner
        ? { id: l.partner.id, code: l.partner.code, name: l.partner.name }
        : null,
      debitAmount: debit,
      creditAmount: credit,
      runningBalance,
    };
  });

  return {
    account: {
      id: account.id,
      code: account.code,
      name: account.name,
      normalBalance: account.normalBalance,
    },
    openingDebit,
    openingCredit,
    openingBalance,
    lines,
    totalDebit,
    totalCredit,
    closingBalance,
    total,
  };
}

// ── Đối Chiếu Công Nợ (Debt Reconciliation) ──────────────────────────────────

export async function getReconciliation(params: {
  partnerId: string;
  accountCode?: string; // prefix e.g. "131" or "331"
  dateFrom?: string;
  dateTo?: string;
}): Promise<ReconciliationResult> {
  const { partnerId, accountCode, dateFrom, dateTo } = params;

  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    select: {
      id: true,
      code: true,
      name: true,
      taxCode: true,
      address: true,
      phone: true,
    },
  });
  if (!partner) throw new ApiError(404, "Đối tác không tồn tại");

  const accountFilter: Prisma.AccountWhereInput = accountCode
    ? { code: { startsWith: accountCode } }
    : {};

  // Opening balance before dateFrom
  let openingDebit = 0;
  let openingCredit = 0;
  if (dateFrom) {
    const agg = await prisma.journalEntryLine.aggregate({
      where: {
        partnerId,
        ...(Object.keys(accountFilter).length
          ? { account: accountFilter }
          : {}),
        journalEntry: { accountingDate: { lt: new Date(dateFrom) } },
      },
      _sum: { debitAmount: true, creditAmount: true },
    });
    openingDebit = Number(agg._sum.debitAmount ?? 0);
    openingCredit = Number(agg._sum.creditAmount ?? 0);
  }

  // Period movements
  const journalEntryWhere: Prisma.JournalEntryWhereInput = {};
  if (dateFrom || dateTo) {
    journalEntryWhere.accountingDate = {
      ...(dateFrom ? { gte: new Date(dateFrom) } : {}),
      ...(dateTo ? { lte: new Date(dateTo) } : {}),
    };
  }

  const rawLines = await prisma.journalEntryLine.findMany({
    where: {
      partnerId,
      ...(Object.keys(accountFilter).length ? { account: accountFilter } : {}),
      ...(Object.keys(journalEntryWhere).length
        ? { journalEntry: journalEntryWhere }
        : {}),
    },
    include: {
      account: { select: { code: true, name: true } },
      journalEntry: { select: journalEntrySelect },
    },
    orderBy: [
      { journalEntry: { accountingDate: "asc" } },
      { journalEntry: { entryNumber: "asc" } },
    ],
    take: 1000,
  });

  const movements: ReconciliationMovement[] = rawLines.map((l) => ({
    accountingDate: l.journalEntry.accountingDate.toISOString().slice(0, 10),
    accountCode: l.account.code,
    accountName: l.account.name,
    docNumber: getDocNumber(l.journalEntry),
    refType: l.journalEntry.refType,
    description: l.description ?? l.journalEntry.description,
    debitAmount: Number(l.debitAmount),
    creditAmount: Number(l.creditAmount),
  }));

  const totalDebit = movements.reduce((s, m) => s + m.debitAmount, 0);
  const totalCredit = movements.reduce((s, m) => s + m.creditAmount, 0);
  const openingBalance = openingDebit - openingCredit;
  const closingBalance = openingBalance + totalDebit - totalCredit;

  return {
    partner,
    accountCodeFilter: accountCode ?? null,
    dateFrom: dateFrom ?? null,
    dateTo: dateTo ?? null,
    openingDebit,
    openingCredit,
    openingBalance,
    movements,
    totalDebit,
    totalCredit,
    closingBalance,
  };
}

// ── Báo Cáo Tổng Hợp Công Nợ (Management / Summary Report) ──────────────────

export async function getManagementReport(params: {
  accountCode: string; // prefix e.g. "131" or "331"
  dateFrom?: string;
  dateTo?: string;
  q?: string;
  page?: number;
  limit?: number;
}): Promise<ManagementReportResult> {
  const { accountCode, dateFrom, dateTo, q, page = 1, limit = 50 } = params;
  const offset = (page - 1) * limit;

  const accountPattern = `${accountCode}%`;

  // Conditional SQL fragments
  const preDateCond = dateFrom
    ? Prisma.sql`AND je.accounting_date < ${new Date(dateFrom)}`
    : Prisma.empty;
  const periodStart = dateFrom
    ? Prisma.sql`AND je.accounting_date >= ${new Date(dateFrom)}`
    : Prisma.empty;
  const periodEnd = dateTo
    ? Prisma.sql`AND je.accounting_date <= ${new Date(dateTo)}`
    : Prisma.empty;
  const searchCond = q
    ? Prisma.sql`AND (p.name ILIKE ${`%${q}%`} OR p.code ILIKE ${`%${q}%`})`
    : Prisma.empty;

  type RawRow = {
    partner_id: string;
    partner_code: string;
    partner_name: string;
    tax_code: string | null;
    opening_debit: number;
    opening_credit: number;
    period_debit: number;
    period_credit: number;
  };

  const rows = await prisma.$queryRaw<RawRow[]>(Prisma.sql`
    WITH pre_period AS (
      SELECT  jel.partner_id,
              COALESCE(SUM(jel.debit_amount),  0)::float8 AS pre_debit,
              COALESCE(SUM(jel.credit_amount), 0)::float8 AS pre_credit
      FROM    journal_entry_lines jel
      JOIN    accounts            a  ON a.id  = jel.account_id
      JOIN    journal_entries     je ON je.id = jel.journal_entry_id
      WHERE   a.code LIKE ${accountPattern}
        AND   jel.partner_id IS NOT NULL
        ${preDateCond}
      GROUP BY jel.partner_id
    ),
    in_period AS (
      SELECT  jel.partner_id,
              COALESCE(SUM(jel.debit_amount),  0)::float8 AS pd,
              COALESCE(SUM(jel.credit_amount), 0)::float8 AS pc
      FROM    journal_entry_lines jel
      JOIN    accounts            a  ON a.id  = jel.account_id
      JOIN    journal_entries     je ON je.id = jel.journal_entry_id
      WHERE   a.code LIKE ${accountPattern}
        AND   jel.partner_id IS NOT NULL
        ${periodStart}
        ${periodEnd}
      GROUP BY jel.partner_id
    )
    SELECT  p.id   AS partner_id,
            p.code AS partner_code,
            p.name AS partner_name,
            p.tax_code,
            COALESCE(pp.pre_debit,  0) AS opening_debit,
            COALESCE(pp.pre_credit, 0) AS opening_credit,
            COALESCE(ip.pd, 0)         AS period_debit,
            COALESCE(ip.pc, 0)         AS period_credit
    FROM    partners p
    LEFT JOIN pre_period pp ON pp.partner_id = p.id
    LEFT JOIN in_period  ip ON ip.partner_id = p.id
    WHERE   (pp.partner_id IS NOT NULL OR ip.partner_id IS NOT NULL)
      ${searchCond}
    ORDER BY p.code
    LIMIT   ${limit}
    OFFSET  ${offset}
  `);

  // Count query
  const countRows = await prisma.$queryRaw<[{ cnt: bigint }]>(Prisma.sql`
    WITH combined AS (
      SELECT DISTINCT jel.partner_id
      FROM   journal_entry_lines jel
      JOIN   accounts            a  ON a.id  = jel.account_id
      JOIN   journal_entries     je ON je.id = jel.journal_entry_id
      WHERE  a.code LIKE ${accountPattern}
        AND  jel.partner_id IS NOT NULL
    )
    SELECT COUNT(*) AS cnt
    FROM   partners p
    JOIN   combined c ON c.partner_id = p.id
    WHERE  1=1 ${searchCond}
  `);
  const total = Number(countRows[0]?.cnt ?? 0);

  const managementRows: ManagementRow[] = rows.map((r) => {
    const openingBalance = r.opening_debit - r.opening_credit;
    const periodDebit = r.period_debit;
    const periodCredit = r.period_credit;
    const closingBalance = openingBalance + periodDebit - periodCredit;
    return {
      partnerId: r.partner_id,
      partnerCode: r.partner_code,
      partnerName: r.partner_name,
      taxCode: r.tax_code,
      openingBalance,
      periodDebit,
      periodCredit,
      closingBalance,
    };
  });

  const totals = managementRows.reduce(
    (acc, r) => ({
      openingBalance: acc.openingBalance + r.openingBalance,
      periodDebit: acc.periodDebit + r.periodDebit,
      periodCredit: acc.periodCredit + r.periodCredit,
      closingBalance: acc.closingBalance + r.closingBalance,
    }),
    { openingBalance: 0, periodDebit: 0, periodCredit: 0, closingBalance: 0 },
  );

  return { rows: managementRows, totals, total, page, limit };
}
