import type { Request, Response } from "express";
import { Router } from "express";
import { UserController } from "../controllers/UserController";

const routes = Router();

const userController = new UserController();

routes.post("/", (req: Request, res: Response) =>
  userController.register(req, res),
);
routes.put("/:id", (req: Request, res: Response) =>
  userController.update(req, res),
);

export default routes;
