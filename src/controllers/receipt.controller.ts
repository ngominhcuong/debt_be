import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../middlewares/authenticate";
import {
  getReceiptDefaultAccounts,
  createReceipt,
} from "../services/receipt.service";

const uuidParam = z.object({ id: z.uuid() });

const createReceiptSchema = z.object({
  customerId: z.uuid(),
  receiptDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  accountingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  submitter: z.string().max(120).optional(),
  reason: z.string().max(255).optional(),
  notes: z.string().max(500).optional(),
  lines: z
    .array(
      z.object({
        debitAccountId: z.uuid(),
        creditAccountId: z.uuid(),
        amount: z.number().positive(),
        description: z.string().max(255),
      }),
    )
    .min(1, "Cần ít nhất 1 dòng hạch toán"),
});

export async function getReceiptDefaults(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = uuidParam.safeParse(req.params);
    if (!parsed.success) {
      res.status(400).json({ success: false, message: "Invalid customer id" });
      return;
    }
    const data = await getReceiptDefaultAccounts(parsed.data.id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function createReceiptHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authed = req as AuthenticatedRequest;
    const parsed = createReceiptSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: z.flattenError(parsed.error).fieldErrors,
      });
      return;
    }
    const result = await createReceipt(
      parsed.data,
      authed.userId,
      authed.userEmail,
    );
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
