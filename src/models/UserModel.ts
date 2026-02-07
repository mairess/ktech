import type { Document, Types } from "mongoose";
import { model, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser {
  _id: Types.ObjectId;
  __v: number;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
});

UserSchema.set("toJSON", {
  transform: (_doc: Document, ret: IUserDocument) => {
    const { password: _password, __v, ...rest } = ret;
    return { ...rest, _id: ret._id.toString() };
  },
});

UserSchema.set("toObject", {
  transform: (_doc: Document, ret: IUserDocument) => {
    const { password: _password, __v, ...rest } = ret;
    return { ...rest, _id: ret._id.toString() };
  },
});

export const UserModel = model<IUser>("User", UserSchema);
