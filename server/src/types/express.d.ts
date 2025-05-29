import type { IUserDTO } from "../interfaces/UserDTO";

declare global {
  namespace Express {
    export interface Request {
      user?: IUserDTO;
    }
  }
}
