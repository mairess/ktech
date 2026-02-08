import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware";
import { Validations } from "../middlewares/validations/validations";
import { registerSchema } from "../middlewares/validations/schemas";

const routes = Router();

const authController = new AuthController();

routes.post(
  "/",
  Validations.validateRegister(registerSchema),
  (req: AuthRequest, res: Response) => authController.register(req, res),
);

routes.post("/login", (req: Request, res: Response) =>
  authController.login(req, res),
);

export default routes;
