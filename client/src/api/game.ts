
import { request } from "../clients/request";
import type { Game } from "../types/game";

export function getGame(gameId: string): Promise<Game> {
  return request(`/games/${gameId}`);
}

export function updateGame(id: string, gameData: Partial<Game>): Promise<Game> {
  return request(`/games/${id}`, {
    method: "PATCH",
    body: JSON.stringify(gameData),
  });
}

export function createGame(startedBy: string, playerIds: string[]): Promise<Game> {
  return request("/games", {
    method: "POST",
    body: JSON.stringify({ playerIds, startedBy }),
  });
}

export function acceptGameChallenge(gameId: string, playerIds: string[]): Promise<Game> {
  return request(`/games/${gameId}/accept`, {
    method: "PATCH",
    body: JSON.stringify({ playerIds }),
  });
}