import type { IUserDocument } from "../models/UserModel";

export class UserDTO {
  public _id: string;
  public name: string;
  public email: string;

  constructor(user: IUserDocument) {
    this._id = user._id.toString();
    this.name = user.name;
    this.email = user.email;
  }
}
