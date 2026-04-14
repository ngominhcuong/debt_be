import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  getPaymentDefaults,
  createPaymentHandler,
} from "../controllers/payment.controller";

export const paymentRouter = Router();

// GET  /api/payments/defaults/:supplierId  — default accounts for a supplier
paymentRouter.get("/defaults/:supplierId", authenticate, getPaymentDefaults);

// POST /api/payments                       — create payment + journal entry
paymentRouter.post("/", authenticate, createPaymentHandler);
