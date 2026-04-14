import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  listInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  postInvoiceController,
  deleteInvoice,
} from "../controllers/purchase-invoice.controller";

export const purchaseInvoiceRouter = Router();

purchaseInvoiceRouter.use(authenticate);

purchaseInvoiceRouter.get("/", listInvoices);
purchaseInvoiceRouter.post("/", createInvoice);
purchaseInvoiceRouter.get("/:id", getInvoice);
purchaseInvoiceRouter.patch("/:id", updateInvoice);
purchaseInvoiceRouter.delete("/:id", deleteInvoice);
purchaseInvoiceRouter.patch("/:id/post", postInvoiceController);
