import type { Response } from "express";
import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {
  authMiddleware,
  type AuthRequest,
} from "../middlewares/authMiddleware";

const routes = Router();

const userController = new UserController();

routes.post("/", (req: AuthRequest, res: Response) =>
  userController.register(req, res),
);

routes.get("/:id", authMiddleware, (req: AuthRequest, res: Response) =>
  userController.findById(req, res),
);

routes.put("/:id", authMiddleware, (req: AuthRequest, res: Response) =>
  userController.updateById(req, res),
);

export default routes;
