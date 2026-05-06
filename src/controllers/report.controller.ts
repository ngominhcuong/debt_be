import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  getLedger,
  getReconciliation,
  getManagementReport,
  getDashboardStats,
} from "../services/report.service";
const uuidStr = z.uuid();
const dateStr = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .optional();

export async function getLedgerHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const schema = z.object({
      accountId: uuidStr,
      dateFrom: dateStr,
      dateTo: dateStr,
    });
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: z.flattenError(parsed.error).fieldErrors,
      });
      return;
    }
    const data = await getLedger(parsed.data);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getReconciliationHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const schema = z.object({
      partnerId: uuidStr,
      accountCode: z.string().max(20).optional(),
      dateFrom: dateStr,
      dateTo: dateStr,
    });
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: z.flattenError(parsed.error).fieldErrors,
      });
      return;
    }
    const data = await getReconciliation(parsed.data);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getManagementReportHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const schema = z.object({
      accountCode: z.string().min(1).max(20),
      dateFrom: dateStr,
      dateTo: dateStr,
      q: z.string().max(100).optional(),
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().min(1).max(200).default(50),
    });
    const parsed = schema.safeParse(req.query);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: z.flattenError(parsed.error).fieldErrors,
      });
      return;
    }
    const data = await getManagementReport(parsed.data);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function getDashboardHandler(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const data = await getDashboardStats();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}
