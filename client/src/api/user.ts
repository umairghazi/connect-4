import { request } from "../clients/request";
import type { GetUserPayload, UserDTO } from "../types/user";

export async function getUser(params?: GetUserPayload): Promise<UserDTO> {
  const query = new URLSearchParams(params as Record<string, string>).toString();
  const url = query ? `/users?${query}` : "/users";
  return request<UserDTO>(url);
}

export async function setUserStatus(email: string, isActive: boolean): Promise<{ success: boolean }> {
  return request("/users/status", {
    method: "PATCH",
    body: JSON.stringify({ email, isActive }),
  });
}

export async function getActiveUsers(): Promise<UserDTO[]> {
  return request("/users/active");
}