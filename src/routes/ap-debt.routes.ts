import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  listDebtsHandler,
  getDebtDetailHandler,
} from "../controllers/ap-debt.controller";

export const apDebtRouter = Router();

apDebtRouter.use(authenticate);

apDebtRouter.get("/", listDebtsHandler);
apDebtRouter.get("/:id", getDebtDetailHandler);
