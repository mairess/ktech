import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import type { Request, Response } from "express";
import type { AuthRequest } from "../middlewares/authMiddleware";

const routes = Router();

const authController = new AuthController();

routes.post("/", (req: AuthRequest, res: Response) =>
  authController.register(req, res),
);

routes.post("/login", (req: Request, res: Response) =>
  authController.login(req, res),
);

export default routes;
