import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  listPeriodsHandler,
  getPeriodInfoHandler,
  saveOpeningBalancesHandler,
  getClosingPreviewHandler,
  closePeriodHandler,
} from "../controllers/period.controller";

export const periodRouter = Router();

periodRouter.use(authenticate);

// GET /api/periods                         — list all periods
periodRouter.get("/", listPeriodsHandler);

// GET /api/periods/:year/:month            — period info + opening balances
periodRouter.get("/:year/:month", getPeriodInfoHandler);

// PUT /api/periods/:year/:month/balances   — save opening balances
periodRouter.put("/:year/:month/balances", saveOpeningBalancesHandler);

// GET /api/periods/:year/:month/preview    — closing balance preview before chốt
periodRouter.get("/:year/:month/preview", getClosingPreviewHandler);

// POST /api/periods/:year/:month/close     — chốt sổ
periodRouter.post("/:year/:month/close", closePeriodHandler);
