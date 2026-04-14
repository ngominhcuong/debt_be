import { prisma } from "../lib/prisma";
import { sendMail } from "../lib/mailer";
import { ApiError } from "../utils/api-error";
import { writeVoucherLog } from "./voucher-audit-log.service";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CustomerDebtRow {
  customerId: string;
  customerCode: string;
  customerName: string;
  address: string | null;
  taxCode: string | null;
  email: string | null;
  reminderEmail: string | null;
  reminderCcEmails: unknown;
  totalByInvoice: string; // sum grandTotal of ISSUED invoices
  totalPaid: string; // sum credits on AR account (131*) per partner
  remaining: string; // totalByInvoice - totalPaid
  hasOverdue: boolean;
}

export interface DebtInvoiceRow {
  invoiceId: string;
  voucherNumber: string;
  invoiceNumber: string | null;
  voucherDate: string;
  dueDate: string | null;
  grandTotal: string;
  overdueDays: number | null;
}

export interface ListCustomerDebtsInput {
  q?: string;
  dateFrom?: string;
  dateTo?: string;
  overdueOnly?: boolean;
  page?: number;
  limit?: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toDecimalStr(val: unknown): string {
  if (val == null) return "0";
  return (val as { toString(): string }).toString();
}

type AgingBuckets = {
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
  hardToCollect: number;
  impossible: number;
};

function applyOverdueAging(
  aging: AgingBuckets,
  amount: number,
  overdueDays: number,
): void {
  if (overdueDays <= 30) aging.overdue_1_30 += amount;
  else if (overdueDays <= 60) aging.overdue_31_60 += amount;
  else if (overdueDays <= 90) aging.overdue_61_90 += amount;
  else if (overdueDays <= 120) aging.overdue_91_120 += amount;
  else aging.overdue_over120 += amount;
  if (overdueDays > 360) aging.impossible += amount;
  else if (overdueDays > 90) aging.hardToCollect += amount;
  else aging.normal += amount;
}

function applyNotDueAging(
  aging: AgingBuckets,
  amount: number,
  daysToDue: number,
): void {
  if (daysToDue <= 30) aging.notDue_0_30 += amount;
  else if (daysToDue <= 60) aging.notDue_31_60 += amount;
  else if (daysToDue <= 90) aging.notDue_61_90 += amount;
  else if (daysToDue <= 120) aging.notDue_91_120 += amount;
  else aging.notDue_over120 += amount;
  aging.normal += amount;
}

// ── List customer debt summary ────────────────────────────────────────────────

export async function listCustomerDebts(input: ListCustomerDebtsInput) {
  const page = Math.max(1, input.page ?? 1);
  const limit = Math.min(200, Math.max(1, input.limit ?? 20));
  const offset = (page - 1) * limit;

  // Build filter clauses
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

  // Aggregate by customer
  const groups = await prisma.salesInvoice.groupBy({
    by: ["customerId"],
    where: {
      invoiceStatus: "ISSUED",
      isPosted: true,
      ...dateWhere,
    },
    _sum: { grandTotal: true },
  });

  if (groups.length === 0) {
    return { total: 0, page, limit, rows: [] };
  }

  const customerIds = groups.map((g) => g.customerId);

  // Load partner info
  const partners = await prisma.partner.findMany({
    where: { id: { in: customerIds } },
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
  });

  const partnerMap = new Map(partners.map((p) => [p.id, p]));

  // Compute paid amounts via journal entry lines on AR accounts (code starts with '131')
  const arAccounts = await prisma.account.findMany({
    where: { code: { startsWith: "131" }, isActive: true },
    select: { id: true },
  });
  const arAccountIds = arAccounts.map((a) => a.id);

  // Sum credit/debit per partner on AR accounts
  type JlAgg = {
    partnerId: string | null;
    _sum: {
      creditAmount: { toString(): string } | null;
      debitAmount: { toString(): string } | null;
    };
  };

  let paidByPartner = new Map<string, number>();

  if (arAccountIds.length > 0) {
    // Use raw result and cast
    const rawAggs = await prisma.journalEntryLine.groupBy({
      by: ["partnerId"],
      where: {
        accountId: { in: arAccountIds },
        partnerId: { in: customerIds },
        journalEntry: { isReversed: false },
      },
      _sum: { creditAmount: true, debitAmount: true },
    });

    const jlAggs = rawAggs as unknown as JlAgg[];

    paidByPartner = new Map(
      jlAggs
        .filter((r) => r.partnerId != null)
        .map((r) => {
          // creditAmount on 131* = actual payments received (CR when collecting)
          // debitAmount on 131* = invoice posted (DR when issuing) — already in totalByInvoice,
          // so we must NOT subtract it again to avoid double-counting.
          const credit =
            Number.parseFloat(r._sum.creditAmount?.toString() ?? "0") || 0;
          return [r.partnerId as string, credit];
        }),
    );
  }

  // Check overdue
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueMap = new Map<string, boolean>();
  if (customerIds.length > 0) {
    const overdueInvoices = await prisma.salesInvoice.findMany({
      where: {
        customerId: { in: customerIds },
        invoiceStatus: "ISSUED",
        isPosted: true,
        dueDate: { lt: today },
      },
      select: { customerId: true },
      distinct: ["customerId"],
    });
    overdueInvoices.forEach((i) => overdueMap.set(i.customerId, true));
  }

  // Build rows
  let rows: CustomerDebtRow[] = groups.map((g) => {
    const partner = partnerMap.get(g.customerId);
    const totalByInvoice =
      Number.parseFloat(toDecimalStr(g._sum.grandTotal)) || 0;
    const totalPaid = paidByPartner.get(g.customerId) ?? 0;
    const remaining = totalByInvoice - totalPaid;

    return {
      customerId: g.customerId,
      customerCode: partner?.code ?? "",
      customerName: partner?.name ?? "",
      address: partner?.address ?? null,
      taxCode: partner?.taxCode ?? null,
      email: partner?.email ?? null,
      reminderEmail: partner?.reminderEmail ?? null,
      reminderCcEmails: partner?.reminderCcEmails ?? null,
      totalByInvoice: totalByInvoice.toFixed(0),
      totalPaid: Math.max(0, totalPaid).toFixed(0),
      remaining: remaining.toFixed(0),
      hasOverdue: overdueMap.get(g.customerId) ?? false,
    };
  });

  // Filter
  if (input.q) {
    const q = input.q.toLowerCase();
    rows = rows.filter(
      (r) =>
        r.customerName.toLowerCase().includes(q) ||
        r.customerCode.toLowerCase().includes(q) ||
        (r.taxCode ?? "").toLowerCase().includes(q),
    );
  }
  if (input.overdueOnly) {
    rows = rows.filter((r) => r.hasOverdue);
  }

  // Sort by remaining desc
  rows.sort(
    (a, b) => Number.parseFloat(b.remaining) - Number.parseFloat(a.remaining),
  );

  const total = rows.length;
  const paged = rows.slice(offset, offset + limit);

  return { total, page, limit, rows: paged };
}

// ── Get per-invoice detail for one customer ───────────────────────────────────

export interface ArDebtTransaction {
  id: string;
  accountingDate: string;
  entryNumber: string;
  refType: string;
  description: string;
  debitAmount: string;
  creditAmount: string;
  runningBalance: string;
}

export async function getCustomerDebtDetail(customerId: string): Promise<{
  customer: {
    id: string;
    name: string;
    code: string;
    taxCode: string | null;
    address: string | null;
  };
  invoices: DebtInvoiceRow[];
  aging: {
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
    hardToCollect: number;
    impossible: number;
  };
  transactions: ArDebtTransaction[];
}> {
  const partner = await prisma.partner.findUnique({
    where: { id: customerId },
    select: { id: true, name: true, code: true, taxCode: true, address: true },
  });

  if (!partner) throw new ApiError(404, "Khách hàng không tồn tại");

  // Run invoice query and transaction query in parallel
  const [invoices, arAccounts] = await Promise.all([
    prisma.salesInvoice.findMany({
      where: { customerId, invoiceStatus: "ISSUED", isPosted: true },
      select: {
        id: true,
        voucherNumber: true,
        invoiceNumber: true,
        voucherDate: true,
        dueDate: true,
        grandTotal: true,
      },
      orderBy: { voucherDate: "asc" },
    }),
    prisma.account.findMany({
      where: { code: { startsWith: "131" }, isActive: true },
      select: { id: true },
    }),
  ]);

  const arAccountIds = arAccounts.map((a) => a.id);

  // AR sub-ledger: all journal lines on 131* for this partner, ordered by date
  const journalLines =
    arAccountIds.length > 0
      ? await prisma.journalEntryLine.findMany({
          where: {
            partnerId: customerId,
            accountId: { in: arAccountIds },
            journalEntry: { isReversed: false },
          },
          select: {
            id: true,
            debitAmount: true,
            creditAmount: true,
            description: true,
            journalEntry: {
              select: {
                accountingDate: true,
                entryNumber: true,
                refType: true,
                description: true,
              },
            },
          },
          orderBy: [{ journalEntry: { accountingDate: "asc" } }, { id: "asc" }],
        })
      : [];

  // Build transactions with running balance
  let runningBalance = 0;
  const transactions: ArDebtTransaction[] = journalLines.map((line) => {
    const debit = Number.parseFloat(line.debitAmount.toString()) || 0;
    const credit = Number.parseFloat(line.creditAmount.toString()) || 0;
    runningBalance += debit - credit;
    return {
      id: line.id.toString(),
      accountingDate: line.journalEntry.accountingDate
        .toISOString()
        .slice(0, 10),
      entryNumber: line.journalEntry.entryNumber,
      refType: line.journalEntry.refType,
      description: line.description ?? line.journalEntry.description ?? "",
      debitAmount: debit.toFixed(0),
      creditAmount: credit.toFixed(0),
      runningBalance: runningBalance.toFixed(0),
    };
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const aging = {
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
    hardToCollect: 0,
    impossible: 0,
  };

  const rows: DebtInvoiceRow[] = invoices.map((inv) => {
    const amount = Number.parseFloat(toDecimalStr(inv.grandTotal)) || 0;
    let overdueDays: number | null = null;

    if (inv.dueDate) {
      const due = new Date(inv.dueDate);
      due.setHours(0, 0, 0, 0);
      const diffMs = today.getTime() - due.getTime();
      overdueDays = Math.floor(diffMs / 86400000);

      if (overdueDays > 0) {
        applyOverdueAging(aging, amount, overdueDays);
      } else {
        applyNotDueAging(aging, amount, -overdueDays);
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
      overdueDays: overdueDays !== null && overdueDays > 0 ? overdueDays : 0,
    };
  });

  return { customer: partner, invoices: rows, aging, transactions };
}

// ── Send debt reminder email ──────────────────────────────────────────────────

const SELLER_NAME =
  process.env.SELLER_NAME ?? "CÔNG TY TNHH MWCONNECT VIỆT NAM";

function fmtVND(val: number): string {
  return new Intl.NumberFormat("vi-VN").format(val);
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

function buildReminderHtml(
  customerName: string,
  invoices: DebtInvoiceRow[],
  totalRemaining: number,
  isOverdue: boolean,
): string {
  const BLUE = "#1a4fa0";
  const today = new Date();
  const todayStr = fmtDate(today.toISOString().slice(0, 10));

  const rows = invoices
    .map((inv, i) => {
      const amount = Number.parseFloat(inv.grandTotal) || 0;
      const isOvd = (inv.overdueDays ?? 0) > 0;
      return `
    <tr style="background:${i % 2 === 0 ? "#f4f7ff" : "#fff"}">
      <td style="border:1px solid #cdd5e0;padding:5px 9px;text-align:center">${i + 1}</td>
      <td style="border:1px solid #cdd5e0;padding:5px 9px">${inv.invoiceNumber ?? inv.voucherNumber}</td>
      <td style="border:1px solid #cdd5e0;padding:5px 9px">${fmtDate(inv.voucherDate)}</td>
      <td style="border:1px solid #cdd5e0;padding:5px 9px">${inv.dueDate ? fmtDate(inv.dueDate) : "—"}</td>
      <td style="border:1px solid #cdd5e0;padding:5px 9px;text-align:right;font-weight:bold">${fmtVND(amount)}</td>
      <td style="border:1px solid #cdd5e0;padding:5px 9px;text-align:center;color:${isOvd ? "#c0392b" : "#27ae60"};font-weight:bold">
        ${isOvd ? `Quá hạn ${inv.overdueDays} ngày` : "Chưa đến hạn"}
      </td>
    </tr>`;
    })
    .join("");

  const headerBg = isOverdue ? "#c0392b" : BLUE;
  const title = isOverdue ? "THÔNG BÁO NỢ QUÁ HẠN" : "NHẮC NHỞ THANH TOÁN";
  const subtitle = isOverdue
    ? "(Overdue Payment Notice)"
    : "(Payment Reminder)";

  return `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;color:#1a1a2e">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:24px 0">
<tr><td align="center">
<table width="640" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)">

  <tr><td height="6" style="background:repeating-linear-gradient(45deg,${headerBg},${headerBg} 4px,#4a7fc1 4px,#4a7fc1 8px)"></td></tr>

  <tr><td style="padding:24px 32px 16px">
    <h1 style="margin:0;font-size:22px;color:${headerBg};font-weight:800">${title}</h1>
    <p style="margin:4px 0 0;font-size:13px;color:#666;font-style:italic">${subtitle}</p>
    <p style="margin:6px 0 0;font-size:12px;color:#555">Ngày: <strong>${todayStr}</strong></p>
  </td></tr>

  <tr><td style="padding:0 32px 16px;font-size:13px;line-height:1.8">
    <p style="margin:0">Kính gửi <strong>${customerName}</strong>,</p>
    <p style="margin:8px 0 0">${
      isOverdue
        ? 'Chúng tôi xin thông báo rằng Quý khách hiện có <strong style="color:#c0392b">công nợ quá hạn thanh toán</strong> với chúng tôi. Kính đề nghị Quý khách sắp xếp thanh toán trong thời gian sớm nhất.'
        : "Đây là email nhắc nhở về các khoản thanh toán sắp đến hạn. Kính đề nghị Quý khách sắp xếp thanh toán đúng hạn."
    }</p>
  </td></tr>

  <tr><td style="padding:0 32px 16px">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:12px">
      <thead>
        <tr style="background:${headerBg};color:#fff">
          <th style="border:1px solid #7aa3d0;padding:6px 9px;width:28px">STT</th>
          <th style="border:1px solid #7aa3d0;padding:6px 9px;text-align:left">Số hóa đơn</th>
          <th style="border:1px solid #7aa3d0;padding:6px 9px">Ngày HĐ</th>
          <th style="border:1px solid #7aa3d0;padding:6px 9px">Hạn TT</th>
          <th style="border:1px solid #7aa3d0;padding:6px 9px;text-align:right">Số tiền (VNĐ)</th>
          <th style="border:1px solid #7aa3d0;padding:6px 9px">Trạng thái</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  </td></tr>

  <tr><td style="padding:0 32px 20px">
    <table width="100%" cellpadding="5" cellspacing="0" style="font-size:14px">
      <tr style="border-top:2px solid #222">
        <td style="font-weight:bold;padding-top:10px">Tổng số tiền cần thanh toán:</td>
        <td align="right" style="font-weight:bold;padding-top:10px;color:${headerBg};font-size:16px">${fmtVND(totalRemaining)} VNĐ</td>
      </tr>
    </table>
  </td></tr>

  <tr><td style="padding:12px 32px 20px;background:#f8faff;border-top:1px solid #e0e8f0;font-size:13px;line-height:1.8">
    <strong>Đơn vị bán:</strong> ${SELLER_NAME}<br>
    <em>Vui lòng liên hệ với chúng tôi nếu Quý khách đã thanh toán hoặc cần hỗ trợ thêm thông tin.</em>
  </td></tr>

  <tr><td height="6" style="background:repeating-linear-gradient(45deg,${headerBg},${headerBg} 4px,#4a7fc1 4px,#4a7fc1 8px)"></td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

export async function sendDebtReminder(
  customerId: string,
  userId: string,
  userEmail: string,
): Promise<void> {
  const detail = await getCustomerDebtDetail(customerId);

  if (detail.invoices.length === 0) {
    throw new ApiError(400, "Khách hàng này không có hóa đơn phải thu");
  }

  const partner = await prisma.partner.findUnique({
    where: { id: customerId },
    select: { reminderEmail: true, email: true, reminderCcEmails: true },
  });

  const toEmail = partner?.reminderEmail ?? partner?.email;
  if (!toEmail) {
    throw new ApiError(400, "Khách hàng chưa có địa chỉ email nhắc nợ");
  }

  const totalRemaining = detail.invoices.reduce(
    (sum, inv) => sum + (Number.parseFloat(inv.grandTotal) || 0),
    0,
  );
  const isOverdue = detail.invoices.some((inv) => (inv.overdueDays ?? 0) > 0);

  const subject = isOverdue
    ? `[NHẮC NỢ QUÁ HẠN] Công nợ chưa thanh toán - ${detail.customer.name} - ${fmtVND(totalRemaining)} VNĐ`
    : `[NHẮC THANH TOÁN] Hóa đơn sắp đến hạn - ${detail.customer.name}`;

  const html = buildReminderHtml(
    detail.customer.name,
    detail.invoices,
    totalRemaining,
    isOverdue,
  );

  const rawCc = partner?.reminderCcEmails;
  const cc: string[] = Array.isArray(rawCc)
    ? (rawCc as string[]).filter((e) => typeof e === "string" && e)
    : [];

  await sendMail({
    to: toEmail,
    cc: cc.length > 0 ? cc : undefined,
    subject,
    html,
  });

  // Log
  await prisma.debtReminderLog.create({
    data: {
      partnerId: customerId,
      scope: "BOTH",
      recipientEmail: toEmail,
      subject,
      status: "SENT",
      sentAt: new Date(),
    },
  });

  await writeVoucherLog({
    userId,
    userEmail,
    action: "SEND_DEBT_REMINDER",
    entityId: customerId,
    entityRef: detail.customer.code,
    detail: `Gửi nhắc nợ ${isOverdue ? "quá hạn" : ""} đến ${toEmail} — ${fmtVND(totalRemaining)} VNĐ`,
  }).catch(() => undefined);
}

// Workaround for missing Decimal import type
type Decimal = { toString(): string };
