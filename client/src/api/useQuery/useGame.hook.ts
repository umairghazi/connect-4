import { gql, useLazyQuery } from "@apollo/client";

export const GET_GAME = gql`
  query getGame($email: String, $gameId: String) {
    getGame(email: $email, gameId: $gameId) {
      gameId
      player1Id
      player2Id
      player1Email
      player2Email
      status
      gameState
      playerTurn
      createDate
      updateDate
    }
  }
`;


export function useGetGame(options?: any) {
  return useLazyQuery(GET_GAME, options)
}
