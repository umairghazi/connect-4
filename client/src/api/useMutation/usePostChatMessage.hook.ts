import { gql, useMutation } from "@apollo/client";

export const POST_CHAT_MESSAGE = gql`
  mutation postChatMessage($userId: String, $message: String) {
    postChatMessage(userId: $userId, message: $message) {
      id
    }
  }
`;

export function usePostChatMessageMutation(options?: any) {
  return useMutation(POST_CHAT_MESSAGE, options)
}