import { gql, useMutation } from "@apollo/client";

export const CREATE_GAME = gql`
  mutation createGame($player1Id: String!, $player2Id: String!) {
    createGame(player1Id: $player1Id, player2Id: $player2Id) {
      player1Id
      player2Id
      id
    }
  }
`;

export function useCreateGameMutation(options?: any) {
  return useMutation(CREATE_GAME, options)
}

export const UPDATE_GAME = gql`
  mutation updateGame($id: String!, $whoseTurn: String, $boardData: [[CellInput]], $gameStatus: String) {
    updateGame(id: $id, whoseTurn: $whoseTurn, boardData: $boardData, gameStatus: $gameStatus) {
      id
      player1Id
      player2Id
      gameStatus
      whoseTurn
      winnerId
      createDate
      updateDate
      boardData {
        id
        row
        col
        value
        isOccupied
      }
    }
  }
`;

export function useUpdateGameMutation(options?: any) {
  return useMutation(UPDATE_GAME, options)
}
