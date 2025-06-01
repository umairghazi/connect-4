import type { GameStatus } from "./GameEntity";
import type { UserDTO } from "./UserDTO";

export interface GameDTO {
  id: string;
  startedBy: string;
  playerIds?: string[];
  currentTurnIndex: number;
  winnerId?: string | null;
  gameStatus?: GameStatus | null;
  boardData?: string;
  createDate?: Date;
  updateDate?: Date;
  playerData?: UserDTO[];
}
