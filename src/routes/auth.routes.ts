import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import type { Request, Response } from "express";
import {
  authMiddleware,
  type AuthRequest,
} from "../middlewares/authMiddleware";
import { Validations } from "../middlewares/validations/validations";
import {
  RegisterRequestSchema,
  LoginRequestSchema,
} from "../middlewares/validations/schemas";

const routes = Router();

const authController = new AuthController();

routes.get("/me", authMiddleware, (req: AuthRequest, res: Response) =>
  authController.me(req, res),
);

routes.post(
  "/",
  Validations.validateRegister(RegisterRequestSchema),
  (req: AuthRequest, res: Response) => authController.register(req, res),
);

routes.post(
  "/login",
  Validations.validateLogin(LoginRequestSchema),
  (req: Request, res: Response) => authController.login(req, res),
);

export default routes;
