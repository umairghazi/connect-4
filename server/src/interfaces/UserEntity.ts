import type { ObjectId } from "mongodb";

export interface UserEntity {
  _id?: ObjectId;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  create_date?: string;
  update_date?: string;
  isActive?: boolean;
}
