import { gql, useSubscription } from "@apollo/client";

export const CHECK_GAME = gql`
  subscription checkGame {
    checkGame {
      gameId
      player1Id
      player2Id
      player1Email
      player2Email
      status
      createDate
      updateDate
    }
  }
`;

export function useCheckGameSubscription(options?: any) {
  return useSubscription(CHECK_GAME, options)
}