import { Request, Response, NextFunction } from "express";
import { supabaseAdminClient } from "../config/supabase";
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

  next();
}
