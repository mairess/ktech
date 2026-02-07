import type { Request, Response } from "express";
import { Router } from "express";
import { UserController } from "../controllers/UserController";

const routes = Router();

const userController = new UserController();

routes.post("/", (req: Request, res: Response) =>
  userController.create(req, res),
);

export default routes;
