import type { IUserDTO } from "./UserDTO";

export interface IChatDTO {
  id?: string;
  userId?: string;
  message?: string;
  timestamp?: number;
  createDate?: Date;
  updateDate?: Date;
  user?: Partial<IUserDTO>;
}
