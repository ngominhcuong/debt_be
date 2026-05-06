import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AuthenticatedRequest } from "../middlewares/authenticate";
import {
  getPaymentDefaultAccounts,
  createPayment,
} from "../services/payment.service";

const uuidParam = z.object({ id: z.uuid() });

const createPaymentSchema = z.object({
  supplierId: z.uuid(),
  paymentDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  accountingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  recipient: z.string().max(120).optional(),
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

export async function getPaymentDefaults(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const parsed = uuidParam.safeParse({ id: req.params.supplierId });
    if (!parsed.success) {
      res.status(400).json({ success: false, message: "Invalid supplier id" });
      return;
    }
    const data = await getPaymentDefaultAccounts(parsed.data.id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function createPaymentHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authed = req as AuthenticatedRequest;
    const parsed = createPaymentSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: z.flattenError(parsed.error).fieldErrors,
      });
      return;
    }
    const result = await createPayment(
      parsed.data,
      authed.userId,
      authed.userEmail,
    );
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
