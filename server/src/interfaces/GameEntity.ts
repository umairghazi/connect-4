import type { ObjectId } from "mongodb";
import type { IUserEntity } from "./UserEntity";

export interface IGameEntity {
  _id?: ObjectId;
  player1Id?: ObjectId;
  player2Id?: ObjectId;
  whoseTurn?: ObjectId;
  gameStatus?: string;
  create_date?: string;
  update_date?: string;
  boardData?: string;
  player1Data?: Partial<IUserEntity>;
  player2Data?: Partial<IUserEntity>;
}
