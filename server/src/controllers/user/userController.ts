import { MongoConection } from '../../infrastructure';
import { IContext, IUserDTO, mapUserDTOToEntity, mapUserEntityToDTO } from '../../interface';
import { UserRepo } from '../../repositories';

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
  token?: string;
  email?: string;
  id?: string;
}

interface SetUserStatusParams {
  email: string;
  isActive: boolean;
}

interface RegisterUserResponse {
  user: IUserDTO;
  token: string;
}

interface LoginUserResponse {
  user: IUserDTO;
  token: string;
}

interface IUserController {
  registerUser: (params: RegisterUserParams) => Promise<RegisterUserResponse>;
  loginUser: (params: LoginUserParams) => Promise<LoginUserResponse>;
  setUserStatus: (params: SetUserStatusParams) => Promise<{ success: boolean }>;
  getUser: (params: GetUserParams) => Promise<IUserDTO>;
  getActiveUsers: (params: unknown, context: IContext) => Promise<IUserDTO[]>;
}

const mongoConection = MongoConection.default.db;
const userRepo = new UserRepo(mongoConection);

/**
 * User Controller
 * @export
 * @class UserController
 * @implements {IUserController}
 */
export class UserController implements IUserController {
  /**
   * Register User
   * @param {RegisterUserParams} params
   * @returns {Promise<RegisterUserResponse>}
   * @memberof UserController
   */
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

    const userDTO = mapUserEntityToDTO(user);

    return {
      token: registerResult.token,
      user: userDTO,
    };
  }

  /**
   * Login User
   * @param {LoginUserParams} params
   * @returns {Promise<LoginUserResponse>}
   */
  public async loginUser(params: LoginUserParams): Promise<LoginUserResponse> {
    const { email, password } = params;
    const loginUserResult = await userRepo.loginUser({ email, password });
    const { user, token } = loginUserResult;

    const userDTO = mapUserEntityToDTO(user);

    return {
      user: userDTO,
      token,
    };
  }

  /**
   * Get User
   * @param {GetUserParams} params
   * @returns {Promise<IUserDTO>}
   * @memberof UserController
   */
  public async getUser(params: GetUserParams): Promise<IUserDTO> {
    const { token, email, id } = params;
    if (!token && !email && !id) throw new Error('Token, email or id is required');

    const userEntity = mapUserDTOToEntity({ email, id });

    const getUserResponse = await userRepo.getUser({
      token,
      email: userEntity.email,
      _id: userEntity._id,
    });

    if (!getUserResponse) {
      throw new Error('User not found');
    }

    const userDTO = mapUserEntityToDTO(getUserResponse);

    return userDTO;
  }

  /**
   * Set User Status
   * @param {SetUserStatusParams} params
   * @returns {Promise<{ success: boolean }>}
   */
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

  /**
   * Get Active Users
   * @param {unknown} _
   * @param {IContext} context
   * @returns {Promise<IUserDTO[]>}
   */
  public async getActiveUsers(_: unknown, context: IContext): Promise<IUserDTO[]> {
    const { email } = context;

    if (!email) throw new Error('Email is missing');

    const emailEntity = mapUserDTOToEntity({ email }).email;

    const getActiveUsersRepoParams = {
      email: emailEntity,
    };

    const activeUsers = await userRepo.getActiveUsers(getActiveUsersRepoParams);

    const activeUsersDTO = activeUsers.map((user) => mapUserEntityToDTO(user));

    return activeUsersDTO;
  }
}
