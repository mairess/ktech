import type { LoginInput, LoginOutput } from "../interface/ILogin";
import type { ServiceResponse } from "../types";
import { UserModel, type IUser } from "../models/UserModel";
import bcrypt from "bcryptjs";
import { sign } from "../utils/jwt";
import { UserDTO } from "../dto/UserDTO";

export class AuthService {
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

  async login(data: LoginInput): Promise<ServiceResponse<LoginOutput>> {
    const user = await UserModel.findOne({ email: data.email })
      .select("+password")
      .exec();

    if (!user) {
      return {
        status: "UNAUTHORIZED",
        data: { message: "Invalid email or password!" },
      };
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      return {
        status: "UNAUTHORIZED",
        data: { message: "Invalid email or password!" },
      };
    }

    const token = sign({
      id: user.id,
      email: user.email,
    });

    return { status: "SUCCESSFUL", data: { token } };
  }
}
