import type { UserDTO } from "./user";

export interface Game {
  id: string;
  boardData: string[][];
  createDate: string;
  currentTurnIndex: number;
  gameStatus: string;
  playerData?: UserDTO[];
  playerIds: string[];
  startedBy: string
  updateDate: string;
  winnerId: string | null;
  colorToCheck?: string;
}

export interface Cell {
  row: number;
  col: number;
  id: string;
  value: string | null;
  isOccupied: boolean;
}