import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import {
  changePassword as changePasswordService,
  forgotPassword as forgotPasswordService,
  getGoogleOAuthUrl,
  listUserProfiles,
  loginWithEmail,
  loginWithGoogle,
  mapServiceError,
  registerWithEmail,
  resendEmailOtp,
  syncUserProfile,
  verifyEmailOtp,
} from "../services/auth.service";
import { AuthenticatedRequest } from "../middlewares/authenticate";

const roleSchema = z.enum(["CHIEF_ACCOUNTANT", "STAFF_ACCOUNTANT"]);

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2).max(120).optional(),
  role: roleSchema.optional(),
});

const verifyOtpSchema = z.object({
  email: z.email(),
  token: z.string().min(4).max(12),
  type: z.enum(["signup", "recovery"]).default("signup"),
});

const resendOtpSchema = z.object({
  email: z.email(),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

const googleAuthSchema = z.object({
  idToken: z.string().min(20),
  role: roleSchema.optional(),
  fullName: z.string().min(2).max(120).optional(),
});

function getRequestIp(req: Request): string | undefined {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0]?.trim();
  }

  if (Array.isArray(forwarded)) {
    return forwarded[0];
  }

  return req.ip;
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = registerSchema.parse(req.body);
    const result = await registerWithEmail(input, getRequestIp(req));

    return res.status(201).json({
      success: true,
      message: result.message,
      data: {
        userId: result.user.id,
        email: result.user.email,
        profile: result.profile,
      },
    });
  } catch (error) {
    return next(mapServiceError(error));
  }
}

export async function verifyOtp(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = verifyOtpSchema.parse(req.body);
    const result = await verifyEmailOtp(input, getRequestIp(req));

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      data: result,
    });
  } catch (error) {
    return next(mapServiceError(error));
  }
}

export async function resendOtp(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = resendOtpSchema.parse(req.body);
    const result = await resendEmailOtp(input, getRequestIp(req));

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    return next(mapServiceError(error));
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const input = loginSchema.parse(req.body);
    const result = await loginWithEmail(input, getRequestIp(req));

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    return next(mapServiceError(error));
  }
}

export async function googleAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = googleAuthSchema.parse(req.body);
    const result = await loginWithGoogle(input, getRequestIp(req));

    return res.status(200).json({
      success: true,
      message: "Google authentication successful",
      data: result,
    });
  } catch (error) {
    return next(mapServiceError(error));
  }
}

export async function getGoogleOauthUrl(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = getGoogleOAuthUrl();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return next(mapServiceError(error));
  }
}

const syncProfileSchema = z.object({
  fullName: z.string().min(1).max(120).optional(),
  avatarUrl: z.string().optional(),
  provider: z.enum(["EMAIL", "GOOGLE"]).optional(),
  role: roleSchema.optional(),
});

const forgotPasswordSchema = z.object({
  email: z.email(),
});

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, "New password must be at least 8 characters"),
});

export async function syncProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId, userEmail } = req as AuthenticatedRequest;
    const body = syncProfileSchema.parse(req.body);

    const profile = await syncUserProfile(
      userId,
      userEmail,
      body,
      getRequestIp(req),
    );

    return res.status(200).json({
      success: true,
      data: { profile },
    });
  } catch (error) {
    return next(mapServiceError(error));
  }
}

export async function forgotPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const input = forgotPasswordSchema.parse(req.body);
    const result = await forgotPasswordService(input, getRequestIp(req));

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    return next(mapServiceError(error));
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId, userEmail } = req as AuthenticatedRequest;
    const body = changePasswordSchema.parse(req.body);

    const result = await changePasswordService(
      { userId, email: userEmail, ...body },
      getRequestIp(req),
    );

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    return next(mapServiceError(error));
  }
}

const listUsersSchema = z.object({
  q: z.string().optional(),
  role: roleSchema.optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export async function listUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = listUsersSchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: z.flattenError(parsed.error).fieldErrors,
      });
    }
    const result = await listUserProfiles(parsed.data);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return next(mapServiceError(error));
  }
}
