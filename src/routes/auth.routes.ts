import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import type { Request, Response } from "express";

const routes = Router();

const authController = new AuthController();

routes.post("/login", (req: Request, res: Response) =>
  authController.login(req, res),
);

export default routes;
