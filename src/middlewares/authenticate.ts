import { Request, Response, NextFunction } from "express";
import { supabaseAdminClient } from "../config/supabase";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/api-error";

export interface AuthenticatedRequest extends Request {
  userId: string;
  userEmail: string;
}

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next(new ApiError(401, "Missing or invalid Authorization header"));
    return;
  }

  const token = authHeader.slice(7);

  const {
    data: { user },
    error,
  } = await supabaseAdminClient.auth.getUser(token);

  if (error || !user) {
    next(new ApiError(401, "Invalid or expired token"));
    return;
  }

  const authedReq = req as AuthenticatedRequest;
  authedReq.userId = user.id;
  authedReq.userEmail = user.email ?? "";

  // Ensure a UserProfile exists for every authenticated user so FK constraints
  // on postedById / createdById never fail. Uses upsert to avoid race conditions.
  try {
    await prisma.userProfile.upsert({
      where: { id: user.id },
      create: {
        id: user.id,
        email: user.email ?? "",
        fullName: (user.user_metadata?.full_name as string | undefined) ?? null,
        provider: user.app_metadata?.provider === "google" ? "GOOGLE" : "EMAIL",
        isEmailVerified: Boolean(user.email_confirmed_at),
      },
      update: {},
    });
  } catch {
    // Non-blocking — do not fail the request if upsert fails
  }

  next();
}

export async function requireChiefAccountant(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const authedReq = req as AuthenticatedRequest;
  if (!authedReq.userId) {
    next(new ApiError(401, "Unauthorized"));
    return;
  }

  const profile = await prisma.userProfile.findUnique({
    where: { id: authedReq.userId },
    select: { role: true },
  });

  if (profile?.role !== "CHIEF_ACCOUNTANT") {
    next(new ApiError(403, "Forbidden: admin role required"));
    return;
  }

  next();
}
