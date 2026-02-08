import { AuthService } from "../services/AuthService";
import type { Request, Response } from "express";
import statusMapper from "../utils/statusMapper";
import type { User } from "../middlewares/validations/schemas";

export class AuthController {
  private userService = new AuthService();

  async register(req: Request, res: Response) {
    const user: User = req.body;
    const serviceResponse = await this.userService.register(user);
    return res
      .status(statusMapper(serviceResponse.status))
      .json(serviceResponse.data);
  }

  async login(req: Request, res: Response) {
    const serviceResponse = await this.userService.login(req.body);

    return res
      .status(statusMapper(serviceResponse.status))
      .json(serviceResponse.data);
  }
}
