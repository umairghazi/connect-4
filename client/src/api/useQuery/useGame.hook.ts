import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { IUser } from "./useUser.hook";

export const GET_GAME = gql`
  query getGame($player1Id: String, $player2Id: String, $id: String) {
    getGame(player1Id: $player1Id, player2Id: $player2Id, id: $id) {
      id
      player1Id
      player2Id
      gameStatus
      whoseTurn
      createDate
      updateDate
      winnerId
      boardData {
        id
        row
        col
        value
        isOccupied
      }
      player1Data {
        id
        displayName
      }
      player2Data {
        id
        displayName
      }
    }
  }
`;

export interface Cell {
  row: number;
  col: number;
  id: string;
  value: string | null;
  isOccupied: boolean;
  __typename?: string;
}

export interface IGame {
  id: string
  player1Id: string
  player2Id: string
  gameStatus: string
  whoseTurn: string
  createDate: string
  updateDate: string
  boardData: Cell[][]
  player1Data: Partial<IUser>
  player2Data: Partial<IUser>
  winnerId: string
}

export interface GameData {
  getGame: IGame[]
}

export function useGetGameQuery(options?: any) {
  return useQuery<GameData>(GET_GAME, {
    ...options,
    fetchPolicy: 'cache-and-network'
  })
}

export function useGetGameLazyQuery(options?: any) {
  return useLazyQuery<GameData>(GET_GAME, {
    ...options,
    fetchPolicy: 'cache-and-network'
  })
}