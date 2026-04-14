import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  listPeriods,
  getPeriodInfo,
  saveOpeningBalances,
  closePeriod,
  getClosingPreview,
} from "../services/period.service";

// ── List Periods ──────────────────────────────────────────────────────────────

export async function listPeriodsHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = await listPeriods();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// ── Get Period Info (with opening balances) ───────────────────────────────────

const yearMonthParams = z.object({
  year: z.coerce.number().int().min(2000).max(2100),
  month: z.coerce.number().int().min(1).max(12),
});

export async function getPeriodInfoHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { year, month } = yearMonthParams.parse(req.params);
    const data = await getPeriodInfo(year, month);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// ── Save Opening Balances ─────────────────────────────────────────────────────

const saveBalancesBody = z.object({
  balances: z.array(
    z.object({
      accountId: z.string().uuid(),
      debitAmount: z.number().min(0),
      creditAmount: z.number().min(0),
    }),
  ),
});

export async function saveOpeningBalancesHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { year, month } = yearMonthParams.parse(req.params);
    const { balances } = saveBalancesBody.parse(req.body);
    await saveOpeningBalances(year, month, balances);
    res.json({ success: true, message: "Đã lưu số dư đầu kỳ" });
  } catch (err) {
    next(err);
  }
}

// ── Get Closing Preview ───────────────────────────────────────────────────────

export async function getClosingPreviewHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { year, month } = yearMonthParams.parse(req.params);
    const data = await getClosingPreview(year, month);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

// ── Close Period (Chốt Sổ) ────────────────────────────────────────────────────

export async function closePeriodHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { year, month } = yearMonthParams.parse(req.params);
    const userId = (req as any).user?.sub ?? (req as any).user?.id ?? "";
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Không xác định được người dùng" });
    }
    const result = await closePeriod(year, month, userId);
    res.json({
      success: true,
      message: `Chốt sổ thành công kỳ ${month}/${year}. Đã chuyển số dư sang kỳ ${result.nextMonth}/${result.nextYear} cho ${result.accountsCarried} tài khoản.`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}
