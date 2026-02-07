import { UserService } from "../services/UserService";
import type { Request, Response } from "express";
import statusMapper from "../utils/statusMapper";

export class UserController {
  private userService = new UserService();

  async register(req: Request, res: Response) {
    const serviceResponse = await this.userService.register(req.body);
    return res
      .status(statusMapper(serviceResponse.status))
      .json(serviceResponse.data);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.userService.findById(id);
    return res
      .status(statusMapper(serviceResponse.status))
      .json(serviceResponse.data);
  }

  async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceResponse = await this.userService.updateById(req.body, id);
    return res
      .status(statusMapper(serviceResponse.status))
      .json(serviceResponse.data);
  }
}
