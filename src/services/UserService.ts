import bcrypt from "bcryptjs";
import { UserModel, type IUser } from "../models/UserModel.js";
import type { ServiceResponse } from "../types.js";
import type { UserDTO } from "../dtos/UserDTO.js";

export class UserService {
  async create(data: IUser): Promise<ServiceResponse<UserDTO>> {
    const foundedUser = await UserModel.findOne({ email: data.email });

    if (foundedUser) {
      return { status: "CONFLICT", data: { message: "Usuário já existe" } };
    }

    const hashedPassword = await bcrypt.hash(data.password!, 10);

    const user = await UserModel.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return {
      status: "CREATED",
      data: {
        name: user.name,
        email: user.email,
        _id: user._id.toString(),
      },
    };
  }
}
