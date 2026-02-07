import { UserService } from "../services/UserService";
import type { Request, Response } from "express";
import statusMapper from "../utils/statusMapper";

export class UserController {
  private userService = new UserService();

  async create(req: Request, res: Response) {
    const serviceResponse = await this.userService.create(req.body);
    return res
      .status(statusMapper(serviceResponse.status))
      .json(serviceResponse.data);
  }
}
