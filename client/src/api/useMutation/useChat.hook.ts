import { gql, useMutation } from "@apollo/client";

export const POST_LOBBY_CHAT_MESSAGE = gql`
  mutation postLobbyChatMessage($userId: String, $message: String) {
    postLobbyChatMessage(userId: $userId, message: $message) {
      id
    }
  }
`;

export function usePostLobbyChatMessageMutation(options?: any) {
  return useMutation(POST_LOBBY_CHAT_MESSAGE, options)
}