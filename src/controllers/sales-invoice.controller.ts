import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../middlewares/authenticate";
import {
  createSalesInvoice,
  listSalesInvoices,
  getSalesInvoiceById,
  updateSalesInvoice,
  deleteSalesInvoice,
  issueInvoice,
  getNextInvoiceNumber,
} from "../services/sales-invoice.service";
import {
  sendInvoiceEmail,
  getInvoiceSendDefaults,
} from "../services/send-invoice.service";

// ─── Validation Schema ────────────────────────────────────────────────────────

const detailSchema = z.object({
  itemId: z.uuid({ error: "itemId must be a UUID" }),
  warehouseId: z.uuid().optional(),
  description: z.string().max(255).optional(),
  qty: z.number().positive("qty must be positive"),
  unitPrice: z.number().nonnegative("unitPrice must be >= 0"),
  vatRate: z.number().min(0).max(100).default(0),
  arAccountId: z.uuid().optional(),
  revAccountId: z.uuid().optional(),
  sortOrder: z.number().int().default(0),
});

const createSalesInvoiceSchema = z.object({
  voucherDate: z.iso.date({ error: "voucherDate must be YYYY-MM-DD" }),
  accountingDate: z.iso.date({ error: "accountingDate must be YYYY-MM-DD" }),
  customerId: z.uuid({ error: "customerId must be a UUID" }),
  description: z.string().max(500).optional(),
  isPosted: z.boolean().default(false),
  isDelivered: z.boolean().default(false),
  isInvoiced: z.boolean().default(false),
  invoiceNumber: z.string().max(30).optional(),
  invoiceSeries: z.string().max(10).optional(),
  invoiceDate: z.iso.date().optional(),
  contactPerson: z.string().max(120).optional(),
  salesPersonName: z.string().max(120).optional(),
  reference: z.string().max(80).optional(),
  paymentTermDays: z.number().int().nonnegative().optional(),
  dueDate: z.iso.date().optional(),
  details: z.array(detailSchema).min(1, "At least one detail line is required"),
});

const updateSalesInvoiceSchema = z.object({
  voucherDate: z.iso.date().optional(),
  accountingDate: z.iso.date().optional(),
  customerId: z.uuid().optional(),
  description: z.string().max(500).optional(),
  isDelivered: z.boolean().optional(),
  isInvoiced: z.boolean().optional(),
  invoiceNumber: z.string().max(30).optional(),
  invoiceSeries: z.string().max(10).optional(),
  invoiceDate: z.iso.date().optional(),
  contactPerson: z.string().max(120).optional(),
  salesPersonName: z.string().max(120).optional(),
  reference: z.string().max(80).optional(),
  paymentTermDays: z.number().int().nonnegative().optional(),
  dueDate: z.iso.date().optional(),
  details: z.array(detailSchema).optional(),
});

// ─── Controller ───────────────────────────────────────────────────────────────

export async function createInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authedReq = req as AuthenticatedRequest;

    const parsed = createSalesInvoiceSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: z.flattenError(parsed.error).fieldErrors,
      });
      return;
    }

    const result = await createSalesInvoice(
      parsed.data,
      authedReq.userId,
      authedReq.userEmail,
    );

    res.status(201).json({
      success: true,
      message: `Chứng từ ${result.voucherNumber} đã được tạo thành công`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

// ─── List invoices ────────────────────────────────────────────────────────────

const listQuerySchema = z.object({
  q: z.string().optional(),
  dateFrom: z.iso.date().optional(),
  dateTo: z.iso.date().optional(),
  isPosted: z
    .string()
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  isInvoiced: z
    .string()
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  isDelivered: z
    .string()
    .optional()
    .transform((v) => (v === undefined ? undefined : v === "true")),
  invoiceStatus: z.enum(["DRAFT", "ISSUED", "CANCELLED"]).optional(),
  sortBy: z.enum(["accountingDate", "grandTotal"]).optional(),
  sortDir: z.enum(["asc", "desc"]).optional().default("desc"),
  page: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 1)),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 50)),
});

