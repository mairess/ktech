import type { NextFunction, Request, RequestHandler, Response } from "express";
import { type ZodSchema } from "zod";
import type { $ZodIssue } from "zod/v4/core";

export class Validations {
  static validateRegister(schema: ZodSchema): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        const issues = result.error?.issues ?? [];
        const errors = this.handleErrors(issues);
        res.status(400).json({ message: errors });
        return;
      }

      req.body = result.data;
      next();
    };
  }

  static validateUpdate(schema: ZodSchema): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        const issues = result.error?.issues ?? [];
        const errors = this.handleErrors(issues);
        res.status(400).json({ message: errors });
        return;
      }

      req.body = result.data;
      next();
    };
  }

  static validateLogin(schema: ZodSchema): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
      const result = schema.safeParse(req.body);
      if (!result.success) {
        const issues = result.error?.issues ?? [];
        const errors = this.handleErrors(issues);
        res.status(400).json({ message: errors });
        return;
      }

      req.body = result.data;
      next();
    };
  }

  private static capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private static handleErrors(issues: $ZodIssue[]): string[] {
    const errors = issues.map(
      (e) => `${this.capitalizeFirstLetter(e.path.join("."))}: ${e.message}`,
    );

    return errors;
  }
}
