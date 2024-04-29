import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Db, ObjectId } from 'mongodb';
import { GraphQLError } from 'graphql';
import { BaseMongoRepo } from '../../infrastructure';
import { IUserEntity } from '../../interface';

interface RegisterUserRepoOptions {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
}

export interface LoginUserRepoOptions {
  email: string;
  password: string;
}

export interface GetUserRepoOptions {
  token?: string;
  email?: string;
  _id?: ObjectId;
}

export interface SetUserStatusRepoOptions {
  email: string;
  isActive: boolean;
}

export interface GetActiveUsersRepoOptions {
  email?: string;
}

export interface LoginUserResult {
  user: IUserEntity;
  token: string;
}

export interface RegisterUserResult {
  id: string;
  token: string;
}

export interface IUserRepo {
  registerUser(options: RegisterUserRepoOptions): Promise<RegisterUserResult>;
  loginUser(options: LoginUserRepoOptions): Promise<LoginUserResult>;
  setUserStatus(options: SetUserStatusRepoOptions): Promise<{ count: number }>;
  getActiveUsers(params: GetActiveUsersRepoOptions): Promise<IUserEntity[]>;
}

export class UserRepo extends BaseMongoRepo implements IUserRepo {
  constructor(db: Promise<Db>) {
    super(db, 'user-data');
  }

  /**
   * Register User
   * @param {RegisterUserRepoOptions} options
   * @returns {Promise<RegisterUserResult>}
   */
  async registerUser(options: RegisterUserRepoOptions): Promise<RegisterUserResult> {
    const { email, password, firstName, lastName, displayName, avatar } = options;

    const existingUser = await super.getOne({ email });

    if (existingUser) {
      throw new GraphQLError('Email is already in use', {
        extensions: { code: 'BAD_USER_INPUT' },
      });
    }

    const encryptedPassword = await hash(password, 10);

    const registerUserResult = await super.create({
      email: email.toLowerCase(),
      password: encryptedPassword,
      firstName,
      lastName,
      displayName,
      avatar,
    });

    const token = jwt.sign({ userId: registerUserResult.id, email }, 'token_key', {
      expiresIn: '5h',
    });

    return {
      id: registerUserResult?.id?.toString() ?? '',
      token,
    };
  }

  /**
   * Login User
   * @param {LoginUserRepoOptions} options
   * @returns {Promise<LoginUserResult>}
   */
  async loginUser(options: LoginUserRepoOptions): Promise<LoginUserResult> {
    const { email, password } = options;

    if (!email || !password) throw new Error('Email or password is missing');

    const user = await super.getOne<IUserEntity>({ email });

    if (user && user.password) {
      const isValidPassword = await compare(password, user.password);

      if (isValidPassword) {
        const token = jwt.sign({ userId: user._id, email }, 'token_key', {
          expiresIn: '24h',
        });

        return {
          user,
          token,
        };
      }

      throw new Error('Invalid password');
    }

    throw new Error("Couldn't find the user");
  }

  /**
   * Get User
   * @param {GetUserRepoOptions} options
   * @returns {(Promise<UserEntity | null | undefined>)}
   */
  async getUser(options: GetUserRepoOptions): Promise<IUserEntity | null> {
    const { token, email, _id } = options;

    if (token) {
      const tokenData = jwt.decode(token);

      if (!tokenData) throw new Error('Unable to get user data');

      const { email } = tokenData as Record<string, string>;

      return super.getOne<IUserEntity>({ email });
    }

    if (email) {
      return super.getOne<IUserEntity>({ email });
    }

    if (_id) {
      return super.getOne<IUserEntity>({ _id });
    }

    return null;
  }

  /**
   * Set User Status
   * @param {SetUserStatusRepoOptions} options
   * @returns {Promise<{ count: number }>}
   */
  async setUserStatus(options: SetUserStatusRepoOptions): Promise<{ count: number }> {
    const { email, isActive } = options;

    return super.updateOne({ email }, { isActive });
  }

  /**
   * Get Active Users
   * @param {GetActiveUsersRepoOptions} params
   * @returns {Promise<IUserEntity[]>}
   */
  async getActiveUsers(params: GetActiveUsersRepoOptions): Promise<IUserEntity[]> {
    const { email } = params;

    if (!email) throw new Error('Email is missing');

    return super.getList<IUserEntity>(
      {
        isActive: true,
        email: {
          $ne: email,
        },
      },
      { limit: 100, page: 1 },
    );
  }
}
