import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  listDebtsHandler,
  getDebtDetailHandler,
  sendReminderHandler,
} from "../controllers/ar-debt.controller";

export const arDebtRouter = Router();

// GET  /api/ar-debts         — paginated customer debt summary
arDebtRouter.get("/", authenticate, listDebtsHandler);

// GET  /api/ar-debts/:id     — per-invoice detail for one customer
arDebtRouter.get("/:id", authenticate, getDebtDetailHandler);

// POST /api/ar-debts/:id/remind — send reminder email
arDebtRouter.post("/:id/remind", authenticate, sendReminderHandler);
