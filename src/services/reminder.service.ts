/**
 * Automatic Debt Reminder Scheduler Service
 * Runs via cron job — sends email reminders for upcoming/overdue AR invoices
 * based on per-partner DebtReminderConfig settings.
 */
import { prisma } from "../lib/prisma";
import { sendMail } from "../lib/mailer";
import { writeVoucherLog } from "./voucher-audit-log.service";

// ── Defaults (used when partner has no explicit DebtReminderConfig) ───────────

const DEFAULT_DAYS_BEFORE_DUE = 2;
const DEFAULT_DAYS_AFTER_DUE = 1;

// ── Helpers ───────────────────────────────────────────────────────────────────

const SELLER_NAME =
  process.env.SELLER_NAME ?? "CÔNG TY TNHH MWCONNECT VIỆT NAM";

function fmtVND(val: number): string {
  return new Intl.NumberFormat("vi-VN").format(val);
}

function fmtDate(date: Date): string {
  return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
}

interface InvoiceRow {
  voucherNumber: string;
  invoiceNumber: string | null;
  voucherDate: Date;
  dueDate: Date | null;
  grandTotal: { toString(): string };
  overdueDays: number;
}

function buildAutoReminderHtml(
  customerName: string,
  invoices: InvoiceRow[],
  totalRemaining: number,
  isOverdue: boolean,
): string {
  const BLUE = "#1a4fa0";
  const headerBg = isOverdue ? "#c0392b" : BLUE;
  const title = isOverdue ? "THÔNG BÁO NỢ QUÁ HẠN" : "NHẮC NHỞ THANH TOÁN";
  const subtitle = isOverdue
    ? "(Overdue Payment Notice)"
    : "(Payment Reminder)";
  const todayStr = fmtDate(new Date());

  const rows = invoices
    .map((inv, i) => {
      const amount = Number.parseFloat(inv.grandTotal.toString()) || 0;
      const isOvd = inv.overdueDays > 0;
      return `
    <tr style="background:${i % 2 === 0 ? "#f4f7ff" : "#fff"}">
      <td style="border:1px solid #cdd5e0;padding:5px 9px;text-align:center">${i + 1}</td>
      <td style="border:1px solid #cdd5e0;padding:5px 9px">${inv.invoiceNumber ?? inv.voucherNumber}</td>
      <td style="border:1px solid #cdd5e0;padding:5px 9px">${fmtDate(inv.voucherDate)}</td>
      <td style="border:1px solid #cdd5e0;padding:5px 9px">${inv.dueDate ? fmtDate(inv.dueDate) : "—"}</td>
      <td style="border:1px solid #cdd5e0;padding:5px 9px;text-align:right;font-weight:bold">${fmtVND(amount)}</td>
      <td style="border:1px solid #cdd5e0;padding:5px 9px;text-align:center;color:${isOvd ? "#c0392b" : "#27ae60"};font-weight:bold">
        ${isOvd ? `Quá hạn ${inv.overdueDays} ngày` : `Còn ${-inv.overdueDays} ngày`}
      </td>
    </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"></head>
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
        ? 'Chúng tôi xin thông báo rằng Quý khách hiện có <strong style="color:#c0392b">công nợ quá hạn thanh toán</strong>. Kính đề nghị Quý khách sắp xếp thanh toán trong thời gian sớm nhất.'
        : "Đây là email nhắc nhở về các khoản thanh toán sắp đến hạn. Kính đề nghị Quý khách sắp xếp thanh toán đúng hạn."
    }</p>
  </td></tr>
  <tr><td style="padding:0 32px 16px">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:12px">
      <thead>
        <tr style="background:${headerBg};color:#fff">
          <th style="border:1px solid #7aa3d0;padding:6px 9px;width:28px">STT</th>
          <th style="border:1px solid #7aa3d0;padding:6px 9px;text-align:left">Số HĐ</th>
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

// ── Auto-reminder job ─────────────────────────────────────────────────────────

export interface AutoReminderResult {
  sent: number;
  skipped: number;
  errors: number;
  details: { partnerCode: string; result: string }[];
}

export async function runAutoReminder(
  forceRun = false,
): Promise<AutoReminderResult> {
  console.log(
    `[AutoReminder] Starting${forceRun ? " (forced)" : ""} debt reminder job...`,
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Load all partners that have reminders enabled
  const partners = await prisma.partner.findMany({
    where: { debtReminderOn: true, isActive: true },
    select: {
      id: true,
      code: true,
      name: true,
      email: true,
      reminderEmail: true,
      reminderCcEmails: true,
      debtReminders: {
        where: { scope: { in: ["AR", "BOTH"] } },
        select: {
          id: true,
          enabled: true,
          daysBeforeDue: true,
          daysAfterDue: true,
          lastSentAt: true,
          recipientEmail: true,
          ccEmails: true,
        },
      },
    },
  });

  let sent = 0;
  let skipped = 0;
  let errors = 0;
  const details: { partnerCode: string; result: string }[] = [];

  for (const partner of partners) {
    try {
      const config = partner.debtReminders[0];

      // Skip if config exists but is disabled
      if (config && !config.enabled) {
        skipped++;
        details.push({
          partnerCode: partner.code,
          result: "skipped (config disabled)",
        });
        continue;
      }

      const daysBeforeDue = config?.daysBeforeDue ?? DEFAULT_DAYS_BEFORE_DUE;
      const daysAfterDue = config?.daysAfterDue ?? DEFAULT_DAYS_AFTER_DUE;

      // Already sent today — skip (unless forced)
      if (!forceRun && config?.lastSentAt) {
        const lastSent = new Date(config.lastSentAt);
        lastSent.setHours(0, 0, 0, 0);
        if (lastSent.getTime() === today.getTime()) {
          skipped++;
          details.push({
            partnerCode: partner.code,
            result: "skipped (already sent today)",
          });
          continue;
        }
      }

      // Recipient email
      const toEmail =
        config?.recipientEmail ?? partner.reminderEmail ?? partner.email;
      if (!toEmail) {
        skipped++;
        details.push({
          partnerCode: partner.code,
          result: "skipped (no email)",
        });
        continue;
      }

      // Date window: upcoming (within daysBeforeDue) OR overdue (>= daysAfterDue days late)
      const upcomingCutoff = new Date(today);
      upcomingCutoff.setDate(upcomingCutoff.getDate() + daysBeforeDue);

      const overdueCutoff = new Date(today);
      overdueCutoff.setDate(overdueCutoff.getDate() - (daysAfterDue - 1));

      const matchedInvoices = await prisma.salesInvoice.findMany({
        where: {
          customerId: partner.id,
          invoiceStatus: "ISSUED",
          isPosted: true,
          OR: [
            // Invoices coming due within daysBeforeDue days
            { dueDate: { gte: today, lte: upcomingCutoff } },
            // Invoices that are overdue by >= daysAfterDue days
            { dueDate: { lt: overdueCutoff } },
          ],
        },
        select: {
          voucherNumber: true,
          invoiceNumber: true,
          voucherDate: true,
          dueDate: true,
          grandTotal: true,
        },
        orderBy: { voucherDate: "asc" },
      });

      if (matchedInvoices.length === 0) {
        skipped++;
        details.push({
          partnerCode: partner.code,
          result: "skipped (no invoices in window)",
        });
        continue;
      }

      // Compute overdue days and totals
      const invoiceRows: InvoiceRow[] = matchedInvoices.map((inv) => {
        let overdueDays = 0;
        if (inv.dueDate) {
          const due = new Date(inv.dueDate);
          due.setHours(0, 0, 0, 0);
          const diffMs = today.getTime() - due.getTime();
          overdueDays = Math.floor(diffMs / 86400000);
        }
        return { ...inv, overdueDays };
      });

      const totalRemaining = invoiceRows.reduce(
        (sum, inv) => sum + (Number.parseFloat(inv.grandTotal.toString()) || 0),
        0,
      );
      const isOverdue = invoiceRows.some((inv) => inv.overdueDays > 0);

      const subject = isOverdue
        ? `[NHẮC NỢ QUÁ HẠN] Công nợ chưa thanh toán - ${partner.name} - ${fmtVND(totalRemaining)} VNĐ`
        : `[NHẮC THANH TOÁN] Hóa đơn sắp đến hạn - ${partner.name}`;

      const html = buildAutoReminderHtml(
        partner.name,
        invoiceRows,
        totalRemaining,
        isOverdue,
      );

      const rawCc = config?.ccEmails ?? partner.reminderCcEmails;
      const cc: string[] = Array.isArray(rawCc)
        ? (rawCc as string[]).filter(
            (e): e is string => typeof e === "string" && e.length > 0,
          )
        : [];

      await sendMail({
        to: toEmail,
        cc: cc.length > 0 ? cc : undefined,
        subject,
        html,
      });

      // Log to DebtReminderLog
      await prisma.debtReminderLog.create({
        data: {
          partnerId: partner.id,
          scope: "AR",
          recipientEmail: toEmail,
          subject,
          status: "SENT",
          sentAt: new Date(),
        },
      });

      // Update lastSentAt on the config if it exists
      if (config?.id) {
        await prisma.debtReminderConfig.update({
          where: { id: config.id },
          data: { lastSentAt: new Date() },
        });
      }

      await writeVoucherLog({
        userId: "system",
        userEmail: "system@scheduler",
        action: "AUTO_DEBT_REMINDER",
        entityId: partner.id,
        entityRef: partner.code,
        detail: `Tự động nhắc nợ ${isOverdue ? "quá hạn" : "sắp đến hạn"} → ${toEmail} — ${fmtVND(totalRemaining)} VNĐ`,
      }).catch(() => undefined);

      sent++;
      details.push({ partnerCode: partner.code, result: `sent to ${toEmail}` });
    } catch (err) {
      errors++;
      details.push({
        partnerCode: partner.code,
        result: `error: ${err instanceof Error ? err.message : String(err)}`,
      });
      console.error(`[AutoReminder] Error for partner ${partner.code}:`, err);
    }
  }

  console.log(
    `[AutoReminder] Done — sent: ${sent}, skipped: ${skipped}, errors: ${errors}`,
  );

  return { sent, skipped, errors, details };
}
