import { ObjectId } from 'mongodb';

export interface IUserEntity {
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
