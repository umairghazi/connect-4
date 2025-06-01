import type { ObjectId } from "mongodb";
import type { UserEntity } from "./UserEntity";

export type GameStatus = "INITIALIZED" | "CHALLENGED" | "IN_PROGRESS" | "FINISHED";

export interface GameEntity {
  _id?: string;
  player1Id?: ObjectId;
  player2Id?: ObjectId;
  whoseTurn?: ObjectId | null;
  gameStatus?: GameStatus;
  winnerId?: ObjectId | null;
  boardData?: string;
  createDate?: Date;
  updateDate?: Date;
  player1Data?: Partial<UserEntity>;
  player2Data?: Partial<UserEntity>;
}
