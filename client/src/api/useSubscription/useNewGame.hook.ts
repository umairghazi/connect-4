import { gql, useSubscription } from "@apollo/client";

export const NEW_GAME_SUB = gql`
  subscription newGame {
    newGame {
      id
      player1Id
      player2Id
      gameStatus
      whoseTurn
      createDate
      updateDate
      boardData
      winnerId
      player1Data{
        id
        email
        firstName
        lastName
        displayName
        avatar
        createDate
        updateDate
        isActive
      }
    }
    player2Data{
        id
        email
        firstName
        lastName
        displayName
        avatar
        createDate
        updateDate
        isActive
      }
  }
`;

export function useNewGameSubscription(options?: any) {
  return useSubscription(NEW_GAME_SUB, options)
}