import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import { listVoucherLogs } from "../controllers/voucher-audit-log.controller";

export const voucherAuditLogRouter = Router();

voucherAuditLogRouter.get("/", authenticate, listVoucherLogs);
