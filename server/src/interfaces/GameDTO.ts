import type { GameStatus } from "./GameEntity";
import type { UserDTO } from "./UserDTO";

export interface GameDTO {
  id: string;
  boardData?: string[][];
  createDate?: Date;
  currentTurnIndex: number;
  gameStatus?: GameStatus | null;
  playerData?: UserDTO[];
  playerIds?: string[];
  startedBy: string;
  updateDate?: Date;
  winnerId?: string | null;
  colorToCheck?: string;
}
