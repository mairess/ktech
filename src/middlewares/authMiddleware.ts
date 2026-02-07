import type { Request, Response, NextFunction } from "express";
import { verify } from "../utils/jwt";

export interface AuthRequest extends Request {
  userId?: string;
  userEmail?: string;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Token not provided!" });
    return;
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    res.status(401).json({ message: "Token not provided!" });
    return;
  }

  try {
    const decoded = verify(token);

    if (typeof decoded === "string") {
      res.status(401).json({ message: decoded });
      return;
    }

    req.userId = decoded.id;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token!" });
  }
}
