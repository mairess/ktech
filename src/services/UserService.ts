import bcrypt from "bcryptjs";
import { UserModel, type IUser } from "../models/UserModel";
import type { ServiceResponse } from "../types";
import { UserDTO } from "../dto/UserDTO";

export class UserService {
  async create(data: IUser): Promise<ServiceResponse<UserDTO>> {
    const foundedUser = await UserModel.findOne({ email: data.email })
      .lean()
      .exec();

    if (foundedUser) {
      return { status: "CONFLICT", data: { message: "Email already in use!" } };
    }

    const hashedPassword = await bcrypt.hash(data.password!, 10);

    const user = await UserModel.create({
      ...data,
      password: hashedPassword,
    });

    return {
      status: "CREATED",
      data: new UserDTO(user),
    };
  }
}
