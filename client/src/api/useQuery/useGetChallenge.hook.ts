import { gql, useLazyQuery } from "@apollo/client";

export const GET_CHALLENGE = gql`
  query getChallenge($email: String) {
    getChallenge(email: $email) {
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


export function useGetChallenge(options?: any) {
  return useLazyQuery(GET_CHALLENGE, options)
}
