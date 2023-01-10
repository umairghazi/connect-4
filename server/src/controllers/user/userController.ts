import { ObjectId } from 'mongodb';
import { MongoConection } from '../../infrastructure';
import { UserRepo } from '../../repositories';
import { UserService } from '../../services';

interface ICreateUserParams {
  name: string;
  email: string;
}

interface IResolver<TArgs> {
  args: TArgs;
}

interface IUserController {
  createUser: ({ args }: IResolver<ICreateUserParams>) => Promise<{ id: ObjectId | null }>;
}

const mongoConection = MongoConection.default.db;
const userRepo = new UserRepo(mongoConection);
const userService = new UserService(userRepo);

export class UserController implements IUserController {
  public async createUser({
    args,
  }: IResolver<ICreateUserParams>): Promise<{ id: ObjectId | null }> {
    const { name, email } = args;
    const isOnline = false;
    const result = await userService.createUser({ name, email, isOnline });
    return result;
  }
}
