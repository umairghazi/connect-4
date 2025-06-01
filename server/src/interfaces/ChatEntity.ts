import type { ObjectId } from "mongodb";
import type { UserEntity } from "./UserEntity";

export interface ChatEntity {
  _id: ObjectId;
  userId: ObjectId;
  gameId?: ObjectId;
  message: string;
  timestamp: number;
  createDate?: Date;
  updateDate?: Date;
}

export type ChatEntityWithUser = ChatEntity & { user: UserEntity };
