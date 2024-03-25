import { MongoConection } from '../../infrastructure';
import { IContext } from '../../interface/IContext';
import { LoginUserResult, UserEntity, UserRepo } from '../../repositories';

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

interface GetUserParams {
  token: string;
}

interface SetUserStatusParams {
  email: string;
  isActive: boolean;
}

interface RegisterUserResponse {
  token: string;
  user: UserEntity;
}

interface IUserController {
  registerUser: (params: RegisterUserParams) => Promise<RegisterUserResponse>;
  setUserStatus: (params: SetUserStatusParams) => Promise<{ success: boolean }>;
}

const mongoConection = MongoConection.default.db;
const userRepo = new UserRepo(mongoConection);

export class UserController implements IUserController {
  public async registerUser(params: RegisterUserParams): Promise<RegisterUserResponse> {
    const { email, password, firstName, lastName, displayName, avatar } = params;

    const registerResult = await userRepo.registerUser({
      email,
      password,
      firstName,
      lastName,
      displayName,
      avatar,
    });

    const user = await userRepo.getUser({ token: registerResult.token });

    if (!user) {
      throw new Error('Problem getting user data');
    }

    return {
      token: registerResult.token,
      user,
    };
  }

  public async loginUser(params: LoginUserParams): Promise<LoginUserResult> {
    const { email, password } = params;
    return userRepo.loginUser({ email, password });
  }

  public async getUser(params: GetUserParams): Promise<UserEntity | null | undefined> {
    const { token } = params;
    return userRepo.getUser({ token });
  }

  public async setUserStatus(params: SetUserStatusParams): Promise<{ success: boolean }> {
    const { email, isActive } = params;
    if (!email) throw new Error('Email is required');
    const result = await userRepo.setUserStatus({ email, isActive });

    if (result?.count === 1) {
      return {
        success: true,
      };
    } else {
      throw new Error('Could not update user status');
    }
  }

  public async getActiveUsers(_: unknown, context: IContext): Promise<UserEntity[]> {
    const { email } = context;

    if (!email) throw new Error('Email is missing');

    const getActiveUsersRepoParams = {
      email,
    };

    return userRepo.getActiveUsers(getActiveUsersRepoParams);
  }
}
