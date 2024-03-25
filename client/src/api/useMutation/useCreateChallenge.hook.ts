import { gql, useMutation } from "@apollo/client";

export const CREATE_CHALLENGE = gql`
  mutation createChallenge($player1Email: String!, $player2Email: String!) {
    createChallenge(player1Email: $player1Email, player2Email: $player2Email) {
      player1Email
      player2Email
      gameId
      status
    }
  }
`;

export function useCreateChallengeMutation(options?: any) {
  return useMutation(CREATE_CHALLENGE, options)
}