import { UserService } from "../services/UserService";
import type { Request, Response } from "express";
import { statusMapper } from "../utils/statusMapper";
import type { UserUpdate } from "../models/UserModel";

export type IdParams = {
  id: string;
};

export class UserController {
  private userService = new UserService();

  async findById(req: Request<IdParams>, res: Response) {
    const id = req.params.id;
    const serviceResponse = await this.userService.findById(id);
    return res
      .status(statusMapper(serviceResponse.status))
      .json(serviceResponse.data);
  }

  async updateById(req: Request<IdParams>, res: Response) {
    const id = req.params.id;
    const updateData: UserUpdate = req.body;
    const serviceResponse = await this.userService.updateById(updateData, id);
    return res
      .status(statusMapper(serviceResponse.status))
      .json(serviceResponse.data);
  }

  async deleteById(req: Request<IdParams>, res: Response) {
    const id = req.params.id;
    const serviceResponse = await this.userService.deleteById(id);
    return res
      .status(statusMapper(serviceResponse.status))
      .json(serviceResponse.data);
  }
}
