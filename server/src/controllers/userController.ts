import type { Request, Response } from "express";
import { MongoConnector } from "../clients/mongoClient";
import { mapUserDTOToEntity, mapUserEntityToDTO } from "../interfaces/UserMapper";
import { UserRepo } from "../repositories/userRepo";

interface GetUserQuery {
  token?: string;
  email?: string;
  id?: string;
}

const db = MongoConnector.db;
const userRepo = new UserRepo(db);

export class UserController {
  public static async getUser(req: Request, res: Response): Promise<void> {
    const { token, email, id } = (req.query as GetUserQuery) ?? {};

    if (!token && !email && !id) throw new Error("Token, email or id is required");

    const userEntity = mapUserDTOToEntity({ email, id });

    const getUserResponse = await userRepo.getUser({
      token,
      email: userEntity.email,
      _id: userEntity._id,
    });

    if (!getUserResponse) {
      throw new Error("User not found");
    }

    const userDTO = mapUserEntityToDTO(getUserResponse);

    res.status(200).json(userDTO);
  }

  public static async setUserStatus(req: Request, res: Response): Promise<void> {
    const { email, isActive } = req.body ?? {};
    if (!email) throw new Error("Email is required");
    const result = await userRepo.setUserStatus({ email, isActive });

    if (result?.count === 1) {
      res.status(200).json({ success: true, message: "User status updated successfully" });
    } else {
      throw new Error("Could not update user status");
    }
  }

  public static async getActiveUsers(req: Request, res: Response): Promise<void> {
    const { email } = req.user ?? {};

    if (!email) throw new Error("Email is missing");

    const emailEntity = mapUserDTOToEntity({ email }).email;

    const getActiveUsersRepoParams = {
      email: emailEntity,
    };

    const activeUsers = await userRepo.getActiveUsers(getActiveUsersRepoParams);

    const activeUsersDTO = activeUsers.map((user) => mapUserEntityToDTO(user));

    res.status(200).json(activeUsersDTO);
  }
}
