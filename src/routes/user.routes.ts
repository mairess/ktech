import type { Request, Response } from "express";
import { Router } from "express";
import { UserController } from "../controllers/UserController";

const routes = Router();

const userController = new UserController();

routes.get("/:id", (req: Request, res: Response) =>
  userController.findById(req, res),
);

routes.post("/", (req: Request, res: Response) =>
  userController.register(req, res),
);

routes.put("/:id", (req: Request, res: Response) =>
  userController.updateById(req, res),
);

export default routes;
