import type { UserDTO } from "./user";

export interface Game {
  id: string;
  startedBy: string
  playerIds: string[];
  playerData?: UserDTO[];
  gameStatus: "CHALLENGED" | "IN_PROGRESS" | "COMPLETED" | string;
  whoseTurn: string | null;
  winnerId: string | null;
  boardData: string;
  createDate: string;
  updateDate: string;
}

export interface Cell {
  row: number;
  col: number;
  id: string;
  value: string | null;
  isOccupied: boolean;
}