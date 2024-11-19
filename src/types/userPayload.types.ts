import { IUser } from "./user.types";

export interface IUserPayload extends IUser {
  expiresAt: Date;
}
