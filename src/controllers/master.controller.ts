import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ApiError } from "../utils/api-error";
import {
  createAccount,
  createItem,
  createPartner,
  getAccountById,
  getItemById,
  getPartnerById,
  listAccounts,
  listItems,
  listPartners,
  updateAccount,
  updateItem,
  updatePartner,
} from "../services/master.service";

const uuidParamSchema = z.object({
  id: z.uuid(),
});

const listPartnersQuerySchema = z.object({
  q: z.string().trim().optional(),
  partnerType: z.enum(["CUSTOMER", "SUPPLIER", "BOTH"]).optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
});

const partnerCreateSchema = z.object({
  code: z.string().trim().min(1).max(30).optional(),
  name: z.string().trim().min(2).max(180),
  partnerType: z.enum(["CUSTOMER", "SUPPLIER", "BOTH"]).default("BOTH"),
  taxCode: z.string().trim().max(30).optional(),
  phone: z.string().trim().max(30).optional(),
  email: z.email().optional(),
  address: z.string().trim().max(500).optional(),
  paymentTermDays: z.coerce.number().int().min(0).max(365).optional(),
  creditLimit: z.coerce.number().min(0).optional(),
  isActive: z.boolean().optional(),
  debtReminderOn: z.boolean().optional(),
  reminderEmail: z.email().optional(),
  reminderCcEmails: z.array(z.email()).max(10).optional(),
});

const partnerUpdateSchema = partnerCreateSchema.partial();

const listItemsQuerySchema = z.object({
  q: z.string().trim().optional(),
  itemType: z.enum(["GOODS", "SERVICE", "MATERIAL", "OTHER"]).optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
});

const itemCreateSchema = z.object({
  sku: z.string().trim().min(1).max(40).optional(),
  name: z.string().trim().min(2).max(180),
  itemType: z.enum(["GOODS", "SERVICE", "MATERIAL", "OTHER"]).default("GOODS"),
  unit: z.string().trim().min(1).max(30),
  salePrice: z.coerce.number().min(0).optional(),
  purchasePrice: z.coerce.number().min(0).optional(),
  vatRate: z.coerce.number().min(0).max(100).optional(),
  revenueAccountId: z.uuid().nullable().optional(),
  cogsAccountId: z.uuid().nullable().optional(),
  inventoryAccountId: z.uuid().nullable().optional(),
  isTrackedInventory: z.boolean().optional(),
  isActive: z.boolean().optional(),
  description: z.string().trim().max(1000).optional(),
});

const itemUpdateSchema = itemCreateSchema.partial();

const listAccountsQuerySchema = z.object({
  q: z.string().trim().optional(),
  accountType: z
    .enum(["ASSET", "LIABILITY", "EQUITY", "REVENUE", "EXPENSE", "OFF_BALANCE"])
    .optional(),
  isActive: z
    .enum(["true", "false"])
    .transform((v) => v === "true")
    .optional(),
});

const accountCreateSchema = z.object({
  code: z
    .string()
    .trim()
    .regex(/^[0-9A-Za-z.\-]{1,20}$/),
  name: z.string().trim().min(2).max(180),
  accountType: z.enum([
    "ASSET",
    "LIABILITY",
    "EQUITY",
    "REVENUE",
    "EXPENSE",
    "OFF_BALANCE",
  ]),
  normalBalance: z.enum(["DEBIT", "CREDIT"]),
  parentId: z.uuid().nullable().optional(),
  isPosting: z.boolean().optional(),
  allowManualEntry: z.boolean().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.coerce.number().int().optional(),
  description: z.string().trim().max(1000).optional(),
});

const accountUpdateSchema = accountCreateSchema.partial();

function handleError(error: unknown, next: NextFunction) {
  if (error instanceof z.ZodError) {
    const flattened = z.flattenError(error);
    const firstFieldError = Object.values(flattened.fieldErrors)
      .flat()
      .filter((message): message is string => Boolean(message))[0];
    next(new ApiError(400, firstFieldError ?? "Validation failed"));
    return;
  }

  next(error as Error);
}

export async function getPartners(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = listPartnersQuerySchema.parse(req.query);
    const data = await listPartners(query);

    res.status(200).json({ success: true, data });
  } catch (error) {
    handleError(error, next);
  }
}

export async function getPartnerDetail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidParamSchema.parse(req.params);
    const data = await getPartnerById(id);

    res.status(200).json({ success: true, data });
  } catch (error) {
    handleError(error, next);
  }
}

export async function postPartner(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = partnerCreateSchema.parse(req.body);
    const data = await createPartner(body);

    res.status(201).json({ success: true, message: "Partner created", data });
  } catch (error) {
    handleError(error, next);
  }
}

export async function patchPartner(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidParamSchema.parse(req.params);
    const body = partnerUpdateSchema.parse(req.body);
    const data = await updatePartner(id, body);

    res.status(200).json({ success: true, message: "Partner updated", data });
  } catch (error) {
    handleError(error, next);
  }
}

export async function getItems(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = listItemsQuerySchema.parse(req.query);
    const data = await listItems(query);

    res.status(200).json({ success: true, data });
  } catch (error) {
    handleError(error, next);
  }
}

export async function getItemDetail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidParamSchema.parse(req.params);
    const data = await getItemById(id);

    res.status(200).json({ success: true, data });
  } catch (error) {
    handleError(error, next);
  }
}

export async function postItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = itemCreateSchema.parse(req.body);
    const data = await createItem(body);

    res.status(201).json({ success: true, message: "Item created", data });
  } catch (error) {
    handleError(error, next);
  }
}

export async function patchItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidParamSchema.parse(req.params);
    const body = itemUpdateSchema.parse(req.body);
    const data = await updateItem(id, body);

    res.status(200).json({ success: true, message: "Item updated", data });
  } catch (error) {
    handleError(error, next);
  }
}

export async function getAccounts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const query = listAccountsQuerySchema.parse(req.query);
    const data = await listAccounts(query);

    res.status(200).json({ success: true, data });
  } catch (error) {
    handleError(error, next);
  }
}

export async function getAccountDetail(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidParamSchema.parse(req.params);
    const data = await getAccountById(id);

    res.status(200).json({ success: true, data });
  } catch (error) {
    handleError(error, next);
  }
}

export async function postAccount(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const body = accountCreateSchema.parse(req.body);
    const data = await createAccount(body);

    res.status(201).json({ success: true, message: "Account created", data });
  } catch (error) {
    handleError(error, next);
  }
}

export async function patchAccount(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = uuidParamSchema.parse(req.params);
    const body = accountUpdateSchema.parse(req.body);
    const data = await updateAccount(id, body);

    res.status(200).json({ success: true, message: "Account updated", data });
  } catch (error) {
    handleError(error, next);
  }
}
