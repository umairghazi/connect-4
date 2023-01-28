import { ObjectId } from 'mongodb';
import { MongoConection } from '../../infrastructure';
import { LoginUserResult, RegisterUserResult, UserEntity, UserRepo } from '../../repositories';

interface SetUserStatusParams {
  userId: string;
  email: string;
}

interface RegisterUserParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
}

interface LoginUserParams {
  email: string;
  password: string;
}

interface IUserController {
  registerUser: (params: RegisterUserParams) => Promise<{ id: ObjectId | null }>;
  setUserStatus: (params: SetUserStatusParams) => Promise<{ id: ObjectId | null }>;
}

const mongoConection = MongoConection.default.db;
const userRepo = new UserRepo(mongoConection);

export class UserController implements IUserController {
  public async registerUser(params: RegisterUserParams): Promise<RegisterUserResult> {
    const { email, password, firstName, lastName, displayName, avatar } = params;
    return userRepo.registerUser({ email, password, firstName, lastName, displayName, avatar });
  }

  public async loginUser(params: LoginUserParams): Promise<LoginUserResult> {
    const { email, password } = params;
    return userRepo.loginUser({ email, password });
  }

  public async getUser(params: any): Promise<any> {
    const { token } = params;
    return userRepo.getUser({ token });
  }

  public async setUserStatus(params: SetUserStatusParams): Promise<{ id: ObjectId | null }> {
    const { userId, email } = params;
    const result = await userRepo.setUserStatus({ email, userId });
    return result;
  }
}
