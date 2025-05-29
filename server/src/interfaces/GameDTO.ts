import type { IUserDTO } from "./UserDTO";

export interface IGameDTO {
  id?: string;
  player1Id?: string;
  player2Id?: string;
  whoseTurn?: string;
  gameStatus?: string;
  createDate?: string;
  updateDate?: string;
  boardData?: string;
  player1Data?: Partial<IUserDTO>;
  player2Data?: Partial<IUserDTO>;
}
