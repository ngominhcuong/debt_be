import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  getAccountDetail,
  getAccounts,
  getItemDetail,
  getItems,
  getPartnerDetail,
  getPartners,
  patchAccount,
  patchItem,
  patchPartner,
  postAccount,
  postItem,
  postPartner,
} from "../controllers/master.controller";

export const masterRouter = Router();

masterRouter.use(authenticate);

masterRouter.get("/partners", getPartners);
masterRouter.get("/partners/:id", getPartnerDetail);
masterRouter.post("/partners", postPartner);
masterRouter.patch("/partners/:id", patchPartner);

masterRouter.get("/items", getItems);
masterRouter.get("/items/:id", getItemDetail);
masterRouter.post("/items", postItem);
masterRouter.patch("/items/:id", patchItem);

masterRouter.get("/accounts", getAccounts);
masterRouter.get("/accounts/:id", getAccountDetail);
masterRouter.post("/accounts", postAccount);
masterRouter.patch("/accounts/:id", patchAccount);
