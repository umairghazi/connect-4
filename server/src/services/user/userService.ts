import { ObjectId } from 'mongodb';
import { IUserRepo } from '../../repositories';

interface CreateUserOptions {
  name: string;
  email: string;
  isOnline: boolean;
}

export class UserService {
  private _userRepo: IUserRepo;

  constructor(repo: IUserRepo) {
    this._userRepo = repo;
  }

  public async createUser(options: CreateUserOptions): Promise<{ id: ObjectId | null }> {
    return this._userRepo.createUser(options);
  }
}
