import { ObjectId } from 'mongodb';
import { IUserEntity } from './UserEntity';

export interface IChatEntity {
  _id: ObjectId;
  userId: ObjectId;
  message: string;
  timestamp: number;
  create_date: Date;
  update_date: Date;
  user?: Partial<IUserEntity>;
}
