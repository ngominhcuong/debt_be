import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  createInvoice,
  listInvoices,
  getInvoice,
  updateInvoice,
  deleteInvoice,
  issueInvoiceController,
  getNextInvoiceNumberController,
  getSendInvoiceDefaults,
  sendInvoiceController,
} from "../controllers/sales-invoice.controller";

export const salesInvoiceRouter = Router();

salesInvoiceRouter.get("/", authenticate, listInvoices);
salesInvoiceRouter.post("/", authenticate, createInvoice);
salesInvoiceRouter.get(
  "/next-invoice-number",
  authenticate,
  getNextInvoiceNumberController,
);
salesInvoiceRouter.get("/:id", authenticate, getInvoice);
salesInvoiceRouter.patch("/:id", authenticate, updateInvoice);
salesInvoiceRouter.delete("/:id", authenticate, deleteInvoice);
salesInvoiceRouter.patch("/:id/issue", authenticate, issueInvoiceController);
salesInvoiceRouter.get(
  "/:id/send-defaults",
  authenticate,
  getSendInvoiceDefaults,
);
salesInvoiceRouter.post("/:id/send", authenticate, sendInvoiceController);
