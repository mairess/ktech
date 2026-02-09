import type { IUserDocument } from "../models/UserModel";

class MeDTO {
  public name: string;
  public email: string;

  constructor(user: IUserDocument) {
    this.name = user.name;
    this.email = user.email;
  }
}

export default MeDTO;
