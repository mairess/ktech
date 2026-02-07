import bcrypt from "bcryptjs";
import { UserModel, type IUser } from "../models/UserModel";
import type { ServiceResponse } from "../types";
import { UserDTO } from "../dto/UserDTO";

export class UserService {
  async register(data: IUser): Promise<ServiceResponse<UserDTO>> {
    const foundedUser = await UserModel.findOne({ email: data.email })
      .lean()
      .exec();

    if (foundedUser) {
      return { status: "CONFLICT", data: { message: "Email already in use!" } };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await UserModel.create({
      ...data,
      password: hashedPassword,
    });

    return {
      status: "CREATED",
      data: new UserDTO(user),
    };
  }

  async findById(userId: string): Promise<ServiceResponse<UserDTO>> {
    const user = await UserModel.findById(userId).lean().exec();

    if (!user) {
      return { status: "NOT_FOUND", data: { message: "User Not Found!" } };
    }

    return {
      status: "SUCCESSFUL",
      data: new UserDTO(user),
    };
  }

  async updateById(
    data: Partial<IUser>,
    userId: string,
  ): Promise<ServiceResponse<UserDTO>> {
    const user = await UserModel.findById(userId).select("+password");
    if (!user) {
      return { status: "NOT_FOUND", data: { message: "User not found!" } };
    }

    if (data.email && data.email !== user.email) {
      const emailExists = await UserModel.findOne({ email: data.email })
        .lean()
        .exec();

      if (emailExists) {
        return {
          status: "CONFLICT",
          data: { message: "Email already in use!" },
        };
      }
    }

    const { password, ...rest } = data;

    Object.assign(user, rest);

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return {
      status: "SUCCESSFUL",
      data: new UserDTO(user),
    };
  }
}
