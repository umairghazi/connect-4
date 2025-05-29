import type { UserDTO } from "./user";

export interface Message {
  id: string;
  userId: string;
  message: string;
  timestamp: number;
  createDate: string;
  updateDate: string;
  user: UserDTO;
}
