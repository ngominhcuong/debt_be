import { Request, Response, NextFunction } from "express";
import { z } from "zod/v4";
import { listVoucherAuditLogs } from "../services/voucher-audit-log.service";

const listQuerySchema = z.object({
  q: z.string().optional(),
  action: z.string().optional(),
  entityType: z.string().optional(),
  entityId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  dateFrom: z.iso.date().optional(),
  dateTo: z.iso.date().optional(),
  page: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 1)),
  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 50)),
});

export async function listVoucherLogs(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = listQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      res
        .status(400)
        .json({
          success: false,
          message: "Invalid query",
          errors: z.flattenError(parsed.error).fieldErrors,
        });
      return;
    }
    const result = await listVoucherAuditLogs(parsed.data);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
