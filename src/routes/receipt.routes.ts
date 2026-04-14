import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  getReceiptDefaults,
  createReceiptHandler,
} from "../controllers/receipt.controller";

export const receiptRouter = Router();

// GET  /api/receipts/defaults/:id  — default accounts for a customer
receiptRouter.get("/defaults/:id", authenticate, getReceiptDefaults);

// POST /api/receipts                — create receipt + journal entry
receiptRouter.post("/", authenticate, createReceiptHandler);
