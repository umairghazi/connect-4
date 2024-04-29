import { IUserDTO } from './UserDTO';

export interface ICellDto {
  row: number;
  col: number;
  id: string;
  isOccupied: boolean;
  value: string;
}

export interface IGameDTO {
  id?: string;
  player1Id?: string;
  player2Id?: string;
  whoseTurn?: string;
  gameStatus?: string;
  createDate?: string;
  updateDate?: string;
  boardData?: ICellDto[][];
  player1Data?: Partial<IUserDTO>;
  player2Data?: Partial<IUserDTO>;
}
