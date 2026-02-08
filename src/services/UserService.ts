import bcrypt from "bcryptjs";
import { UserModel, type UserUpdate } from "../models/UserModel";
import type { ServiceResponse } from "../types";
import { UserDTO } from "../dto/UserDTO";

export class UserService {
  private userModel = UserModel;

  async findById(userId: string): Promise<ServiceResponse<UserDTO>> {
    const user = await this.userModel.findById(userId).lean().exec();

    if (!user) {
      return { status: "NOT_FOUND", data: { message: "User Not Found!" } };
    }

    return {
      status: "SUCCESSFUL",
      data: new UserDTO(user),
    };
  }

  async updateById(
    data: UserUpdate,
    userId: string,
  ): Promise<ServiceResponse<UserDTO>> {
    const user = await this.userModel.findById(userId).select("+password");
    if (!user) {
      return { status: "NOT_FOUND", data: { message: "User not found!" } };
    }

    if (data.email && data.email !== user.email) {
      const emailExists = await this.userModel
        .findOne({ email: data.email })
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