// ─── Next invoice number ───────────────────────────────────────────────────────────

export async function getNextInvoiceNumberController(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const invoiceNumber = await getNextInvoiceNumber();
    res.json({ success: true, data: { invoiceNumber } });
  } catch (err) {
    next(err);
  }
}

// ─── List invoices ────────────────────────────────────────────────────────────

export async function listInvoices(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = listQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Invalid query parameters",
        errors: z.flattenError(parsed.error).fieldErrors,
      });
      return;
    }

    const result = await listSalesInvoices(parsed.data);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

// ─── Get one invoice ──────────────────────────────────────────────────────────

const uuidParamSchema = z.object({ id: z.uuid() });

export async function getInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = uuidParamSchema.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({ success: false, message: "Invalid invoice id" });
      return;
    }

    const invoice = await getSalesInvoiceById(parsed.data.id);
    res.json({ success: true, data: invoice });
  } catch (err) {
    next(err);
  }
}

// ─── Update invoice ───────────────────────────────────────────────────────────

export async function updateInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authedReq = req as AuthenticatedRequest;

    const paramParsed = uuidParamSchema.safeParse(req.params);
    if (!paramParsed.success) {
      res.status(400).json({ success: false, message: "Invalid invoice id" });
      return;
    }

    const bodyParsed = updateSalesInvoiceSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: z.flattenError(bodyParsed.error).fieldErrors,
      });
      return;
    }

    const result = await updateSalesInvoice(
      paramParsed.data.id,
      bodyParsed.data,
      authedReq.userId,
      authedReq.userEmail,
    );

    res.json({
      success: true,
      message: `Chứng từ ${result.voucherNumber} đã được cập nhật`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

// ─── Delete invoice ───────────────────────────────────────────────────────────

export async function deleteInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authedReq = req as AuthenticatedRequest;

    const parsed = uuidParamSchema.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({ success: false, message: "Invalid invoice id" });
      return;
    }

    await deleteSalesInvoice(
      parsed.data.id,
      authedReq.userId,
      authedReq.userEmail,
    );
    res.json({ success: true, message: "Chứng từ đã được xóa" });
  } catch (err) {
    next(err);
  }
}

// ─── Issue invoice ────────────────────────────────────────────────────────────

export async function issueInvoiceController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authedReq = req as AuthenticatedRequest;

    const parsed = uuidParamSchema.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({ success: false, message: "Invalid invoice id" });
      return;
    }

    const result = await issueInvoice(
      parsed.data.id,
      authedReq.userId,
      authedReq.userEmail,
    );
    res.json({
      success: true,
      message: `Hóa đơn ${result.voucherNumber} đã được phát hành`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

// ─── Send invoice email — GET defaults ────────────────────────────────────────

export async function getSendInvoiceDefaults(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = uuidParamSchema.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({ success: false, message: "Invalid invoice id" });
      return;
    }
    const data = await getInvoiceSendDefaults(parsed.data.id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// ─── Send invoice email — POST ────────────────────────────────────────────────

const sendInvoiceSchema = z.object({
  to: z.string().email("Địa chỉ email không hợp lệ"),
  cc: z.array(z.string().email()).optional().default([]),
  note: z.string().max(500).optional(),
});

export async function sendInvoiceController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authedReq = req as AuthenticatedRequest;

    const paramParsed = uuidParamSchema.safeParse(req.params);
    if (!paramParsed.success) {
      res.status(400).json({ success: false, message: "Invalid invoice id" });
      return;
    }

    const bodyParsed = sendInvoiceSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: z.flattenError(bodyParsed.error).fieldErrors,
      });
      return;
    }

    await sendInvoiceEmail(
      paramParsed.data.id,
      bodyParsed.data,
      authedReq.userId,
      authedReq.userEmail,
    );

    res.json({ success: true, message: "Đã gửi hóa đơn qua email thành công" });
  } catch (err) {
    next(err);
  }
}
