import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  getSettingsHandler,
  updateSettingsHandler,
  getLogsHandler,
  runNowHandler,
  getConfigHandler,
  upsertConfigHandler,
  deleteConfigHandler,
} from "../controllers/reminder-config.controller";

export const reminderConfigRouter = Router();

// All reminder-config routes require authentication
reminderConfigRouter.use(authenticate);

// Global / utility routes (must be BEFORE :partnerId to avoid shadowing)
reminderConfigRouter.get("/settings", getSettingsHandler);
reminderConfigRouter.put("/settings", updateSettingsHandler);
reminderConfigRouter.get("/logs", getLogsHandler);
reminderConfigRouter.post("/run-now", runNowHandler);

// Per-partner routes
reminderConfigRouter.get("/:partnerId", getConfigHandler);
reminderConfigRouter.put("/:partnerId", upsertConfigHandler);
reminderConfigRouter.delete("/:partnerId/:scope", deleteConfigHandler);
