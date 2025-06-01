import type { UserDTO } from "./UserDTO";

export interface ChatDTO {
  id: string;
  userId: string;
  gameId?: string;
  message: string;
  timestamp: number;
  createDate?: Date;
  updateDate?: Date;
  user?: Partial<UserDTO>;
}
