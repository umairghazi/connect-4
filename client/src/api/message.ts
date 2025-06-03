
import { request } from "../clients/request";
import type { Message } from "../types/message";

export function getMessages(gameId?: string): Promise<Message[]> {
  const query = gameId ? `?gameId=${gameId}` : "";
  return request(`/messages${query}`);
}
