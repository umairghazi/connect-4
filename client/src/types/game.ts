import type { UserDTO } from "./user";

export interface Game {
  id: string;
  player1Id: string;
  player2Id: string;
  gameStatus: "CHALLENGED" | "IN_PROGRESS" | "COMPLETED" | string;
  whoseTurn: string;
  boardData: string;
  winnerId: string;
  createDate: string;
  updateDate: string;
  player1Data?: UserDTO;
  player2Data?: UserDTO;
}

export interface Cell {
  row: number;
  col: number;
  id: string;
  value: string | null;
  isOccupied: boolean;
}