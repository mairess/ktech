import type { LoginInput, LoginOutput } from "../interface/ILogin";
import type { ServiceResponse } from "../types";
import { UserModel } from "../models/UserModel";
import bcrypt from "bcryptjs";
import { sign } from "../utils/jwt";

export class AuthService {
  async login(data: LoginInput): Promise<ServiceResponse<LoginOutput>> {
    console.log("data", data);

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
