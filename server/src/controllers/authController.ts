import type { Request, Response } from "express";
import { MongoConnector } from "../clients/mongoClient";
import { mapUserEntityToDTO } from "../interfaces/UserMapper";
import { UserRepo } from "../repositories/userRepo";
import { NotFoundError, UnauthorizedError } from "../utils/http-error";
import { ApiStatus } from "../utils/rest";

const db = MongoConnector.db;
const userRepo = new UserRepo(db);

export class AuthController {
  public static async registerUser(req: Request, res: Response): Promise<void> {
    const { email, password, firstName, lastName, displayName, avatar } = req.body ?? {};

    if (!email || !password) {
      res.status(ApiStatus.BadRequest).json({ error: "Missing required fields" });
      return;
    }

    const registerResult = await userRepo.registerUser({
      email: email.trim().toLowerCase(),
      password,
      firstName,
      lastName,
      displayName,
      avatar,
    });

    const user = await userRepo.getUser({ token: registerResult.token });

    if (!user) {
      res.status(500).json({ error: "Problem getting user data" });
      return;
    }

    const userDTO = mapUserEntityToDTO(user);

    res.status(201).json({
      user: userDTO,
      token: registerResult.token,
    });
  }

  public static async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    try {
      const loginUserResult = await userRepo.loginUser({
        email: email.trim().toLowerCase(),
        password,
      });

      const { user, token } = loginUserResult;
      const userDTO = mapUserEntityToDTO(user);

      res.status(ApiStatus.Success).json({ user: userDTO, token });
    } catch (error) {
      if (error instanceof NotFoundError) {
        res.status(ApiStatus.Unauthorized).json({ error: error.message });
        return;
      }
      if (error instanceof UnauthorizedError) {
        res.status(ApiStatus.Unauthorized).json({ error: error.message });
        return;
      }

      res.status(ApiStatus.ServerError).json({ error: "Login failed" });
    }
  }

  public static async logoutUser(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(400).json({ error: "Token is required" });
      return;
    }

    // If you're using JWTs with stateless auth, logout is a no-op
    // For session-based or token blacklisting, revoke the token here
    // await userRepo.revokeToken(token); // optional, depending on implementation

    res.status(200).json({ message: "Logged out successfully" });
  }
}
