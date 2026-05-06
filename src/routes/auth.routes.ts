import { Router } from "express";
import {
  changePassword,
  forgotPassword,
  getGoogleOauthUrl,
  googleAuth,
  listUsers,
  login,
  register,
  resendOtp,
  syncProfile,
  verifyOtp,
} from "../controllers/auth.controller";
import {
  authenticate,
  requireChiefAccountant,
} from "../middlewares/authenticate";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify-email-otp", verifyOtp);
authRouter.post("/resend-otp", resendOtp);
authRouter.post("/login", login);
authRouter.post("/google", googleAuth);
authRouter.get("/google/oauth-url", getGoogleOauthUrl);
authRouter.post("/sync-profile", authenticate, syncProfile);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/change-password", authenticate, changePassword);
authRouter.get("/users", authenticate, requireChiefAccountant, listUsers);
