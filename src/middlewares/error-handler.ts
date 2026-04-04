import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/api-error";
import { env } from "../config/env";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
