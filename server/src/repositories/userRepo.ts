import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Db, ObjectId } from "mongodb";
import { env } from "../config/env";
import type { IUserEntity } from "../interfaces/UserEntity";
import { NotFoundError, UnauthorizedError } from "../utils/http-error";
import { BaseMongoRepo } from "./baseMongoRepo";

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

export class UserRepo extends BaseMongoRepo {
  constructor(db: Promise<Db>) {
    super(db, "user-data");
  }

  async registerUser(options: RegisterUserRepoOptions): Promise<RegisterUserResult> {
    const { email, password, firstName, lastName, displayName, avatar } = options;

    const existingUser = await super.getOne({ email });

    if (existingUser) {
      throw new Error("Email is already in use");
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

    const token = jwt.sign({ userId: registerUserResult.id, email }, "token_key", {
      expiresIn: "5h",
    });

    return {
      id: registerUserResult?.id?.toString() ?? "",
      token,
    };
  }

  async loginUser(options: LoginUserRepoOptions): Promise<LoginUserResult> {
    const { email, password } = options;

    const user = await super.getOne<IUserEntity>({ email });

    if (user?.password) {
      const isValidPassword = await compare(password, user.password);

      if (isValidPassword) {
        const token = jwt.sign({ userId: user._id, email }, env.jwt.secret, {
          expiresIn: "24h",
        });

        return {
          user,
          token,
        };
      }

      throw new UnauthorizedError("Invalid email or password");
    }

    throw new NotFoundError("User not found");
  }

  async getUser(options: GetUserRepoOptions): Promise<IUserEntity | null> {
    const { token, email, _id } = options;

    if (token) {
      const tokenData = jwt.decode(token);

      if (!tokenData) throw new Error("Unable to get user data");

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

  async setUserStatus(options: SetUserStatusRepoOptions): Promise<{ count: number }> {
    const { email, isActive } = options;

    return super.updateOne({ email }, { isActive });
  }

  async getActiveUsers(params: GetActiveUsersRepoOptions): Promise<IUserEntity[]> {
    const { email } = params;

    if (!email) throw new Error("Email is missing");

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
