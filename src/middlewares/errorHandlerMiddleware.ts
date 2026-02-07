import type { Request, Response, NextFunction } from "express";
import type { ICustomError } from "../interface/ICustomError.js";

export function errorHandlerMiddleware(
  error: ICustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response<{ message: string }> {
  const status = error.statusCode || 500;
  const message = error.message || "Alguma coisa deu errado!";

  console.error(error);
  return res.status(status).json({ message });
}
