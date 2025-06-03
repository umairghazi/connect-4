import type { UserDTO } from "./user";

export interface LoginResponse {
  user: UserDTO;
  token: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  displayName?: string;
  avatar?: string;
}

export interface RegisterResponse {
  user: UserDTO;
  token: string;
}
