import { gql, useMutation } from "@apollo/client";

export const POST_CHAT_MESSAGE = gql`
  mutation postChatMessage($userId: String, $message: String, $username: String, $picture: String) {
    postChatMessage(userId: $userId, message: $message, username: $username, picture: $picture) {
      id
    }
  }
`;

export function usePostChatMessageMutation(options?: any) {
  return useMutation(POST_CHAT_MESSAGE, options)
}