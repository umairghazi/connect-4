import { gql, useSubscription } from "@apollo/client";

export const CHECK_CHALLENGE = gql`
  subscription checkChallenge {
    checkChallenge {
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

export function useCheckChallengeSubscription(options?: any) {
  return useSubscription(CHECK_CHALLENGE, options)
}