import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Db, ObjectId } from 'mongodb';
import { BaseMongoRepo } from '../../infrastructure';
import { NoPaginationOptions } from '../../interface';

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
}

interface SetUserStatusRepoOptions {
  email: string;
  isActive: boolean;
}

export interface GetActiveUsersRepoOptions {
  email: string;
}

export interface LoginUserResult {
  user: UserEntity;
  token: string;
}

export interface RegisterUserResult {
  id: ObjectId | null;
  token: string;
}

export interface UserEntity {
  _id: ObjectId | null;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  create_date: string;
  update_date: string;
}

export interface IUserRepo {
  registerUser(options: RegisterUserRepoOptions): Promise<RegisterUserResult>;
  loginUser(options: LoginUserRepoOptions): Promise<LoginUserResult>;
  setUserStatus(options: SetUserStatusRepoOptions): Promise<{ count: number }>;
  getActiveUsers(params: GetActiveUsersRepoOptions): Promise<UserEntity[]>;
}

export class UserRepo extends BaseMongoRepo implements IUserRepo {
  constructor(db: Promise<Db>) {
    super(db, 'user-data');
  }

  async registerUser(options: RegisterUserRepoOptions): Promise<RegisterUserResult> {
    const { email, password, firstName, lastName, displayName, avatar } = options;

    const oldUser = await super.getOne({ email });

    if (oldUser) {
      throw new Error('Email already in use');
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
      ...registerUserResult,
      token,
    };
  }

  async loginUser(options: LoginUserRepoOptions): Promise<LoginUserResult> {
    const { email, password } = options;

    const user = await super.getOne<UserEntity>({ email });
    if (user) {
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
    throw new Error('Couldnt find the user');
  }

  async getUser(options: GetUserRepoOptions): Promise<UserEntity | null | undefined> {
    const { token, email } = options;
    if (token) {
      const tokenData = jwt.decode(token);
      if (!tokenData) throw new Error('Unable to get user data');
      const { email } = tokenData as { [key: string]: string };
      return super.getOne<UserEntity>({ email });
    }

    if (email) {
      return super.getOne<UserEntity>({ email });
    }
  }

  async setUserStatus(options: SetUserStatusRepoOptions): Promise<{ count: number }> {
    const { email, isActive } = options;
    return super.updateOne({ email }, { isActive });
  }

  async getActiveUsers(params: GetActiveUsersRepoOptions): Promise<UserEntity[]> {
    const { email } = params;
    if (!email) throw new Error('Email is missing');

    return super.getList<UserEntity>(
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
