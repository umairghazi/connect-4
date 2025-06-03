import type { ObjectId } from "mongodb";

export interface UserEntity {
  _id?: ObjectId;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  createDate?: string;
  updateDate?: string;
  isActive?: boolean;
}
