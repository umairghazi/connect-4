import { request } from "../clients/request";
import type { LoginResponse, RegisterResponse, RegisterPayload } from "../types/auth";

export function login(email: string, password: string): Promise<LoginResponse> {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register(payload: RegisterPayload): Promise<RegisterResponse> {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function logout(): Promise<{ message: string }> {
  return request("/auth/logout", {
    method: "POST",
  });
}