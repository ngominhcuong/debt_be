import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  listSettings,
  getSetting,
  createSetting,
  updateSetting,
  deleteSetting,
} from "../controllers/invoice-setting.controller";

export const invoiceSettingRouter = Router();

invoiceSettingRouter.get("/", authenticate, listSettings);
invoiceSettingRouter.post("/", authenticate, createSetting);
invoiceSettingRouter.get("/:id", authenticate, getSetting);
invoiceSettingRouter.patch("/:id", authenticate, updateSetting);
invoiceSettingRouter.delete("/:id", authenticate, deleteSetting);
