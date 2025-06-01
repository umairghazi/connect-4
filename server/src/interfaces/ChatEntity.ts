import type { ObjectId } from "mongodb";
import type { UserEntity } from "./UserEntity";

export interface ChatEntity {
  _id?: ObjectId;
  userId?: ObjectId;
  message?: string;
  timestamp?: number;
  create_date?: Date;
  update_date?: Date;
  user?: UserEntity;
}
