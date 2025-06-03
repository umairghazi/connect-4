import type { UserDTO } from "../interfaces/UserDTO";

declare global {
  namespace Express {
    export interface Request {
      user?: UserDTO;
    }
  }
}
