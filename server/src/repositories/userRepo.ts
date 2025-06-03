import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Db } from "mongodb";
import { ObjectId } from "mongodb";
import { config } from "../config/config";
import type { UserEntity } from "../interfaces/UserEntity";
import { NotFoundError, UnauthorizedError } from "../utils/serverUtils";
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
  email?: string;
  isActive: boolean;
  userId?: string;
}

export interface GetActiveUsersRepoOptions {
  email?: string;
}

export interface LoginUserResult {
  user: UserEntity;
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

    const user = await super.getOne<UserEntity>({ email });

    if (user?.password) {
      const isValidPassword = await compare(password, user.password);

      if (isValidPassword) {
        const token = jwt.sign({ userId: user._id, email }, config.jwt.secret, {
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

  async logoutUser(token: string): Promise<void> {
    const tokenData = jwt.decode(token);
    if (!tokenData) throw new Error("Unable to decode token");
    const { email } = tokenData as Record<string, string>;
    const user = await super.getOne<UserEntity>({ email });
    if (!user) throw new NotFoundError("User not found");
    await super.updateOne({ _id: user._id }, { isActive: false, lastActiveAt: new Date() });
  }

  async getUser(options: GetUserRepoOptions): Promise<UserEntity | null> {
    const { token, email, _id } = options;

    if (token) {
      const tokenData = jwt.decode(token);

      if (!tokenData) throw new Error("Unable to get user data");

      const { email } = tokenData as Record<string, string>;

      return super.getOne<UserEntity>({ email });
    }

    if (email) {
      return super.getOne<UserEntity>({ email });
    }

    if (_id) {
      return super.getOne<UserEntity>({ _id });
    }

    return null;
  }

  async setUserStatus(options: SetUserStatusRepoOptions): Promise<{ count: number }> {
    const { userId, email, isActive } = options;
    const lastActiveAt = !isActive ? new Date() : undefined;

    if (userId) {
      return super.updateOne({ _id: new ObjectId(userId) }, { isActive, lastActiveAt });
    }
    return super.updateOne({ email }, { isActive, lastActiveAt });
  }

  async getActiveUsers(params: GetActiveUsersRepoOptions): Promise<UserEntity[]> {
    const { email } = params;

    return super.getList<UserEntity>(
      {
        isActive: true,
        ...(email && { email: { $ne: email } }),
      },
      { limit: 100, page: 1 },
    );
  }
}
