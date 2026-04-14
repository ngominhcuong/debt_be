import { Request, Response, NextFunction } from "express";
import {
  listSupplierDebts,
  getSupplierDebtDetail,
} from "../services/ap-debt.service";

export async function listDebtsHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const q = req.query["q"] as string | undefined;
    const dateFrom = req.query["dateFrom"] as string | undefined;
    const dateTo = req.query["dateTo"] as string | undefined;
    const overdueOnly = req.query["overdueOnly"] === "true";
    const page = Number(req.query["page"]) || 1;
    const limit = Number(req.query["limit"]) || 20;
    const result = await listSupplierDebts({
      q,
      dateFrom,
      dateTo,
      overdueOnly,
      page,
      limit,
    });
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
    const id = String(req.params["id"]);
    const result = await getSupplierDebtDetail(id);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
