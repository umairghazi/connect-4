import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;
  const token = authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "uh uh uh you didn't say the magic word" });
    return;
  }

  jwt.verify(token, env.jwt.secret, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: "uh uh uh you didn't say the magic word" });
      return;
    }

    (req.user as unknown) = decoded;

    next();
  });
};
