import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PeriodOpeningBalanceRow {
  accountId: string;
  accountCode: string;
  accountName: string;
  accountType: string;
  normalBalance: string;
  debitAmount: number;
  creditAmount: number;
}

export interface PeriodInfo {
  id: string | null;
  year: number;
  month: number;
  status: "OPEN" | "CLOSED";
  closedAt: string | null;
  closedBy: string | null;
  openingBalances: PeriodOpeningBalanceRow[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function nextPeriod(
  year: number,
  month: number,
): { year: number; month: number } {
  return month === 12
    ? { year: year + 1, month: 1 }
    : { year, month: month + 1 };
}

// ── List All Periods ──────────────────────────────────────────────────────────

export async function listPeriods() {
  return prisma.accountingPeriod.findMany({
    orderBy: [{ year: "desc" }, { month: "desc" }],
    select: {
      id: true,
      year: true,
      month: true,
      status: true,
      closedAt: true,
      closedBy: { select: { fullName: true, email: true } },
    },
  });
}

// ── Get Period Info + Opening Balances ─────────────────────────────────────────

export async function getPeriodInfo(
  year: number,
  month: number,
): Promise<PeriodInfo> {
  // Get the period record if it exists
  const period = await prisma.accountingPeriod.findUnique({
    where: { year_month: { year, month } },
    select: {
      id: true,
      status: true,
      closedAt: true,
      closedBy: { select: { fullName: true, email: true } },
    },
  });

  // Fetch all posting accounts
  const accounts = await prisma.account.findMany({
    where: { isPosting: true, isActive: true },
    orderBy: { code: "asc" },
    select: {
      id: true,
      code: true,
      name: true,
      accountType: true,
      normalBalance: true,
    },
  });

  // Fetch stored opening balances for this period
  const storedBalances = await prisma.accountOpeningBalance.findMany({
    where: { year, month },
    select: { accountId: true, debitAmount: true, creditAmount: true },
  });

  const balanceMap = new Map(
    storedBalances.map((b) => [
      b.accountId,
      { debit: Number(b.debitAmount), credit: Number(b.creditAmount) },
    ]),
  );

  const openingBalances: PeriodOpeningBalanceRow[] = accounts.map((a) => {
    const stored = balanceMap.get(a.id);
    return {
      accountId: a.id,
      accountCode: a.code,
      accountName: a.name,
      accountType: a.accountType,
      normalBalance: a.normalBalance,
      debitAmount: stored?.debit ?? 0,
      creditAmount: stored?.credit ?? 0,
    };
  });

  return {
    id: period?.id ?? null,
    year,
    month,
    status: (period?.status as "OPEN" | "CLOSED") ?? "OPEN",
    closedAt: period?.closedAt?.toISOString() ?? null,
    closedBy: period?.closedBy?.fullName ?? period?.closedBy?.email ?? null,
    openingBalances,
  };
}

// ── Save Opening Balances ─────────────────────────────────────────────────────

export async function saveOpeningBalances(
  year: number,
  month: number,
  balances: { accountId: string; debitAmount: number; creditAmount: number }[],
): Promise<void> {
  // Ensure no closed period
  const period = await prisma.accountingPeriod.findUnique({
    where: { year_month: { year, month } },
    select: { status: true },
  });
  if (period?.status === "CLOSED") {
    throw new ApiError(
      409,
      "Kỳ kế toán đã chốt sổ, không thể sửa số dư đầu kỳ",
    );
  }

  // Upsert each balance row
  await prisma.$transaction(
    balances.map((b) =>
      prisma.accountOpeningBalance.upsert({
        where: {
          year_month_accountId: { year, month, accountId: b.accountId },
        },
        create: {
          year,
          month,
          accountId: b.accountId,
          debitAmount: b.debitAmount,
          creditAmount: b.creditAmount,
        },
        update: {
          debitAmount: b.debitAmount,
          creditAmount: b.creditAmount,
        },
      }),
    ),
  );
}

// ── Chốt Sổ (Close Period) ────────────────────────────────────────────────────

export async function closePeriod(
  year: number,
  month: number,
  userId: string,
): Promise<{ nextYear: number; nextMonth: number; accountsCarried: number }> {
  // Validate current period is open
  const existing = await prisma.accountingPeriod.findUnique({
    where: { year_month: { year, month } },
    select: { status: true },
  });
  if (existing?.status === "CLOSED") {
    throw new ApiError(409, "Kỳ kế toán này đã được chốt sổ rồi");
  }

  // Date range for this period
  const periodStart = new Date(year, month - 1, 1); // first day of month (local)
  const periodEnd = new Date(year, month, 1); // first day of next month (exclusive)

  // --- Step 1: Get opening balance for this period (stored or 0) ---
  const storedOpenings = await prisma.accountOpeningBalance.findMany({
    where: { year, month },
    select: { accountId: true, debitAmount: true, creditAmount: true },
  });
  const openingMap = new Map(
    storedOpenings.map((b) => [
      b.accountId,
      { debit: Number(b.debitAmount), credit: Number(b.creditAmount) },
    ]),
  );

  // --- Step 2: Aggregate JEL movements in this period, per account ---
  const periodAgg = await prisma.journalEntryLine.groupBy({
    by: ["accountId"],
    where: {
      journalEntry: {
        accountingDate: { gte: periodStart, lt: periodEnd },
      },
    },
    _sum: { debitAmount: true, creditAmount: true },
  });

  // --- Step 3: Compute closing balance for each account that had any activity ---
  const allAccountIds = new Set([
    ...openingMap.keys(),
    ...periodAgg.map((r) => r.accountId),
  ]);

  const next = nextPeriod(year, month);
  const closingRows: {
    accountId: string;
    debitAmount: number;
    creditAmount: number;
  }[] = [];

  for (const accountId of allAccountIds) {
    const opening = openingMap.get(accountId) ?? { debit: 0, credit: 0 };
    const movement = periodAgg.find((r) => r.accountId === accountId);
    const periodDebit = Number(movement?._sum?.debitAmount ?? 0);
    const periodCredit = Number(movement?._sum?.creditAmount ?? 0);

    // Net balance: positive = dư nợ, negative = dư có
    const openingNet = opening.debit - opening.credit;
    const closingNet = openingNet + periodDebit - periodCredit;

    let closingDebit = 0;
    let closingCredit = 0;
    if (closingNet > 0) {
      closingDebit = closingNet;
    } else if (closingNet < 0) {
      closingCredit = -closingNet;
    }

    closingRows.push({
      accountId,
      debitAmount: closingDebit,
      creditAmount: closingCredit,
    });
  }

  // --- Step 4: Upsert next-period opening balances + mark this period CLOSED ---
  await prisma.$transaction([
    // Mark current period as closed (upsert in case AccountingPeriod row didn't exist)
    prisma.accountingPeriod.upsert({
      where: { year_month: { year, month } },
      create: {
        year,
        month,
        status: "CLOSED",
        closedAt: new Date(),
        closedById: userId,
      },
      update: { status: "CLOSED", closedAt: new Date(), closedById: userId },
    }),
    // Ensure next period exists as OPEN
    prisma.accountingPeriod.upsert({
      where: { year_month: { year: next.year, month: next.month } },
      create: { year: next.year, month: next.month, status: "OPEN" },
      update: {}, // don't overwrite if already exists
    }),
    // Write next-period opening balances
    ...closingRows.map((row) =>
      prisma.accountOpeningBalance.upsert({
        where: {
          year_month_accountId: {
            year: next.year,
            month: next.month,
            accountId: row.accountId,
          },
        },
        create: {
          year: next.year,
          month: next.month,
          accountId: row.accountId,
          debitAmount: row.debitAmount,
          creditAmount: row.creditAmount,
        },
        update: {
          debitAmount: row.debitAmount,
          creditAmount: row.creditAmount,
        },
      }),
    ),
  ]);

  return {
    nextYear: next.year,
    nextMonth: next.month,
    accountsCarried: closingRows.length,
  };
}

// ── Get Closing Balance Summary (for display before chốt) ────────────────────

export async function getClosingPreview(year: number, month: number) {
  const periodStart = new Date(year, month - 1, 1);
  const periodEnd = new Date(year, month, 1);

  const storedOpenings = await prisma.accountOpeningBalance.findMany({
    where: { year, month },
    select: { accountId: true, debitAmount: true, creditAmount: true },
  });

  const periodAgg = await prisma.journalEntryLine.groupBy({
    by: ["accountId"],
    where: {
      journalEntry: { accountingDate: { gte: periodStart, lt: periodEnd } },
    },
    _sum: { debitAmount: true, creditAmount: true },
  });

  const accounts = await prisma.account.findMany({
    where: {
      id: {
        in: [
          ...storedOpenings.map((b) => b.accountId),
          ...periodAgg.map((r) => r.accountId),
        ],
      },
    },
    select: { id: true, code: true, name: true, normalBalance: true },
  });

  const openingMap = new Map(
    storedOpenings.map((b) => [
      b.accountId,
      { debit: Number(b.debitAmount), credit: Number(b.creditAmount) },
    ]),
  );
  const accountMap = new Map(accounts.map((a) => [a.id, a]));

  return periodAgg
    .map((r) => {
      const accountId = r.accountId;
      const account = accountMap.get(accountId);
      const opening = openingMap.get(accountId) ?? { debit: 0, credit: 0 };
      const periodDebit = Number(r._sum?.debitAmount ?? 0);
      const periodCredit = Number(r._sum?.creditAmount ?? 0);
      const openingNet = opening.debit - opening.credit;
      const closingNet = openingNet + periodDebit - periodCredit;
      return {
        accountId,
        accountCode: account?.code ?? "",
        accountName: account?.name ?? "",
        openingBalance: openingNet,
        periodDebit,
        periodCredit,
        closingBalance: closingNet,
      };
    })
    .sort((a, b) => a.accountCode.localeCompare(b.accountCode));
}
