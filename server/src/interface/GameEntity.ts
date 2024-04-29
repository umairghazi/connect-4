import { ObjectId } from 'mongodb';
import { IUserEntity } from './UserEntity';

export interface ICellEntity {
  row: number;
  col: number;
  id: string;
  isOccupied: boolean;
  value: string;
}

export interface IGameEntity {
  _id?: ObjectId;
  player1Id?: ObjectId;
  player2Id?: ObjectId;
  whoseTurn?: ObjectId;
  gameStatus?: string;
  create_date?: string;
  update_date?: string;
  boardData?: ICellEntity[][];
  player1Data?: Partial<IUserEntity>;
  player2Data?: Partial<IUserEntity>;
}
