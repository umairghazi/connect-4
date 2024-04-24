import { gql, useMutation } from "@apollo/client";

export const CREATE_GAME = gql`
  mutation createGame($player1Email: String!, $player2Email: String!, $gameState: String) {
    createGame(player1Email: $player1Email, player2Email: $player2Email, gameState: $gameState) {
      player1Email
      player2Email
      gameId
      status
    }
  }
`;

export function useCreateGameMutation(options?: any) {
  return useMutation(CREATE_GAME, options)
}

export const MAKE_MOVE = gql`
  mutation makeMove($player1Email: String!, $player2Email: String!) {
    makeMove(player1Email: $player1Email, player2Email: $player2Email) {
      player1Email
      player2Email
      gameId
      status
    }
  }
`;

export function useMakeMoveMutation(options?: any) {
  return useMutation(MAKE_MOVE, options)
}