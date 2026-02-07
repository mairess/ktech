import { AuthService } from "../services/AuthService";
import type { Request, Response } from "express";
import statusMapper from "../utils/statusMapper";

export class AuthController {
  private userService = new AuthService();

  async login(req: Request, res: Response) {
    const serviceResponse = await this.userService.login(req.body);

    return res
      .status(statusMapper(serviceResponse.status))
      .json(serviceResponse.data);
  }
}
