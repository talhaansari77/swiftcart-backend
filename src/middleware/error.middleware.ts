import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode =
    error instanceof ApiError
      ? error.statusCode
      : res.statusCode === 200
      ? 500
      : res.statusCode;

  res.status(statusCode).json({
    message: error.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  });
};