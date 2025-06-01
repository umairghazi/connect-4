import type { ObjectId } from "mongodb";

export type GameStatus = "INITIALIZED" | "CHALLENGED" | "IN_PROGRESS" | "FINISHED";

export interface GameEntity {
  _id?: ObjectId;
  startedBy: ObjectId;
  playerIds?: ObjectId[];
  currentTurnIndex: number;
  gameStatus: GameStatus | null;
  boardData: string;
  winnerId: ObjectId | null;
  createDate: Date;
  updateDate: Date;
}
