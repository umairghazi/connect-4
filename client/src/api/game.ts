
import { request } from "../clients/request";
import type { Game } from "../types/game";

export function getGames(player1Id: string, player2Id?: string): Promise<Game[]> {
  const params = new URLSearchParams({ player1Id, player2Id: player2Id ?? "" }).toString();
  return request(`/games?${params}`);
}

export function createGame(player1Id: string, player2Id: string): Promise<Game> {
  return request("/games", {
    method: "POST",
    body: JSON.stringify({ player1Id, player2Id }),
  });
}

export function updateGameStatus(id: string, status: string): Promise<Game> {
  return request(`/games/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ gameStatus: status }),
  });
}