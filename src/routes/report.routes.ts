import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  getLedgerHandler,
  getReconciliationHandler,
  getManagementReportHandler,
} from "../controllers/report.controller";

export const reportRouter = Router();

// GET /api/reports/ledger          — sổ cái tài khoản
reportRouter.get("/ledger", authenticate, getLedgerHandler);

// GET /api/reports/reconciliation  — đối chiếu công nợ
reportRouter.get("/reconciliation", authenticate, getReconciliationHandler);

// GET /api/reports/management      — báo cáo tổng hợp công nợ
reportRouter.get("/management", authenticate, getManagementReportHandler);
