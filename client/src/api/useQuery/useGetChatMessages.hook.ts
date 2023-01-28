import { gql, useQuery } from "@apollo/client";

export const GET_CHAT_MESSAGES = gql`
  query getChatMessages {
    messages {
      _id
      userId
      create_date
      message
      picture
      username
    }
  }
`;

export function useGetChatMessagesQuery(options?: any) {
  return useQuery(GET_CHAT_MESSAGES, {
    ...options,
    fetchPolicy: 'cache-and-network'
  })
}