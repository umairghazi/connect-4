import { Db, ObjectId } from 'mongodb';
import { BaseMongoRepo } from '../../infrastructure';

export interface IUserRepo {
  createUser(options: CreateUserRepoOptions): Promise<{ id: ObjectId | null }>;
}

interface CreateUserRepoOptions {
  // userId: string;
  name: string;
  email: string;
  isOnline: boolean;
}

export class UserRepo extends BaseMongoRepo implements IUserRepo {
  constructor(db: Promise<Db>) {
    super(db, 'user-data');
  }

  createUser(options: CreateUserRepoOptions): Promise<{ id: ObjectId | null }> {
    const { name, email, isOnline = false } = options;

    const result = super.create({
      name,
      email,
      isOnline,
    });

    return result;
  }
}
