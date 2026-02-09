import type { Request, Response, NextFunction } from "express";
import { jwt } from "../utils";

export interface AuthRequest<P = any, B = any, Q = any> extends Request<
  P,
  any,
  B,
  Q
> {
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
    res.status(401).json({ message: "Token not provided or malformed!" });
    return;
  }

  try {
    const decoded = jwt.verify(token);

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
