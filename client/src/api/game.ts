
import { request } from "../clients/request";
import type { Game } from "../types/game";

export function getGames(player1Id: string, player2Id?: string): Promise<Game[]> {
  const params = new URLSearchParams({ player1Id, player2Id: player2Id ?? "" }).toString();
  return request(`/games?${params}`);
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