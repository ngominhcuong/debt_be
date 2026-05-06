import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../middlewares/authenticate";
import {
  listPurchaseInvoices,
  getPurchaseInvoiceById,
  createPurchaseInvoice,
  updatePurchaseInvoice,
  postPurchaseInvoice,
  deletePurchaseInvoice,
} from "../services/purchase-invoice.service";

export async function listInvoices(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const q = req.query["q"] as string | undefined;
    const dateFrom = req.query["dateFrom"] as string | undefined;
    const dateTo = req.query["dateTo"] as string | undefined;
    const supplierId = req.query["supplierId"] as string | undefined;
    const isPostedRaw = req.query["isPosted"] as string | undefined;
    const sortBy = req.query["sortBy"] as string | undefined;
    const sortDir = req.query["sortDir"] as string | undefined;
    const page = Number(req.query["page"]) || 1;
    const limit = Number(req.query["limit"]) || 20;
    let isPosted: boolean | undefined;
    if (isPostedRaw === "true") {
      isPosted = true;
    } else if (isPostedRaw === "false") {
      isPosted = false;
    }
    const result = await listPurchaseInvoices({
      q,
      dateFrom,
      dateTo,
      supplierId,
      isPosted,
      sortBy,
      sortDir,
      page,
      limit,
    });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function getInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = String(req.params["id"]);
    const inv = await getPurchaseInvoiceById(id);
    res.json({ success: true, data: inv });
  } catch (err) {
    next(err);
  }
}

export async function createInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authed = req as AuthenticatedRequest;
    const result = await createPurchaseInvoice(
      req.body,
      authed.userId,
      authed.userEmail,
    );
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function updateInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authed = req as AuthenticatedRequest;
    const id = String(req.params["id"]);
    const result = await updatePurchaseInvoice(id, req.body, authed.userId);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function postInvoiceController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authed = req as AuthenticatedRequest;
    const id = String(req.params["id"]);
    const result = await postPurchaseInvoice(id, authed.userId);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function deleteInvoice(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const id = String(req.params["id"]);
    await deletePurchaseInvoice(id);
    res.json({ success: true, data: null });
  } catch (err) {
    next(err);
  }
}
