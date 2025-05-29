
import { request } from "../clients/request";
import type { Message } from "../types/message";

export function getMessages(): Promise<Message[]> {
  return request("/messages");
}

export function postLobbyMessage(userId: string, message: string): Promise<{ id: string }> {
  return request("/messages", {
    method: "POST",
    body: JSON.stringify({ userId, message }),
  });
}
