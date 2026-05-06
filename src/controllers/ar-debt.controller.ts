import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../middlewares/authenticate";
import {
  listCustomerDebts,
  getCustomerDebtDetail,
  sendDebtReminder,
} from "../services/ar-debt.service";

const uuidParam = z.object({ id: z.uuid() });

const listSchema = z.object({
  q: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  overdueOnly: z
    .string()
    .optional()
    .transform((v) => v === "true"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(200).default(20),
});

export async function listDebtsHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = listSchema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        errors: z.flattenError(parsed.error).fieldErrors,
      });
      return;
    }
    const result = await listCustomerDebts(parsed.data);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function getDebtDetailHandler(
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
    const result = await getCustomerDebtDetail(parsed.data.id);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function sendReminderHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authed = req as AuthenticatedRequest;
    const parsed = uuidParam.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({ success: false, message: "Invalid id" });
      return;
    }
    await sendDebtReminder(parsed.data.id, authed.userId, authed.userEmail);
    res.json({ success: true, message: "Đã gửi email nhắc nợ thành công" });
  } catch (err) {
    next(err);
  }
}
