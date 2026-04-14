import { prisma } from "../lib/prisma";
import { sendMail } from "../lib/mailer";
import { ApiError } from "../utils/api-error";
import { writeVoucherLog } from "./voucher-audit-log.service";

// ── Seller info (should match InvoicePrintPage SELLER constant) ───────────────

const SELLER_NAME =
  process.env.SELLER_NAME ?? "CÔNG TY TNHH MWCONNECT VIỆT NAM";
const SELLER_TAX = process.env.SELLER_TAX ?? "2301305030";

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtN(val: unknown): string {
  let n: number;
  if (val == null) return "0";
  if (typeof val === "object") {
    n = parseFloat(val.toString());
  } else {
    n = parseFloat(String(val));
  }
  if (isNaN(n)) return "0";
  return new Intl.NumberFormat("vi-VN").format(n);
}

function fmtDate(val: string | Date | null | undefined): string {
  if (!val) return "—";
  const d = val instanceof Date ? val : new Date(val);
  if (isNaN(d.getTime())) return "—";
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

// ── HTML email template ───────────────────────────────────────────────────────

function buildInvoiceEmailHtml(
  invoice: InvoiceEmailData,
  extraNote?: string,
): string {
  const BLUE = "#1a4fa0";
  const date = fmtDate(invoice.invoiceDate ?? invoice.accountingDate);

  const rows = invoice.details
    .map((d, i) => {
      const lineAmt = parseFloat(d.amount != null ? d.amount.toString() : "0");
      const vatRate = parseFloat(
        d.vatRate != null ? d.vatRate.toString() : "0",
      );
      const lineVat = lineAmt * (vatRate / 100);
      return `
      <tr style="background:${i % 2 === 0 ? "#f4f7ff" : "#fff"}">
        <td style="border:1px solid #cdd5e0;padding:5px 7px;text-align:center">${i + 1}</td>
        <td style="border:1px solid #cdd5e0;padding:5px 7px">${d.item?.name ?? "—"}</td>
        <td style="border:1px solid #cdd5e0;padding:5px 7px;text-align:center">${d.item?.unit ?? ""}</td>
        <td style="border:1px solid #cdd5e0;padding:5px 7px;text-align:right">${fmtN(d.qty)}</td>
        <td style="border:1px solid #cdd5e0;padding:5px 7px;text-align:right">${fmtN(d.unitPrice)}</td>
        <td style="border:1px solid #cdd5e0;padding:5px 7px;text-align:right;font-weight:bold">${fmtN(lineAmt)}</td>
        <td style="border:1px solid #cdd5e0;padding:5px 7px;text-align:center">${vatRate} %</td>
        <td style="border:1px solid #cdd5e0;padding:5px 7px;text-align:right">${fmtN(lineVat)}</td>
      </tr>`;
    })
    .join("");

  const noteRow = extraNote
    ? `<tr><td colspan="8" style="padding:10px 7px;font-style:italic;color:#555">${extraNote}</td></tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;color:#1a1a2e">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:24px 0">
<tr><td align="center">
<table width="640" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.1)">

  <!-- Header stripe -->
  <tr><td height="6" style="background:repeating-linear-gradient(45deg,${BLUE},${BLUE} 4px,#4a7fc1 4px,#4a7fc1 8px)"></td></tr>

  <!-- Title -->
  <tr><td style="padding:24px 32px 16px">
    <h1 style="margin:0;font-size:22px;color:${BLUE};font-weight:800;letter-spacing:.5px">HÓA ĐƠN GIÁ TRỊ GIA TĂNG</h1>
    <p style="margin:4px 0 0;font-size:13px;color:#666;font-style:italic">(VAT Invoice)</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:12px">
      <tr>
        <td>
          <span style="font-size:13px">Ngày: <strong>${date}</strong></span>
        </td>
        <td align="right">
          <span style="font-size:12px;color:#555">Ký hiệu: <strong style="color:${BLUE}">${invoice.invoiceSeries ?? "—"}</strong></span>&nbsp;&nbsp;
          <span style="font-size:12px;color:#555">Số HĐ: <strong style="color:${BLUE}">${invoice.invoiceNumber ?? "—"}</strong></span>
        </td>
      </tr>
    </table>
  </td></tr>

  <!-- Seller -->
  <tr><td style="padding:0 32px 12px">
    <table width="100%" cellpadding="8" cellspacing="0" style="border:2px solid ${BLUE};border-radius:6px">
      <tr><td style="font-size:13px;line-height:1.7">
        <strong>Đơn vị bán:</strong> ${SELLER_NAME}<br>
        <strong>MST:</strong> ${SELLER_TAX}
      </td></tr>
    </table>
  </td></tr>

  <!-- Buyer -->
  <tr><td style="padding:0 32px 16px">
    <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;line-height:1.8">
      <tr>
        <td><strong>Đơn vị mua:</strong> ${invoice.customer.name}</td>
      </tr>
      <tr><td colspan="2"><strong>MST:</strong> ${invoice.customer.taxCode ?? "—"}</td></tr>
      <tr><td colspan="2"><strong>Địa chỉ:</strong> ${invoice.customer.address ?? "—"}</td></tr>
    </table>
  </td></tr>

  <!-- Line items -->
  <tr><td style="padding:0 32px 16px">
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:12px">
      <thead>
        <tr style="background:${BLUE};color:#fff">
          <th style="border:1px solid #7aa3d0;padding:6px 7px;width:28px">STT</th>
          <th style="border:1px solid #7aa3d0;padding:6px 7px;text-align:left">Tên hàng hóa, dịch vụ</th>
          <th style="border:1px solid #7aa3d0;padding:6px 7px;width:36px">ĐVT</th>
          <th style="border:1px solid #7aa3d0;padding:6px 7px;width:40px">SL</th>
          <th style="border:1px solid #7aa3d0;padding:6px 7px;width:70px">Đơn giá</th>
          <th style="border:1px solid #7aa3d0;padding:6px 7px;width:76px">Thành tiền</th>
          <th style="border:1px solid #7aa3d0;padding:6px 7px;width:44px">Thuế suất</th>
          <th style="border:1px solid #7aa3d0;padding:6px 7px;width:72px">Tiền thuế</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
        ${noteRow}
      </tbody>
    </table>
  </td></tr>

  <!-- Totals -->
  <tr><td style="padding:0 32px 20px">
    <table width="100%" cellpadding="5" cellspacing="0" style="font-size:13px">
      <tr>
        <td style="color:#555">Cộng tiền hàng:</td>
        <td align="right">${fmtN(invoice.totalAmount)} VNĐ</td>
      </tr>
      <tr>
        <td style="color:#555">Tổng tiền thuế GTGT:</td>
        <td align="right">${fmtN(invoice.vatAmount)} VNĐ</td>
      </tr>
      <tr style="border-top:2px solid #222">
        <td style="font-size:15px;font-weight:bold;padding-top:8px">Tổng cộng thanh toán:</td>
        <td align="right" style="font-size:15px;font-weight:bold;padding-top:8px;color:${BLUE}">${fmtN(invoice.grandTotal)} VNĐ</td>
      </tr>
    </table>
  </td></tr>

  <!-- Footer note -->
  <tr><td style="padding:12px 32px;background:#f8faff;border-top:1px solid #e0e8f0">
    <p style="margin:0;font-size:12px;color:#666;text-align:center;font-style:italic">
      Vui lòng liên hệ nếu có thắc mắc về hóa đơn này.<br>
      Please contact us if you have any questions about this invoice.
    </p>
  </td></tr>

  <!-- Bottom stripe -->
  <tr><td height="6" style="background:repeating-linear-gradient(45deg,${BLUE},${BLUE} 4px,#4a7fc1 4px,#4a7fc1 8px)"></td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface InvoiceEmailData {
  invoiceDate: string | Date | null;
  accountingDate: string | Date | null;
  dueDate: string | Date | null;
  invoiceNumber: string | null;
  invoiceSeries: string | null;
  voucherNumber: string;
  totalAmount: unknown;
  vatAmount: unknown;
  grandTotal: unknown;
  customer: {
    name: string;
    taxCode: string | null;
    address: string | null;
    email: string | null;
    reminderEmail: string | null;
    reminderCcEmails: unknown;
  };
  details: {
    qty: unknown;
    unitPrice: unknown;
    amount: unknown;
    vatRate: unknown;
    description: string | null;
    item: { name: string; unit: string } | null;
  }[];
}

export interface SendInvoiceInput {
  to: string; // primary recipient (editable by user)
  cc?: string[]; // optional CC
  note?: string; // optional message from sender
}

// ── Main function ─────────────────────────────────────────────────────────────

export async function sendInvoiceEmail(
  invoiceId: string,
  input: SendInvoiceInput,
  userId: string,
  userEmail: string,
): Promise<void> {
  // 1. Load invoice with customer
  const invoice = await prisma.salesInvoice.findUnique({
    where: { id: invoiceId },
    select: {
      invoiceDate: true,
      accountingDate: true,
      dueDate: true,
      invoiceNumber: true,
      invoiceSeries: true,
      invoiceStatus: true,
      voucherNumber: true,
      totalAmount: true,
      vatAmount: true,
      grandTotal: true,
      customer: {
        select: {
          name: true,
          taxCode: true,
          address: true,
          email: true,
          reminderEmail: true,
          reminderCcEmails: true,
        },
      },
      details: {
        select: {
          qty: true,
          unitPrice: true,
          amount: true,
          vatRate: true,
          description: true,
          item: { select: { name: true, unit: true } },
        },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  if (!invoice) throw new ApiError(404, "Chứng từ không tồn tại");
  if (invoice.invoiceStatus !== "ISSUED") {
    throw new ApiError(400, "Chỉ có thể gửi hóa đơn đã phát hành (ISSUED)");
  }

  // 2. Build email
  const subject = `Hóa đơn GTGT số ${invoice.invoiceNumber ?? invoice.voucherNumber} từ ${SELLER_NAME}`;
  const html = buildInvoiceEmailHtml(
    invoice as unknown as InvoiceEmailData,
    input.note,
  );

  // 3. Send
  await sendMail({
    to: input.to,
    cc: input.cc && input.cc.length > 0 ? input.cc : undefined,
    subject,
    html,
  });

  // 4. Audit log
  await writeVoucherLog({
    userId,
    userEmail,
    action: "SEND_EMAIL",
    entityId: invoiceId,
    entityRef: invoice.voucherNumber,
    detail: `Gửi hóa đơn ${invoice.invoiceNumber ?? invoice.voucherNumber} qua email đến ${input.to}${input.cc?.length ? `, CC: ${input.cc.join(", ")}` : ""}`,
  }).catch(() => undefined);
}

// ── Email address suggestion from customer ────────────────────────────────────

export async function getInvoiceSendDefaults(invoiceId: string): Promise<{
  suggestedTo: string;
  suggestedCc: string[];
}> {
  const invoice = await prisma.salesInvoice.findUnique({
    where: { id: invoiceId },
    select: {
      customer: {
        select: { email: true, reminderEmail: true, reminderCcEmails: true },
      },
    },
  });

  if (!invoice) throw new ApiError(404, "Chứng từ không tồn tại");

  const { email, reminderEmail, reminderCcEmails } = invoice.customer;
  const suggestedTo = reminderEmail ?? email ?? "";
  const rawCc = reminderCcEmails;
  const suggestedCc: string[] = Array.isArray(rawCc)
    ? (rawCc as string[]).filter((e) => typeof e === "string" && e)
    : [];

  return { suggestedTo, suggestedCc };
}
