import type { GameStatus } from "./GameEntity";
import type { UserDTO } from "./UserDTO";

export interface GameDTO {
  id?: string;
  player1Id?: string;
  player2Id?: string;
  whoseTurn?: string | null;
  winnerId?: string | null;
  gameStatus?: GameStatus;
  boardData?: string;
  player1Data?: Partial<UserDTO>;
  player2Data?: Partial<UserDTO>;
  createDate?: Date;
  updateDate?: Date;
}
