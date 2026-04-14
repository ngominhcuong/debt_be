import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  listInvoiceSettings,
  getInvoiceSettingById,
  createInvoiceSetting,
  updateInvoiceSetting,
  deleteInvoiceSetting,
} from "../services/invoice-setting.service";

// ─── Validation ───────────────────────────────────────────────────────────────

const uuidParam = z.object({ id: z.uuid() });

const createSchema = z.object({
  year: z.number().int().min(2020).max(2099),
  symbol: z.string().min(6).max(20),
  templateCode: z.string().max(10).default("1"),
  startNumber: z.number().int().min(1).default(1),
  isActive: z.boolean().default(false),
});

const updateSchema = z.object({
  symbol: z.string().min(6).max(20).optional(),
  templateCode: z.string().max(10).optional(),
  startNumber: z.number().int().min(1).optional(),
  isActive: z.boolean().optional(),
});

const listQuerySchema = z.object({
  year: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : undefined)),
});

// ─── Handlers ─────────────────────────────────────────────────────────────────

export async function listSettings(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = listQuerySchema.safeParse(req.query);
    const year = parsed.success ? parsed.data.year : undefined;
    const data = await listInvoiceSettings(year);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getSetting(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = uuidParam.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({ success: false, message: "Invalid id" });
      return;
    }
    const data = await getInvoiceSettingById(parsed.data.id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function createSetting(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: z.flattenError(parsed.error).fieldErrors,
      });
      return;
    }
    const data = await createInvoiceSetting(parsed.data);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function updateSetting(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const paramParsed = uuidParam.safeParse(req.params);
    if (!paramParsed.success) {
      res.status(400).json({ success: false, message: "Invalid id" });
      return;
    }
    const bodyParsed = updateSchema.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({
        success: false,
        message: "Dữ liệu không hợp lệ",
        errors: z.flattenError(bodyParsed.error).fieldErrors,
      });
      return;
    }
    const data = await updateInvoiceSetting(
      paramParsed.data.id,
      bodyParsed.data,
    );
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function deleteSetting(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = uuidParam.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({ success: false, message: "Invalid id" });
      return;
    }
    await deleteInvoiceSetting(parsed.data.id);
    res.json({ success: true, message: "Đã xóa cấu hình dải hóa đơn" });
  } catch (err) {
    next(err);
  }
}
